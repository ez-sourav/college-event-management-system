import express from "express";
import {
  createAndAssignVolunteer,
  getAllVolunteers,
  getAssignedEvents,
} from "../controllers/VolunteeringController.js";
import { requireRole } from "../middlewares/requireRole.js";

const router = express.Router();

router
  .route("/")
  .get(requireRole("ADMIN"), getAllVolunteers)
  .post(requireRole("ADMIN"), createAndAssignVolunteer);

router.route("/me").get(requireRole("VOLUNTEER"), getAssignedEvents);

export default router;
