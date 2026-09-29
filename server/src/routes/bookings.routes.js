const express = require("express");
const mongoose = require("mongoose");

const Booking = require("../models/Booking");
const Session = require("../models/Session");
const User = require("../models/User");

const router = express.Router();

const validId = (id) => mongoose.Types.ObjectId.isValid(id);

// ============================================================
// GET ALL BOOKINGS FOR ONE SESSION
// GET /api/bookings/session/:sessionId
// ============================================================

router.get("/session/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!validId(sessionId)) {
      return res.status(400).json({
        message: "Invalid session ID",
      });
    }

    const bookings = await Booking.find({
      sessionId,
      status: { $ne: "cancelled" },
    })
      .populate(
        "userId",
        "name firstName lastName email accountType"
      )
      .sort({ createdAt: 1 })
      .lean();

    res.json(bookings);
  } catch (error) {
    console.error("Get session bookings error:", error);

    res.status(500).json({
      message: "Could not load session bookings",
      error: error.message,
    });
  }
});


// ============================================================
// GET BOOKING COUNT FOR SESSION
// GET /api/bookings/session/:sessionId/count
// ============================================================

router.get("/session/:sessionId/count", async (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!validId(sessionId)) {
      return res.status(400).json({
        message: "Invalid session ID",
      });
    }

    const session = await Session.findById(sessionId).lean();

    if (!session) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    const booked = await Booking.countDocuments({
      sessionId,
      status: {
        $in: ["booked", "attended"],
      },
    });

    res.json({
      sessionId,
      booked,
      capacity: session.capacity || 0,
      available: Math.max(
        (session.capacity || 0) - booked,
        0
      ),
    });
  } catch (error) {
    console.error("Booking count error:", error);

    res.status(500).json({
      message: "Could not get booking count",
      error: error.message,
    });
  }
});


// ============================================================
// GET BOOKINGS FOR USER
// GET /api/bookings/user/:userId
// ============================================================

router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!validId(userId)) {
      return res.status(400).json({
        message: "Invalid user ID",
      });
    }

    const bookings = await Booking.find({
      userId,
      status: { $ne: "cancelled" },
    })
      .populate("sessionId")
      .sort({ createdAt: -1 })
      .lean();

    res.json(bookings);
  } catch (error) {
    console.error("Get user bookings error:", error);

    res.status(500).json({
      message: "Could not load bookings",
      error: error.message,
    });
  }
});


// ============================================================
// CREATE BOOKING
// POST /api/bookings
// ============================================================

router.post("/", async (req, res) => {
  try {
    const { sessionId, userId } = req.body;

    if (!sessionId || !userId) {
      return res.status(400).json({
        message: "sessionId and userId are required",
      });
    }

    if (!validId(sessionId) || !validId(userId)) {
      return res.status(400).json({
        message: "Invalid session or user ID",
      });
    }

    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (session.status === "cancelled") {
      return res.status(400).json({
        message: "This session has been cancelled",
      });
    }

    if (session.status === "draft") {
      return res.status(400).json({
        message: "Draft sessions cannot be booked",
      });
    }

    const activeBookings = await Booking.countDocuments({
      sessionId,
      status: {
        $in: ["booked", "attended"],
      },
    });

    if (
      session.capacity &&
      activeBookings >= session.capacity
    ) {
      return res.status(409).json({
        message: "Session is full",
      });
    }

    let booking = await Booking.findOne({
      sessionId,
      userId,
    });

    if (booking) {
      if (booking.status !== "cancelled") {
        return res.status(409).json({
          message: "User has already booked this session",
        });
      }

      booking.status = "booked";
      booking.bookedAt = new Date();

      await booking.save();
    } else {
      booking = await Booking.create({
        sessionId,
        userId,
      });
    }

    const populated = await Booking.findById(booking._id)
      .populate(
        "userId",
        "name firstName lastName email accountType"
      )
      .populate("sessionId");

    res.status(201).json(populated);
  } catch (error) {
    console.error("Create booking error:", error);

    res.status(500).json({
      message: "Could not create booking",
      error: error.message,
    });
  }
});


// ============================================================
// UPDATE ATTENDANCE
// PATCH /api/bookings/:bookingId/status
// ============================================================

router.patch("/:bookingId/status", async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const allowed = [
      "booked",
      "attended",
      "no_show",
      "cancelled",
    ];

    if (!validId(bookingId)) {
      return res.status(400).json({
        message: "Invalid booking ID",
      });
    }

    if (!allowed.includes(status)) {
      return res.status(400).json({
        message: "Invalid booking status",
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      {
        new: true,
        runValidators: true,
      }
    ).populate(
      "userId",
      "name firstName lastName email accountType"
    );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.json(booking);
  } catch (error) {
    console.error("Update booking error:", error);

    res.status(500).json({
      message: "Could not update booking",
      error: error.message,
    });
  }
});


// ============================================================
// DELETE TEST BOOKING
// DELETE /api/bookings/:bookingId
// ============================================================

router.delete("/:bookingId", async (req, res) => {
  try {
    const { bookingId } = req.params;

    if (!validId(bookingId)) {
      return res.status(400).json({
        message: "Invalid booking ID",
      });
    }

    const booking = await Booking.findByIdAndDelete(
      bookingId
    );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.json({
      message: "Booking deleted",
    });
  } catch (error) {
    console.error("Delete booking error:", error);

    res.status(500).json({
      message: "Could not delete booking",
      error: error.message,
    });
  }
});

module.exports = router;
