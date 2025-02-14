"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import api from "./utils/api";

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

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    api.get("/products/list/")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    let filtered = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );

    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [search, selectedCategory, products]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-gray-900">
          Discover Amazing <span className="text-indigo-600">Digital Products!</span>
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          Buy and sell high-quality digital products with ease.
        </p>
      </div>

      {/* Product Grid with Sidebar */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 p-6 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <h3 className="text-lg font-semibold mt-6">Categories</h3>
          <ul className="mt-2 space-y-2 text-gray-700">
            <li
              className={`cursor-pointer hover:text-indigo-600 ${
                selectedCategory === null ? "font-bold text-indigo-600" : ""
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </li>
            <li
              className={`cursor-pointer hover:text-indigo-600 ${
                selectedCategory === "Software" ? "font-bold text-indigo-600" : ""
              }`}
              onClick={() => setSelectedCategory("Software")}
            >
              Software
            </li>
            <li
              className={`cursor-pointer hover:text-indigo-600 ${
                selectedCategory === "E-books" ? "font-bold text-indigo-600" : ""
              }`}
              onClick={() => setSelectedCategory("E-books")}
            >
              E-books
            </li>
            <li
              className={`cursor-pointer hover:text-indigo-600 ${
                selectedCategory === "Graphics" ? "font-bold text-indigo-600" : ""
              }`}
              onClick={() => setSelectedCategory("Graphics")}
            >
              Graphics
            </li>
          </ul>
        </aside>

        {/* Product List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 flex-1">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <Link href={`/products/details/${product.id}`} className="block">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                    <p className="text-indigo-600 font-bold text-lg">${product.price}</p>
                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">{product.description}</p>
                    <div className="mt-3">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {product.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Vendor: <span className="font-medium">{product.vendor.store_name}</span>
                    </p>
                  </div>
                </Link>
                <div className="p-4 border-t flex justify-between">
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                    <FiShoppingCart className="inline-block mr-2" /> Add to Cart
                  </button>
                  <Link
                    href={`/products/details/${product.id}`}
                    className="text-indigo-600 font-medium hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
