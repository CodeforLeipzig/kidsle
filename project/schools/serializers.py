from rest_framework import serializers

from .models import School


class SchoolTypeFieldSerializer(serializers.Field):
    def to_native(self, data):
        school_types_dict = dict(School.SCHOOL_TYPES)
        return school_types_dict.get(data, 'Unbekannt')


class SchoolSerializer(serializers.HyperlinkedModelSerializer):
    school_type = SchoolTypeFieldSerializer()
    class Meta:
        model = School
        fields = ('name', 'post_code', 'street', 'town', 'school_type', 'latitude', 'longitude')
