import Participation from "../models/Participation.js";
import Volunteering from "../models/Volunteering.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalRegistrations = await Participation.countDocuments();

    const liveAttendance = await Participation.countDocuments({
      checkedIn: true,
    });

    const volunteersActive = await Volunteering.countDocuments();

    // ✅ Revenue = entryFee * participation count (per event)
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
      { $unwind: "$event" },
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

    res.status(200).json({
      totalRegistrations,
      liveAttendance,
      volunteersActive,
      revenueCollected,
    });
  } catch (error) {
    console.log("Dashboard Stats Error:", error);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};
