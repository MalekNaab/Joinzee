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
    console.log(" JOINZIIE REAL DATABASE CHECK");
    console.log("======================================");
    console.log("");
    console.log("Connected database:", db.databaseName);
    console.log("");

    const collections = await db.listCollections().toArray();

    for (const collection of collections) {

      const name = collection.name;
      const count = await db.collection(name).countDocuments();

      console.log("--------------------------------------");
      console.log("Collection:", name);
      console.log("Documents:", count);

      const docs = await db.collection(name)
        .find({})
        .limit(10)
        .toArray();

      for (const doc of docs) {
        console.log("");
        console.log("_id:", doc._id?.toString());

        if (doc.email)
          console.log("email:", doc.email);

        if (doc.name)
          console.log("name:", doc.name);

        if (doc.firstName)
          console.log("firstName:", doc.firstName);

        if (doc.lastName)
          console.log("lastName:", doc.lastName);

        if (doc.accountType)
          console.log("accountType:", doc.accountType);

        if (doc.role)
          console.log("role:", doc.role);

        if (doc.title)
          console.log("title:", doc.title);
      }

      console.log("");
    }

    console.log("======================================");
    console.log(" CHECK COMPLETE");
    console.log("======================================");

  } catch (error) {
    console.error("DATABASE CHECK FAILED:");
    console.error(error);
  } finally {
    await mongoose.disconnect();
  }
}

run();
