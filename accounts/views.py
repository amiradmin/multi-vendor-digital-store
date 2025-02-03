from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import get_user_model
from rest_framework.exceptions import NotAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .serializers import UserSerializer, UserRegistrationSerializer, CustomTokenObtainPairSerializer

User = get_user_model()


class UserRegistrationView(generics.CreateAPIView):
    """API view for user registration"""
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]


class CustomTokenObtainPairView(TokenObtainPairView):
    """Override the default JWT login view to return user details"""
    serializer_class = CustomTokenObtainPairSerializer


class UserProfileView(generics.RetrieveAPIView):
    """API view to get user details"""
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]  # Ensure that the user is authenticated

    def get_object(self):
        user = self.request.user
        if user.is_authenticated:
            return user
        else:
            raise NotAuthenticated("You must be logged in to view your profile.")
