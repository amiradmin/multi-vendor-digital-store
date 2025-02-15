from django.db import models
from django.contrib.auth import get_user_model
from products.models import Product  # Assuming you have a Product model
from vendors.models import Vendor  # Assuming you have a Vendor model
from typing import List

User = get_user_model()


class Order(models.Model):
    """
    Represents a customer's order in the system.

    Attributes:
        user (User): The user who placed the order.
        vendor (Vendor): The vendor fulfilling the order.
        total_price (Decimal): The total cost of the order.
        status (str): The current status of the order.
        created_at (datetime): The timestamp when the order was created.
        updated_at (datetime): The timestamp when the order was last updated.
    """

    STATUS_CHOICES: List[tuple[str, str]] = [
        ("pending", "Pending"),
        ("paid", "Paid"),
        ("shipped", "Shipped"),
        ("completed", "Completed"),
        ("canceled", "Canceled"),
    ]

    user: User = models.ForeignKey(User, on_delete=models.CASCADE)
    vendor: Vendor = models.ForeignKey(
        Vendor, related_name="orders", on_delete=models.CASCADE
    )
    total_price: models.DecimalField = models.DecimalField(max_digits=10, decimal_places=2)
    status: str = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    created_at: models.DateTimeField = models.DateTimeField(auto_now_add=True)
    updated_at: models.DateTimeField = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        """
        Returns a string representation of the order.
        """
        return f"Order {self.id} - {self.user.username}"

    def calculate_total_price(self) -> float:
        """
        Calculates and returns the total price of all order items.

        Returns:
            float: The total cost of the order.
        """
        return sum(item.total_price for item in self.items.all())


class OrderItem(models.Model):
    """
    Represents an individual item in an order.

    Attributes:
        order (Order): The associated order.
        product (Product): The product being purchased.
        quantity (int): The number of units purchased.
        total_price (Decimal): The total cost for this order item.
    """

    order: Order = models.ForeignKey(Order, related_name="items", on_delete=models.CASCADE)
    product: Product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity: int = models.PositiveIntegerField(default=1)
    total_price: models.DecimalField = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self) -> str:
        """
        Returns a string representation of the order item.
        """
        return f"{self.product.name} (x{self.quantity})"

    def save(self, *args, **kwargs) -> None:
        """
        Overrides the save method to automatically calculate
        and update the total price before saving the item.
        """
        self.total_price = self.product.price * self.quantity
        super().save(*args, **kwargs)
