from django.conf import settings


def active_apps(request):
    """Adds"""
    return {'active_apps': settings.ACTIVE_APPS}
