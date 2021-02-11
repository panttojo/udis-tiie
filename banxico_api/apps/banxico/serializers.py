# Third Party Stuff
from rest_framework.serializers import (
    DateField,
    Serializer,
)


class DateRangeSerializer(Serializer):
    start_at = DateField(required=False)
    end_at = DateField(required=False)
