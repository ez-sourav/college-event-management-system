import express from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventAnalytics,
  getEventDetails,
  getEventParticipations,
  getEventVolunteers,
  updateEvent,
} from "../controllers/eventsController.js";
import { requireRole } from "../middlewares/requireRole.js";

const router = express.Router();

router.route("/").get(getAllEvents).post(requireRole("ADMIN"), createEvent);
router
  .route("/:eventId")
  .get(getEventDetails)
  .patch(requireRole("ADMIN"), updateEvent)
  .delete(requireRole("ADMIN"), deleteEvent);
router
  .route("/:eventId/participants")
  .get(requireRole("ADMIN"), getEventParticipations);
router
  .route("/:eventId/analytics")
  .get(requireRole("ADMIN"), getEventAnalytics);
router
  .route("/:eventId/volunteers")
  .get(requireRole("ADMIN"), getEventVolunteers);

export default router;
