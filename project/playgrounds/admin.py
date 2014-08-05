from django.contrib import admin

from .models import Playground


class PlaygroundAdmin(admin.ModelAdmin):
    list_display = ('name', 'district', 'location', 'town', 'lines', 'stops')
    list_filter = ('district', 'gaming_devices', 'equipment')
    search_fields = ('name',)


admin.site.register(Playground, PlaygroundAdmin)
