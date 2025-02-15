from rest_framework import serializers
from .models import Vendor


class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = [
            "id",
            "user",
            "store_name",
            "bio",
            "logo",
            "website_url",
            "created_at",
        ]
