from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from typing import Optional


class UserManager(BaseUserManager):
    """
    Custom manager for the User model to handle user creation.
    """

    def create_user(
            self, username: str, email: str, password: Optional[str] = None, **extra_fields
    ) -> AbstractUser:
        """
        Creates and returns a regular user with an email, username, and password.

        Args:
            username (str): The username for the user.
            email (str): The email address of the user.
            password (Optional[str]): The password for the user (default is None).
            **extra_fields: Additional fields to be passed for creating the user.

        Raises:
            ValueError: If the email is not provided.

        Returns:
            AbstractUser: The created user instance.
        """
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(
            self, username: str, email: str, password: Optional[str] = None, **extra_fields
    ) -> AbstractUser:
        """
        Creates and returns a superuser with the given email, username, and password.

        Args:
            username (str): The username for the superuser.
            email (str): The email address of the superuser.
            password (Optional[str]): The password for the superuser (default is None).
            **extra_fields: Additional fields for creating the superuser.

        Raises:
            ValueError: If 'is_staff' or 'is_superuser' is not set to True.

        Returns:
            AbstractUser: The created superuser instance.
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(username, email, password, **extra_fields)


class User(AbstractUser):
    """
    Custom user model that extends the default AbstractUser model
    to include additional fields such as `is_vendor`, `address`, `phone_number`, and `avatar`.
    """

    email = models.EmailField(unique=True)
    is_vendor = models.BooleanField(default=False)
    address = models.CharField(max_length=255, blank=True, null=True)
    phone_number = PhoneNumberField(blank=True, null=True)
    avatar = models.ImageField(
        upload_to="avatars/", blank=True, null=True
    )  # Avatar field

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self) -> str:
        """
        String representation of the User model. Returns the username.

        Returns:
            str: The username of the user.
        """
        return self.username
