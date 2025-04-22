import React from "react";

export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-6 py-2 rounded-full font-medium bg-[#029FA4] text-white hover:bg-[#145A7E] transition duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
