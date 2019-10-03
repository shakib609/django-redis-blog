from rest_framework import serializers

from .models import Comment, Post, Tag


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        exclude = ['slug']

    def get_tags(self, obj):
        return TagSerializer(obj.tags.all()).data


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        exclude = ['posts']
