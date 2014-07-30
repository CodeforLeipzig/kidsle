# encoding: utf-8
from rest_framework import serializers

from .models import GamingDevice, GamingDevicePlaygroundM2M, Playground, Equipment, EquipmentPlaygroundM2M


class GamingDeviceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = GamingDevice
        fields = ('title', )


class GamingDevicePlaygroundM2MSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = GamingDevicePlaygroundM2M
        fields = ('device', 'playground')

class EquipmentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Equipment
        fields = ('title', )


class EquipmentPlaygroundM2MSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = EquipmentPlaygroundM2M
        fields = ('equipment', 'playground')


class PlaygroundSerializer(serializers.HyperlinkedModelSerializer):
    gaming_devices = GamingDeviceSerializer(many=True, read_only=True)
    equipment = EquipmentSerializer(many=True, read_only=True)
    class Meta:
        model = Playground
        fields = ('name', 'district', 'location', 'town', 'gaming_devices', 'equipment', 'lines', 'stops', 'latitude', 'longitude')
