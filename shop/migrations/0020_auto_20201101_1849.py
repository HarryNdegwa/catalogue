# Generated by Django 3.0 on 2020-11-01 15:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0019_contact'),
    ]

    operations = [
        migrations.RenameField(
            model_name='contact',
            old_name='subject',
            new_name='name',
        ),
        migrations.AddField(
            model_name='contact',
            name='email',
            field=models.EmailField(default='', max_length=256),
            preserve_default=False,
        ),
    ]
