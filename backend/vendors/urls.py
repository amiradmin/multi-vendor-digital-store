from django.urls import path
from .views import VendorListView, VendorDetailView, VendorRegisterView

urlpatterns = [
    path('list/', VendorListView.as_view(), name='vendor-list'),
    path('<int:pk>/', VendorDetailView.as_view(), name='vendor-detail'),
    path('register/', VendorRegisterView.as_view(), name='vendor-register'),
]
