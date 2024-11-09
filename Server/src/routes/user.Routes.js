import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  registerNewUser,
  loginUser,
  logOutUser,
  updatePassword,
  getUserDetails,
  refreshAccessToken,
} from "../controllers/Auth/loginUser.controller.js";
import { dashboard } from "../controllers/Dashboard.Controllers.js";

const router = Router();

// New routes for my controllers
router.route("/signUp").post(registerNewUser);
router.route("/login").post(loginUser);

//secured routes
router.route("/logout").post(verifyJWT, logOutUser);
router.route("/updatePassword").post(verifyJWT, updatePassword);
router.route("/userDetails").get(verifyJWT, getUserDetails);
router.route("/dashboard").get(verifyJWT, dashboard);

router.route("/refresh-token").get(refreshAccessToken);

export default router;
