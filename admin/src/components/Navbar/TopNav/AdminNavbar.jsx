import React from "react";
import AdminWebisteName from "./AdminWebisteName";
import AdminNavLinks from "./AdminNavLinks";

function AdminNavbar() {
  return (
    <>
      <nav className="admin-navbar flex flex-wrap items-center justify-between mx-auto p-4 bg-white border-gray-200 dark:bg-gray-900 max-w-screen-xl  ">
        <div className="logo-section">
          <AdminWebisteName />
        </div>
        <div className="navlink-section">
          <AdminNavLinks />
        </div>
      </nav>
    </>
  );
}

export default AdminNavbar;
