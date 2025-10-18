import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function DashboardLayout({ onLogout }) {
  return (
    <div className="d-flex">
      <Sidebar onLogout={onLogout} />
      <div className="flex-grow-1" style={{ marginLeft: "250px" }}>
        <Navbar />
        <main className="p-4 bg-light" style={{ minHeight: "100vh" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
