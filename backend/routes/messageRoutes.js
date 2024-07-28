import express from "express";
const router = express.Router();

import {
  adminMiddleware,
  authMiddleware,
} from "../middleware/authentication.js";
import {
  createMessage,
  DeleteMessage,
  getAllMessageofAConversation,
  UpdateMessage,
} from "../controllers/messageControllers.js"

router.route("").post(authMiddleware, createMessage);

router
  .route("/:id")
  .get(getAllMessageofAConversation)
  .delete(authMiddleware, DeleteMessage)
  .post(authMiddleware, UpdateMessage);
export default router;
