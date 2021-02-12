# Standard Library
import json
from datetime import datetime
from logging import getLogger

# Third Party Stuff
import requests
from django.conf import settings
from memoize import memoize

log = getLogger(__name__)


class BanxicoClient(object):
    BASE_URL = 'https://www.banxico.org.mx/SieAPIRest/service/v1/series'
    API_KEY = settings.SIE_TOKEN
    session = None

    UDIS_KEY = "SP68257"
    USD_KEY = "SF63528"

    TIIE_1 = "SF331451"
    TIIE_28 = "SP74626"
    TIIE_91 = "SF43878"
    TIIE_182 = "SF111916"
    TIIP_28 = "SF43947"

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

    @memoize()
    def get_udis_data(self, start_at, end_at):
        """Get UDIS data with usd value for each udis"""

        endpoint = "/{},{}/datos/{}/{}".format(self.UDIS_KEY, self.USD_KEY, start_at, end_at)
        data = self.get(endpoint)
        json_data = json.loads(data)
        udis = next(serie for serie in json_data["bmx"]["series"] if serie["idSerie"] == self.UDIS_KEY)
        usd_values = next(serie for serie in json_data["bmx"]["series"] if serie["idSerie"] == self.USD_KEY)

        udis_values_data = udis["datos"]
        usd_values_data = usd_values["datos"]

        payload = {
            "title": udis["titulo"],
            "udis": {
                "min": float(udis_values_data[0]["dato"]),
                "avg": 0,
                "max": 0,
            },
            "usd": {
                "min": float(usd_values_data[0]["dato"]),
                "avg": 0,
                "max": 0,
            },
            "data": []
        }

        for item in udis_values_data:
            date = item["fecha"]

            try:
                usd_value = next(_usd_value for _usd_value in usd_values_data if _usd_value["fecha"] == date)
            except Exception as exc:
                usd_value = None
                log.info(exc)

            udis_value = float(item["dato"])
            usd_value = float(usd_value["dato"]) if usd_value else None

            payload["udis"]["avg"] += udis_value

            # Get max and min usd value
            if usd_value is not None:
                payload["usd"]["avg"] += usd_value
                if usd_value > payload["usd"]["max"]:
                    payload["usd"]["max"] = usd_value
                if usd_value < payload["usd"]["min"]:
                    payload["usd"]["min"] = usd_value

            # Get max and min udis value
            if udis_value > payload["udis"]["max"]:
                payload["udis"]["max"] = udis_value
            if udis_value < payload["udis"]["min"]:
                payload["udis"]["min"] = udis_value

            date_timestamp = datetime.strptime(item["fecha"], "%d/%m/%Y").timestamp() * 1000

            payload["data"].append({
                "timestamp": date_timestamp,
                "udis_value": udis_value,
                "udis_usd_value": round(udis_value / usd_value, 4) if usd_value is not None else usd_value,
                "usd_value": usd_value
            })

        payload["udis"]["avg"] /= len(udis_values_data)
        payload["usd"]["avg"] /= len(usd_values_data)

        return payload

    def _get_number_or_none(self, value):
        try:
            parsed_value = float(value) if value is not None else None
        except Exception:
            parsed_value = None
        return parsed_value

    @memoize()
    def get_tiie_data(self):
        """Get UDIS data with usd value for each udis"""

        endpoint = "/{},{},{},{},{}/datos".format(self.TIIE_1, self.TIIE_28, self.TIIE_91, self.TIIE_182, self.TIIP_28)
        data = self.get(endpoint)
        json_data = json.loads(data)

        tiie_1 = next(serie for serie in json_data["bmx"]["series"] if serie["idSerie"] == self.TIIE_1)
        tiie_1_data = tiie_1["datos"]

        tiie_28 = next(serie for serie in json_data["bmx"]["series"] if serie["idSerie"] == self.TIIE_28)
        tiie_28_data = tiie_28["datos"]

        tiie_91 = next(serie for serie in json_data["bmx"]["series"] if serie["idSerie"] == self.TIIE_91)
        tiie_91_data = tiie_91["datos"]

        tiie_182 = next(serie for serie in json_data["bmx"]["series"] if serie["idSerie"] == self.TIIE_182)
        tiie_182_data = tiie_182["datos"]

        tiip_28 = next(serie for serie in json_data["bmx"]["series"] if serie["idSerie"] == self.TIIP_28)
        tiip_28_data = tiip_28["datos"]

        payload = []

        tiie_1_payload = {
            "name": "TIIE de fondeo a un día",
            "data": [],
            "key": self.TIIE_1
        }
        tiie_28_payload = {
            "name": "SP74626",
            "data": [],
            "key": self.TIIE_28
        }
        tiie_91_payload = {
            "name": "TIIE a 91 días",
            "data": [],
            "key": self.TIIE_91
        }
        tiie_182_payload = {
            "name": "TIIE a 182 días",
            "data": [],
            "key": self.TIIE_182
        }
        tiip_28_payload = {
            "name": "TIIP a 28 días (Serie histórica)",
            "data": [],
            "key": self.TIIP_28
        }

        for item in tiie_1_data:
            date_timestamp = datetime.strptime(item["fecha"], "%d/%m/%Y").timestamp() * 1000
            tiie_1_payload["data"].append([date_timestamp, self._get_number_or_none(item["dato"])])

        for item in tiie_28_data:
            date_timestamp = datetime.strptime(item["fecha"], "%d/%m/%Y").timestamp() * 1000
            tiie_28_payload["data"].append([date_timestamp, self._get_number_or_none(item["dato"])])

        for item in tiie_91_data:
            date_timestamp = datetime.strptime(item["fecha"], "%d/%m/%Y").timestamp() * 1000
            tiie_91_payload["data"].append([date_timestamp, self._get_number_or_none(item["dato"])])

        for item in tiie_182_data:
            date_timestamp = datetime.strptime(item["fecha"], "%d/%m/%Y").timestamp() * 1000
            tiie_182_payload["data"].append([date_timestamp, self._get_number_or_none(item["dato"])])

        for item in tiip_28_data:
            date_timestamp = datetime.strptime(item["fecha"], "%d/%m/%Y").timestamp() * 1000
            tiip_28_payload["data"].append([date_timestamp, self._get_number_or_none(item["dato"])])

        payload = (
            tiie_1_payload,
            tiie_28_payload,
            tiie_91_payload,
            tiie_182_payload,
            tiip_28_payload
        )

        return payload
