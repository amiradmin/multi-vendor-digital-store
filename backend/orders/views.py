from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Order, OrderItem
from .serializers import OrderSerializer, OrderItemSerializer
from rest_framework.views import APIView



class CartItemCountView(APIView):
    """
    Endpoint to get the count of items in the user's cart.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # Assuming the cart is an uncompleted order
        order = Order.objects.filter(user=request.user, status='pending').first()

        if not order:
            return Response({"count": 0}, status=status.HTTP_200_OK)

        # Get the count of items in the order
        item_count = OrderItem.objects.filter(order=order).aggregate(total_count=models.Sum('quantity'))[
                         'total_count'] or 0

        return Response({"count": item_count}, status=status.HTTP_200_OK)


class OrderViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing orders.
    """
    queryset = Order.objects.all().order_by('-created_at')
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        """
        Automatically set the user when creating an order.
        """
        order = serializer.save(user=self.request.user)

        # Create OrderItems from the request data and add them to the order
        items_data = self.request.data.get('items', [])
        for item_data in items_data:
            # Extract product id, quantity, and price, then create OrderItem instances
            product_id = item_data['product']
            product = Product.objects.get(id=product_id)
            quantity = item_data['quantity']
            total_price = product.price * quantity
            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=quantity,
                total_price=total_price
            )

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def perform_update(self, serializer):
        """
        Override to update the order items as well when updating an order.
        """
        order = serializer.save()

        # Clear existing order items if the order is updated
        order.items.all().delete()

        # Create new OrderItems based on the updated data
        items_data = self.request.data.get('items', [])
        for item_data in items_data:
            product_id = item_data['product']
            product = Product.objects.get(id=product_id)
            quantity = item_data['quantity']
            total_price = product.price * quantity
            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=quantity,
                total_price=total_price
            )

        return Response(serializer.data, status=status.HTTP_200_OK)
