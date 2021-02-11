# Third Party Stuff
from rest_framework.serializers import (
    DateField,
    ListField,
    Serializer,
)


class DateRangeSerializer(Serializer):
    start_at = DateField()
    end_at = DateField()
    series = ListField()
