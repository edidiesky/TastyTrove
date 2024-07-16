import express from "express";
const router = express.Router();
import {
  adminMiddleware,
  authMiddleware,
} from "../middleware/authentication.js";

import {
  GetUserFavouriteRooms,
  CreateUserFavouriteRoom,
} from "../controllers/favouriteControllers.js";

// router.route("/buyer/:id").get(authMiddleware, GetSingleBuyerReservations);
router.route("/:id").post(authMiddleware, CreateUserFavouriteRoom);
router.route("/user").get(authMiddleware, GetUserFavouriteRooms);
export default router;
