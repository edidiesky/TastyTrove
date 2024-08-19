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
} from "../controllers/authController.js";

router.post("/register", registerUser);
router.post("/becomeASeller", BecomeASeller);
router.post("/login", LoginUser);

export default router;
