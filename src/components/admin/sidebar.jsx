import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineInput } from "react-icons/md";
import { LuAirplay, LuChartColumnBig } from "react-icons/lu";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { RiHistoryLine } from "react-icons/ri";

import { useToken } from "@/utils/context/tokenContext";
import Logo from "@/assets/logo.png";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, clearTokens } = useToken();

  // Menu items yang tersedia untuk semua user yang sudah login
  const commonMenuItems = [
    {
      to: "/dashboard",
      icon: <LuAirplay className="size-6" />,
      label: "Dashboard",
      roles: ["SUPER_ADMIN", "KARYAWAN"], // tersedia untuk semua role
    },
    {
      to: "/notifikasi",
      icon: <IoMdNotificationsOutline className="size-6" />,
      label: "Notifikasi",
      roles: ["SUPER_ADMIN", "KARYAWAN"],
    },
  ];

  // Menu items khusus untuk SUPER_ADMIN
  const superAdminMenuItems = [
    {
      to: "/riwayat",
      icon: <RiHistoryLine className="size-6" />,
      label: "Riwayat",
      roles: ["SUPER_ADMIN"],
    },
    {
      to: "/laporan",
      icon: <LuChartColumnBig className="size-6" />,
      label: "Laporan",
      roles: ["SUPER_ADMIN"],
    },
    {
      to: "/user-manajemen",
      icon: <LuAirplay className="size-6" />,
      label: "User Manajemen",
      roles: ["SUPER_ADMIN"],
    },
  ];

  // Menu items khusus untuk KARYAWAN
  const karyawanMenuItems = [
    {
      to: "/produk",
      icon: <MdOutlineInput className="size-6" />,
      label: "Produk",
      roles: ["KARYAWAN"],
    },
  ];

  const handleLogout = () => {
    clearTokens();
    navigate("/masuk");
  };

  // Filter menu items berdasarkan role user
  const getFilteredMenuItems = () => {
    if (!user || !user.role) return commonMenuItems;

    let menuItems = [...commonMenuItems];

    if (user.role === "SUPER_ADMIN") {
      menuItems = [...menuItems, ...superAdminMenuItems];
    } else if (user.role === "KARYAWAN") {
      menuItems = [...menuItems, ...karyawanMenuItems];
    }

    return menuItems.filter((item) => item.roles.includes(user.role));
  };

  const filteredMenuItems = getFilteredMenuItems();

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
          {filteredMenuItems.map((item, index) => {
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

        <ul className="pt-6">
          <button onClick={handleLogout} className="flex items-center gap-2">
            <BiLogOut className="size-6" />
            <span className="text-lg">Keluar</span>
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
