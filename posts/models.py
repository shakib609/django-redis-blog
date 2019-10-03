from django.db import models
from django.dispatch import receiver
from django.utils.text import slugify
from django.db.models.signals import pre_save
from django.contrib.auth import get_user_model

from uuid import uuid4


class Post(models.Model):
    title = models.CharField(max_length=256)
    content = models.TextField()
    slug = models.SlugField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
    )

    class Meta:
        ordering = ['-created_at', 'title']
        default_related_name = 'posts'
        get_latest_by = '-created_at'

    def __str__(self):
        return f'{self.title[:15]} - {self.author}'


class Tag(models.Model):
    slug = models.SlugField(unique=True)
    posts = models.ManyToManyField(
        Post,
        related_name='tags',
    )

    class Meta:
        ordering = ['slug']
        default_related_name = 'tags'

    def __str__(self):
        return self.slug


class Comment(models.Model):
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
    )
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
    )

    class Meta:
        default_related_name = 'comments'
        ordering = ['-created_at']
        get_latest_by = '-created_at'

    def __str__(self):
        return f'{self.content[:64]} - #PID({self.post.id})'


@receiver(pre_save, sender=Post)
def set_post_slug(sender, instance=None, **kwargs):
    if not instance.slug:
        slug = slugify(instance.title)[:40] + str(uuid4())[:8]
        instance.slug = slug


@receiver(pre_save, sender=Tag)
def set_tag_slug(sender, instance=None, **kwargs):
    slug = slugify(instance.slug)[:40]
    instance.slug = slug
