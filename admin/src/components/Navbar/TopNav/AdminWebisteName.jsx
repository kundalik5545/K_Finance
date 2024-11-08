import { IndianRupee } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";
const websiteName = import.meta.env.VITE_WEBSITE_NAME;

function AdminWebisteName() {
  return (
    <div>
      <NavLink
        to="/"
        className="website-logo flex items-center space-x-2 rtl:space-x-reverse"
      >
        <IndianRupee size={40} />
        <span className="self-center font-inter text-3xl font-semibold whitespace-nowrap dark:text-white">
          {websiteName}
        </span>
      </NavLink>
    </div>
  );
}

export default AdminWebisteName;
