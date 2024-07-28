import express from "express";
const router = express.Router();

import {
  adminMiddleware,
  authMiddleware,
} from "../middleware/authentication.js";
import {
  createConversation,
  getUserConversation,
  DeleteConversation,
} from "../controllers/conversationControllers.js";

router.route("").post(authMiddleware, createConversation);

router
  .route("/:id")
  .get(getUserConversation)
  .delete(authMiddleware, DeleteConversation);
  // .post(authMiddleware, UpdateConversation);
export default router;
