from django.db import models
from django.utils.translation import gettext_lazy as _
from vendors.models import Vendor
from datetime import datetime



class Product(models.Model):
    """
    Model representing a digital product.

    Attributes:
        name (str): The name of the product.
        description (str): A detailed description of the product.
        price (float): The price of the product.
        category (ProductCategory): The category of the product (Software, Ebook, etc.).
        vendor (Vendor): The vendor who sells this product.
        created_at (datetime): Timestamp when the product was created.
        updated_at (datetime): Timestamp when the product was last updated.
        is_active (bool): A boolean indicating whether the product is active or not.
        file (FileField): The file associated with the product (e.g., digital download).
        image (ImageField): An optional image for product preview.
    """

    class ProductCategory(models.TextChoices):
        SOFTWARE = "Software", _("Software")
        EBOOK = "Ebook", _("Ebook")
        COURSE = "Course", _("Course")
        MUSIC = "Music", _("Music")
        OTHER = "Other", _("Other")

    name: str = models.CharField(max_length=255)
    description: str = models.TextField()
    price: float = models.DecimalField(max_digits=10, decimal_places=2)
    category: ProductCategory = models.CharField(
        max_length=10, choices=ProductCategory.choices, default=ProductCategory.OTHER
    )
    vendor: Vendor = models.ForeignKey(
        Vendor, related_name="products", on_delete=models.CASCADE
    )
    created_at: datetime = models.DateTimeField(auto_now_add=True)
    updated_at: datetime = models.DateTimeField(auto_now=True)
    is_active: bool = models.BooleanField(default=True)
    file: models.FileField = models.FileField(
        upload_to="products/%Y/%m/%d/",
        null=True,
        blank=True,
        max_length=512,  # Increase max_length
    )
    image: models.ImageField = models.ImageField(
        upload_to="product_images/",
        null=True,
        blank=True,
        max_length=512,  # Increase max_length
    )

    def __str__(self) -> str:
        """
        Returns the string representation of the product.

        Returns:
            str: The name of the product.
        """
        return self.name
