from django.contrib import admin
from .models import Vendor


@admin.register(Vendor)
class VendorAdmin(admin.ModelAdmin):
    """
    Admin interface for managing Vendor models.

    Attributes:
        list_display: Columns to be displayed in the admin list view.
        search_fields: Fields to search by in the admin panel.
    """

    list_display = ('store_name', 'user', 'website_url', 'created_at')
    search_fields = ('store_name', 'user__username')