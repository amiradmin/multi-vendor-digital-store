"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "./utils/api";

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

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.get("/products/list/")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center py-6">Welcome to the Digital Store!</h1>
      <p className="text-lg text-gray-700 text-center mb-6">
        Explore our amazing collection of digital products.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow-md">
              <Link href={`/products/details/${product.id}`}>

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg mb-4"
                  />
                  <h2 className="text-xl font-semibold">{product.name}</h2>
                  <p className="text-gray-700">${product.price}</p>
                  <p className="text-gray-600">{product.description}</p>
                  <p className="text-sm text-gray-500">Category: {product.category}</p>
                  <p className="text-sm text-gray-500">Vendor: {product.vendor.store_name}</p>

              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No products available.</p>
        )}
      </div>
    </div>
  );
}
