import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Volunteering from "../models/Volunteering.js";
import Participation from "../models/Participation.js";

// POST /volunteering (assign volunteer)
export async function createAndAssignVolunteer(req, res) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { events, name, email, password } = req.body;

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
    await session.abortTransaction();
    session.endSession();

    return res.status(500).json({
      success: false,
      message: "Error creating and assigning events to volunteer",
    });
  }
}

// GET /volunteering (all volunteers created by admin)
export function getAllVolunteers(req, res) {}

// GET /volunteering/me (assigned events)
export async function getAssignedEvents(req, res) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "User is not authenticated" });
    }

    const assignments = await Volunteering.find({ userId }).populate("eventId");

    // remove assignments where event is deleted / null
    const validAssignments = assignments.filter((a) => a.eventId);

    const eventsWithStats = await Promise.all(
      validAssignments.map(async (assignment) => {
        const event = assignment.eventId;

        const totalCheckedIn = await Participation.countDocuments({
          eventId: event._id,
          checkedIn: true,
        });

        return {
          ...event.toObject(),
          totalCheckedIn,
        };
      }),
    );

    return res.status(200).json({
      assignedEvents: eventsWithStats,
    });
  } catch (error) {
    console.log("Get Assigned Events Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
