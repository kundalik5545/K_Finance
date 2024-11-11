import { asyncHandler } from "../utils/asyncHandler.js";
import { Knowledge } from "../models/Knowledge.Models.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const saveNewVideo = asyncHandler(async (req, res) => {
  try {
    const { title, url, tags } = req.body;
    if (!title || !url || !tags) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "All fields are required"));
    }
    const result = new Knowledge(req.body);
    await result.save({ validateBeforeSave: false });
    res
      .status(201)
      .json(new ApiResponse(201, result, "Data saved successfully"));
  } catch (error) {
    res.status(400).json(new ApiResponse(400, null, "Error while saving."));
  }
});

const getVideos = asyncHandler(async (req, res) => {
  try {
    const response = await Knowledge.find();
    if (response.length > 0) {
      return res
        .status(200)
        .json(new ApiResponse(200, response, "Data fetched successfully"));
    } else {
      return res.status(404).json(new ApiResponse(404, null, "No data found"));
    }
  } catch (error) {
    res.status(500).json(new ApiResponse(500, null, "Error fetching data."));
  }
});

export { saveNewVideo, getVideos };
