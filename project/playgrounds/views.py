# encoding: utf-8
from rest_framework import viewsets

from .models import Playground
from .serializers import PlaygroundSerializer


class PlaygroundViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Playground.objects.all()
    serializer_class = PlaygroundSerializer
