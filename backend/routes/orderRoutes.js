import express from "express"
const router = express.Router()
import {
  CreatePayment,
  GetPaymentHistoryForAdmin,
  UpdatePaymentToFailed,
  GetSinglePaymentDetails,
  UpdatePaymentToSuccess,
  UpdatePaymentToDelivered,
} from "../controllers/orderControllers.js";
import {
    adminMiddleware,
    authMiddleware
} from '../middleware/authentication.js'


router.route("/").post(authMiddleware, CreatePayment);
router.get("/history", authMiddleware,adminMiddleware, GetPaymentHistoryForAdmin);
router.put("/history/success/:id", authMiddleware, UpdatePaymentToSuccess);
router.put(
  "/history/delivery/success/:id",
  authMiddleware,
  UpdatePaymentToDelivered
);
router.put("/history/failed/:id", authMiddleware, UpdatePaymentToFailed);
router.get("/history/:id", authMiddleware, GetSinglePaymentDetails);


export default router


