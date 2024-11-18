import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import RightSideJoinUs from "../commonComponents/RightSideJoinUs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function FixFd_Calc() {
  const [principal, setPrincipal] = useState(100000);
  const [formData, setFormData] = useState({
    rateOfInterest: 7,
    timePeriod: 1,
    inflationRate: 0,
    taxBracket: 0,
    interestCummOn: 1, // default to yearly if not selected
  });

  const [results, setResults] = useState({
    SimpleReturn: "",
    CompoundReturn: "",
    SimpleReturnAdjustedToInflation: "",
    CompoundReturnAdjustedToInflation: "",
    SimpleReturnAdjustedToInflationAndTax: "",
    CompoundReturnAdjustedToInflationAndTax: "",
    totalSimpleReturn: "",
    totalCompoundReturn: "",
    totalSimpleReturnAdjustedToInflationOnly: "",
    totalCompoundReturnAdjustedToInflationOnly: "",
    totalSimpleReturnAdjustedToInflationAndTax: "",
    totalCompoundReturnAdjustedToInflationAndTax: "",
  });

  const formatToIndianRupee = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };
  const handleSliderChange = (value) => {
    setPrincipal(value[0]);
  };

  const handleOnInvestmentValChng = (e) => {
    const rawValue = Number(e.target.value.replace(/[^0-9]/g, ""));
    setPrincipal(rawValue);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const calculateFixedDepositReturns = () => {
    const {
      rateOfInterest,
      timePeriod,
      inflationRate,
      taxBracket,
      interestCummOn,
    } = formData;

    const p = principal;
    const r = rateOfInterest / 100;
    const t = timePeriod;
    const ir = inflationRate / 100;
    const tb = taxBracket / 100;
    const f = interestCummOn;
    const cpx = 7;

    const si = p * r * t;
    const ci = p * Math.pow(1 + r / f, f * t) - p;
    const si_I = p * Math.pow(1 + ir, t);
    // const si_I = p / (1 + ir);
    const ci_I = ci / (1 + ir);
    const si_I_T = si_I * (1 - tb);
    const ci_I_T = ci_I * (1 - tb);
    const T_si = p + si;
    const T_ci = p + ci;
    const T_si_I = p + si_I;
    const T_ci_I = p + ci_I;
    const T_si_I_T = p + si_I_T;
    const T_ci_I_T = p + ci_I_T;

    setResults({
      SimpleReturn: si,
      CompoundReturn: ci,
      SimpleReturnAdjustedToInflation: si_I,
      CompoundReturnAdjustedToInflation: ci_I,
      SimpleReturnAdjustedToInflationAndTax: si_I_T,
      CompoundReturnAdjustedToInflationAndTax: ci_I_T,
      totalSimpleReturn: T_si,
      totalCompoundReturn: T_ci,
      totalSimpleReturnAdjustedToInflationOnly: T_si_I,
      totalCompoundReturnAdjustedToInflationOnly: T_ci_I,
      totalSimpleReturnAdjustedToInflationAndTax: T_si_I_T,
      totalCompoundReturnAdjustedToInflationAndTax: T_ci_I_T,
    });
  };

  const allSimpleResult = [
    {
      id: 1,
      title: "Invested Amount :-",
      investmentValue: formatToIndianRupee(principal),
    },
    {
      id: 2,
      title: "Total Return :-",
      investmentValue: formatToIndianRupee(results.totalSimpleReturn),
    },
    {
      id: 3,
      title: "Total Return after Inflation:-",
      investmentValue: formatToIndianRupee(
        results.totalSimpleReturnAdjustedToInflationOnly
      ),
    },
    {
      id: 4,
      title: "Total Return after Inflation And Tax :-",
      investmentValue: formatToIndianRupee(
        results.totalSimpleReturnAdjustedToInflationOnly
      ),
    },
    {
      id: 5,
      title: "Return :-",
      investmentValue: formatToIndianRupee(results.SimpleReturn),
    },
    {
      id: 6,
      title: "Return after Inflation :-",
      investmentValue: formatToIndianRupee(
        results.SimpleReturnAdjustedToInflation
      ),
    },

    {
      id: 7,
      title: "Return after Inflation & Tax :-",
      investmentValue: formatToIndianRupee(
        results.SimpleReturnAdjustedToInflationAndTax
      ),
    },
  ];

  const allCompoundResult = [
    {
      id: 8,
      title: "Invested Amount :-",
      investmentValue: formatToIndianRupee(principal),
    },
    {
      id: 9,
      title: "Total Return :-",
      investmentValue: formatToIndianRupee(results.totalCompoundReturn),
    },
    {
      id: 10,
      title: "Total Return after Inflation :-",
      investmentValue: formatToIndianRupee(
        results.totalCompoundReturnAdjustedToInflationOnly
      ),
    },

    {
      id: 11,
      title: "Total Return after Inflation And Tax :-",
      investmentValue: formatToIndianRupee(
        results.totalCompoundReturnAdjustedToInflationAndTax
      ),
    },
    {
      id: 12,
      title: "Return :-",
      investmentValue: formatToIndianRupee(results.CompoundReturn),
    },

    {
      id: 13,
      title: "Return after Inflation :-",
      investmentValue: formatToIndianRupee(
        results.CompoundReturnAdjustedToInflation
      ),
    },

    {
      id: 14,
      title: "Return after Inflation & Tax :-",
      investmentValue: formatToIndianRupee(
        results.CompoundReturnAdjustedToInflationAndTax
      ),
    },
  ];
  useEffect(() => {
    calculateFixedDepositReturns();
  }, [formData, principal]);

  return (
    <div className="max-w-6xl mx-auto p-3 text-gray-800 bg-white  m-3 mb-6">
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
                  value={principal.toLocaleString("en-IN")} // Display formatted number without currency symbol
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
                value={[principal]} // Wrap in an array
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
                step={0.1}
                maxLength={2}
                className="w-20  p-2 text-right font-inter text-lg  rounded-md border border-gray-300"
              />
            </div>

            <div className="flex justify-between items-center w-full sm:grid sm:grid-cols-2 sm:items-center">
              <Label className="text-left font-inter text-lg ">
                Time Period (yrs):
              </Label>
              <Input
                type="number"
                name="timePeriod"
                value={formData.timePeriod}
                onChange={handleOnChange}
                required
                step={1}
                min={0}
                max={30}
                maxLength={2}
                className="w-20 p-2 text-right font-inter text-lg rounded-md border border-gray-300"
              />
            </div>

            <div className="flex justify-between items-center w-full sm:grid sm:grid-cols-2 sm:items-center">
              <Label className="text-left font-inter text-lg ">
                Interest Cumulate on:
              </Label>
              <Select
                name="interestCummOn"
                value={formData.interestCummOn}
                onValueChange={(value) =>
                  handleOnChange({ target: { name: "interestCummOn", value } })
                }
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select Basis:" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">Monthly Basis</SelectItem>
                  <SelectItem value="4">Quaterly Basis</SelectItem>
                  <SelectItem value="1">Yearly Basis</SelectItem>
                </SelectContent>
              </Select>
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
                step={0.1}
                min={0}
                max={50}
                maxLength={2}
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
                step={1}
                min={0}
                max={30}
                maxLength={2}
                className="w-20  p-2 text-right font-inter text-lg rounded-md border border-gray-300"
              />
            </div>
          </div>

          {/* Result Section */}
          <div className="p-2 mt-4 font-inter rounded-lg shadow-sm bg-pink-100">
            <div className="flex flex-col p-2 space-y-3">
              <h3 className="text-xl text-center font-semibold">
                Simple Interest Results
              </h3>
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
              <h3 className="text-xl text-center font-semibold">
                Compound Interest Results
              </h3>
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
    </div>
  );
}
export default FixFd_Calc;
