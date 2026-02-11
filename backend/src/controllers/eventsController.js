// GET /events (all the events created by admin)
// POST /events
// PATCH /events/:eventId
// DELETE /events/:eventId

import Event from "../models/Event.js";
import Participation from "../models/Participation.js";
import Volunteering from "../models/Volunteering.js";

export async function getAllEvents(req, res) {
  try {
    let events;

    if (req.user.role === "ADMIN") {
      events = await Event.find({ createdBy: req.user.id }).sort({
        createdAt: -1,
      });
    } else {
      events = await Event.find().sort({ createdAt: -1 });
    }

    //  Add registrationsCount for each event
    const eventsWithCounts = await Promise.all(
      events.map(async (event) => {
        const registrationsCount = await Participation.countDocuments({
          eventId: event._id,
        });

        return {
          ...event._doc,
          registrationsCount,
        };
      })
    );

    res.status(200).json({ events: eventsWithCounts });
  } catch (error) {
    console.log("Fetch Events Error:", error);
    res.status(500).json({ message: "Failed to fetch events" });
  }
}

export async function createEvent(req, res) {
  try {
    const event = await Event.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.status(201).json({ success: true, event });
  } catch (error) {
    console.log("Create Event Error:", error);
    res.status(500).json({ message: "Failed to create event" });
  }
}

export function updateEvent(req, res) {}

export async function deleteEvent(req, res) {
  try {
    const eventId = req.params.eventId;

    const event = await Event.findById(eventId);

    if (!event) {
      return res
        .status(404)
        .json({ message: "Event with this Id doesn't exist" });
    }

    // delete
    await Event.deleteOne({ _id: eventId });

    res.status(200).json({ message: "successfully deleted!" });
  } catch (error) {
    console.log("Delete Event Error:", error);
    res.status(500).json({ message: "Failed to delete event" });
  }
}

// GET /events/:eventId/participants
// GET /events/:eventId/analytics
// GET /events/:eventId/volunteers

export async function getEventParticipations(req, res) {
  try {
    const eventId = req.params.eventId;

    const participations = await Participation.find({ eventId }).populate({
      path: "userId",
      select: "-passwordHash -role",
    });

    res.status(200).json({ participations });
  } catch (error) {
    console.log("Get Participations Error:", error);
    res.status(500).json({ message: "Failed to fetch participations" });
  }
}

export function getEventAnalytics(req, res) {}

export async function getEventVolunteers(req, res) {
  try {
    const eventId = req.params.eventId;

    const volunteers = await Volunteering.find({ eventId }).populate({
      path: "userId",
      select: "-passwordHash -role",
    });

    res.status(200).json({ volunteers });
  } catch (error) {
    console.log("Get Volunteers Error:", error);
    res.status(500).json({ message: "Failed to fetch volunteers" });
  }
}

// GET /events/:eventId
export async function getEventDetails(req, res) {
  try {
    const eventId = req.params.eventId;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event with this id not found" });
    }

    res.status(200).json({ event });
  } catch (error) {
    console.log("Get Event Details Error:", error);
    res.status(500).json({ message: "Failed to fetch event details" });
  }
}
