import React, { useState, useEffect } from "react";
import { Button } from "@/components/Button";
import Logo from "@/assets/logo.png";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("beranda");
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1200);
  const menuItems = [
    { name: "Beranda", link: "#beranda" },
    { name: "Layanan", link: "#layanan" },
    { name: "Tentang Apotek", link: "#tentang" },
    { name: "Informasi", link: "#informasi" },
  ];
  const whatsappNumber = "628112892070";
  const whatsappMessage =
    "Halo, saya ingin menanyakan layanan konsultasi gratis dengan Dr. Mey Dian Intan Sari. Apakah saya bisa mendapatkan informasi lebih lanjut mengenai konsultasi dokter/USG/khitan? Terimakasih.";

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      setActiveMenu(hash || "beranda");
    };

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1200);
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("resize", handleResize);
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="shadow-md bg-white z-50 fixed w-full">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center p-4 sm:px-10 lg:px-32">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <a href="#beranda">
            <img src={Logo} alt="Logo" className="h-14 w-h-14" />
          </a>
        </div>

        {/* Menu Desktop */}
        <ul
          className={`hidden lg:flex ${
            isSmallScreen ? "space-x-1" : "space-x-14"
          } text-[#145A7E] font-bold text-xl`}
        >
          {menuItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.link}
                className={`${
                  activeMenu === item.link.substring(1)
                    ? "bg-[#145A7E] text-white"
                    : "hover:bg-gray-200"
                } px-3 py-2 rounded-xl`}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Button Contact */}
        <div className="hidden lg:block">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button className="font-medium text-xl">Contact Us</Button>
          </a>
        </div>

        {/* Hamburger Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-3xl text-[#04364A]"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white px-4 py-6 absolute w-full top-20 left-0 shadow-md z-10">
          <ul className="flex flex-col space-y-6 text-[#04364A] font-bold text-xl text-center">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.link}
                  onClick={() => setIsOpen(false)}
                  className={`${
                    activeMenu === item.link.substring(1)
                      ? "bg-[#145A7E] text-white"
                      : "hover:bg-gray-200"
                  } px-3 py-2 rounded`}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="text-center mt-4">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button className="font-medium text-xl">Contact Us</Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
