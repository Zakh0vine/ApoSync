import React from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = ({ onSidebarToggle }) => {
  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-full mx-auto flex justify-between md:justify-end items-center py-4 px-4 md:px-10">
        {/* Hamburger menu for mobile */}
        <button onClick={onSidebarToggle} className="md:hidden block text-2xl">
          <GiHamburgerMenu />
        </button>

        {/* Right side */}
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
