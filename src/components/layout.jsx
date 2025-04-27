import React from "react";
import Navbar from "@/components/admin/navbar";
import Sidebar from "@/components/admin/sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-60 min-h-screen bg-gray-100">
        <Navbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
