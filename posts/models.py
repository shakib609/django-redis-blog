from django.db import models
from django.contrib.auth import get_user_model


class Post(models.Model):
    title = models.CharField(max_length=256)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name='posts',
    )

    def __str__(self):
        return f'{self.title[:15]} - {self.author}'


class Tag(models.Model):
    name = models.CharField(max_length=32)
    posts = models.ManyToManyField(
        Post,
        related_name='tags',
    )

    def __str__(self):
        return self.name


class Comment(models.Model):
    content = models.TextField()
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name='comments',
    )

    def __str__(self):
        return f'{self.content[:64]} - #PID({self.post.id})'
