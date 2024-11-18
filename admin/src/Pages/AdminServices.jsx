import { LogInContext } from "@/App";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, BadgePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import toast from "react-hot-toast";
function AdminServices() {
  const { isLoggedIn } = useContext(LogInContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cardTitle: "",
    cardUrl: "",
    cardIcon: "",
  });
  const [displayForm, setdisplayForm] = useState(false);
  const [data, setData] = useState();

  const handleDisplayForm = () => {
    setdisplayForm(!displayForm);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:8000/api/v1/admin/services/add-services",
      formData
    );

    if (res.data.success) {
      setFormData({ cardTitle: "", cardUrl: "", cardIcon: "" });
      fetchData();
      setdisplayForm(false);
      toast.success(res.data.message);
    }
  };

  const fetchData = async () => {
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
    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-3 text-gray-800 bg-white  m-3 mb-6">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6 text-left font-inter">
        Welcome to <span className="text-black">Admin Services</span>
      </h2>

      <div className="main">
        <div className="hero-sec space-y-2 flex flex-col">
          <Button onClick={handleDisplayForm} className="w-24 sm:w-36">
            <BadgePlus />
            Add
          </Button>

          {displayForm ? (
            <form
              onSubmit={handleFormSubmit}
              className="space-y-3 w-96 sm:w-[500px] shadow-lg p-4 rounded-lg"
            >
              <span className="close-form-btn flex justify-end">
                <Button
                  variant="outline"
                  onClick={handleDisplayForm}
                  className=""
                >
                  <X />
                </Button>
              </span>
              <div className="cardTitle flex items-center ">
                <Label className="w-1/4" htmlFor="cardTitle">
                  Add Title:
                </Label>
                <Input
                  type="text"
                  name="cardTitle"
                  required
                  value={formData.cardTitle}
                  onChange={handleOnChange}
                  placeholder="Enter Card Title"
                  className="w-2/3 border p-2 rounded"
                />
              </div>
              <div className="cardUrl flex items-center ">
                <Label className="w-1/4" htmlFor="cardUrl">
                  Add Url:
                </Label>
                <Input
                  type="text"
                  name="cardUrl"
                  required
                  value={formData.cardUrl}
                  onChange={handleOnChange}
                  placeholder="Enter Card URL"
                  className="w-2/3 border p-2 rounded"
                />
              </div>
              <div className="cardIcon flex items-center">
                <Label className="w-1/4" htmlFor="cardIcon">
                  Add Icon:
                </Label>
                <Input
                  type="text"
                  name="cardIcon"
                  required
                  value={formData.cardIcon}
                  onChange={handleOnChange}
                  placeholder="Enter Card Icon name from lucid"
                  className="w-2/3 border p-2 rounded"
                />
              </div>
              <div className="flex items-center gap-1 sm:gap-5">
                <Button type="submit">Submit</Button>
                <Button
                  type="reset"
                  onClick={() =>
                    setFormData({ cardTitle: "", cardUrl: "", cardIcon: "" })
                  }
                >
                  Reset
                </Button>
              </div>
            </form>
          ) : (
            <></>
          )}
        </div>
        <div className="mid-sec pt-4">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="px-4 py-2 border ">ID</th>
                  <th className="px-4 py-2 border ">Card Title</th>
                  <th className="px-4 py-2 border ">Card URL</th>
                  <th className="px-4 py-2 border ">Card Icon</th>
                  <th className="px-4 py-2 border ">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(data) &&
                  data.map((item, index) => (
                    <tr key={item._id}>
                      <td className="px-4 py-2 border ">{index + 1}</td>
                      <td className="px-4 py-2 border w-3/5">
                        {item.cardTitle}
                      </td>
                      <td className="px-4 py-2 border ">
                        <Button
                          to={item.cardUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Click Here
                        </Button>
                      </td>
                      <td className="px-4 py-2 border ">{item.cardIcon}</td>
                      <td className="px-4 py-2 border flex flex-col justify-center items-center space-y-2">
                        <Button className="bg-blue-600 mr-2">Edit</Button>
                        <Button className="bg-red-600">Delete</Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bottom-sec"></div>
        <div className="info-sec"></div>
      </div>
    </div>
  );
}

export default AdminServices;
