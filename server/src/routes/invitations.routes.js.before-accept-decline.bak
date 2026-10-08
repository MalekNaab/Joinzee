const express = require("express");

const Invitation =
  require("../models/Invitation");

const router = express.Router();

function cleanOrganisationId(value) {
  if (!value) {
    return null;
  }

  return String(value).trim() || null;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email
  );
}


// ==========================================================
// GET INVITATIONS
// GET /api/invitations
// GET /api/invitations?organisationId=...
// ==========================================================

router.get("/", async (req, res) => {
  try {
    const organisationId =
      cleanOrganisationId(
        req.query.organisationId
      );

    const filter = {
      status: {
        $ne: "cancelled",
      },
    };

    if (organisationId) {
      filter.organisationId =
        organisationId;
    }

    const invitations =
      await Invitation.find(filter)
        .sort({
          createdAt: -1,
        })
        .lean();

    res.json(invitations);
  } catch (error) {
    console.error(
      "GET invitations error:",
      error
    );

    res.status(500).json({
      message:
        "Could not load invitations",
    });
  }
});


// ==========================================================
// CREATE INVITATION
// POST /api/invitations
// ==========================================================

router.post("/", async (req, res) => {
  try {
    const organisationId =
      cleanOrganisationId(
        req.body.organisationId
      );

    const email = String(
      req.body.email || ""
    )
      .trim()
      .toLowerCase();

    const role = String(
      req.body.role || "participant"
    )
      .trim()
      .toLowerCase();

    if (!email) {
      return res.status(400).json({
        message:
          "Email address is required",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        message:
          "Enter a valid email address",
      });
    }

    if (
      ![
        "participant",
        "coach",
      ].includes(role)
    ) {
      return res.status(400).json({
        message:
          "Role must be participant or coach",
      });
    }

    const duplicateFilter = {
      email,
      status: "pending",
    };

    if (organisationId) {
      duplicateFilter.organisationId =
        organisationId;
    } else {
      duplicateFilter.organisationId =
        null;
    }

    const existing =
      await Invitation.findOne(
        duplicateFilter
      );

    if (existing) {
      return res.status(409).json({
        message:
          "This person already has a pending invitation",
        invitation: existing,
      });
    }

    const invitation =
      await Invitation.create({
        organisationId,
        email,
        role,
        status: "pending",
      });

    res.status(201).json({
      message:
        "Invitation created successfully",
      invitation,
    });
  } catch (error) {
    console.error(
      "POST invitation error:",
      error
    );

    res.status(500).json({
      message:
        "Could not create invitation",
    });
  }
});


// ==========================================================
// CANCEL INVITATION
// PATCH /api/invitations/:id/cancel
// ==========================================================

router.patch(
  "/:id/cancel",
  async (req, res) => {
    try {
      const invitation =
        await Invitation.findById(
          req.params.id
        );

      if (!invitation) {
        return res.status(404).json({
          message:
            "Invitation not found",
        });
      }

      invitation.status =
        "cancelled";

      invitation.cancelledAt =
        new Date();

      await invitation.save();

      res.json({
        message:
          "Invitation cancelled",
        invitation,
      });
    } catch (error) {
      console.error(
        "Cancel invitation error:",
        error
      );

      res.status(500).json({
        message:
          "Could not cancel invitation",
      });
    }
  }
);

module.exports = router;
