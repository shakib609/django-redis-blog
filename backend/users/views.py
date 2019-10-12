from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework_extensions.mixins import NestedViewSetMixin
from django.contrib.auth import get_user_model

from .serializers import UserSerializer


class UserViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    lookup_field = 'username'

    def update(self, request, *args, **kwargs):
        if request.user == self.get_object():
            return super().update(request, *args, **kwargs)
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    def destroy(self, request, *args, **kwargs):
        if request.user == self.get_object():
            return super().destroy(request, *args, **kwargs)
        return Response(status=status.HTTP_401_UNAUTHORIZED)
