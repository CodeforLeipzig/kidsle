from rest_framework import viewsets

from .models import DayCareCenter
from .serializers import DaycareSerializer


class DaycareViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = DayCareCenter.objects.all()
    serializer_class = DaycareSerializer
