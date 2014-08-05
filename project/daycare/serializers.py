from rest_framework import serializers

from .models import DayCareCenter

class DaycareSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = DayCareCenter
        fields = ('name', 'daycare_type', 'zipcode', 'address', 'latitude', 'longitude', 'district')
