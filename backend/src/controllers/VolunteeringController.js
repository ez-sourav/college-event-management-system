import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Volunteering from "../models/Volunteering.js";
import Participation from "../models/Participation.js";

// POST /volunteering (create volunteer + assign events)
export async function createAndAssignVolunteer(req, res) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { events, name, email, password } = req.body;

    if (!events || !Array.isArray(events) || events.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least 1 event is required",
      });
    }

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, Email and Password are required",
      });
    }

    // check duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Volunteer already exists with this email",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [volunteer] = await User.create(
      [
        {
          name,
          email,
          passwordHash,
          role: "VOLUNTEER",
        },
      ],
      { session },
    );

    await Promise.all(
      events.map((eventId) =>
        Volunteering.create([{ userId: volunteer._id, eventId }], { session }),
      ),
    );

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      success: true,
      message: "Successfully created and assigned events to volunteer",
    });
  } catch (error) {
    console.log("Create Volunteer Error:", error);

    await session.abortTransaction();
    session.endSession();

    return res.status(500).json({
      success: false,
      message: "Error creating and assigning events to volunteer",
    });
  }
}

//  GET /volunteering (all volunteers list)
export async function getAllVolunteers(req, res) {
  try {
    const volunteers = await User.find({ role: "VOLUNTEER" }).select(
      "_id name email",
    );

    return res.status(200).json({
      success: true,
      volunteers,
    });
  } catch (error) {
    console.log("Get All Volunteers Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch volunteers",
    });
  }
}

//   POST /volunteering/assign (assign events to existing volunteer)
export async function assignEventsToExistingVolunteer(req, res) {
  try {
    const { userId, events } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Volunteer userId is required",
      });
    }

    if (!events || !Array.isArray(events) || events.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Events array is required",
      });
    }

    // check volunteer exists
    const volunteer = await User.findById(userId);
    if (!volunteer || volunteer.role !== "VOLUNTEER") {
      return res.status(404).json({
        success: false,
        message: "Volunteer not found",
      });
    }

    // create new assignments
    const assignments = events.map((eventId) => ({
      userId,
      eventId,
    }));

    try {
      await Volunteering.insertMany(assignments, { ordered: false });
    } catch (error) {
      // ignore duplicate assignment error
      if (error.code !== 11000) throw error;
    }

    return res.status(200).json({
      success: true,
      message: "Events assigned successfully!",
    });
  } catch (error) {
    console.log("Assign Events Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to assign events",
    });
  }
}

// GET /volunteering/me (assigned events)
export async function getAssignedEvents(req, res) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "User is not authenticated" });
    }

    const assignments = await Volunteering.find({ userId }).populate("eventId");

    const validAssignments = assignments.filter((a) => a.eventId);

    const now = new Date();

    const eventsWithStats = await Promise.all(
      validAssignments.map(async (assignment) => {
        const event = assignment.eventId;

        const totalCheckedIn = await Participation.countDocuments({
          eventId: event._id,
          checkedIn: true,
        });

        let status = "UPCOMING";

        if (now > event.endTime) status = "COMPLETED";
        else if (now >= event.startTime && now <= event.endTime)
          status = "LIVE";

        return {
          ...event.toObject(),
          totalCheckedIn,
          status,
        };
      })
    );

    return res.status(200).json({
      assignedEvents: eventsWithStats,
    });
  } catch (error) {
    console.log("Get Assigned Events Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}


// GET /volunteering/:userId  (Admin fetch volunteer assigned events)
export async function getVolunteerAssignments(req, res) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Volunteer userId is required",
      });
    }

    const volunteer = await User.findById(userId);

    if (!volunteer || volunteer.role !== "VOLUNTEER") {
      return res.status(404).json({
        success: false,
        message: "Volunteer not found",
      });
    }

    const assignments = await Volunteering.find({ userId }).populate("eventId");

    const assignedEvents = assignments
      .filter((a) => a.eventId)
      .map((a) => a.eventId);

    return res.status(200).json({
      success: true,
      assignedEvents,
      assignedEventIds: assignedEvents.map((e) => e._id),
    });
  } catch (error) {
    console.log("Get Volunteer Assignments Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch assigned events",
    });
  }
}

