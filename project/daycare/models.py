# encoding: utf-8
from django.db import models


class DayCareCenter(models.Model):
	DAYCARECENTER = 0
	NANNY = 1
	CARE_TYPES = (
		(DAYCARECENTER, 'Kita'),
		(NANNY, 'Tagesmutter')
	)

	name = models.CharField(max_length=100, verbose_name='Name der Einrichtung')
	daycare_type = models.SmallIntegerField(verbose_name='Betreuungsart', choices=CARE_TYPES)
	zipcode = models.CharField(max_length=5, verbose_name='Postleitzahl')
	address = models.CharField(max_length=100, verbose_name='Adresse komplett')
	latitude = models.CharField(max_length=100, verbose_name='')
	longitude = models.CharField(max_length=100, verbose_name='')
	district = models.CharField(max_length=100, verbose_name='Bezirk')
