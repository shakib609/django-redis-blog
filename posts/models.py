from django.db import models
from django.contrib.auth import get_user_model


class Post(models.Model):
    title = models.CharField(max_length=256)
    content = models.TextField()
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
    name = models.CharField(max_length=32)
    posts = models.ManyToManyField(
        Post,
        related_name='tags',
    )

    class Meta:
        ordering = ['name']
        default_related_name = 'tags'

    def __str__(self):
        return self.name


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
