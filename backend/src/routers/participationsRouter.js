import express from "express";
import {
  checkInParticipant,
  getAllTickets,
  registerForEvent,
} from "../controllers/participationsController";

const router = express.Router();

router.route("/").post(registerForEvent);
router.route("/me").get(getAllTickets);
router.route("/:participationId/checkIn").post(checkInParticipant);

export default router;
