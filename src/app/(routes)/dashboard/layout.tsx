'use client';
import React, { useState } from "react";
import Sidebar from "./components/sidebar";
import { Button } from "./components/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar hanya tampil jika isSidebarVisible true */}
      {isSidebarVisible && <Sidebar />}
      <main className="flex-1 relative overflow-auto">
        {/* Tombol untuk menutup/membuka sidebar */}
        <Button
          isSidebarVisible={isSidebarVisible}
          toggleSidebar={toggleSidebar}
        />
        {children}
      </main>
    </div>
  );
}
