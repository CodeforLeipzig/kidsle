import os
import json

from django.core.management.base import BaseCommand
from django.conf import settings

from playgrounds.models import Playground


PLAYGROUND_DATA_DIR = os.path.join(settings.BASE_DIR, 'playgrounds', 'data')

PLAYGROUND_DATA_FILE = [
    #(School.ELEMENTARY_SCHOOL, os.path.join(SCHOOL_DATA_DIR, 'grundschule.geo.json')),
]


class Command(BaseCommand):
    help = 'Parses the geo json files, located in playgrounds/data/'

    def handle(self, *args, **options):
        for json_file in PLAYGROUND_DATA_FILE:
            with open(json_file) as f:
                data = json.loads(f.read())
                for playground_information in data['features']:
                    name = playground_information['properties']['name']
                    school_info, adress_info = playground_information['properties']['popupContent'].split('<br />')
                    post_code = adress_info.split(' ')[-2]
                    street = ' '.join(adress_info.split(' ')[:-2])
                    town = adress_info.split(' ')[-1]
                    latitude = playground_information["geometry"]["coordinates"][1]
                    longitude = playground_information["geometry"]["coordinates"][0]
                    obj, created = Playground.objects.get_or_create(
                        name=name,
                        post_code=post_code,
                        street=street,
                        town=town,
                        latitude=latitude,
                        longitude=longitude
                    )
                    if created:
                        self.stdout.write('Created Playground %s' % name)
