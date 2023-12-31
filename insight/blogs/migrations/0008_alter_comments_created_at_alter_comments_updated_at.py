# Generated by Django 4.2.6 on 2023-11-18 14:57

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('blogs', '0007_comments'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comments',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now, editable=False),
        ),
        migrations.AlterField(
            model_name='comments',
            name='updated_at',
            field=models.DateTimeField(default=django.utils.timezone.now, editable=False),
        ),
    ]
