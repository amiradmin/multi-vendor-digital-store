"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Use useParams instead of useRouter
import api from "../../../utils/api"; // Adjust path as necessary

interface Vendor {
  id: number;
  store_name: string; // Assuming the vendor has a 'store_name' field
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string; // Adding description
  category: string; // Adding category
  vendor: Vendor; // Adding vendor info
}

export default function ProductDetail() {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams(); // Use useParams to get the dynamic route parameter

  useEffect(() => {
    if (id) {
      api.get(`/products/${id}`) // Use id directly from the dynamic route
        .then((response) => setProduct(response.data))
        .catch((error) => console.error("Error fetching product details:", error));
    }
  }, [id]); // Ensure to run when id is updated

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center py-6">{product.name}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <div>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-gray-700">${product.price}</p>
          <p className="text-sm text-gray-500">Category: {product.category}</p>
          <p className="text-sm text-gray-500">Vendor: {product.vendor.store_name}</p>
        </div>
      </div>
    </div>
  );
}
