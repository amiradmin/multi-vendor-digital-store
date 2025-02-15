# Generated by Django 5.1.5 on 2025-02-09 13:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("products", "0002_auto_20250130_1521"),
    ]

    operations = [
        migrations.AddField(
            model_name="product",
            name="file",
            field=models.FileField(
                blank=True, null=True, upload_to="products/%Y/%m/%d/"
            ),
        ),
        migrations.AddField(
            model_name="product",
            name="image",
            field=models.ImageField(blank=True, null=True, upload_to="product_images/"),
        ),
    ]
