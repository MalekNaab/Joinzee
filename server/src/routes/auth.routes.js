const express = require("express");
const User = require("../models/User");
const Organisation = require("../models/Organisation");

const router = express.Router();

// REGISTER USER
router.post("/register/user", async (req, res) => {
  try {
    const user = await User.create(req.body);

    const safeUser = user.toObject();
    delete safeUser.password;

    res.status(201).json(safeUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// REGISTER ORGANISATION
router.post("/register/organisation", async (req, res) => {
  try {
    const organisation = await Organisation.create(req.body);

    const safeOrganisation = organisation.toObject();
    delete safeOrganisation.password;

    res.status(201).json(safeOrganisation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// USER LOGIN
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

    const safeUser = user.toObject();
    delete safeUser.password;

    res.json(safeUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ORGANISATION LOGIN
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

    const safeOrganisation = organisation.toObject();
    delete safeOrganisation.password;

    res.json(safeOrganisation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
