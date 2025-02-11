from rest_framework import generics, permissions
from .models import Product
from .serializers import ProductSerializer
from vendors.models import Vendor

class ProductListView(generics.ListAPIView):
    """
    API view to list all products.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]

class ProductDetailView(generics.RetrieveAPIView):
    """
    API view to retrieve product details.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]

class ProductCreateView(generics.CreateAPIView):
    """
    API view for vendors to create a product.
    """
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        vendor = Vendor.objects.get(user=self.request.user)
        serializer.save(vendor=vendor)

class ProductUpdateView(generics.UpdateAPIView):
    """
    API view to update a product.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Product.objects.filter(vendor__user=self.request.user)

class ProductDeleteView(generics.DestroyAPIView):
    """
    API view to delete a product.
    """
    queryset = Product.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Product.objects.filter(vendor__user=self.request.user)

