require("dotenv").config();

const mongoose = require("mongoose");

const User = require("./models/User");
const Organisation = require("./models/Organisation");
const Session = require("./models/Session");
const Booking = require("./models/Booking");

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "joinziie",
    });

    console.log("Connected to MongoDB Atlas");
    console.log("Seeding Joinziie database...");

    // --------------------------------------------------
    // PARENT ACCOUNT
    // --------------------------------------------------

    const parent = await User.findOneAndUpdate(
      { email: "parent@test.com" },
      {
        accountType: "parent",
        email: "parent@test.com",
        password: "test123",
        fullName: "Sarah Johnson",
        phone: "07700000001",
        postcode: "W12 7RQ",
        interests: [
          "BJJ",
          "MMA",
          "Football",
          "Fitness"
        ],
        children: [
          {
            name: "Daniel Johnson",
            age: 12,
            gender: "Male",
            school: "West London School",
            interests: [
              "BJJ",
              "Football"
            ]
          }
        ],
        notificationPreferences: {
          push: true,
          email: true,
          sms: false
        }
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      }
    );

    // --------------------------------------------------
    // YOUNG PERSON ACCOUNT
    // --------------------------------------------------

    const youngPerson = await User.findOneAndUpdate(
      { email: "young@test.com" },
      {
        accountType: "young_person",
        email: "young@test.com",
        password: "test123",
        fullName: "Jayden Smith",
        dateOfBirth: "2009-04-17",
        ageRange: "13-17",
        postcode: "W12 7RQ",
        schoolOrCollege: "West London Academy",
        interests: [
          "BJJ",
          "MMA",
          "Boxing",
          "Fitness"
        ],
        notificationPreferences: {
          push: true,
          email: true,
          sms: false
        }
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      }
    );

    // --------------------------------------------------
    // ORGANISATION ACCOUNT
    // --------------------------------------------------

    const organisation = await Organisation.findOneAndUpdate(
      { email: "info@1wayfitmma.co.uk" },
      {
        accountType: "organisation",
        name: "1WAYFIT MMA",
        email: "info@1wayfitmma.co.uk",
        password: "test123",
        phone: "+44 20 7946 0123",
        website: "www.1wayfitmma.co.uk",
        type: "Martial Arts",
        description:
          "MMA and self-defence classes for all ages and abilities.",
        location: "White City, London",
        audience: [
          "Children",
          "Teenagers",
          "Adults"
        ],
        verified: true,
        verificationStatus: "verified"
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      }
    );

    // Remove old demo sessions so running this again
    // does not create duplicates.
    const oldSessions = await Session.find({
      organisationId: organisation._id
    });

    const oldSessionIds = oldSessions.map(
      session => session._id
    );

    if (oldSessionIds.length > 0) {
      await Booking.deleteMany({
        sessionId: {
          $in: oldSessionIds
        }
      });
    }

    await Session.deleteMany({
      organisationId: organisation._id
    });

    // --------------------------------------------------
    // ORGANISATION SESSIONS
    // --------------------------------------------------

    const sessions = await Session.insertMany([
      {
        organisationId: organisation._id,
        title: "No-Gi Fundamentals",
        category: "BJJ",
        description:
          "Fundamental no-gi Brazilian Jiu-Jitsu class.",
        date: "2026-10-01",
        time: "18:00",
        location: "White City, London",
        capacity: 20,
        booked: 12,
        price: 12,
        isFree: false,
        ageRange: "13+",
        status: "published"
      },

      {
        organisationId: organisation._id,
        title: "Striking for MMA",
        category: "Boxing",
        description:
          "Striking class focused on MMA technique.",
        date: "2026-10-02",
        time: "19:00",
        location: "White City, London",
        capacity: 16,
        booked: 8,
        price: 12,
        isFree: false,
        ageRange: "16+",
        status: "published"
      },

      {
        organisationId: organisation._id,
        title: "Strength & Conditioning",
        category: "S&C",
        description:
          "Strength and conditioning for combat sports.",
        date: "2026-10-03",
        time: "10:00",
        location: "White City, London",
        capacity: 20,
        booked: 15,
        price: 10,
        isFree: false,
        ageRange: "16+",
        status: "published"
      },

      {
        organisationId: organisation._id,
        title: "Kids BJJ",
        category: "Kids",
        description:
          "Brazilian Jiu-Jitsu session for children.",
        date: "2026-10-04",
        time: "11:00",
        location: "White City, London",
        capacity: 16,
        booked: 10,
        price: 8,
        isFree: false,
        ageRange: "8-12",
        status: "published"
      },

      {
        organisationId: organisation._id,
        title: "Open Mat",
        category: "Open Mat",
        description:
          "Open training session for members.",
        date: "2026-10-04",
        time: "16:00",
        location: "White City, London",
        capacity: 30,
        booked: 20,
        price: 0,
        isFree: true,
        ageRange: "16+",
        status: "published"
      },

      {
        organisationId: organisation._id,
        title: "Advanced MMA Drills",
        category: "MMA",
        description:
          "Advanced MMA drills session.",
        location: "White City, London",
        capacity: 16,
        booked: 0,
        price: 0,
        isFree: false,
        status: "draft"
      },

      {
        organisationId: organisation._id,
        title: "Beginner Self-Defence",
        category: "Self-Defence",
        description:
          "Introductory self-defence programme.",
        location: "TBC",
        capacity: 16,
        booked: 0,
        price: 0,
        isFree: false,
        status: "draft"
      }
    ]);

    // --------------------------------------------------
    // TEST BOOKINGS
    // --------------------------------------------------

    await Booking.create({
      userId: parent._id,
      sessionId: sessions[0]._id,
      status: "confirmed"
    });

    await Booking.create({
      userId: youngPerson._id,
      sessionId: sessions[1]._id,
      status: "confirmed"
    });

    console.log("");
    console.log("=================================");
    console.log("JOINZIIE DATABASE SEEDED");
    console.log("=================================");
    console.log("");
    console.log("Parent:");
    console.log("parent@test.com / test123");
    console.log("");
    console.log("Young Person:");
    console.log("young@test.com / test123");
    console.log("");
    console.log("Organisation:");
    console.log("info@1wayfitmma.co.uk / test123");
    console.log("");
    console.log("Organisation:", organisation.name);
    console.log("Sessions created:", sessions.length);
    console.log("");

    await mongoose.disconnect();

    process.exit(0);

  } catch (error) {
    console.error("Seed failed:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedDatabase();
