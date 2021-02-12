# Standard Library
import json
from datetime import datetime
from logging import getLogger

# Third Party Stuff
import requests
from django.conf import settings

log = getLogger(__name__)


class BanxicoClient(object):
    BASE_URL = 'https://www.banxico.org.mx/SieAPIRest/service/v1/series'
    API_KEY = settings.SIE_TOKEN
    session = None

    UDIS_KEY = "SP68257"
    USD_KEY = "SF63528"

    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'Accept': 'application/json',
            'User-Agent': 'binance/python',
            'Bmx-Token': self.API_KEY
        })

    def get(self, endpoint: str, **kwargs) -> bytes:
        return self.request('get', endpoint, {}, **kwargs)

    def post(self, endpoint: str, data: dict, **kwargs) -> bytes:
        data = {**self.base_data, **data}
        return self.request('post', endpoint, data, **kwargs)

    def request(self, method: str, endpoint: str, data: dict, **kwargs) -> bytes:
        url = "{}{}".format(self.BASE_URL, endpoint)
        try:
            response = self.session.request(method, url, data=data, **kwargs)
            if not response.ok:
                response.raise_for_status()
            return response.content
        except Exception as exc:
            log.info(exc)
            return "{}"

    def get_udis_data(self, start_at, end_at):
        """Get UDIS data with usd price for each udis"""

        endpoint = "/{},{}/datos/{}/{}".format(self.UDIS_KEY, self.USD_KEY, start_at, end_at)
        data = self.get(endpoint)
        json_data = json.loads(data)
        udis = next(serie for serie in json_data["bmx"]["series"] if serie["idSerie"] == self.UDIS_KEY)
        usd_prices = next(serie for serie in json_data["bmx"]["series"] if serie["idSerie"] == self.USD_KEY)

        udis_prices_data = udis["datos"]
        usd_prices_data = usd_prices["datos"]

        full_data = {
            "title": udis["titulo"],
            "udis": {
                "min": float(udis_prices_data[0]["dato"]),
                "avg": 0,
                "max": 0,
            },
            "usd": {
                "min": float(usd_prices_data[0]["dato"]),
                "avg": 0,
                "max": 0,
            },
            "data": []
        }

        for item in udis_prices_data:
            date = item["fecha"]

            try:
                usd_price = next(_usd_price for _usd_price in usd_prices_data if _usd_price["fecha"] == date)
            except Exception as exc:
                usd_price = None
                log.info(exc)

            mxn_price = float(item["dato"])
            usd_price = float(usd_price["dato"]) if usd_price else None

            full_data["udis"]["avg"] += mxn_price

            # Get max and min usd price
            if usd_price is not None:
                full_data["usd"]["avg"] += usd_price
                if usd_price > full_data["usd"]["max"]:
                    full_data["usd"]["max"] = usd_price
                if usd_price < full_data["usd"]["min"]:
                    full_data["usd"]["min"] = usd_price

            # Get max and min udis price
            if mxn_price > full_data["udis"]["max"]:
                full_data["udis"]["max"] = mxn_price
            if mxn_price < full_data["udis"]["min"]:
                full_data["udis"]["min"] = mxn_price

            date_timestamp = datetime.strptime(item["fecha"], "%d/%m/%Y").timestamp() * 1000

            full_data["data"].append({
                "timestamp": date_timestamp,
                "udis_mxn_price": mxn_price,
                "udis_usd_price": round(mxn_price / usd_price, 4) if usd_price is not None else usd_price,
                "usd_price": usd_price
            })

        full_data["udis"]["avg"] /= len(udis_prices_data)
        full_data["usd"]["avg"] /= len(usd_prices_data)

        return full_data
