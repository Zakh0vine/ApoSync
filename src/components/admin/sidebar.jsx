import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineInput } from "react-icons/md";
import { LuAirplay, LuChartColumnBig } from "react-icons/lu";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { RiHistoryLine } from "react-icons/ri";

import Logo from "@/assets/logo.png";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    {
      to: "/dashboard",
      icon: <LuAirplay className="size-6" />,
      label: "Dashboard",
    },
    {
      to: "/notifikasi",
      icon: <IoMdNotificationsOutline className="size-6" />,
      label: "Notifikasi",
    },
    {
      to: "/produk",
      icon: <MdOutlineInput className="size-6" />,
      label: "Produk",
    },
    {
      to: "/riwayat",
      icon: <RiHistoryLine className="size-6" />,
      label: "Riwayat",
    },
    {
      to: "/laporan",
      icon: <LuChartColumnBig className="size-6" />,
      label: "Laporan",
    },
    {
      to: "/user-manajemen",
      icon: <LuAirplay className="size-6" />,
      label: "User manajemen",
    },
    { to: "/masuk", icon: <BiLogOut className="size-6" />, label: "Keluar" },
  ];

  return (
    <div
      className={`
        bg-white shadow-md h-full fixed top-0 left-0 z-40 transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 transition-transform duration-300 w-60
      `}
    >
      <div className="p-6 relative">
        {/* Close button mobile */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl md:hidden"
        >
          ×
        </button>

        <img src={Logo} alt="Logo" className="h-20 w-20 mb-8 mx-auto" />

        <ul className="space-y-6">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.to;
            return (
              <li key={index}>
                <Link
                  to={item.to}
                  className={`flex items-center gap-2 ${
                    isActive
                      ? "text-[#6499E9] text-lg font-semibold"
                      : "text-black text-lg"
                  }`}
                >
                  {item.icon} {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
