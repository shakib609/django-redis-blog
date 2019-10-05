from rest_framework import serializers

from .models import Comment, Post, Tag


class AuthorSerializerMixin:
    """
    This mixin allows the inherited Serializer to save the
    authenticated user as the author of the instance.
    """
    def save(self, **kwargs):
        author = self.context['request'].user
        return super().save(author=author, **kwargs)


class CommentSerializer(AuthorSerializerMixin, serializers.ModelSerializer):
    author = serializers.StringRelatedField()

    class Meta:
        model = Comment
        fields = '__all__'


class PostSerializer(AuthorSerializerMixin, serializers.ModelSerializer):
    author = serializers.StringRelatedField()
    slug = serializers.SlugField(read_only=True)

    class Meta:
        model = Post
        fields = '__all__'


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        exclude = ['posts']
