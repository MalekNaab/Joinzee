require("dotenv").config();

const mongoose = require("mongoose");

const Booking = require("./models/Booking");
const Session = require("./models/Session");
const User = require("./models/User");

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to MongoDB Atlas");

    const user = await User.findOne({
      email: "parent@test.com",
    });

    if (!user) {
      throw new Error(
        "parent@test.com was not found"
      );
    }

    let session = await Session.findOne({
      title: /Open Mat/i,
      status: { $ne: "cancelled" },
    }).sort({
      updatedAt: -1,
    });

    if (!session) {
      session = await Session.findOne({
        status: "published",
      }).sort({
        updatedAt: -1,
      });
    }

    if (!session) {
      throw new Error(
        "No published session was found"
      );
    }

    const booking =
      await Booking.findOneAndUpdate(
        {
          sessionId: session._id,
          userId: user._id,
        },
        {
          sessionId: session._id,
          userId: user._id,
          status: "booked",
          bookedAt: new Date(),
        },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        }
      );

    console.log("");
    console.log("==============================");
    console.log("TEST BOOKING CREATED");
    console.log("==============================");
    console.log("");
    console.log("Session:", session.title);
    console.log("User:", user.email);
    console.log("Booking:", booking._id.toString());
    console.log("");
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

run();
