# Generated by Django 4.1.7 on 2023-05-15 17:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='ship_address',
            field=models.CharField(default='Vinh Phuc', max_length=1000),
            preserve_default=False,
        ),
    ]