from rest_framework import serializers
from .models import Vendor

class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = ['id', 'user', 'store_name', 'created_at']