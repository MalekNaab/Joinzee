require("dotenv").config();
const mongoose = require("mongoose");

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "joinziie"
    });

    const db = mongoose.connection.db;

    console.log("");
    console.log("======================================");
    console.log(" JOINZIIE BOOKINGS CHECK");
    console.log("======================================");

    const bookings = await db.collection("bookings").find({}).toArray();

    console.log(`Found ${bookings.length} booking(s).`);

    for (const booking of bookings) {
      console.log("");
      console.log("--------------------------------------");
      console.log("_id:", booking._id?.toString());
      console.log("userId:", booking.userId?.toString());
      console.log("sessionId:", booking.sessionId?.toString());
      console.log("organisationId:", booking.organisationId?.toString());
      console.log("status:", booking.status);
      console.log("attendanceStatus:", booking.attendanceStatus);
      console.log("createdAt:", booking.createdAt);
      console.log("");
      console.log("FULL DOCUMENT:");
      console.log(JSON.stringify(booking, null, 2));
    }

  } catch (error) {
    console.error("BOOKINGS CHECK FAILED:");
    console.error(error);
  } finally {
    await mongoose.disconnect();
  }
}

run();
