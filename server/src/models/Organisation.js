const mongoose = require("mongoose");

const organisationSchema = new mongoose.Schema(
  {
    accountType: {
      type: String,
      default: "organisation"
    },

    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    phone: String,
    website: String,
    type: String,
    description: String,
    location: String,
    audience: [String],

    verified: {
      type: Boolean,
      default: false
    },

    verificationStatus: {
      type: String,
      default: "pending"
    },

    logo: String,
    images: [String]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Organisation", organisationSchema);
