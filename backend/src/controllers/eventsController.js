// GET /events (all the events created by admin)
// POST /events
// PATCH /events/:eventId
// DELETE /events/:eventId

import Event from "../models/Event.js";
import Participation from "../models/Participation.js";
import Volunteering from "../models/Volunteering.js";

export async function getAllEvents(req, res) {
  //admin => event created by him
  //participant => all events

  let events;
  if (req.user.role === "ADMIN") {
    events = await Event.find({ createdBy: req.user.id }).sort({
      createdAt: -1,
    });
  } else {
    events = await Event.find().sort({ createdAt: -1 });
  }

  res.status(200).json({ events });
}
export async function createEvent(req, res) {
  const event = await Event.create({
    ...req.body,
    createdBy: req.user.id,
  });
  res.status(201).json({ success: true, event });
}
export function updateEvent(req, res) {}

export async function deleteEvent(req, res) {
  const eventId = req.params.eventId;

  const event = await Event.findById(eventId);

  if (!event)
    return res
      .status(404)
      .json({ message: "Event with this Id doesn't exist" });

  await Event.deleteOne({ id: eventId });

  res.status(200).json({ message: "successfully deleted!" });
}

// GET /events/:eventId/participants
// GET /events/:eventId/analytics
// GET /events/:eventId/volunteers

export async function getEventParticipations(req, res) {
  const eventId = req.params.eventId;

  const participations = await Participation.find({ eventId }).populate({
    path: "userId",
    exclude: "-passwordHash -role",
  });

  res.status(200).json({ participations });
}
export function getEventAnalytics(req, res) {}

export async function getEventVolunteers(req, res) {
  const eventId = req.params.eventId;

  const volunteers = await Volunteering.find({ eventId }).populate({
    path: "userId",
    exclude: "-passwordHash -role",
  });

  res.status(200).json({ volunteers });
}

// GET /events/:eventId
export async function getEventDetails(req, res) {
  const eventId = req.params.eventId;
  const userId = req.user.id;

  const event = await Event.findById(eventId);
  if (!event) {
    return res.status(404).json({ message: "Event with this id not found" });
  }

  const hasRegistered = !!(await Participation.findOne({ eventId, userId }));

  res.status(200).json({ ...event.toObject(), hasRegistered });
}
