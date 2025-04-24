"use client";
import React, { useState } from "react";
import Header from "../Header";
import SidebarNav3 from "../SidebarNav3";
import Footer from "../Footer";
import { useSelector } from "react-redux";

const Private = ({ children }: { children: React.ReactNode }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const { user, isSuccess, isError } = useSelector((state: any) => state.auth);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };
  return (
    <div className="antialiased bg-gray-50 dark:bg-gray-900">
      <Header
        userData={user}
        openSidebar={openSidebar}
        onSidebarOpen={handleSidebarOpen}
        onSidebarClose={handleSidebarClose}
      />
      {/* Sidebar */}
      <SidebarNav3 userData={user} open={openSidebar} />
      <main className="p-4 md:ml-64 h-auto pt-20    max-w-screen-xl md:min-h-screen rounded-lg">
        {/* <Template /> */}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Private;
