from rest_framework import serializers

from .models import DayCareCenter


class DaycareTypeFieldSerializer(serializers.Field):
    def to_native(self, data):
        care_types_dict = dict(DayCareCenter.CARE_TYPES)
        return care_types_dict.get(data, 'Unbekannt')


class DaycareSerializer(serializers.HyperlinkedModelSerializer):
    daycare_type = DaycareTypeFieldSerializer()

    class Meta:
        model = DayCareCenter
        fields = ('name', 'daycare_type', 'zipcode', 'address', 'latitude', 'longitude', 'district')
