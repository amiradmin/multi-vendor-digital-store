from django.urls import path
from .views import (VendorListView, VendorDetailView, VendorRegisterView,VendorOrdersView,
                    VendorProductsView,VendorEarningsView)

urlpatterns = [
    path('list/', VendorListView.as_view(), name='vendor-list'),
    path('<int:pk>/', VendorDetailView.as_view(), name='vendor-detail'),
    path('register/', VendorRegisterView.as_view(), name='vendor-register'),
    path('orders/', VendorOrdersView.as_view(), name='vendor-orders'),
    path("products/", VendorProductsView.as_view(), name="vendor-products"),
    path("earnings/", VendorEarningsView.as_view(), name="vendor-earnings"),
]
