import express from "express";
import {
  createAndAssignVolunteer,
  getAllVolunteers,
  getAssignedEvents,
  assignEventsToExistingVolunteer,
  getVolunteerAssignments,
} from "../controllers/VolunteeringController.js";

import { requireRole } from "../middlewares/requireRole.js";

const router = express.Router();

router
  .route("/")
  .get(requireRole("ADMIN"), getAllVolunteers)
  .post(requireRole("ADMIN"), createAndAssignVolunteer);

router.route("/assign").post(requireRole("ADMIN"), assignEventsToExistingVolunteer);

router.route("/me").get(requireRole("VOLUNTEER"), getAssignedEvents);

// EW ROUTE (Admin check volunteer assigned events)
router.route("/:userId").get(requireRole("ADMIN"), getVolunteerAssignments);

export default router;
