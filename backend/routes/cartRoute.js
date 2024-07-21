import express from "express";
const router = express.Router();
import {
  adminMiddleware,
  authMiddleware,
} from "../middleware/authentication.js";

import {
  CreateUserCart,
  GetUserCart,
  GetSingleCart,
  UpdateCart,
  DeleteCart,
  GetAllCart,
} from "../controllers/cartControllers.js";

// router.route("/buyer/:id").get(authMiddleware, GetSingleBuyerCarts);
router.route("/user").get(authMiddleware, GetUserCart);
router.route("/history").get(authMiddleware, adminMiddleware, GetAllCart);
router
  .route("/:id")
  .post(authMiddleware, CreateUserCart)
  .get(authMiddleware, GetSingleCart)
  .delete(authMiddleware, DeleteCart)
  .put(authMiddleware, UpdateCart);
// .delete(authMiddleware, DeleteBuyerCarts);

export default router;
