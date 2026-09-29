const express = require("express");
const User = require("../models/User");
const Organisation = require("../models/Organisation");

const router = express.Router();

router.post("/register/user", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/register/organisation", async (req, res) => {
  try {
    const organisation = await Organisation.create(req.body);
    res.status(201).json(organisation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/login/user", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
      password
    });

    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password"
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login/organisation", async (req, res) => {
  try {
    const { email, password } = req.body;

    const organisation = await Organisation.findOne({
      email,
      password
    });

    if (!organisation) {
      return res.status(401).json({
        error: "Invalid email or password"
      });
    }

    res.json(organisation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
