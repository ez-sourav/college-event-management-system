import Participation from "../models/Participation.js";

// POST /participations
export function registerForEvent(req, res) {
  const userId = req.user.id;

  if (!userId) {
    res.status(401).json({ message: "User is not authenticated" });
  }
}

// GET /participations/me (QR codes)
export function getAllTickets(req, res) {}

// POST /participations/:id/checkin
export function checkInParticipant(req, res) {}
