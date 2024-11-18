import { LogInContext } from "@/App";
import { Button } from "@/components/ui/button";
import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function AdminNavLinks() {
  const { isLoggedIn, logout } = useContext(LogInContext);
  const navigate = useNavigate();
  return (
    <div>
      <div className="admin-navlink">
        <ul className="flex items-center space-x-3 font-inter">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <NavLink to="/admin-services">Services</NavLink>
              </li>
              <li>
                <NavLink to="/admin-calculator">Calculators</NavLink>
              </li>
              <li>
                <NavLink to="/admin-dashboard">Dashboard</NavLink>
              </li>
              <li>
                <Button onClick={logout}>Log Out</Button>
              </li>
            </>
          ) : (
            <li>
              <Button onClick={() => navigate("/admin-login")}>
                Admin Login
              </Button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default AdminNavLinks;
