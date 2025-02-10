from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.templatetags.static import static


User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the User model"""

    avatar_url = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'avatar_url', 'address', 'phone_number']

    def get_avatar_url(self, obj):
        """
        Custom method to return the full URL for the avatar image.
        If the user doesn't have an avatar, return a default image URL.
        """
        if obj.avatar:
            return obj.avatar.url
        return static('images/avatar.png')  # Provide a path to a default avatar image


class UserRegistrationSerializer(serializers.ModelSerializer):
    """Serializer for user registration"""

    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ["id", "username", "email", "password", "is_vendor", "address", "phone_number"]

    def create(self, validated_data):
        """Create a new user"""
        user = User.objects.create_user(**validated_data)
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Customize JWT response to include user details"""

    def validate(self, attrs):
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
