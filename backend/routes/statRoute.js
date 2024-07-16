import express from "express";
const router = express.Router();
import {
  adminMiddleware,
  authMiddleware,
} from "../middleware/authentication.js";
import { GetStatisticsDataForAdmin } from "../controllers/statisticsController.js";

router.get("/", authMiddleware, adminMiddleware, GetStatisticsDataForAdmin);
export default router;
