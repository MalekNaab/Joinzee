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

export async function getInvitations(
  organisationId
) {
  let url =
    `${API_BASE}/api/invitations`;

  if (organisationId) {
    url +=
      `?organisationId=${encodeURIComponent(
        organisationId
      )}`;
  }

  const response =
    await fetch(url);

  return readResponse(response);
}

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
