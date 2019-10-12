from rest_framework import serializers

from .models import Comment, Post, Tag


class AuthorSerializerMixin:
    def save(self, **kwargs):
        author = self.context['request'].user
        return super().save(author=author, **kwargs)


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        exclude = ['posts']
        extra_kwargs = {'slug': {'validators': []}}


class CommentSerializer(AuthorSerializerMixin, serializers.ModelSerializer):
    author = serializers.StringRelatedField()

    class Meta:
        model = Comment
        fields = '__all__'


class PostSerializer(AuthorSerializerMixin, serializers.ModelSerializer):
    author = serializers.StringRelatedField()
    slug = serializers.SlugField(read_only=True)
    tags = TagSerializer(many=True, required=False)

    class Meta:
        model = Post
        fields = '__all__'

    def get_or_create_and_assign_tags(self, post, tags):
        """
        helper method for assigning the supplied tags to the post
        """
        all_tags = []
        for tag_item in tags:
            slug = tag_item.get('slug')
            tag, created = Tag.objects.get_or_create(slug=slug)
            all_tags.append(tag)
        post.tags.set(all_tags)

    def create(self, validated_data):
        tags = self.validated_data.get('tags', [])
        if tags:
            del validated_data['tags']
        del validated_data['tags']
        post = Post.objects.create(**validated_data)
        self.get_or_create_and_assign_tags(post, tags)
        return post

    def update(self, instance, validated_data):
        post = instance
        tags = self.validated_data.get('tags', [])
        # Remove tags from validated_data
        if tags:
            del validated_data['tags']
        # Set the values from validated_data to the instance and save
        for attr, value in validated_data.items():
            setattr(post, attr, value)
        post.save()
        # Only update the tags if tag is supplied
        if tags:
            self.get_or_create_and_assign_tags(post, tags)
        return post
