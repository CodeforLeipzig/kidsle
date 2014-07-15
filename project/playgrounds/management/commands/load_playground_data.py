import os
import json

from django.core.management.base import BaseCommand
from django.conf import settings

from playgrounds.models import GamingDevice, GamingDevicePlaygroundM2M, Playground


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
                #read_gaming_devices = playground_information['properties']['gaming_devices']
                #for gaming_device in read_gaming_devices:
                #    gaming_devices.add(GamingDevice.objects.get_or_create(gaming_device))
                #gaming_devices_of_playground = GamingDevicesM2M()
                #gaming_devices_of_playground.gaming_devices = devices
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
                playground, created = Playground.objects.get_or_create(
                    name=name,
                    district=district,
                    town=town,
                    location=location,
                    #=gaming_devices,
                    equipment=equipment,
                    lines=lines,
                    stops=stops,
                    latitude=latitude,
                    longitude=longitude
                )
                read_gaming_devices = json.loads(playground_information['properties']['gaming_devices'])
                #print(read_gaming_devices)
                for read_gaming_device in read_gaming_devices:
                    #print(read_gaming_device)
                    gaming_device, _ = GamingDevice.objects.get_or_create(title=read_gaming_device)
                    GamingDevicePlaygroundM2M.objects.get_or_create(device=gaming_device,
                        playground=playground)[0].save()
                print(playground.gaming_devices.all())
                print()

                if created:
                    self.stdout.write('Created Playground %s' % name)
