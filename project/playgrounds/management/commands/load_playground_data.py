# encoding: utf-8
import os
import json

from django.core.management.base import BaseCommand
from django.conf import settings

from playgrounds.models import Playground, GamingDevice, Equipment


PLAYGROUND_DATA_DIR = os.path.join(settings.BASE_DIR, 'playgrounds', 'data')

PLAYGROUND_DATA_FILE = os.path.join(PLAYGROUND_DATA_DIR, 'new_playgrounds.json')


class Command(BaseCommand):
    help = 'Parses json file, located in playgrounds/data/'

    def handle(self, *args, **options):
        with open(PLAYGROUND_DATA_FILE) as f:
            data = json.loads(f.read())
            for playground_information in data:
                playground = Playground.objects.create(
                    **playground_information['general']
                )
                for read_gaming_device in playground_information['advanced']['gaming_devices']:
                    gaming_device = GamingDevice.objects.get_or_create(title=read_gaming_device)
                    playground.gaming_devices = gaming_device
                for read_equipment in playground_information['advanced']['equipment']:
                    equipment = Equipment.objects.get_or_create(title=read_equipment)
                    playground.equipment = equipment

                self.stdout.write('Created Playground %s' % playground_information['general']['name'])
