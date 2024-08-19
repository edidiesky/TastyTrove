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
  getAllUserConversation,
} from "../controllers/conversationControllers.js";

router.route("").post(authMiddleware, createConversation);
router.route("").get(authMiddleware, getAllUserConversation);

router
  .route("/:id")
  .get(authMiddleware,getUserConversation)
  .delete(authMiddleware, DeleteConversation);
  // .post(authMiddleware, UpdateConversation);
export default router;
