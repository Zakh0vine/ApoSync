import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = ({ onSidebarToggle }) => {
  return (
    <nav className="w-full bg-white shadow-md fixed z-10">
      <div className="max-w-full mx-auto flex justify-between md:justify-end items-center py-5 px-4 md:px-10 md:py-8">
        {/* Hamburger menu for mobile */}
        <button onClick={onSidebarToggle} className="md:hidden block text-2xl">
          <GiHamburgerMenu />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
