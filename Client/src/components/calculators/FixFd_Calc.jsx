import React, {  useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import RightSideJoinUs from "../commonComponents/RightSideJoinUs"; 
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {  ChartContainer } from "@/components/ui/chart"
import {
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

function FixFd_Calc() {
  const [investmentValue, setInvestmentValue] = useState(100000);

  const [SimpleReturn, setSimpleReturn] = useState("");
  const [CompoundReturn, setCompoundReturn] = useState("");

  const [
    SimpleReturnAdjustedToInflation,
    setSimpleReturnAdjustedToInflation,
  ] = useState("");
  const [
    CompoundReturnAdjustedToInflation,
    setCompoundReturnAdjustedToInflation,
  ] = useState("");

  const [
      SimpleReturnAdjustedToInflationAndTax,
      setSimpleReturnAdjustedToInflationAndTax,
    ] = useState("");
  const [
    CompoundReturnAdjustedToInflationAndTax,
    setCompoundReturnAdjustedToInflationAndTax,
  ] = useState("");

   const [
     TotalSimpleReturnAdjustedToInflationOnly,
     setTotalSimpleReturnAdjustedToInflationOnly,
   ] = useState("");
    const [
      TotalCompoundReturnAdjustedToInflationOnly,
      setTotalCompoundReturnAdjustedToInflationOnly,
    ] = useState("");

   
const [
  TotalSimpleReturnAdjustedToInflationAndTax,
  setTotalSimpleReturnAdjustedToInflationAndTax,
] = useState("");
  
    const [
      TotalCompoundReturnAdjustedToInflationAndTax,
      setTotalCompoundReturnAdjustedToInflationAndTax,
    ] = useState("");

    
  

  const [formData, setFormData] = useState({
    rateOfInterest: "",
    timePeriod: "",
    inflationRate: "",
    taxBracket: "",
  });

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

  //Actual logic to calculate fix fd

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // const fiexDepositeCalFun = () => {
  //   let fdSimpleReturn = [
  //     investmentValue +
  //       (investmentValue * formData.rateOfInterest * formData.timePeriod) /
  //         100 -
  //       investmentValue,
  //   ];

  //   let fdCompoundReturn = Math.round(
  //     investmentValue *
  //       Math.pow(1 + formData.rateOfInterest / 100, formData.timePeriod) -
  //       investmentValue
  //   );

  //   let adjustedSimpleReturnOnInflation =
  //     fdSimpleReturn /
  //     Math.pow(1 + formData.inflationRate / 100, formData.timePeriod);;

  //   let adjustedCompoundOnInflation = Math.round(
  //     (investmentValue *
  //       (Math.pow(1 + formData.rateOfInterest / 100, formData.timePeriod) -
  //         1)) /
  //       Math.pow(1 + formData.inflationRate / 100, formData.timePeriod)
  //   );

  //   let adjustedSimpleReturnOnInflationAndTax =
  //     (fdSimpleReturn + adjustedSimpleReturnOnInflation)*(formData.taxBracket/100);
    
  //   let adjustedCompoundOnInflationAndTax = null;

  //   setSimpleReturn(fdSimpleReturn);
  //   setCompoundReturn(fdCompoundReturn);
  //   setSimpleReturnAdjustedToInflation(adjustedSimpleReturnOnInflation);
  //   setCompoundReturnAdjustedToInflation(adjustedCompoundOnInflation);
  //   setSimpleReturnAdjustedToInflationAndTax(
  //     adjustedSimpleReturnOnInflationAndTax
  //   );
  //   setCompoundAdjustedToInflationAndTax(adjustedCompoundOnInflationAndTax);
  // };

  const fiexDepositeCalFun = () => {
    // Step 1: Calculate nominal simple return (without inflation or tax adjustment)
    let fdSimpleReturn =
      (investmentValue * formData.rateOfInterest * formData.timePeriod) / 100;

    // Step 2: Calculate compound return (nominal, without inflation or tax adjustment)
    let fdCompoundReturn = Math.round(
      investmentValue *
        Math.pow(1 + formData.rateOfInterest / 100, formData.timePeriod) -
        investmentValue
    );

    // Step 3: Adjust simple return for inflation
    let adjustedSimpleReturnOnInflation =
      fdSimpleReturn /
      Math.pow(1 + formData.inflationRate / 100, formData.timePeriod);

    // Step 4: Adjust compound return for inflation
    let adjustedCompoundOnInflation = Math.round(
      (investmentValue *
        (Math.pow(1 + formData.rateOfInterest / 100, formData.timePeriod) -
          1)) /
        Math.pow(1 + formData.inflationRate / 100, formData.timePeriod)
    );

    // Step 5: Adjust the inflation-adjusted simple return for tax
    let adjustedSimpleReturnOnInflationAndTax =
      adjustedSimpleReturnOnInflation * (1 - formData.taxBracket / 100);

    // Step 6: Adjust the inflation-adjusted compound return for tax
    let adjustedCompoundOnInflationAndTax =
      adjustedCompoundOnInflation * (1 - formData.taxBracket / 100);

    
    //Step 7: Total Invested value after inflation only
    let TotalSimpleReturnAdjustedToInflationOnly = investmentValue + adjustedSimpleReturnOnInflation;
    
    //Step 8: Total Invested value after inflation only
    let TotalCompoundReturnAdjustedToInflationOnly = investmentValue + adjustedCompoundOnInflation;
    
    //Step 9: Total Invested value after inflation only
    let TotalSimpleReturnAdjustedToInflationAndTax =
      investmentValue + adjustedSimpleReturnOnInflationAndTax;

    //Step 10: Total Invested value after inflation only
    let TotalCompoundReturnAdjustedToInflationAndTax =
      investmentValue + adjustedCompoundOnInflationAndTax;
    
    
    // Set state variables with calculated values
    setSimpleReturn(fdSimpleReturn);
    setCompoundReturn(fdCompoundReturn);

    setSimpleReturnAdjustedToInflation(adjustedSimpleReturnOnInflation);
    setCompoundReturnAdjustedToInflation(adjustedCompoundOnInflation);

    setSimpleReturnAdjustedToInflationAndTax( adjustedSimpleReturnOnInflationAndTax);
    setCompoundReturnAdjustedToInflationAndTax(  adjustedCompoundOnInflationAndTax );

    setTotalSimpleReturnAdjustedToInflationOnly(TotalSimpleReturnAdjustedToInflationOnly);
    setTotalCompoundReturnAdjustedToInflationOnly(
      TotalCompoundReturnAdjustedToInflationOnly
    );
   
    setTotalSimpleReturnAdjustedToInflationAndTax(
      TotalSimpleReturnAdjustedToInflationAndTax
    );
    setTotalCompoundReturnAdjustedToInflationAndTax(
      TotalCompoundReturnAdjustedToInflationAndTax
    ); 
  }; 
  const allSimpleResult = [
    {
      id: 1,
      title: "Invested Amount :-",
      investmentValue: formatToIndianRupee(investmentValue),
    },
    {
      id: 2,
      title: "Est. Simple Return :-",
      investmentValue: formatToIndianRupee(SimpleReturn),
    },
    {
      id: 3,
      title: "Est. Simple Return after Adjusting to Inflation :-",
      investmentValue: formatToIndianRupee(SimpleReturnAdjustedToInflation),
    },
    {
      id: 4,
      title: "Est. Simple Return after Adjusting to Inflation & Tax :-",
      investmentValue: formatToIndianRupee(
        SimpleReturnAdjustedToInflationAndTax
      ),
    },
    {
      id: 5,
      title: "Total Simple Return after Adjusting to Inflation Only :-",
      investmentValue: formatToIndianRupee(
        TotalSimpleReturnAdjustedToInflationOnly
      ),
    },
    {
      id: 6,
      title: "Total Simple Return after Adjusting to Inflation And Tax :-",
      investmentValue: formatToIndianRupee(
        TotalSimpleReturnAdjustedToInflationAndTax
      ),
    },
    
  ];

  const allCompoundResult = [
    {
      id: 7,
      title: "Invested Amount :-",
      investmentValue: formatToIndianRupee(investmentValue),
    },
    {
      id: 8,
      title: "Est. Compound Return :-",
      investmentValue: formatToIndianRupee(CompoundReturn),
    },

    {
      id: 9,
      title: "Est. Compound Return after Adjusting to Inflation :-",
      investmentValue: formatToIndianRupee(CompoundReturnAdjustedToInflation),
    },

    {
      id: 10,
      title: "Est. Compound Return after Adjusting to Inflation & Tax :-",
      investmentValue: formatToIndianRupee(
        CompoundReturnAdjustedToInflationAndTax
      ),
    },

    {
      id: 11,
      title: "Total Compound Return after Adjusting to Inflation Only :-",
      investmentValue: formatToIndianRupee(
        TotalCompoundReturnAdjustedToInflationOnly
      ),
    },

    {
      id: 12,
      title: "Total Compound Return after Adjusting to Inflation And Tax :-",
      investmentValue: formatToIndianRupee(
        TotalCompoundReturnAdjustedToInflationAndTax
      ),
    },
  ];

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

  const chartData1 = {
    labels: [
      "Invested Amount",
      "Est. Simple Return",
      "Est. Simple Return after Adjusting to Inflation",
      "Est. Simple Return after Adjusting to Inflation & Tax",
      "Total Simple Return after Adjusting to Inflation Only",
      "Total Simple Return after Adjusting to Inflation And Tax",
    ],
    datasets: [
      {
        label: "Investment Values",
        data: [
          formatToIndianRupee(investmentValue),
          formatToIndianRupee(SimpleReturn),
          SimpleReturnAdjustedToInflation,
          SimpleReturnAdjustedToInflationAndTax,
          TotalSimpleReturnAdjustedToInflationOnly,
          TotalSimpleReturnAdjustedToInflationAndTax,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} //satisfies ChartConfig

  const chartConfig1 = {
    title: {
      label: "Desktop",
      color: "#2563eb",
    },
    investmentValue: {
      label: "Mobile",
      color: "#60a5fa",
    },
  };

  //

  const chartData2 = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
  ];

  const chartConfig2 = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
  }; 
 
  const chartConfig4 = {
    title: {
      label: "title",
      color: "hsl(var(--chart-1))",
    },
  }; 
 

  //last chance
  const chartConfig6 = {
    investedAmount: {
      label: "Invested Amount",
      color: "#2563eb", // A blue color for Invested Amount
    },
    simpleReturn: {
      label: "Est. Simple Return",
      color: "#60a5fa", // A lighter blue color for Est. Simple Return
    },
    returnAfterInflation: {
      label: "Est. Simple Return after Adjusting to Inflation",
      color: "#34d399", // A green color for Return After Inflation
    },
    returnAfterTax: {
      label: "Est. Simple Return after Adjusting to Inflation & Tax",
      color: "#10b981", // A different green for Return After Tax
    },
    totalReturnInflation: {
      label: "Total Simple Return after Adjusting to Inflation Only",
      color: "#f59e0b", // A yellow color for Total Return (Inflation Only)
    },
    totalReturnInflationAndTax: {
      label: "Total Simple Return after Adjusting to Inflation And Tax",
      color: "#f97316", // An orange color for Total Return (Inflation and Tax)
    },
  };

  //Last data
  const chartData6 = {
    labels: allSimpleResult.map((item) => item.title), // Extract the titles for the labels
    datasets: [
      {
        label: "Investment Summary",
        data: allSimpleResult.map((item) =>
          parseFloat(item.investmentValue.replace(/[^\d.-]/g, ""))
        ), // Extract the numeric value (removing formatting)
        // backgroundColor: [
        //   chartConfig.investedAmount.color,
        //   chartConfig.simpleReturn.color,
        //   chartConfig.returnAfterInflation.color,
        //   chartConfig.returnAfterTax.color,
        //   chartConfig.totalReturnInflation.color,
        //   chartConfig.totalReturnInflationAndTax.color,
        // ],
      },
    ],
  };


  useEffect(() => {
    fiexDepositeCalFun();
  }, [formData, investmentValue]);

  return (
    <div className="  max-w-6xl mx-auto p-3 text-gray-800 bg-white  m-3 mb-6">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6 text-left font-inter">
        Fixed Deposit Calculator
      </h2>

      <div className="main-sec flex flex-col lg:flex-row gap-3">
        <div className="left-container p-1 mt-2 pb-2 sm:mt-0 sm:pb-4 w-full lg:w-2/3 h-fit  sm:hadow-lg rounded-lg">
          {/* Calculator Section */}
          <div className="space-y-4">
            <div className="flex flex-col space-y-4 ">
              <div className="flex justify-between items-center w-full sm:grid sm:grid-cols-2 sm:items-center sm:justify-stretch  ">
                <Label className="text-left font-inter text-lg font-semibold">
                  Total Investment:
                </Label>
                <Input
                  type="text"
                  name="investmentVal"
                  value={investmentValue.toLocaleString("en-IN")} // Display formatted number without currency symbol
                  required
                  onChange={handleOnInvestmentValChng}
                  placeholder="Enter Total Investment"
                  className="w-32  p-2 text-right font-inter text-lg rounded-md border border-gray-300 "
                />
              </div>
              <Slider
                max={10000000}
                step={50000}
                default={100000}
                value={[investmentValue]} // Wrap in an array
                onValueChange={handleSliderChange}
                className="w-full md:w-1/3 pb-4"
              />
            </div>

            <div className="flex justify-between items-center w-full sm:grid sm:grid-cols-2 sm:items-center sm:justify-stretch">
              <Label className="text-left font-inter text-lg ">
                Rate of Interest(%) (p.a):
              </Label>
              <Input
                type="number"
                name="rateOfInterest"
                value={formData.rateOfInterest}
                onChange={handleOnChange}
                required
                min={0}
                max={20}
                maxLength={2}
                className="w-20  p-2 text-right font-inter text-lg  rounded-md border border-gray-300"
              />
            </div>

            <div className="flex justify-between items-center w-full sm:grid sm:grid-cols-2 sm:items-center">
              <Label className="text-left font-inter text-lg ">
                Time Period:
              </Label>
              <Input
                type="number"
                name="timePeriod"
                value={formData.timePeriod}
                onChange={handleOnChange}
                required
                min={0}
                maxLength={2}
                className="w-20 p-2 text-right font-inter text-lg rounded-md border border-gray-300"
              />
            </div>

            <div className="flex justify-between items-center w-full sm:grid sm:grid-cols-2 sm:items-center sm:justify-stretch">
              <Label className="text-left font-inter text-lg ">
                Avg Inflation Rate (%) :
              </Label>
              <Input
                type="number"
                name="inflationRate"
                value={formData.inflationRate}
                onChange={handleOnChange}
                required
                className="w-20  p-2 text-right font-inter text-lg rounded-md border border-gray-300"
              />
            </div>
            <div className="flex justify-between items-center w-full sm:grid sm:grid-cols-2 sm:items-center sm:justify-stretch">
              <Label className="text-left font-inter text-lg ">
                Expected Tax Bracket Rate (%) :
              </Label>
              <Input
                type="number"
                name="taxBracket"
                value={formData.taxBracket}
                onChange={handleOnChange}
                required
                className="w-20  p-2 text-right font-inter text-lg rounded-md border border-gray-300"
              />
            </div>
          </div>

          {/* Result Section */}
          <div className="p-2 mt-4 font-inter rounded-lg shadow-sm bg-pink-100">
            <div className="flex flex-col p-2 space-y-3">
              {allSimpleResult.map((ele, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-left w-60 md:w-full">{ele.title}</span>
                  <span>{ele.investmentValue}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-2 mt-4 font-inter rounded-lg shadow-sm bg-blue-100">
            <div className="flex flex-col p-2 space-y-3">
              {allCompoundResult.map((ele, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-left w-60 md:w-full">{ele.title}</span>
                  <span>{ele.investmentValue}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="right-container p-2 mt-4 pb-4 sm:mt-0 sm:pb-4 w-full lg:w-1/3 h-fit font-inter shadow-lg rounded-lg bg-blue-100 ">
          <RightSideJoinUs />
        </div>
      </div>

      <div className="info-sec space-y-2 font-inter pt-5">
        <p>
          A fixed deposit is a type of term investment offered by several banks
          and NBFCs. These deposits typically offer a higher rate of interest,
          subject to certain terms and conditions. The amount you deposit in
          these deposits is locked for a predetermined period which can vary
          between 7 days and 10 years.
        </p>
        <p>
          An FD calculator can be used to determine the interest and the amount
          that it will accrue at the time of maturity. It is a simple-to-use
          tool available on the Groww website.
        </p>
        <h3 className="text-xl font-bold">
          How can an FD calculator help you?
        </h3>
        <p>
          Calculating the maturity amount of an FD can be a complicated and
          time-consuming process. An online FD calculator enables one to figure
          it without breaking a sweat.
        </p>
        <ul className="list-disc space-y-2 px-3">
          <li>
            FD maturity calculations are complex involving multiple variables. A
            does all the hard work and gives you accurate figures just at the
            click of a button.
          </li>
          <li>
            It helps you save a lot of time on these complex calculations.
          </li>
          <li>
            A fixed deposit return calculator enables you to compare the
            maturity amount and interest rates of FDs offered by different
            financial institutions. You can make an informed decision when you
            have all the figures at your disposal.
          </li>
        </ul>
        <h3 className="text-xl font-bold">
          The formula to determine FD maturity amount
        </h3>
        <p>M = P + (P x r x t/100), where –</p>
        <ul className="list-disc space-y-2 px-3">
          <li>P is the principal amount that you deposit</li>
          <li>r is the rate of interest per annum</li>
          <li>t is the tenure in years For example, if you deposit </li>
        </ul>
      </div>

      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer>

      <ChartContainer config={chartData1} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer>

      <ChartContainer config={chartConfig1} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={allSimpleResult}>
          <Bar dataKey="title" fill="var(--color-desktop)" radius={4} />
          <Bar
            dataKey="investmentValue"
            fill="var(--color-mobile)"
            radius={4}
          />
        </BarChart>
      </ChartContainer>

      <ChartContainer config={chartConfig4}>
        <BarChart accessibilityLayer data={allSimpleResult}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="title"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar
            dataKey="investmentValue"
            fill="var(--color-desktop)"
            radius={8}
          />
        </BarChart>
      </ChartContainer>

      <ChartContainer config={chartConfig6} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData6}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="title"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="investmentValue" fill="var(--color-title)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );

};
export default FixFd_Calc;



 

 

 
 