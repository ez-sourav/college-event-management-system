import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Volunteering from "../models/Volunteering.js";

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
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: "User is not authenticated" });
  }

  const assignedEvents = await Volunteering.find({ userId }).populate({
    path: "eventId",
  });

  return res.status(200).json({ assignedEvents });
}
