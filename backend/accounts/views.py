from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import get_user_model
from rest_framework.exceptions import NotAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import (
    UserSerializer,
    UserRegistrationSerializer,
    CustomTokenObtainPairSerializer,
)

User = get_user_model()


class UserRegistrationView(generics.CreateAPIView):
    """
    API view for user registration.

    This view allows new users to register by providing the necessary
    information (username, email, password, etc.) through the UserRegistrationSerializer.
    """

    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer) -> None:
        """
        Perform the actual user creation when the registration request is made.

        Args:
            serializer (UserRegistrationSerializer): The serializer used to validate and create the user.
        """
        serializer.save()


class CustomTokenObtainPairView(TokenObtainPairView):
    """
    Override the default JWT login view to return user details along with the token.

    This view uses the CustomTokenObtainPairSerializer to return additional user information
    alongside the JWT access and refresh tokens upon successful authentication.
    """

    serializer_class = CustomTokenObtainPairSerializer


class UserProfileView(generics.RetrieveAPIView):
    """
    API view to retrieve the authenticated user's profile details.

    This view retrieves the details of the currently authenticated user, ensuring that
    the user is logged in before fetching the information.

    Raises:
        NotAuthenticated: If the user is not authenticated.
    """

    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]  # Ensure that the user is authenticated

    def get_object(self) -> User:
        """
        Get the authenticated user instance.

        If the user is authenticated, it returns the user object. Otherwise, it raises
        a NotAuthenticated exception.

        Returns:
            User: The authenticated user instance.

        Raises:
            NotAuthenticated: If the user is not logged in.
        """
        user = self.request.user
        if user.is_authenticated:
            return user
        else:
            raise NotAuthenticated("You must be logged in to view your profile.")
