# Generated by Django 4.1.7 on 2023-05-14 10:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_products_options_alter_wishlist_options_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='products',
            name='entry_price',
            field=models.BigIntegerField(default=1000000),
            preserve_default=False,
        ),
    ]