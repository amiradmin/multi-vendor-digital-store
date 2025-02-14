"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { Menu, MenuItem } from "./ui/menu";
import Avatar from "./ui/avatar";
import { FiShoppingCart } from "react-icons/fi";

// Axios instance for API requests
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Base API URL
  headers: {
    "Content-Type": "application/json",
  },
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [cartItemCount, setCartItemCount] = useState<number>(0);

  // Mock userData for testing purposes
  const userData = { avatar_url: "/static/images/avatar.png" };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchCartCount = async () => {
      const token = localStorage.getItem("access_token"); // Get token from localStorage
      if (!token) {
        console.warn("No token found in localStorage.");
        return;
      }

      try {
        const response = await api.get("/orders/count/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Cart API Response:", response.data); // Debugging log

        if (response.data && typeof response.data.count === "number") {
          setCartItemCount(response.data.count);
        } else {
          console.error("Unexpected API response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching cart count:", error);
        setCartItemCount(0);
      }
    };

    fetchCartCount();
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("access_token"); // Remove token
    window.location.href = "/auth/login"; // Redirect to login page
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <span className="text-white text-xl font-semibold">Digital Marketplace</span>
          </Link>

          <ul className="flex space-x-4 items-center">
            {/* Cart Icon */}
            <li className="relative">
              <Link href="/cart">
                <FiShoppingCart className="text-white text-2xl" />
                {/* Cart Badge */}
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </li>

            {/* Avatar Dropdown */}
            <li className="relative">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                <Avatar
                  className="w-10 h-10 cursor-pointer"
                  src={userData.avatar_url ? `http://127.0.0.1:8000${userData.avatar_url}` : "http://127.0.0.1:8000/static/images/avatar.png"}
                  alt="User Avatar"
                />
              </button>

              {menuOpen && (
                <Menu className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md">
                  <MenuItem>
                    <Link href="/auth/profile">Profile</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link href="/orders">My Orders</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link href="/products/new">Add Product</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link href="/vendors/register">Add Vendor</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link href="/dashboard">Dashboard</Link>
                  </MenuItem>
                  <MenuItem>
                    <button onClick={handleLogout}>Logout</button>
                  </MenuItem>
                </Menu>
              )}
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-gray-800 p-4 text-center text-white">
        &copy; 2025 Digital Marketplace
      </footer>
    </div>
  );
};

export default Layout;
