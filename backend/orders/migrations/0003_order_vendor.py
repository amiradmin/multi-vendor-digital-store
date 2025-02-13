# Generated by Django 5.1.6 on 2025-02-14 11:25

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0002_remove_order_product_remove_order_quantity_orderitem'),
        ('vendors', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='vendor',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='orders', to='vendors.vendor'),
            preserve_default=False,
        ),
    ]
