# encoding: utf-8
from django.db import models
from django.utils.encoding import python_2_unicode_compatible


@python_2_unicode_compatible
class GamingDevice(models.Model):
    title = models.CharField(max_length=100, verbose_name='Spielgeräte')

    def __str__(self):
        return self.title

@python_2_unicode_compatible
class Equipment(models.Model):
    title = models.CharField(max_length=200, verbose_name='Ausstattung')

    def __str__(self):
        return self.title

class Playground(models.Model):
    name = models.CharField(max_length=100, verbose_name='Name')
    district = models.CharField(max_length=100, verbose_name='Stadtteil')
    location = models.CharField(max_length=100, verbose_name='Gegend')
    town = models.CharField(max_length=100, verbose_name='Stadt')
    gaming_devices = models.ManyToManyField(GamingDevice)
    equipment = models.ManyToManyField(Equipment)
    lines = models.CharField(max_length=200, verbose_name='öffentliche Verkehrsmittel')
    stops = models.CharField(max_length=100, verbose_name='Haltestellen')
    latitude = models.CharField(max_length=100, verbose_name='')
    longitude = models.CharField(max_length=100, verbose_name='')
