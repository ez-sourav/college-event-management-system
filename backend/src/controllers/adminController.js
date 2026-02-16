import Participation from "../models/Participation.js";
import Volunteering from "../models/Volunteering.js";

export const getDashboardStats = async (req, res) => {
  try {
    // ✅ Total Registrations (only existing events)
    const registrationsData = await Participation.aggregate([
      {
        $lookup: {
          from: "events",
          localField: "eventId",
          foreignField: "_id",
          as: "event",
        },
      },
      { $unwind: "$event" }, // removes deleted event participations
      { $count: "total" },
    ]);

    const totalRegistrations =
      registrationsData.length > 0 ? registrationsData[0].total : 0;

    // ✅ Live Attendance (only existing events)
    const attendanceData = await Participation.aggregate([
      { $match: { checkedIn: true } },
      {
        $lookup: {
          from: "events",
          localField: "eventId",
          foreignField: "_id",
          as: "event",
        },
      },
      { $unwind: "$event" },
      { $count: "total" },
    ]);

    const liveAttendance =
      attendanceData.length > 0 ? attendanceData[0].total : 0;

    // ✅ Active Volunteers (only existing users)
    const volunteersData = await Volunteering.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" }, // removes deleted users
      {
        $group: {
          _id: "$userId",
        },
      },
      { $count: "total" },
    ]);

    const volunteersActive =
      volunteersData.length > 0 ? volunteersData[0].total : 0;

    // ✅ Revenue = entryFee * participants count (only existing events)
    const revenueData = await Participation.aggregate([
      {
        $group: {
          _id: "$eventId",
          totalParticipants: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "events",
          localField: "_id",
          foreignField: "_id",
          as: "event",
        },
      },
      { $unwind: "$event" }, // removes deleted events
      {
        $project: {
          totalRevenue: {
            $multiply: ["$totalParticipants", "$event.entryFee"],
          },
        },
      },
      {
        $group: {
          _id: null,
          revenueCollected: { $sum: "$totalRevenue" },
        },
      },
    ]);

    const revenueCollected =
      revenueData.length > 0 ? revenueData[0].revenueCollected : 0;

    // ✅ Final Response
    return res.status(200).json({
      totalRegistrations,
      liveAttendance,
      volunteersActive,
      revenueCollected,
    });
  } catch (error) {
    console.log("Dashboard Stats Error:", error);
    return res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};
