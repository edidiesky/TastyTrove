import express from "express"
const router = express.Router()
import {
  CreateReview,
  GetReviewHistoryForAdmin,
  GetMenuReview,
} from "../controllers/reviewControllers.js";
import {
    adminMiddleware,
    authMiddleware
} from '../middleware/authentication.js'


router.route("/").post(authMiddleware, CreateReview);
router.get("/seller-history", authMiddleware,adminMiddleware, GetReviewHistoryForAdmin);
router.get("/history/:id", authMiddleware, GetMenuReview);


export default router


