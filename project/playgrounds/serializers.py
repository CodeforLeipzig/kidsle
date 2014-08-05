# encoding: utf-8
from rest_framework import serializers

from .models import Playground


class PlaygroundSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Playground
        fields = ('name', 'district', 'location', 'town', 'gaming_devices', 'equipment', 'lines', 'stops', 'latitude', 'longitude')
        depth = 1
