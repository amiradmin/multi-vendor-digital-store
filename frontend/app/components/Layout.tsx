"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, MenuItem } from "./ui/menu";
import Avatar from "./ui/avatar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Mock userData for testing purposes
  const userData = { avatar_url: "/static/images/avatar.png" }; // Replace with real user data fetching logic

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <Link href="/home">
            <span className="text-white text-xl font-semibold">Digital Marketplace</span>
          </Link>
          <ul className="flex space-x-4 items-center">
            <li>
              <Link href="/home">
                <span className="text-white">Home</span>
              </Link>
            </li>
            <li>
              <Link href="/product/1">
                <span className="text-white">Product</span>
              </Link>
            </li>
            <li>
              <Link href="/cart">
                <span className="text-white">Cart</span>
              </Link>
            </li>
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
                    <button onClick={() => console.log("Logout")}>Logout</button>
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
