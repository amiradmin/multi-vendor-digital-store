from django.contrib import admin
from .models import Order, OrderItem, Product


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "total_price", "status", "created_at")
    list_filter = ("status", "created_at")
    search_fields = ("user__username",)

    # Add a custom method to display the total price for each order
    def total_price(self, obj):
        """
        Calculate and display the total price of the order.
        This method assumes that the `OrderItem` model has a `total_price` field.
        """
        return sum(item.total_price for item in obj.items.all())
    total_price.admin_order_field = 'total_price'  # Allow sorting by total_price
    total_price.short_description = 'Total Price'  # Display name in the admin


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ("order", "product", "quantity", "total_price")
    search_fields = ("order__id", "product__name")


