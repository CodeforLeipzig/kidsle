# encoding: utf-8
from django.db import models


class GamingDevice(models.Model):
    title = models.CharField(max_length=100, verbose_name='Spielgeräte')


class Equipment(models.Model):
    title = models.CharField(max_length=200, verbose_name='Ausstattung')


class Playground(models.Model):
    name = models.CharField(max_length=100, verbose_name='Name')
    district = models.CharField(max_length=100, verbose_name='Stadtteil')
    location = models.CharField(max_length=100, verbose_name='Gegend')
    town = models.CharField(max_length=100, verbose_name='Stadt')
    gaming_devices = models.ManyToManyField(GamingDevice, through='GamingDevicePlaygroundM2M')
    equipment = models.ManyToManyField(Equipment, through='EquipmentPlaygroundM2M')
    lines = models.CharField(max_length=200, verbose_name='öffentliche Verkehrsmittel')
    stops = models.CharField(max_length=100, verbose_name='Haltestellen')
    latitude = models.CharField(max_length=100, verbose_name='')
    longitude = models.CharField(max_length=100, verbose_name='')


class GamingDevicePlaygroundM2M(models.Model):
    '''helper class for different gaming devices'''
    device = models.ForeignKey(GamingDevice)
    playground = models.ForeignKey(Playground)


class EquipmentPlaygroundM2M(models.Model):
    '''helper class for different equipment'''
    equipment = models.ForeignKey(Equipment)
    playground = models.ForeignKey(Playground)
