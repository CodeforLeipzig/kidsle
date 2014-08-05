# encoding: utf-8
import os
import json
import re

from django.core.management.base import BaseCommand
from django.conf import settings

from daycare.models import DayCareCenter


DAYCARE_DATA_DIR = os.path.join(settings.BASE_DIR, 'daycare', 'data')

DAYCARE_DATA_FILE = os.path.join(DAYCARE_DATA_DIR, 'kitas.json')


class Command(BaseCommand):
    help = 'Parses the geo json files, located in daycare/data/'
    def handle(self, *args, **options):
        with open(DAYCARE_DATA_FILE) as f:
            data = json.loads(f.read())
        for daycare_information in data:
            name = daycare_information['name']
            daycare_type = DayCareCenter.DAYCARECENTER

            if daycare_information['type'] != u'Kindertagesstätte':
                daycare_type = DayCareCenter.NANNY

            try:
                zip_code = daycare_information['address']['zipcode']
            except KeyError:
                zip_code = ""

            try:
                address = daycare_information['address']['full']
            except KeyError:
                address = ""

            address = address.replace(', Leipzig', '')

            try:
                latitude = daycare_information['address']['lat']
                longitude = daycare_information['address']['lng']
            except KeyError:
                latitude = ""
                longitude = ""

            try:
                district = daycare_information['district']
            except KeyError:
                district = ""

            obj, created = DayCareCenter.objects.get_or_create(
                name=name,
                daycare_type=daycare_type,
                zipcode=zip_code,
                address=address,
                #street=street,
                #streetNumber=street_number,
                latitude=latitude,
                longitude=longitude,
                district=district
            )
            if created:
                self.stdout.write('Created daycare %s' % name)
