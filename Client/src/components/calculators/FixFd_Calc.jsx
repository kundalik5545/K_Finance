import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider"; 
import RightSideJoinUs from "../commonComponents/RightSideJoinUs";


function FixFd_Calc() {
  const [investmentValue, setInvestmentValue] = useState(100000);

  // Format the number as Indian Rupee
  const formatToIndianRupee = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0, // Remove decimal places
    }).format(value);
  };

  // Handle slider change and update investment value
  const handleSliderChange = (value) => {
    setInvestmentValue(value[0]);
  };

  // Handle input change, removing any non-numeric characters
  const handleOnInvestmentValChng = (e) => {
    const rawValue = Number(e.target.value.replace(/[^0-9]/g, ""));
    setInvestmentValue(rawValue);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 text-gray-800 bg-white  m-3 mb-6">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6 text-left">
        Fixed Deposit Calculator
      </h2>

      <div className="main-sec sm:flex gap-3">
        <div className="left-container p-2 mt-4 pb-4 sm:mt-0 sm:pb-4 sm:w-2/3 h-fit sm:shadow-lg rounded-lg">
          {/* Calculator Section */}
          <div className="space-y-6">
            <div className="flex flex-col space-y-4 w-2/3">
              <div className="flex flex-col md:flex-row items-center justify-start gap-4">
                <Label className="md:w-1/3 text-lg font-semibold">
                  Total Investment:
                </Label>
                <Input
                  type="text"
                  name="investmentVal"
                  value={investmentValue.toLocaleString("en-IN")} // Display formatted number without currency symbol
                  required
                  onChange={handleOnInvestmentValChng}
                  placeholder="Enter Total Investment"
                  className="md:w-1/3 p-2 rounded-md border border-gray-300"
                />
              </div>
              <Slider
                max={1000000}
                step={50000}
                value={[investmentValue]} // Wrap in an array
                onValueChange={handleSliderChange}
                className="w-full md:w-2/3"
              />
            </div>

            <div className="flex flex-col md:flex-row items-center justify-start gap-4">
              <Label className="md:w-1/3 text-lg font-semibold">
                Rate of Interest (p.a):
              </Label>
              <Input
                type="number"
                required
                placeholder="Enter Rate of Interest"
                className="md:w-1/3 p-2 rounded-md border border-gray-300"
              />
            </div>

            <div className="flex flex-col md:flex-row items-center justify-start gap-4">
              <Label className="md:w-1/3 text-lg font-semibold">
                Time Period:
              </Label>
              <Input
                type="number"
                required
                placeholder="Enter Time Period"
                className="md:w-1/3 p-2 rounded-md border border-gray-300"
              />
            </div>

            <div className="flex flex-col md:flex-row items-center justify-start gap-4">
              <Label className="md:w-1/3 text-lg font-semibold">
                Avg Inflation Rate:
              </Label>
              <Input
                type="number"
                required
                placeholder="Enter Inflation Rate"
                className="md:w-1/3 p-2 rounded-md border border-gray-300"
              />
            </div>
          </div>

          {/* Result Section */}
          <div className="mt-8 space-y-4 bg-gray-100 p-4 rounded-lg shadow-inner">
            <div className="flex justify-between text-gray-700 font-medium">
              <p>Invested Amount: {formatToIndianRupee(investmentValue)}</p>
              <p>Est. Returns on Invested Amount:</p>
            </div>
            <div className="flex justify-between text-gray-700 font-medium">
              <p>Amount After Inflation:</p>
              <p>Est. Returns After Inflation Deduction:</p>
            </div>
            <div className="flex justify-between text-gray-700 font-medium">
              <p>Amount After Tax on Normal Value:</p>
              <p>Amount After Tax on Adjusted For Inflation Value:</p>
            </div>
          </div>
        </div>
        <div className="right-container p-2 mt-4 pb-4 sm:mt-0 sm:pb-4 sm:w-1/3 h-fit font-inter shadow-lg rounded-lg bg-blue-100 ">
          <RightSideJoinUs />
        </div>
      </div>
    </div>
  );
}

export default FixFd_Calc;
