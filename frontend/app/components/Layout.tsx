import React from "react";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <Link href="/home">
            <span className="text-white text-xl font-semibold">Digital Marketplace</span>
          </Link>
          <ul className="flex space-x-4">
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
