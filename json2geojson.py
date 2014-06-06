#!/usr/bin/python
#-*-coding: utf-8 -*-

import os
import json
from geojson import Feature, FeatureCollection, Point

INPUT_DIR = os.path.join('project', 'static', 'data')
INPUT_FILE = os.path.join(INPUT_DIR, 'playgrounds.json')
OUTPUT_DIR = os.path.join('project', 'playgrounds', 'data')
OUTPUT_FILE = os.path.join(OUTPUT_DIR, 'playgrounds.geo.json')
BREAK_LINE = '<br />'

outputdata = []

with open(INPUT_FILE, 'r') as f:
    read_data = f.read()
    f.close()
    data = json.loads(read_data)
    for information in data:
        additional_information = BREAK_LINE + information['district']
        try:
            for gaming_device in information['gaming_devices']:
                additional_information += gaming_device + BREAK_LINE
        except Exception, e:
            pass

        try:
            for equipment_item in information['equipment']:
                additional_information += equipment_item + BREAK_LINE
        except Exception, e:
            pass

        additional_information += information['address']

        for local_traffic_item in information['local_traffic']:
            additional_information += local_traffic_item + BREAK_LINE

        feature = Feature(
            geometry=Point(
                (information['lng'], information['lat'])),
            properties={
                "name": information['title'],
            "popupContent": additional_information})
        #print(feature)
        outputdata.append(feature)

with open(OUTPUT_FILE, 'w') as f:
    f.write(unicode(json.dumps(FeatureCollection(outputdata))))
