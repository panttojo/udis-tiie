# Third Party Stuff
from django.utils.translation import gettext_lazy as _
from rest_framework.serializers import (
    DateField,
    Serializer,
    ValidationError,
)


class DateRangeSerializer(Serializer):
    start_at = DateField()
    end_at = DateField()

    def validate(self, data):
        start_at = data.get("start_at", None)
        end_at = data.get("end_at", None)

        if start_at == end_at:
            raise ValidationError({"start_at": [_('"Start date" must be different to "End date"')]})

        return data
