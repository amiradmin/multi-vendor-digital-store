# Generated by Django 5.1.5 on 2025-02-09 14:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("products", "0003_product_file_product_image"),
    ]

    operations = [
        migrations.AlterField(
            model_name="product",
            name="file",
            field=models.FileField(
                blank=True, max_length=512, null=True, upload_to="products/%Y/%m/%d/"
            ),
        ),
        migrations.AlterField(
            model_name="product",
            name="image",
            field=models.ImageField(
                blank=True, max_length=512, null=True, upload_to="product_images/"
            ),
        ),
    ]
