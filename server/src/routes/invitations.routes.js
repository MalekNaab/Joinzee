const express = require("express");

const Invitation =
  require("../models/Invitation");

const router = express.Router();

const VALID_STATUSES = [
  "pending",
  "accepted",
  "declined",
  "cancelled",
];

function cleanOrganisationId(value) {
  if (!value) {
    return null;
  }

  return String(value).trim() || null;
}

function cleanEmail(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email
  );
}


// ==========================================================
// GET INVITATIONS
//
// GET /api/invitations
// GET /api/invitations?organisationId=...
// GET /api/invitations?email=...
// GET /api/invitations?status=pending
//
// Examples:
//
// /api/invitations?email=user@test.com&status=pending
//
// /api/invitations?organisationId=123&status=pending
// ==========================================================

router.get("/", async (req, res) => {
  try {
    const organisationId =
      cleanOrganisationId(
        req.query.organisationId
      );

    const email =
      cleanEmail(req.query.email);

    const requestedStatus =
      String(req.query.status || "")
        .trim()
        .toLowerCase();

    const filter = {};

    if (requestedStatus) {
      if (
        !VALID_STATUSES.includes(
          requestedStatus
        )
      ) {
        return res.status(400).json({
          message:
            "Invalid invitation status",
        });
      }

      filter.status =
        requestedStatus;
    } else {
      // Preserve existing behaviour:
      // cancelled invitations are hidden
      // unless specifically requested.
      filter.status = {
        $ne: "cancelled",
      };
    }

    if (organisationId) {
      filter.organisationId =
        organisationId;
    }

    if (email) {
      filter.email = email;
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
// GET ONE INVITATION
// GET /api/invitations/:id
// ==========================================================

router.get("/:id", async (req, res) => {
  try {
    const invitation =
      await Invitation.findById(
        req.params.id
      ).lean();

    if (!invitation) {
      return res.status(404).json({
        message:
          "Invitation not found",
      });
    }

    res.json(invitation);
  } catch (error) {
    console.error(
      "GET invitation details error:",
      error
    );

    res.status(500).json({
      message:
        "Could not load invitation",
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

    const email =
      cleanEmail(req.body.email);

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
// ACCEPT INVITATION
// PATCH /api/invitations/:id/accept
//
// Temporary MVP body:
//
// {
//   "email": "user@test.com",
//   "userId": "optional-user-id"
// }
//
// Later, email/userId should come directly from the
// authenticated JWT user instead of request body.
// ==========================================================

router.patch(
  "/:id/accept",
  async (req, res) => {
    try {
      const email =
        cleanEmail(req.body.email);

      const userId =
        req.body.userId
          ? String(req.body.userId).trim()
          : null;

      if (!email) {
        return res.status(400).json({
          message:
            "User email is required",
        });
      }

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

      if (
        invitation.status !== "pending"
      ) {
        return res.status(409).json({
          message:
            `Invitation is already ${invitation.status}`,
          invitation,
        });
      }

      if (
        invitation.email.toLowerCase() !==
        email
      ) {
        return res.status(403).json({
          message:
            "This invitation belongs to another email address",
        });
      }

      invitation.status =
        "accepted";

      invitation.acceptedAt =
        new Date();

      invitation.acceptedByUserId =
        userId;

      invitation.declinedAt =
        null;

      invitation.cancelledAt =
        null;

      await invitation.save();

      res.json({
        message:
          "Invitation accepted successfully",
        invitation,
      });
    } catch (error) {
      console.error(
        "Accept invitation error:",
        error
      );

      res.status(500).json({
        message:
          "Could not accept invitation",
      });
    }
  }
);


// ==========================================================
// DECLINE INVITATION
// PATCH /api/invitations/:id/decline
//
// {
//   "email": "user@test.com"
// }
// ==========================================================

router.patch(
  "/:id/decline",
  async (req, res) => {
    try {
      const email =
        cleanEmail(req.body.email);

      if (!email) {
        return res.status(400).json({
          message:
            "User email is required",
        });
      }

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

      if (
        invitation.status !== "pending"
      ) {
        return res.status(409).json({
          message:
            `Invitation is already ${invitation.status}`,
          invitation,
        });
      }

      if (
        invitation.email.toLowerCase() !==
        email
      ) {
        return res.status(403).json({
          message:
            "This invitation belongs to another email address",
        });
      }

      invitation.status =
        "declined";

      invitation.declinedAt =
        new Date();

      invitation.acceptedAt =
        null;

      invitation.cancelledAt =
        null;

      invitation.acceptedByUserId =
        null;

      await invitation.save();

      res.json({
        message:
          "Invitation declined",
        invitation,
      });
    } catch (error) {
      console.error(
        "Decline invitation error:",
        error
      );

      res.status(500).json({
        message:
          "Could not decline invitation",
      });
    }
  }
);


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

      if (
        invitation.status !== "pending"
      ) {
        return res.status(409).json({
          message:
            `Cannot cancel an invitation that is already ${invitation.status}`,
          invitation,
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
