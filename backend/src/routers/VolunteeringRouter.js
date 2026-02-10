import express from "express";
import {
  assignVolunteer,
  getAllVolunteers,
  getAssignedEvents,
} from "../controllers/VolunteeringController";

const router = express.Router();

router.route("/").get(getAllVolunteers).post(assignVolunteer);
router.route("/me").get(getAssignedEvents);

export default router;
