import express from "express";
const router = express.Router();
import {
  adminMiddleware,
  authMiddleware,
} from "../middleware/authentication.js";
import {
  GetUserById,
  GetAllUser,
  UpdateUser,
  DeleteUser,
  AdminUpdateUser,
  GetUsersProfile,
} from "../controllers/userControllers.js";

router.get("/", authMiddleware, adminMiddleware, GetAllUser);
// router.get('/stats', authMiddleware, adminMiddleware, AggregateUserStats)
router
  .route("/:id")
  .delete(authMiddleware, adminMiddleware, DeleteUser)
  .get(authMiddleware, GetUserById)
  .put(authMiddleware, adminMiddleware, AdminUpdateUser);

router
  .route("/profile/:id")
  .put(authMiddleware, UpdateUser)
  .get(GetUsersProfile);
export default router;
