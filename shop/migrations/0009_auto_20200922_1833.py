# Generated by Django 3.0 on 2020-09-22 15:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0008_auto_20200922_1829'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='sold',
            field=models.IntegerField(blank=True, default=0),
        ),
    ]
