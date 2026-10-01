const express = require("express");
const mongoose = require("mongoose");

const Booking = require("../models/Booking");
const Session = require("../models/Session");

const router = express.Router();

/*
 GET /api/member-details/:userId

 Returns:
 - booking totals
 - attendance totals
 - recent bookings
 - related session information
*/
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const bookings = await Booking.find({
      userId: String(userId),
    }).lean();

    const sessionIds = bookings
      .map((booking) => booking.sessionId)
      .filter(Boolean)
      .map((id) => String(id))
      .filter((id) => mongoose.Types.ObjectId.isValid(id));

    let sessions = [];

    if (sessionIds.length > 0) {
      sessions = await Session.find({
        _id: {
          $in: sessionIds.map(
            (id) => new mongoose.Types.ObjectId(id)
          ),
        },
      }).lean();
    }

    const sessionMap = {};

    sessions.forEach((session) => {
      sessionMap[String(session._id)] = session;
    });

    const enrichedBookings = bookings.map((booking) => {
      const status =
        booking.attendanceStatus ||
        booking.status ||
        "confirmed";

      return {
        ...booking,
        id: String(booking._id),
        session:
          sessionMap[String(booking.sessionId)] || null,
        attendanceStatus: status,
      };
    });

    const attended = enrichedBookings.filter(
      (booking) =>
        booking.attendanceStatus === "attended"
    ).length;

    const noShows = enrichedBookings.filter(
      (booking) =>
        booking.attendanceStatus === "no_show" ||
        booking.attendanceStatus === "no-show"
    ).length;

    const confirmed = enrichedBookings.filter(
      (booking) =>
        booking.attendanceStatus === "confirmed" ||
        booking.attendanceStatus === "booked"
    ).length;

    res.json({
      userId,
      stats: {
        totalBookings: enrichedBookings.length,
        attended,
        noShows,
        confirmed,
      },
      bookings: enrichedBookings,
    });
  } catch (error) {
    console.error("Member details error:", error);

    res.status(500).json({
      message: "Unable to load member details",
      error: error.message,
    });
  }
});

module.exports = router;
