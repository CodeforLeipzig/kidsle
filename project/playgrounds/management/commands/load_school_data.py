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
    help = 'Parses the geo json files, located in schools/data/'

    def handle(self, *args, **options):
        for school_type, json_file in SCHOOL_DATA_FILES:
            with open(json_file) as f:
                data = json.loads(f.read())
                for school_information in data['features']:
                    name = school_information['properties']['name']
                    school_info, adress_info = school_information['properties']['popupContent'].split('<br />')
                    post_code = adress_info.split(' ')[-2]
                    street = ' '.join(adress_info.split(' ')[:-2])
                    town = adress_info.split(' ')[-1]
                    latitude = school_information["geometry"]["coordinates"][1]
                    longitude = school_information["geometry"]["coordinates"][0]
                    obj, created = School.objects.get_or_create(
                        name=name,
                        post_code=post_code,
                        street=street,
                        town=town,
                        school_type=school_type,
                        latitude=latitude,
                        longitude=longitude
                    )
                    if created:
                        self.stdout.write('Created School %s' % name)
