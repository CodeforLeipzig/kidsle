from django.db import models

'''
Spielplätze in Kategorien zusammenfassen? Bsp. nach Alter anhand der gaming devices/ des equipments
PLZ aus Koordinaten mappen?
'''


class Playground(models.Model):
    name = models.CharField(max_length=100, verbose_name='Name')
    district = models.CharField(max_length=100, verbose_name='Stadtteil')
    location = models.CharField(max_length=100, verbose_name='Gegend')
    town = models.CharField(max_length=100, verbose_name='Stadt')
    gaming_devices = models.CharField(max_length=200, verbose_name='Spielgeräte')
    equipment = models.CharField(max_length=200, verbose_name='Ausstattung')
    line = models.SmallIntegerField(max_length=100, verbose_name='Linie')
    stop = models.SmallIntegerField(max_length=100, verbose_name='Haltestelle')
    latitude = models.CharField(max_length=100, verbose_name='')
    longitude = models.CharField(max_length=100, verbose_name='')
