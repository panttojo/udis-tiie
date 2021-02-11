# Standard Library
import json
from decimal import Decimal
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
            "avg": {
                "udis": 0,
                "usd": 0
            },
            "max_min": {
                "udis": {
                    "min": Decimal(udis_prices_data[0]["dato"]),
                    "max": 0
                },
                "usd": {
                    "min": Decimal(usd_prices_data[0]["dato"]),
                    "max": 0
                }
            },
            "data": []
        }

        for item in udis_prices_data:
            date = item["fecha"]
            usd_price = next(_usd_price for _usd_price in usd_prices_data if _usd_price["fecha"] == date)
            usd_price = Decimal(usd_price["dato"])
            mxn_price = Decimal(item["dato"])

            full_data["avg"]["udis"] += mxn_price
            full_data["avg"]["usd"] += usd_price

            # Get max and min usd price
            if usd_price > full_data["max_min"]["usd"]["max"]:
                full_data["max_min"]["usd"]["max"] = usd_price
            if usd_price < full_data["max_min"]["usd"]["min"]:
                full_data["max_min"]["usd"]["min"] = usd_price

            # Get max and min udis price
            if mxn_price > full_data["max_min"]["udis"]["max"]:
                full_data["max_min"]["udis"]["max"] = mxn_price
            if mxn_price < full_data["max_min"]["udis"]["min"]:
                full_data["max_min"]["udis"]["min"] = mxn_price

            full_data["data"].append({
                "date": item["fecha"],
                "udis_mxn_price": mxn_price,
                "udis_usd_price": mxn_price * usd_price,
                "usd_price": usd_price
            })

        full_data["avg"]["udis"] /= len(udis_prices_data)
        full_data["avg"]["usd"] /= len(usd_prices_data)

        return full_data
