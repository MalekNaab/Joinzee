const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["booked", "attended", "no_show", "cancelled"],
      default: "booked",
      index: true,
    },

    bookedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.index(
  { sessionId: 1, userId: 1 },
  { unique: true }
);

module.exports =
  mongoose.models.Booking ||
  mongoose.model("Booking", bookingSchema);
