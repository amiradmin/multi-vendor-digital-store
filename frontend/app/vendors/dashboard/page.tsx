"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { FiPackage, FiDollarSign, FiSettings } from "react-icons/fi";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: { "Content-Type": "application/json" },
});

const VendorDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [earnings, setEarnings] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) return;

    const fetchData = async () => {
      try {

        const [ordersRes, productsRes, earningsRes] = await Promise.all([
          api.get("/vendors/orders/", { headers: { Authorization: `Bearer ${token}` } }),
          api.get("/vendors/products/", { headers: { Authorization: `Bearer ${token}` } }),
          api.get("/vendors/earnings/", { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        console.log("Orders Response:", ordersRes.data);  // Debugging

        setOrders(ordersRes.data.orders || ordersRes.data);  // Ensure correct structure
        setProducts(productsRes.data);
        setEarnings(earningsRes.data.total);
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Vendor Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-500 text-white rounded-lg flex items-center">
          <FiPackage className="text-3xl mr-3" />
          <div>
            <p className="text-lg font-semibold">Orders</p>
            <p>{orders.length}</p>
          </div>
        </div>
        <div className="p-4 bg-green-500 text-white rounded-lg flex items-center">
          <FiDollarSign className="text-3xl mr-3" />
          <div>
            <p className="text-lg font-semibold">Earnings</p>
            <p>${earnings}</p>
          </div>
        </div>
        <div className="p-4 bg-gray-500 text-white rounded-lg flex items-center">
          <FiSettings className="text-3xl mr-3" />
          <div>
            <p className="text-lg font-semibold">Products</p>
            <p>{products.length}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Manage Products</h2>
        <Link href="/products/new" className="text-blue-500">+ Add New Product</Link>
        <ul className="mt-2">
          {products.map((product) => (
            <li key={product.id} className="p-2 border-b">{product.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VendorDashboard;
