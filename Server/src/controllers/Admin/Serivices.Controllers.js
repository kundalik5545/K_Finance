import { asyncHandler } from "../../utils/asyncHandler.js";
import { Service } from "../../models/Services.Models.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const addServices = asyncHandler(async (req, res, next) => {
  const { cardTitle, cardUrl, cardIcon } = req.body;
  console.log(
    `Card title is ${cardTitle} and card url is ${cardUrl} and card icon is ${cardIcon}`
  );

  // 1. Check all fields are provoided
  if (!cardTitle || !cardUrl || !cardIcon) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "All fields are required!"));
  }

  // 2. Check if the service already exists
  const existingService = await Service.findOne({ cardUrl });

  if (existingService) {
    return res
      .status(409)
      .json(new ApiResponse(409, null, "Service is already exist."));
  }

  // 3. Create a new service
  const service = await Service.create({
    cardTitle,
    cardUrl,
    cardIcon,
  });

  // 4. Fetch the created service if created successfully
  const createdService = await Service.findById(service._id).select();

  //If created Service fails
  if (!createdService) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          "Something went wrong while creating the servuce."
        )
      );
  }
  return res
    .status(201)
    .json(
      new ApiResponse(201, createdService, "New Service added successfully!")
    );
});

//Get all services
const getSerivices = asyncHandler(async (req, res, next) => {
  const d = await Service.find();

  return res.status(200).json(new ApiResponse(200, d, "All records fetched!"));
});
export { addServices, getSerivices };
