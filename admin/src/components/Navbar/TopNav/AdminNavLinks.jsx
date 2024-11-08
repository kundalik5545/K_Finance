import { LogInContext } from "@/App";
import { Button } from "@/components/ui/button";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

function AdminNavLinks() {
  const { isLoggedIn, onLoginUser, onLogoutUser } = useContext(LogInContext);

  return (
    <div>
      <div className="admin-navlink">
        <ul className="flex items-center space-x-3 font-inter">
          <li>
            {isLoggedIn ? (
              <>
                <ul className="flex items-center space-x-3 font-inter">
                  <li>
                    <NavLink to="/">Home</NavLink>
                  </li>
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
                    <Button onClick={onLogoutUser}>Log Out</Button>
                  </li>
                </ul>
              </>
            ) : (
              <>
                <li>
                  <Button onClick={onLoginUser}>Login</Button>
                </li>
              </>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AdminNavLinks;
