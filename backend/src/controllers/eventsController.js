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
      const now = new Date();

      // participants will see only events that are not expired
      events = await Event.find({
        endTime: { $gte: now },
      }).sort({ startTime: 1 });
    }

    const eventsWithCounts = await Promise.all(
      events.map(async (event) => {
        const registrationsCount = await Participation.countDocuments({
          eventId: event._id,
        });

        return {
          ...event._doc,
          registrationsCount,
        };
      }),
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
    res.status(500).json({ message: "Failed to create event" + error.message });
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

    //  delete all participations of this event
    await Participation.deleteMany({ eventId });

    //  delete all volunteering assignments of this event
    await Volunteering.deleteMany({ eventId });

    //  finally delete event itself
    await Event.deleteOne({ _id: eventId });

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully from everywhere!",
    });
  } catch (error) {
    console.log("Delete Event Error:", error);
    return res.status(500).json({ message: "Failed to delete event" });
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
    const userId = req.user.id;

    const event = await Event.findById(eventId).populate(
      "createdBy",
      "name email",
    );

    if (!event) {
      return res.status(404).json({ message: "Event with this id not found" });
    }

    const hasRegistered = !!(await Participation.findOne({ eventId, userId }));

    const now = new Date();

    const isExpired = now > event.endTime;
    const isRegistrationClosed = now > event.registrationDeadline;

    res.status(200).json({
      ...event.toObject(),
      hasRegistered,
      isExpired,
      isRegistrationClosed,
    });
  } catch (error) {
    console.log("Get Event Details Error:", error);
    res.status(500).json({ message: "Failed to fetch event details" });
  }
}

