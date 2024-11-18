import React, { useContext, useEffect, useState } from "react";
import { LogInContext } from "@/App";
import { iconsList } from "@/Utils/IconsList.js";
import { NavLink } from "react-router-dom";
function Services() {
  // const { userDBId } = useContext(LogInContext);
  const [data, setData] = useState();

  const allCards = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/admin/services/get-services"
      );
      setData(res.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    allCards();
  }, []);

  const allCards1 = [
    {
      id: 1,
      cardTitle: "Basic Details",
      to: "/dashboard",
      iconName: "Calculator", // Assign the component itself
    },
    {
      id: 2,
      cardTitle: "All Loan Details",
      to: "/dashboard",
      iconName: "User",
    },
    {
      id: 3,
      cardTitle: "All Banks Details",
      to: "/dashboard",
      iconName: "X",
    },
    {
      id: 4,
      cardTitle: "Personal Blog",
      to: "/dashboard",
      iconName: "IndianRupee",
    },
    {
      id: 5,
      cardTitle: "Insurance",
      to: "/dashboard",
      iconName: "ShieldCheck",
    },
    {
      id: 6,
      cardTitle: "Assets",
      to: "/dashboard",
      iconName: "HandCoins",
    },
    {
      id: 7,
      cardTitle: "Gold & Silver",
      to: "/dashboard",
      iconName: "HandCoins",
    },
    {
      id: 8,
      cardTitle: "Expense History",
      to: "/dashboard",
      iconName: "ShieldCheck",
    },
    {
      id: 9,
      cardTitle: "Credit Card",
      to: "/dashboard",
      iconName: "ShieldCheck",
    },
    {
      id: 10,
      cardTitle: "Offers",
      to: "/dashboard",
      iconName: "ShieldCheck",
    },
    {
      id: 11,
      cardTitle: "Personal Calculators",
      to: "/dashboard",
      iconName: "ShieldCheck",
    },
    {
      id: 12,
      cardTitle: "Land & Flat",
      to: "/dashboard",
      iconName: "ShieldCheck",
    },
    {
      id: 13,
      cardTitle: "Hospital Details",
      to: "/dashboard",
      iconName: "ShieldCheck",
    },
    {
      id: 14,
      cardTitle: "All Documents",
      to: "/dashboard",
      iconName: "ShieldCheck",
    },
    {
      id: 15,
      cardTitle: "",
      to: "/dashboard",
      iconName: "ShieldCheck",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-3 text-gray-800 bg-white  m-3 mb-6">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6 text-left font-inter space-x-3">
        <span>Welcome</span>
        {/* <span className=" text-black ">{userDBId.fullName}</span> */}
      </h2>

      <div className="main-sec flex flex-col gap-3">
        <div className="hero-sec grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-2">
          {Array.isArray(data) &&
            allCards.map((item, index) => {
              // const IconComponent = iconsList[item.iconName];
              return (
                <NavLink
                  to={item.cardUrl}
                  key={item.id}
                  className="p-4 bg-white rounded-lg flex flex-col items-center justify-center space-y-2 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  {/* <IconComponent size={30} /> */}
                  <span className="text-sm text-center">{item.cardTitle}</span>
                  <span className="text-sm text-center">{item.cardUrl}</span>
                </NavLink>
              );
            })}
        </div>

        <div className="info-sec space-y-2 font-inter pt-5">Info Sec</div>
      </div>
    </div>
  );
}

export default Services;
