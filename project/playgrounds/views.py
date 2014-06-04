from rest_framework import viewsets

from .models import Playground
from .serializers import PlaygroundSerializer


class PlaygroundViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Playground.objects.all()
    serializer_class = PlaygroundSerializer
