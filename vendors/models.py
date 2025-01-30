from django.db import models
from django.conf import settings


class Vendor(models.Model):
    """
    Model representing a vendor who sells digital products.

    Attributes:
        user: The user account associated with the vendor.
        store_name: The name of the vendor's store.
        bio: A description of the vendor.
        logo: An optional image of the vendor's logo.
        website_url: The URL of the vendor's website.
        created_at: Timestamp when the vendor was created.
    """

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    store_name = models.CharField(max_length=255)
    bio = models.TextField()
    logo = models.ImageField(upload_to='vendors/logos/', blank=True, null=True)
    website_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        """
        String representation of the vendor.

        Returns:
            str: The name of the store.
        """
        return self.store_name