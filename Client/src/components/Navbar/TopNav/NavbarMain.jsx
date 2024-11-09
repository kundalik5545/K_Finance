import React, { useEffect, useState, useContext } from "react";
import WebsiteName from "./WebsiteName";
import axios from "axios";
import UserProfileAvatar from "./UserProfileAvatar";
import Navlinks from "./Navlinks";
import MenuIcon from "./MenuIcon";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { LogInContext } from "@/App";

function NavbarMain() {
  const { isLoggedIn } = useContext(LogInContext);
  const [data, setData] = useState(null); // Set initial state to null to indicate no data

  // Function to get a cookie by nameconst getCookie = (name) => {
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null; // Return null if cookie is not found
  };

  // Usage: Get the auth token from the "accessToken" cookie
  const authToken = getCookie("accessToken");

  console.log(authToken);

  const getUserDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/user/userDetails",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          withCredentials: true, // Include cookies in the request
        }
      );
      console.log("Running getUserDetails:", response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn && authToken) {
      // Ensure authToken exists before making the request
      getUserDetails();
    }
  }, [isLoggedIn, authToken]);

  return (
    <nav className="user-navbar flex flex-wrap items-center justify-between mx-auto p-4 bg-white border-gray-200 dark:bg-gray-900 website-log max-w-screen-xl">
      <WebsiteName />
      <Navlinks />
      <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        {isLoggedIn ? (
          <UserProfileAvatar
            userImg={data?.userImg}
            userName={data?.userName}
            userEmail={data?.userEmail}
          />
        ) : (
          <>
            <span className="block md:hidden">
              <MenuIcon />
            </span>
            <div className="menu-login-btn space-x-3 hidden lg:block">
              <Link to="sign-up">
                <Button>
                  <UserPlus /> Sign Up
                </Button>
              </Link>
              <Link to="login">
                <Button>
                  <LogIn /> Login
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavbarMain;
