from django.contrib import admin

from .models import Playground, GamingDevice, Equipment


class PlaygroundAdmin(admin.ModelAdmin):
    list_display = ('name', 'district', 'location', 'town', 'lines', 'stops')
    list_filter = ('district', 'gaming_devices', 'equipment')
    search_fields = ('name',)


class GamingDeviceAdmin(admin.ModelAdmin):
    list_display = ('title',)
    search_fields = ('title',)


class EquipmentAdmin(admin.ModelAdmin):
    list_display = ('title',)
    search_fields = ('title',)


admin.site.register(Playground, PlaygroundAdmin)
admin.site.register(GamingDevice, GamingDeviceAdmin)
admin.site.register(Equipment, EquipmentAdmin)
