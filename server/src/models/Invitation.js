const mongoose = require("mongoose");

const invitationSchema = new mongoose.Schema(
  {
    organisationId: {
      type: String,
      default: null,
      index: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },

    role: {
      type: String,
      enum: ["participant", "coach"],
      default: "participant",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "cancelled",
      ],
      default: "pending",
      index: true,
    },

    invitedAt: {
      type: Date,
      default: Date.now,
    },

    acceptedAt: {
      type: Date,
      default: null,
    },

    cancelledAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

invitationSchema.index({
  organisationId: 1,
  email: 1,
  status: 1,
});

module.exports =
  mongoose.models.Invitation ||
  mongoose.model(
    "Invitation",
    invitationSchema
  );
