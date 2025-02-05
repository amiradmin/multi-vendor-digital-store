import React from "react";

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

// Export components
export { Menu, MenuItem };