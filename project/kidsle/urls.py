from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

from rest_framework import routers

from core.views import IndexView
from schools.views import SchoolViewSet
from daycare.views import DaycareViewSet
from playgrounds.views import PlaygroundViewSet


router = routers.DefaultRouter()
router.register(r'schools', SchoolViewSet)
router.register(r'daycare', DaycareViewSet)
router.register(r'playgrounds', PlaygroundViewSet)


urlpatterns = patterns('',
    url(r'^$', IndexView.as_view(), name='home'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^grappelli/', include('grappelli.urls')),
    url(r'^api/', include(router.urls)),
)
