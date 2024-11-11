import { Button } from "@/components/ui/button";
import React from "react";
import { HandCoins, Calculator, X, User, IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";

function CalculatorPage() {
  const allCalculator = [
    {
      id: 1,
      name: "Fixed Deposite Calculator",
      to: "/fix-fd",
      symbol: <Calculator size={30} />,
    },
    {
      id: 2,
      name: "knowledge Guide",
      to: "/knowledgeGuide",
      symbol: <Calculator size={30} />,
    },
    {
      id: 3,
      name: "Fixed Deposite Calculator",
      to: "/login",
      symbol: <Calculator size={30} />,
    },
    {
      id: 4,
      name: "Fixed Deposite Calculator",
      to: "/login",
      symbol: <IndianRupee size={30} />,
    },
    {
      id: 5,
      name: "Fixed Deposite Calculator",
      to: "/login",
      symbol: <IndianRupee size={30} />,
    },
    {
      id: 6,
      name: "Fixed Deposite Calculator",
      to: "/login",
      symbol: <IndianRupee size={30} />,
    },
    {
      id: 7,
      name: "Fixed Deposite Calculator",
      to: "/login",
      symbol: <IndianRupee size={30} />,
    },
    {
      id: 8,
      name: "Fixed Deposite Calculator",
      to: "/login",
      symbol: <IndianRupee size={30} />,
    },
    {
      id: 9,
      name: "Fixed Deposite Calculator",
      to: "/login",
      symbol: <IndianRupee size={30} />,
    },
    {
      id: 10,
      name: "Fixed Deposite Calculator",
      to: "/login",
      symbol: <IndianRupee size={30} />,
    },
  ];

  return (
    <div className="calculatorPage bg-blue-100 p-2 m-2 rounded-lg font-inter">
      <h2 className="text-center text-xl font-semibold">Calculators</h2>
      <div className="mainTypesOfCalc flex items-center justify-center space-x-3 pt-5">
        <Button>Investment</Button>
        <Button>Loans</Button>
        <Button>Others</Button>
      </div>
      <div className="subTypesOfCalc">
        <h3 className="text-center text-xl font-semibold p-2 pt-3">
          Savings & Investment Planning
        </h3>
        <div className="calList">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-2">
            {allCalculator.map((ele, index) => (
              <Link
                key={index}
                to={ele.to}
                className="p-4 bg-white rounded-lg flex flex-col items-center justify-center space-y-2 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                {ele.symbol}
                <span className="text-sm text-center">{ele.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalculatorPage;
