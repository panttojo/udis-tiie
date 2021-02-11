# Third Party Stuff
from rest_framework.views import APIView

# Banxico Stuff
from apps.banxico.client import BanxicoClient
from apps.banxico.serializers import DateRangeSerializer
from apps.base.response import (
    NotFound,
    Ok,
)


class ListUdisView(APIView):

    def get(self, request):
        serializer = DateRangeSerializer(data=request.GET)
        serializer.is_valid(raise_exception=True)

        client = BanxicoClient()
        udis = client.get_udis_data(**serializer.validated_data)

        if not udis:
            return NotFound()
        return Ok(udis)
