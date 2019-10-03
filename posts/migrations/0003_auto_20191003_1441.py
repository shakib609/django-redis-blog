# Generated by Django 2.2.6 on 2019-10-03 14:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('posts', '0002_comment'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='comment',
            options={'default_related_name': 'comments', 'get_latest_by': '-created_at', 'ordering': ['-created_at']},
        ),
        migrations.AlterModelOptions(
            name='post',
            options={'default_related_name': 'posts', 'get_latest_by': '-created_at', 'ordering': ['-created_at', 'title']},
        ),
        migrations.AlterModelOptions(
            name='tag',
            options={'default_related_name': 'tags', 'ordering': ['name']},
        ),
        migrations.AddField(
            model_name='comment',
            name='author',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='comments', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='comment',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
