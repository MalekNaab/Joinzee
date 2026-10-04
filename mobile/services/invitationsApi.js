const API_BASE =
  process.env.EXPO_PUBLIC_API_URL ||
  "https://joinziie-api.onrender.com";

async function readResponse(response) {
  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
        `Request failed (${response.status})`
    );
  }

  return data;
}


// ==========================================================
// GET INVITATIONS
//
// Supports old usage:
// getInvitations(organisationId)
//
// And new usage:
// getInvitations({
//   organisationId,
//   email,
//   status,
// })
// ==========================================================

export async function getInvitations(options) {
  let organisationId = null;
  let email = null;
  let status = null;

  if (
    typeof options === "string"
  ) {
    organisationId = options;
  } else if (
    options &&
    typeof options === "object"
  ) {
    organisationId =
      options.organisationId || null;

    email =
      options.email || null;

    status =
      options.status || null;
  }

  const params =
    new URLSearchParams();

  if (organisationId) {
    params.append(
      "organisationId",
      organisationId
    );
  }

  if (email) {
    params.append(
      "email",
      email
    );
  }

  if (status) {
    params.append(
      "status",
      status
    );
  }

  const query =
    params.toString();

  const url =
    query
      ? `${API_BASE}/api/invitations?${query}`
      : `${API_BASE}/api/invitations`;

  const response =
    await fetch(url);

  return readResponse(response);
}


// ==========================================================
// GET CURRENT USER'S PENDING INVITATIONS
// ==========================================================

export async function getPendingInvitationsForUser(
  email
) {
  if (!email) {
    return [];
  }

  return getInvitations({
    email,
    status: "pending",
  });
}


// ==========================================================
// CREATE INVITATION
// ==========================================================

export async function createInvitation({
  organisationId,
  email,
  role,
}) {
  const response =
    await fetch(
      `${API_BASE}/api/invitations`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          organisationId:
            organisationId || null,

          email,
          role,
        }),
      }
    );

  return readResponse(response);
}


// ==========================================================
// ACCEPT INVITATION
// ==========================================================

export async function acceptInvitation(
  invitationId,
  {
    email,
    userId = null,
  }
) {
  const response =
    await fetch(
      `${API_BASE}/api/invitations/${invitationId}/accept`,
      {
        method: "PATCH",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          email,
          userId,
        }),
      }
    );

  return readResponse(response);
}


// ==========================================================
// DECLINE INVITATION
// ==========================================================

export async function declineInvitation(
  invitationId,
  {
    email,
  }
) {
  const response =
    await fetch(
      `${API_BASE}/api/invitations/${invitationId}/decline`,
      {
        method: "PATCH",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          email,
        }),
      }
    );

  return readResponse(response);
}


// ==========================================================
// CANCEL INVITATION
// ==========================================================

export async function cancelInvitation(
  invitationId
) {
  const response =
    await fetch(
      `${API_BASE}/api/invitations/${invitationId}/cancel`,
      {
        method: "PATCH",

        headers: {
          "Content-Type":
            "application/json",
        },
      }
    );

  return readResponse(response);
}
