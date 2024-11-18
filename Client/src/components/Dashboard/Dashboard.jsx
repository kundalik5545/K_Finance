import axios from "axios";
import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import { getCookie } from "@/Utils/cookies.js";
import toast from "react-hot-toast";
import { LogInContext } from "@/App";
function Dashboard() {
  const { userDBId } = useContext(LogInContext);
  const [data, setData] = useState("");

  // Get the auth token from the "accessToken" cookie
  const authToken = getCookie("accessToken");

  // Fetch user details
  const fetchDetails = async () => {
    if (!authToken) {
      console.warn("Auth token is not available. Please log in.");
      toast.error("Your session has expired, Please log In!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/userDetails",
        { _id: userDBId }
      );

      setData(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <div className="bg-purple-100 p-2 m-2 rounded-lg min-h-screen">
      <h2 className="text-xl">
        This is the Dashboard, visible only if the user is logged in.
      </h2>
      <Button onClick={fetchDetails}>Fetch Details</Button>
      {data && (
        <div className="mt-4">
          <h3>User Data:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
