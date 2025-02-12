"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "../../../utils/api";

interface Vendor {
  id: number;
  store_name: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  vendor: Vendor;
}

export default function ProductDetail() {
  const [product, setProduct] = useState<Product | null>(null);
  const [cartMessage, setCartMessage] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      api
        .get(`/products/${id}`)
        .then((response) => setProduct(response.data))
        .catch((error) => console.error("Error fetching product details:", error));
    }
  }, [id]);

  const addToCart = () => {
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if the product is already in the cart
    const existingProduct = cart.find((item: Product) => item.id === product.id);

    if (existingProduct) {
      setCartMessage("This product is already in your cart.");
      return;
    }

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    setCartMessage("Product added to cart successfully!");

    setTimeout(() => setCartMessage(null), 3000); // Hide message after 3 seconds
  };

  if (!product) {
    return <div className="text-center py-10 text-lg text-gray-500">Loading product details...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-96 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold text-indigo-600 mb-2">${product.price}</p>
          <div className="flex justify-between text-gray-600 text-sm mb-4">
            <span className="bg-gray-200 px-3 py-1 rounded-full">Category: {product.category}</span>
            <span className="bg-gray-200 px-3 py-1 rounded-full">Vendor: {product.vendor.store_name}</span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={addToCart}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Add to Cart 🛒
          </button>

          {/* Success/Error Message */}
          {cartMessage && (
            <p className="mt-3 text-center text-green-600 font-semibold">{cartMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}
