require("dotenv").config();

const mongoose = require("mongoose");
const User = require("./models/User");

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("");
    console.log("====================================");
    console.log(" MONGODB USERS CHECK");
    console.log("====================================");
    console.log("");

    const users = await User.find({})
      .select("_id email name firstName lastName accountType role")
      .lean();

    console.log(`Found ${users.length} user(s).`);
    console.log("");

    users.forEach((user, index) => {
      console.log(`USER ${index + 1}`);
      console.log("ID:", user._id?.toString());
      console.log("Email:", user.email);
      console.log("Name:", user.name);
      console.log("First name:", user.firstName);
      console.log("Last name:", user.lastName);
      console.log("Account type:", user.accountType);
      console.log("Role:", user.role);
      console.log("------------------------------------");
    });

  } catch (error) {
    console.error("ERROR:", error);
  } finally {
    await mongoose.disconnect();
  }
}

run();
