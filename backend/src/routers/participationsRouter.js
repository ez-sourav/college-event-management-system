import express from "express";
import {
  checkInParticipant,
  getAllTickets,
  registerForEvent,
} from "../controllers/participationsController.js";
import { requireRole } from "../middlewares/requireRole.js";

const router = express.Router();

router.route("/").post(requireRole("STUDENT"), registerForEvent);
router.route("/me").get(requireRole("STUDENT"), getAllTickets);
router
  .route("/:participationId/checkIn")
  .post(requireRole("VOLUNTEER"), checkInParticipant);

export default router;
