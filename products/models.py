from django.db import models
from django.contrib.auth.models import User
from vendors.models import Vendor
from django.utils.translation import gettext_lazy as _


class Product(models.Model):
    """
    Model representing a digital product.

    Attributes:
        name: The name of the product.
        description: A detailed description of the product.
        price: The price of the product.
        category: The category of the product (Software, Ebook, etc.).
        vendor: The vendor who sells this product.
        created_at: Timestamp when the product was created.
        updated_at: Timestamp when the product was last updated.
        is_active: A boolean indicating whether the product is active or not.
        file: The file associated with the product (e.g., digital download).
    """

    class ProductCategory(models.TextChoices):
        SOFTWARE = 'Software', _('Software')
        EBOOK = 'Ebook', _('Ebook')
        COURSE = 'Course', _('Course')
        MUSIC = 'Music', _('Music')
        OTHER = 'Other', _('Other')

    name: str = models.CharField(max_length=255)
    description: str = models.TextField()
    price: float = models.DecimalField(max_digits=10, decimal_places=2)
    category: str = models.CharField(
        max_length=10,
        choices=ProductCategory.choices,
        default=ProductCategory.OTHER,
    )
    vendor: Vendor = models.ForeignKey(Vendor, related_name="products", on_delete=models.CASCADE)
    created_at: str = models.DateTimeField(auto_now_add=True)
    updated_at: str = models.DateTimeField(auto_now=True)
    is_active: bool = models.BooleanField(default=True)
    file: models.FileField(upload_to='products/%Y/%m/%d/', null=True, blank=True)  # New FileField added



