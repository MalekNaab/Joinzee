const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    accountType: {
      type: String,
      enum: ["parent", "young_person"],
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

    fullName: {
      type: String,
      required: true
    },

    phone: String,

    dateOfBirth: String,

    ageRange: String,

    gender: String,

    postcode: String,

    schoolOrCollege: String,

    interests: [String],

    children: [
      {
        name: String,
        dateOfBirth: String,
        age: Number,
        gender: String,
        school: String,
        interests: [String]
      }
    ],

    notificationPreferences: {
      push: Boolean,
      email: Boolean,
      sms: Boolean
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
