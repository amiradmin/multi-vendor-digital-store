from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from django.utils.html import format_html
from typing import Optional

User = get_user_model()


class CustomUserAdmin(UserAdmin):
    """
    Custom User Admin to display additional fields for the custom user model in the admin interface.
    """

    model = User
    list_display = [
        "username",
        "email",
        "avatar_display",
        "address",
        "phone_number",
        "is_staff",
        "is_active",
        "date_joined",
    ]
    list_filter = ["is_staff", "is_active"]
    search_fields = ["username", "email", "address", "phone_number"]
    ordering = ["date_joined"]

    fieldsets = UserAdmin.fieldsets + (
        (
            None,
            {"fields": ("avatar", "address", "phone_number")},
        ),  # Adding avatar, address, and phone number
    )

    def avatar_display(self, obj: User) -> str:
        """Display avatar as an image in the admin panel.

        Args:
            obj (User): The user instance to display the avatar for.

        Returns:
            str: HTML string for displaying the avatar image or a "No Avatar" message.
        """
        if obj.avatar:
            return format_html(
                f'<img src="{obj.avatar.url}" width="50" height="50" style="border-radius: 50%;" />'
            )
        return "No Avatar"

    avatar_display.short_description = "Avatar"


admin.site.register(User, CustomUserAdmin)
