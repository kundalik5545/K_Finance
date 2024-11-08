import React, { useEffect, useState, useContext } from "react";
import WebsiteName from "./WebsiteName";
import axios from "axios";
import UserProfileAvatar from "./UserProfileAvatar";
import Navlinks from "./Navlinks";
import MenuIcon from "./MenuIcon";
import { Button } from "../ui/button";
import { LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { logInContext } from "../../App";

function NavbarMain() {
  const { isLoggedIn } = useContext(logInContext);
  const [data, setData] = useState([]);

  const getUserDetails = async () => {
    const yourAuthToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzJhMDNhZGY3N2ViZjQ0MDM1NWU5MjEiLCJpYXQiOjE3MzA5MTIzNTMsImV4cCI6MTczMTc3NjM1M30.8vlY-i5NPp2d7vftjUQqqQ5XKXIsqVATLRIL7WnEzQE";
    const response = await axios.get(
      "http://localhost:8000/api/v1/user/userDetails",
      {
        headers: {
          Authorization: `Bearer ${yourAuthToken}`,
        },
      }
    );
    console.log("running get user details", response.data.data);
    setData(response.data.data);
  };

  useEffect(() => {
    if (isLoggedIn) {
      getUserDetails();
    }
  }, [isLoggedIn]);

  return (
    <>
      <nav className="user-navbar flex flex-wrap items-center justify-between mx-auto p-4 bg-white border-gray-200 dark:bg-gray-900 website-log max-w-screen-xl ">
        <WebsiteName />
        <Navlinks />
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {isLoggedIn ? (
            <>
              <UserProfileAvatar
                userImg={data?.userImg}
                userName={data?.userName}
                userEmail={data?.userEmail}
              />
            </>
          ) : (
            <>
              <span className="block  md:hidden">
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
                    <LogIn />
                    Login
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default NavbarMain;
