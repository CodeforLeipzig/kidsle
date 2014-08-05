from django.contrib import admin

from .models import DayCareCenter


class DayCareCenterAdmin(admin.ModelAdmin):
    list_display = ('name', 'daycare_type', 'zipcode', 'address', 'latitude', 'longitude',
        'district')
    list_filter = ('daycare_type', 'zipcode', 'district')
    search_fields = ('name',)


admin.site.register(DayCareCenter, DayCareCenterAdmin)
