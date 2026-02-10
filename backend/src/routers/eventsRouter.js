import express from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventAnalytics,
  getEventDetails,
  getEventParticipants,
  getEventVolunteers,
  updateEvent,
} from "../controllers/eventsController";

const router = express.Router();

router.route("/").get(getAllEvents).post(createEvent);
router
  .route("/:eventId")
  .get(getEventDetails)
  .patch(updateEvent)
  .delete(deleteEvent);
router.route("/:eventId/participants").get(getEventParticipants);
router.route("/:eventId/analytics").get(getEventAnalytics);
router.route("/:eventId/volunteers").get(getEventVolunteers);

export default router;
