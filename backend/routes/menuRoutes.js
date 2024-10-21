import express from "express";
const router = express.Router();
import {
  adminMiddleware,
  authMiddleware,
} from "../middleware/authentication.js";

import {
  CreateMenus,
  GetAllMenu,
  GetSingleMenu,
  DeleteMenu,
  GetAllAdminMenus,
  UpdateMenu,
} from "../controllers/menuControllers.js";

router
  .route("/")
  .get(GetAllMenu)
  .post(authMiddleware, adminMiddleware, CreateMenus);
router.route("/admin").get(authMiddleware, adminMiddleware, GetAllAdminMenus);
router
  .route("/:id")
  .get(GetSingleMenu)
  .delete(authMiddleware, adminMiddleware, DeleteMenu)
  .put(authMiddleware, adminMiddleware, UpdateMenu);

export default router;
