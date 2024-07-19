import { Router } from "express";
import { initializeTable, reserveTable } from "../controllers/reservationController.js";

const router = Router();

router.post("/initialize", initializeTable);
router.post("/reserve", reserveTable);

export default router;
