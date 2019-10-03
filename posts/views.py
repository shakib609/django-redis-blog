from rest_framework import viewsets
from rest_framework_extensions.mixins import NestedViewSetMixin

from .models import Comment, Post, Tag
from .serializers import CommentSerializer, PostSerializer, TagSerializer


class PostViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class CommentViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class TagViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
