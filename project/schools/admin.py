from django.contrib import admin

from .models import School


class SchoolAdmin(admin.ModelAdmin):
    list_display = ('name', 'school_type', 'street', 'post_code', 'town')
    list_filter = ('school_type', 'post_code')
    search_fields = ('name', 'street')


admin.site.register(School, SchoolAdmin)