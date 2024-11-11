import { Router } from "express";
const router = Router();

//importing routes
import {
  getVideos,
  saveNewVideo,
} from "../controllers/Knowledge.Controllers.js";

//Handling routes
router.route("/addvideo").post(saveNewVideo);
router.route("/getvideo").get(getVideos);

export default router;
