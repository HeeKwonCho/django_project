# Generated by Django 4.1 on 2024-09-24 03:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("lecture", "0003_categories_created_at_categories_updated_at_and_more"),
    ]

    operations = [
        migrations.DeleteModel(
            name="LectureComments",
        ),
    ]
