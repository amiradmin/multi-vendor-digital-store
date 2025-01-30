from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

# If you have a custom user model, you should use it in place of the default User model
User = get_user_model()


class CustomUserAdmin(UserAdmin):
    """
    Custom User Admin to display additional fields for custom user model in the admin interface.
    """
    model = User
    list_display = ['username', 'email', 'is_staff', 'is_active', 'date_joined']
    list_filter = ['is_staff', 'is_active']
    search_fields = ['username', 'email']
    ordering = ['date_joined']

    # You can add custom fieldsets if you have additional fields in the custom user model
    # fieldsets = UserAdmin.fieldsets + (
    #     (None, {'fields': ('custom_field1', 'custom_field2')}),
    # )
    #
    # add_fieldsets = UserAdmin.add_fieldsets + (
    #     (None, {'fields': ('custom_field1', 'custom_field2')}),
    # )


# Register the custom user model with the custom admin interface
admin.site.register(User, CustomUserAdmin)
