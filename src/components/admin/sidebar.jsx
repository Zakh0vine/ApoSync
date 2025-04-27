import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlinePersonOutline, MdOutlineInput } from "react-icons/md";
import { LuAirplay } from "react-icons/lu";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";

import Logo from "@/assets/logo.png";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      to: "/profile",
      icon: <MdOutlinePersonOutline className="size-6" />,
      label: "Profile",
    },
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
    { to: "/masuk", icon: <BiLogOut className="size-6" />, label: "Keluar" },
  ];

  return (
    <div className="w-60 bg-white h-screen shadow-md fixed left-0 top-0 flex flex-col justify-between">
      <div className="p-6">
        <img src={Logo} alt="Logo" className="h-20 w-20 mb-8 mx-auto" />
        {/* <div className="text-2xl font-bold mb-8">MEDISTOCK</div> */}
        <ul className="space-y-4">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.to;
            return (
              <li key={index}>
                <Link
                  to={item.to}
                  className={`flex items-center gap-2 ${
                    isActive ? "text-blue-500 font-semibold" : "text-black"
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
