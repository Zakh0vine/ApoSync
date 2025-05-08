import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = ({ onSidebarToggle }) => {
  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-full mx-auto flex justify-between md:justify-end items-center py-8 px-4 md:px-10">
        {/* Hamburger menu for mobile */}
        <button onClick={onSidebarToggle} className="md:hidden block text-2xl">
          <GiHamburgerMenu />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
