# Standard Library
import json
from logging import getLogger

# Third Party Stuff
import requests
from django.conf import settings

log = getLogger(__name__)


class BanxicoClient(object):
    BASE_URL = 'https://www.banxico.org.mx/SieAPIRest/service/v1/series'
    API_KEY = settings.SIE_TOKEN
    session = None

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

    def get_data(self, **kwargs):
        series = kwargs.get("series", [])
        series = ",".join(series)
        start_at = kwargs.get("start_at", None)
        end_at = kwargs.get("end_at", None)

        endpoint = "/{}/datos".format(series)
        if start_at and end_at:
            endpoint = "{}/{}/{}".format(endpoint, start_at, end_at)

        data = self.get(endpoint)
        json_data = json.loads(data)
        return json_data
