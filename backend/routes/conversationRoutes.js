import express from "express";
const router = express.Router();

import { authMiddleware } from "../middleware/authentication.js";
import {
  createConversation,
  getSingleUserConversation,
  DeleteConversation,
  getAllUserConversation,
} from "../controllers/conversationControllers.js";

router.route("").post(authMiddleware, createConversation);
router.route("").get(authMiddleware, getAllUserConversation);

router
  .route("/:id")
  .get(authMiddleware, getSingleUserConversation)
  .delete(authMiddleware, DeleteConversation);
export default router;
