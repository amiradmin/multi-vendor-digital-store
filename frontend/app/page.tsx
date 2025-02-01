"use client";

import { useEffect, useState } from "react";
import api from "./utils/api";

interface Product {
  id: number;
  name: string;
  price: number;
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
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-700">${product.price}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No products available.</p>
        )}
      </div>
    </div>
  );
}
