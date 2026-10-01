const bookingsRoutes = require("./routes/bookings.routes");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const sessionRoutes = require("./routes/sessions.routes");

const app = express();


const memberDetailsRoutes = require("./routes/member-details.routes");
app.use(cors());

const memberDetailsRoutes = require("./routes/member-details.routes");
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.json({
    message: "Joinziie API running"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok"
  });
});


const memberDetailsRoutes = require("./routes/member-details.routes");
app.use("/api/auth", authRoutes);

const memberDetailsRoutes = require("./routes/member-details.routes");
app.use("/api/sessions", sessionRoutes);

const PORT = process.env.PORT || 5000;


const memberDetailsRoutes = require("./routes/member-details.routes");
app.use('/api/bookings', bookingsRoutes);

app.use("/api/member-details", memberDetailsRoutes);

app.listen(PORT, () => {
  console.log(`Joinziie API running on port ${PORT}`);
});








