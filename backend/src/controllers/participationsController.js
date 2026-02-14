import Event from "../models/Event.js";
import Participation from "../models/Participation.js";

// POST /participations
export async function registerForEvent(req, res) {
  try {
    const userId = req.user.id;
    const eventId = req.body.eventId;

    if (!userId) {
      return res.status(401).json({ message: "User is not authenticated" });
    }

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event with this id not found!" });
    }

    const now = new Date();

    //  block registration if deadline passed
    if (now > event.registrationDeadline) {
      return res.status(400).json({
        success: false,
        message: "Registration deadline is over!",
      });
    }

    //  block registration if event already ended
    if (now > event.endTime) {
      return res.status(400).json({
        success: false,
        message: "Event already ended!",
      });
    }

    //  block if already registered
    const alreadyRegistered = await Participation.findOne({ eventId, userId });

    if (alreadyRegistered) {
      return res.status(400).json({
        success: false,
        message: "You are already registered for this event!",
      });
    }

    //  check max participants
    const totalRegistered = await Participation.countDocuments({ eventId });

    if (totalRegistered >= event.maxParticipants) {
      return res.status(400).json({
        success: false,
        message: "Event registration is full!",
      });
    }

    //  register
    await Participation.create({ eventId, userId });

    return res
      .status(201)
      .json({ success: true, message: "Successfully registered!" });
  } catch (error) {
    console.log("Register Error:", error);
    return res.status(500).json({ message: "Failed to register" });
  }
}


// GET /participations/me (QR codes)
export async function getAllTickets(req, res) {
  const userId = req.user.id;

  if (!userId) {
    res.status(401).json({ message: "User is not authenticated" });
  }

  const participations = await Participation.find({ userId }).populate({
    path: "eventId",
  });

  // remove assignments where event is deleted / null
  const validParticipations = participations.filter((a) => a.eventId);

  res.status(200).json({ tickets: validParticipations });
}

// POST /participations/:participationId/checkin
export async function checkInParticipant(req, res) {
  const eventId = req.body.eventId;

  const participationId = req.params.participationId;

  //check if participation exists;
  const participation = await Participation.findById(participationId).populate({
    path: "eventId",
  });

  if (!participation) {
    return res
      .status(404)
      .json({ success: false, messsage: "user is not a participant" });
  }

  //check if user already checked in
  if (participation.checkedIn) {
    return res
      .status(400)
      .json({ success: false, messsage: "user already checked in!" });
  }

  //check event
  if (participation.eventId.id !== eventId) {
    return res.status(400).json({
      success: false,
      messsage: "user is not participant of this event",
    });
  }

  //check if event expired
  if (new Date() > participation.eventId.endTime) {
    return res.status(400).json({
      success: false,
      messsage: "event already expired!",
    });
  }

  //if everything is okay
  await Participation.findByIdAndUpdate(
    participationId,
    {
      checkedIn: true,
      checkInTime: new Date(),
    },
    { new: true },
  );

  return res
    .status(200)
    .json({ success: true, message: "successfully checked in!" });
}
