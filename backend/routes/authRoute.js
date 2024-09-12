import express from "express";
const router = express.Router();
import {
  adminMiddleware,
  authMiddleware,
} from "../middleware/authentication.js";

import {
  registerUser,
  LoginUser,
  BecomeASeller,
  LogoutUser,
} from "../controllers/authController.js";

router.post("/register", registerUser);
router.post("/becomeASeller", BecomeASeller);
router.post("/login", LoginUser);
router.post("/logout", LogoutUser);

export default router;
