import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Navlinks() {
  const [closMenu, setclosMenu] = useState(false);

  const handleCloseMenu = () => {
    setclosMenu();
  };
  return (
    <div
      className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
      id="navbar-user"
    >
      <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "block py-2 px-3 text-white bg-blue-500 rounded "
                : "block py-2 px-3 text-black rounded  "
            }
            aria-current="page"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            end
            className={({ isActive }) =>
              isActive
                ? "block py-2 px-3 text-white bg-blue-500 rounded "
                : "block py-2 px-3 text-black rounded  "
            }
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/services"
            end
            className={({ isActive }) =>
              isActive
                ? "block py-2 px-3 text-white bg-blue-500 rounded "
                : "block py-2 px-3 text-black rounded  "
            }
          >
            Services
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/calculators"
            onClick={handleCloseMenu}
            end
            className={({ isActive }) =>
              isActive
                ? "block py-2 px-3 text-white bg-blue-500 rounded "
                : "block py-2 px-3 text-black rounded  "
            }
          >
            Calculators
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            end
            className={({ isActive }) =>
              isActive
                ? "block py-2 px-3 text-white bg-blue-500 rounded "
                : "block py-2 px-3 text-black rounded  "
            }
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navlinks;
