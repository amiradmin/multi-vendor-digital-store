from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.templatetags.static import static
from typing import Dict, Any, Optional

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the User model with avatar URL"""

    avatar_url = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id", "username", "email", "avatar_url", "address", "phone_number"]

    def get_avatar_url(self, obj: User) -> str:
        """
        Custom method to return the full URL for the avatar image.

        If the user doesn't have an avatar, return a default image URL.

        Args:
            obj (User): The user instance to get the avatar for.

        Returns:
            str: The full URL for the user's avatar or a default avatar.
        """
        if obj.avatar:
            return obj.avatar.url
        return static("images/avatar.png")  # Provide a path to a default avatar image


class UserRegistrationSerializer(serializers.ModelSerializer):
    """Serializer for user registration"""

    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "password",
            "is_vendor",
            "address",
            "phone_number",
        ]

    def create(self, validated_data: Dict[str, Any]) -> User:
        """
        Create and return a new user.

        Args:
            validated_data (Dict[str, Any]): The validated data for user creation.

        Returns:
            User: The created user instance.
        """
        user = User.objects.create_user(**validated_data)
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Customize JWT response to include user details"""

    def validate(self, attrs: Dict[str, Any]) -> Dict[str, Any]:
        """
        Validate the JWT token and include user details in the response.

        Args:
            attrs (Dict[str, Any]): The input attributes (usually the username and password).

        Returns:
            Dict[str, Any]: The validated data, including the token and user details.
        """
        data = super().validate(attrs)
        user = self.user
        data["user"] = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "is_vendor": user.is_vendor,
            "address": user.address,
            "phone_number": str(user.phone_number) if user.phone_number else None,
        }
        return data
