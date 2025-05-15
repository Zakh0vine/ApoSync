import React, { useState } from "react";
import Navbar from "@/components/admin/navbar";
import Sidebar from "@/components/admin/sidebar";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
      <div className="flex-1 w-full md:ml-60 bg-gray-100">
        <Navbar onSidebarToggle={handleSidebarToggle} />
        <main className="p-4 md:p-6 w-full">
          <div className="w-full max-w-full">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
