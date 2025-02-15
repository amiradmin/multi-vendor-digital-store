from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrderViewSet, CartItemCountView

router = DefaultRouter()
router.register(r"orders", OrderViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("count", CartItemCountView.as_view(), name="cart-item-count"),
]
