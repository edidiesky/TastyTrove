import express from "express";
const router = express.Router();

import {
  adminMiddleware,
  authMiddleware,
} from "../middleware/authentication.js";
import {
  createConversation,
  getSingleConversation,
  DeleteConversation,
  getAllConversation,
  UpdateConversation,
} from "../controllers/conversationControllers.js";

router.route("").post(authMiddleware, createConversation);

router
  .route("/:id")
  .get(getSingleConversation)
  .delete(authMiddleware, DeleteConversation)
  .post(authMiddleware, UpdateConversation);
export default router;
