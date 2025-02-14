from rest_framework import serializers
from .models import Order, OrderItem
from products.models import Product

class OrderItemSerializer(serializers.ModelSerializer):
    product = serializers.StringRelatedField()  # You can use the product name or a more detailed representation
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        model = OrderItem
        fields = ['product', 'quantity', 'total_price']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(source='items.all', many=True)  # Include the related order items
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Order
        fields = [
            'id',
            'user',
            'items',  # List of order items
            'total_price',
            'status',
            'created_at',
            'updated_at'
        ]

    def to_representation(self, instance):
        # Calculate total_price dynamically based on order items
        representation = super().to_representation(instance)
        total_price = sum(item['total_price'] for item in representation['items'])
        representation['total_price'] = total_price
        return representation
