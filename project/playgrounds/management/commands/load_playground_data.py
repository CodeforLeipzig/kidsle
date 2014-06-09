import os
import json

from django.core.management.base import BaseCommand
from django.conf import settings

from playgrounds.models import Playground


PLAYGROUND_DATA_DIR = os.path.join(settings.BASE_DIR, 'playgrounds', 'data')

PLAYGROUND_DATA_FILE = os.path.join(PLAYGROUND_DATA_DIR, 'playgrounds.geo.json')


class Command(BaseCommand):
    help = 'Parses the geo json files, located in playgrounds/data/'

    def handle(self, *args, **options):
        with open(PLAYGROUND_DATA_FILE) as f:
            data = json.loads(f.read())
            for playground_information in data['features']:
                name = playground_information['properties']['name']
                district = playground_information['properties']['district']
                town = playground_information['properties']['town']
                location = playground_information['properties']['location']
                gaming_devices = playground_information['properties']['gaming_devices']
                equipment = playground_information['properties']['equipment']
                lines = ''
                stops_ = set()
                local_traffic = playground_information['properties']['local_traffic']
                for traffic_choice in local_traffic.keys():
                    for line in local_traffic[traffic_choice]['lines']:
                        lines = lines + line + ', '
                    new_stop = local_traffic[traffic_choice]['stop']
                    stops_.add(new_stop)
                stops = ''
                for stop in stops_:
                    stops += stop + ', '
                latitude = playground_information["geometry"]["coordinates"][1]
                longitude = playground_information["geometry"]["coordinates"][0]
                obj, created = Playground.objects.get_or_create(
                    name=name,
                    district=district,
                    town=town,
                    location=location,
                    gaming_devices=gaming_devices,
                    equipment=equipment,
                    lines=lines,
                    stops=stops,
                    latitude=latitude,
                    longitude=longitude
                )
                if created:
                    self.stdout.write('Created Playground %s' % name)
