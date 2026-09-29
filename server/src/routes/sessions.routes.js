const express = require("express");
const Session = require("../models/Session");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const sessions = await Session.find()
      .populate("organisationId")
      .sort({ createdAt: -1 });

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const session = await Session.create(req.body);
    res.status(201).json(session);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate("organisationId");

    if (!session) {
      return res.status(404).json({
        error: "Session not found"
      });
    }

    res.json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const session = await Session.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    res.json(session);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Session.findByIdAndDelete(req.params.id);

    res.json({
      message: "Session deleted"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
