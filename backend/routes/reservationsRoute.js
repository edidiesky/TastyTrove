import express from "express";
const router = express.Router();
import {
  adminMiddleware,
  authMiddleware,
} from "../middleware/authentication.js";

import {
  CreateUserReservation,
  GetUserReservation,
  GetSingleReservation,
  UpdateReservations,
  DeleteReservations,
  GetAllReservation,
} from "../controllers/reservationsControllers.js";

// router.route("/buyer/:id").get(authMiddleware, GetSingleBuyerReservations);
router.route("/user").get(authMiddleware, GetUserReservation);
router
  .route("/history")
  .get(authMiddleware, adminMiddleware, GetAllReservation);
router
  .route("/:id")
  .post(authMiddleware, CreateUserReservation)
  .get(authMiddleware, GetSingleReservation)
  .delete(authMiddleware, DeleteReservations)
  .put(authMiddleware, UpdateReservations);
// .delete(authMiddleware, DeleteBuyerReservations);

export default router;
