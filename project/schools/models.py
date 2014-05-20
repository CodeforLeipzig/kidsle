# encoding: utf-8
from django.db import models


class School(models.Model):
    ELEMENTARY_SCHOOL = 0
    SECONDATY_SCHOOL = 1
    GRAMMAR_SCHOOL = 2
    SCHOOL_TYPES = (
        (ELEMENTARY_SCHOOL, 'Grundschule'),
        (SECONDATY_SCHOOL, 'Mittelschule'),
        (GRAMMAR_SCHOOL, 'Gymnasium')
    )

    name = models.CharField(max_length=100, verbose_name='Schulname')
    post_code = models.CharField(max_length=5, verbose_name='Postleitzahl')
    street = models.CharField(max_length=100, verbose_name='Straße')
    town = models.CharField(max_length=100, verbose_name='Stadt')
    school_type = models.SmallIntegerField(verbose_name='Schulart', choices=SCHOOL_TYPES)
    latitude = models.CharField(max_length=100, verbose_name='')
    longitude = models.CharField(max_length=100, verbose_name='')
