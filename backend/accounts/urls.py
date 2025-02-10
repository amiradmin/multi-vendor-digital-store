from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import UserRegistrationView, CustomTokenObtainPairView, UserProfileView

urlpatterns = [
    path("register/", UserRegistrationView.as_view(), name="register"),
    path("login/", CustomTokenObtainPairView.as_view(), name="login"),  # JWT Login
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),  # Refresh Token
    path("profile/", UserProfileView.as_view(), name="profile"),  # User Profile
]