from django.contrib import admin

from .models import Playground


class PlaygroundAdmin(admin.ModelAdmin):
    list_display = ('name', 'district', 'location', 'town', 'line', 'stop')
    list_filter = ('district', 'gaming_devices', 'equiment')
    search_fields = ('name')


admin.site.register(Playground, PlaygroundAdmin)
