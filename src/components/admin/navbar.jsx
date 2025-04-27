import React from "react";
import { IoMdNotificationsOutline } from "react-icons/io";

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-end items-center py-4 px-6">
        <div className="flex gap-4 items-center">
          <button className="relative">
            <IoMdNotificationsOutline className="size-6" />
          </button>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
