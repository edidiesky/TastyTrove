import express from "express";
const router = express.Router();

import {
  authMiddleware,
} from "../middleware/authentication.js";
import {
  createMessage,
} from "../controllers/messageControllers.js"

router.route("/:id").post(authMiddleware, createMessage);

export default router;
