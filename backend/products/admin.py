from django.contrib import admin
from .models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    """
    Admin interface for managing Product models.

    Attributes:
        list_display: Columns to be displayed in the admin list view.
        search_fields: Fields to search by in the admin panel.
    """

    list_display = ('name', 'price', 'category', 'vendor', 'created_at', 'is_active')
    search_fields = ('name', 'description', 'vendor__store_name')