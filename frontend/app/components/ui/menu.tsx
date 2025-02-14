// ui/menu.tsx
import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import Link from "next/link"; // Link for navigation

// Menu Component
interface MenuProps {
  children: React.ReactNode;
  className?: string;
}

const Menu: React.FC<MenuProps> = ({ children, className }) => {
  return (
    <div className={`bg-white shadow-md rounded-md p-2 ${className}`}>
      {children}
    </div>
  );
};

// MenuItem Component
interface MenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ children, onClick }) => {
  return (
    <div
      className="px-4 py-2 cursor-pointer hover:bg-gray-200 rounded"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// Navbar Component with Cart Icon
const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      {/* Logo or Store Name */}
      <div className="text-xl font-bold">
        <Link href="/">Digital Marketplace</Link>
      </div>

      {/* Menu Items */}
      <div className="flex space-x-6">
        <Menu>
          <MenuItem>
            <Link href="/home">Home</Link>
          </MenuItem>
          <MenuItem>
            <Link href="/products">Products</Link>
          </MenuItem>
          <MenuItem>
            <Link href="/about">About</Link>
          </MenuItem>
        </Menu>
      </div>

      {/* Cart Icon with Badge */}
      <div className="flex items-center space-x-4">
        <Link href="/cart" className="relative">
          <FiShoppingCart className="text-2xl" />
          {/* Badge displaying number of items in the cart */}
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
            3
          </span>
        </Link>
      </div>
    </nav>
  );
};

// Export components
export { Menu, MenuItem, Navbar };
