from rest_framework import generics, permissions
from .models import Product
from .serializers import ProductSerializer
from vendors.models import Vendor
from rest_framework.response import Response


class ProductListView(generics.ListAPIView):
    """
    API view to list all products.

    This view provides a list of all available products in the system.
    Accessible to everyone (no authentication required).
    """

    queryset: Product = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]


class ProductDetailView(generics.RetrieveAPIView):
    """
    API view to retrieve product details.

    This view retrieves detailed information about a specific product.
    Accessible to everyone (no authentication required).
    """

    queryset: Product = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]


class ProductCreateView(generics.CreateAPIView):
    """
    API view for vendors to create a product.

    This view allows authenticated vendors to create new products.
    The vendor creating the product must be authenticated.
    """

    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer) -> None:
        """
        Overriding the default create method to assign the vendor to the product.

        Args:
            serializer (ProductSerializer): The product serializer.
        """
        vendor: Vendor = Vendor.objects.get(user=self.request.user)
        serializer.save(vendor=vendor)


class ProductUpdateView(generics.UpdateAPIView):
    """
    API view to update a product.

    This view allows an authenticated vendor to update their own products.
    Only products belonging to the authenticated vendor can be updated.
    """

    queryset: Product = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self) -> Product:
        """
        Filter the products by the vendor who is the owner.

        Returns:
            Product: A queryset filtered by the authenticated user's vendor.
        """
        return Product.objects.filter(vendor__user=self.request.user)


class ProductDeleteView(generics.DestroyAPIView):
    """
    API view to delete a product.

    This view allows an authenticated vendor to delete their own products.
    Only products belonging to the authenticated vendor can be deleted.
    """

    queryset: Product = Product.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self) -> Product:
        """
        Filter the products by the vendor who is the owner.

        Returns:
            Product: A queryset filtered by the authenticated user's vendor.
        """
        return Product.objects.filter(vendor__user=self.request.user)
