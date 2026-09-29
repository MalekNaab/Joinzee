const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    organisationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organisation",
      required: true
    },

    title: {
      type: String,
      required: true
    },

    category: String,
    description: String,
    image: String,

    date: String,
    time: String,

    location: String,

    capacity: {
      type: Number,
      default: 0
    },

    booked: {
      type: Number,
      default: 0
    },

    price: {
      type: Number,
      default: 0
    },

    isFree: {
      type: Boolean,
      default: true
    },

    ageRange: String,

    status: {
      type: String,
      enum: ["draft", "published", "cancelled", "completed"],
      default: "draft"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Session", sessionSchema);
