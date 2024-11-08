import { LogInContext } from "@/App";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

function AdminServices() {
  const { isLoggedIn } = useContext(LogInContext);
  const navigate = useNavigate();
  return (
    <div>
      {isLoggedIn ? (
        <>
          <h2>This is admin services that required user to login</h2>
        </>
      ) : (
        <>
          <h2>User is not login on service page</h2>
        </>
      )}
    </div>
  );
}

export default AdminServices;
