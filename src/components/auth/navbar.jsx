import React from "react";
import Logo from "@/assets/logo.png";

export default function Navbar() {
  return (
    <div className="container mx-auto max-w-8xl text">
      <div className="flex justify-between items-center px-6 sm:px-10 md:px-16 py-6 md:py-8">
        {/* Logo kecil pojok kiri */}
        <div className="flex items-center space-x-2">
          <img
            src={Logo}
            alt="Logo"
            className="w-12 h-12 md:w-16 md:h-16 object-contain"
          />
        </div>

        {/* Menu kanan */}
        <div className="space-x-6 sm:space-x-10">
          <div className="text-lg md:text-xl text-[#00A9B4] font-semibold border-b-2 border-[#00A9B4] pb-1">
            Masuk
          </div>
        </div>
      </div>
    </div>
  );
}
