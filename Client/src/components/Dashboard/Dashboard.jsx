import React from "react";

function Dashboard() {
  return (
    <div className="bg-purple-100 p-2 m-2 rounded-lg min-h-screen">
      <h2 className=" text-xl">
        This is Dashboard only visible if user is logged In.
      </h2>
    </div>
  );
}

export default Dashboard;
