# accounts/models.py
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    """
    Custom user model that extends the default AbstractUser model to include
    a boolean field 'is_vendor' which indicates whether a user is a vendor.

    Attributes:
        is_vendor (bool): A flag indicating if the user is a vendor (default is False).
    """
    is_vendor: bool = models.BooleanField(default=False)
    address = models.CharField(max_length=255, blank=True, null=True)
    phone_number = PhoneNumberField(blank=True, null=True)

    def __str__(self) -> str:
        """
        String representation of the User model. Returns the username.

        Returns:
            str: The username of the user.
        """
        return self.username