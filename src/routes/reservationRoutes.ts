import { Router } from "express";
import {
  cancelReservation,
  initializeTable,
  reserveTable,
} from "../controllers/reservationController.js";

const router = Router();

router.post("/initialize", initializeTable);
router.post("/reserve", reserveTable);
router.post("/cancel", cancelReservation);

export default router;
