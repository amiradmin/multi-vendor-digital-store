import React from "react";

interface AvatarProps {
  src: string;
  alt?: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt = "User Avatar", className }) => {
  return (
    <img
      className={`w-10 h-10 rounded-full border border-gray-300 ${className}`}
      src={src}
      alt={alt}
    />
  );
};

// Export component
export default Avatar;