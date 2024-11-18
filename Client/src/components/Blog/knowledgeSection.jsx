import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import toast from "react-hot-toast";

const KnowledgeSection = () => {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    tags: [],
  });

  const [data, setData] = useState([]);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/knowledge/getvideo"
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTagInputKeyPress = (e) => {
    // Check if the key is a comma (',') or space (' ')
    if (e.key === "," || e.key === " ") {
      e.preventDefault();
      if (tagInput.trim()) {
        setFormData({
          ...formData,
          tags: [...formData.tags, tagInput.trim()],
        });
        setTagInput(""); // Clear the tag input field after adding
      }
    }
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/api/v1/knowledge/addvideo",
        formData
      );
      fetchData();
      setFormData({ title: "", url: "", tags: [] });
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="container max-w-5xl p-3 mx-auto font-inter">
      <h2 className="text-3xl font-bold text-blue-500 mb-4">
        Knowledge Section
      </h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-5xl space-y-4 mb-6 shadow-lg rounded-lg p-1 pb-4 md:pl-2 md:pr-3"
      >
        <div className="w-[300px] md:w-full space-y-5 ">
          <div className="flex items-center gap-1 sm:gap-5">
            <Label className="w-1/5" htmlFor="title">
              Add Title:
            </Label>
            <Input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="flex items-center gap-1 sm:gap-5">
            <Label htmlFor="url" className="w-1/5">
              Enter URL:
            </Label>
            <Input
              type="text"
              name="url"
              id="url"
              value={formData.url}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="flex items-center gap-1 sm:gap-5">
            <Label htmlFor="tags" className="w-1/5">
              Tags:
            </Label>
            <Input
              type="text"
              name="tags"
              id="tagInput"
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyDown={handleTagInputKeyPress}
              className="border p-2 rounded flex-grow"
              placeholder="Enter tags and press space or comma"
            />
          </div>
          <div className="mt-2">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full mr-2 mt-1"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1 sm:gap-5">
            <Button type="submit">Submit</Button>
            <Button
              type="reset"
              onClick={() => setFormData({ title: "", url: "", tags: [] })}
            >
              Reset
            </Button>
          </div>
        </div>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border ">ID</th>
              <th className="px-4 py-2 border ">Title</th>
              <th className="px-4 py-2 border ">URL</th>
              <th className="px-4 py-2 border ">Tags</th>
              <th className="px-4 py-2 border ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) &&
              data.map((item, index) => (
                <tr key={item._id}>
                  <td className="px-4 py-2 border ">{index + 1}</td>
                  <td className="px-4 py-2 border w-3/5">{item.title}</td>
                  <td className="px-4 py-2 border ">
                    <Button
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Click Here
                    </Button>
                  </td>
                  <td className="px-4 py-2 border ">
                    {item.tags && item.tags.join(", ")}
                  </td>
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
  );
};

export default KnowledgeSection;
