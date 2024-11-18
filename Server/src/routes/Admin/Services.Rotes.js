import { Router } from "express";
import {
  addServices,
  getSerivices,
} from "../../controllers/Admin/Serivices.Controllers.js";

const router = Router();

//secured routes
router.route("/add-services").post(addServices);
router.route("/get-services").get(getSerivices);

export default router;
