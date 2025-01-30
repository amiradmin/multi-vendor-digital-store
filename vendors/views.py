from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Vendor
from .serializers import VendorSerializer
from accounts.models import User

class VendorListView(generics.ListAPIView):
    """
    API view to list all vendors.
    """
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer
    permission_classes = [permissions.AllowAny]

class VendorDetailView(generics.RetrieveAPIView):
    """
    API view to retrieve vendor details.
    """
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer
    permission_classes = [permissions.AllowAny]

class VendorRegisterView(APIView):
    """
    API view for users to register as a vendor.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        if user.is_vendor:
            return Response({"error": "You are already a vendor."}, status=400)

        store_name = request.data.get("store_name")
        if not store_name:
            return Response({"error": "Store name is required."}, status=400)

        vendor = Vendor.objects.create(user=user, store_name=store_name)
        user.is_vendor = True
        user.save()

        return Response({"message": "Vendor registered successfully!", "vendor_id": vendor.id})
