import express from "express";
const router = express.Router();
import {
  adminMiddleware,
  authMiddleware,
} from "../middleware/authentication.js";

import {
  CreateNotifications,
  DeleteNotification,
  GetAllNotifications,
  UpdateNotification,
} from "../controllers/notificationControllers.js";

router
  .route("/")
  .post(authMiddleware, CreateNotifications);
router.route("/admin").get(authMiddleware, adminMiddleware, GetAllNotifications);
router.route("/admin/:id").get(authMiddleware, adminMiddleware, DeleteNotification).
  put(authMiddleware, adminMiddleware, UpdateNotification);

export default router;
