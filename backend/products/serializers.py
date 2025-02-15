from rest_framework import serializers
from products.models import Product


class ProductSerializer(serializers.ModelSerializer):
    """
    Serializer for the Product model.

    Serializes the product data for API responses and validates input data.
    Returns full URLs for the file and image fields.
    """

    file = serializers.FileField(use_url=True, required=False)
    image = serializers.ImageField(use_url=True, required=False)

    class Meta:
        model = Product  # No need for type hint here
        fields = [
            "id",
            "vendor",
            "name",
            "description",
            "price",
            "image",  # Full URL for image
            "file",  # Full URL for file
            "created_at",
        ]
