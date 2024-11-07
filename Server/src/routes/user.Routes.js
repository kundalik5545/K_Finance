import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  registerNewUser,
  loginUser,
  logOutUser,
  updatePassword,
  getUserDetails,
} from "../controllers/Auth/loginUser.controller.js";

const router = Router();

// New routes for my controllers
router.route("/signUp").post(registerNewUser);
router.route("/login").post(loginUser);

//secured routes
router.route("/logout").post(verifyJWT, logOutUser);
router.route("/updatePassword").post(verifyJWT, updatePassword);
router.route("/userDetails").get(verifyJWT, getUserDetails);

export default router;
