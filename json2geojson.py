#!/usr/bin/python
#-*-coding: utf-8 -*-

import os
from json import JSONEncoder, dumps
import yaml
from geojson import Feature, FeatureCollection, Point
import re


INPUT_DIR = os.path.join('project', 'static', 'data')
INPUT_FILE = os.path.join(INPUT_DIR, 'playgrounds.json')
OUTPUT_DIR = os.path.join('project', 'playgrounds', 'data')
OUTPUT_FILE = os.path.join(OUTPUT_DIR, 'playgrounds.geo.json')

outputdata = []
jsonEnc = JSONEncoder()

with open(INPUT_FILE, 'r') as f:
    read_data = f.read()
    f.close()
    data = yaml.load(read_data)
    for information in data:
        district = jsonEnc.encode(information['district'])
        try:
            gaming_devices = jsonEnc.encode(information['gaming_devices'])
        except Exception, e:
            pass
        try:
            equipment = jsonEnc.encode(information['equipment'])
        except Exception, e:
            pass

        address = jsonEnc.encode(information['address'])
        linie_pattern = re.compile('[A-Z]{0,1}[0-9]{1,3}[E]{0,1}')
        local_traffic = {}
        for stop_ in information['local_traffic']:
            #print("stop: {}".format(stop_.encode('utf-8')))
            lines = re.findall(linie_pattern, stop_)
            stop_name = stop_.split('(')[1][0:-1]
            if(re.search('Bus', stop_.encode('utf-8'))):
                local_traffic["bus"] = {"lines": lines, "stop": stop_name}
            elif(re.search('Straßenbahn', stop_.encode('utf-8'))):
                local_traffic["tram"] = {"lines": lines, "stop": stop_name}
            elif(re.search('S-Bahn', stop_.encode('utf-8'))):
                local_traffic["s-bahn"] = {"lines": lines, "stop": stop_name}

        feature = Feature(
            geometry=Point(
                (information['lng'], information['lat'])),
            properties={
                "name": information['title'],
            "district": district, "address": address, "local_traffic": local_traffic,
             "gaming_devices": gaming_devices, "equipment": equipment})
        #print(feature)
        outputdata.append(feature)

with open(OUTPUT_FILE, 'w') as f:
    f.write(unicode(dumps(FeatureCollection(outputdata))))
