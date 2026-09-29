const API_BASE_URL = "https://joinziie-api.onrender.com";

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(
      data?.error ||
      data?.message ||
      `Request failed with status ${response.status}`
    );
  }

  return data;
}

function normaliseAccount(account) {
  if (!account) return account;

  return {
    ...account,
    id: account.id || account._id,
  };
}

function normaliseSession(session) {
  if (!session) return session;

  const populatedOrganisation =
    session.organisationId &&
    typeof session.organisationId === "object"
      ? session.organisationId
      : null;

  const organisationId =
    populatedOrganisation?._id ||
    populatedOrganisation?.id ||
    session.organisationId;

  let uiStatus = session.status;

  if (session.status === "published") {
    uiStatus = "upcoming";
  }

  if (
    session.status === "completed" ||
    session.status === "cancelled"
  ) {
    uiStatus = "past";
  }

  const booked = Number(session.booked || 0);
  const limit = Number(session.capacity || 0);

  return {
    ...session,

    id: session.id || session._id,

    organisationId,

    organisation: populatedOrganisation,

    label:
      session.category ||
      "Session",

    status: uiStatus,

    rawStatus: session.status,

    capacityLimit: limit,

    capacity: `${booked} / ${limit}`,

    booked,

    price: Number(session.price || 0),

    date:
      session.date ||
      "Not scheduled",

    time:
      session.time ||
      "",

    location:
      session.location ||
      "TBC",
  };
}

function sessionPayload(input = {}) {
  const payload = {};

  if (input.organisationId !== undefined) {
    payload.organisationId =
      input.organisationId;
  }

  if (input.title !== undefined) {
    payload.title = input.title;
  }

  if (
    input.category !== undefined ||
    input.label !== undefined
  ) {
    payload.category =
      input.category ||
      input.label;
  }

  if (input.description !== undefined) {
    payload.description =
      input.description;
  }

  if (input.image !== undefined) {
    payload.image =
      input.image;
  }

  if (input.date !== undefined) {
    payload.date =
      input.date;
  }

  if (input.time !== undefined) {
    payload.time =
      input.time;
  }

  if (input.location !== undefined) {
    payload.location =
      input.location;
  }

  if (input.ageRange !== undefined) {
    payload.ageRange =
      input.ageRange;
  }

  if (input.booked !== undefined) {
    payload.booked =
      Number(input.booked || 0);
  }

  let capacity;

  if (input.capacityLimit !== undefined) {
    capacity =
      Number(input.capacityLimit || 0);
  } else if (
    typeof input.capacity === "number"
  ) {
    capacity =
      input.capacity;
  } else if (
    typeof input.capacity === "string"
  ) {
    const parts =
      input.capacity.split("/");

    capacity =
      Number(
        parts[
          parts.length - 1
        ]?.trim() || 0
      );
  }

  if (capacity !== undefined) {
    payload.capacity =
      capacity;
  }

  if (input.price !== undefined) {
    const price =
      Number(input.price || 0);

    payload.price =
      price;

    payload.isFree =
      price === 0;
  }

  if (input.status !== undefined) {
    const statusMap = {
      upcoming: "published",
      past: "completed",
      draft: "draft",
      published: "published",
      completed: "completed",
      cancelled: "cancelled",
    };

    payload.status =
      statusMap[input.status] ||
      input.status;
  }

  return payload;
}


// ============================================================
// AUTH
// ============================================================

export async function loginClient(
  email,
  password
) {
  const account =
    await apiRequest(
      "/api/auth/login/user",
      {
        method: "POST",
        body: JSON.stringify({
          email:
            email
              .trim()
              .toLowerCase(),

          password,
        }),
      }
    );

  return normaliseAccount(
    account
  );
}

export async function loginOrganisation(
  email,
  password
) {
  const organisation =
    await apiRequest(
      "/api/auth/login/organisation",
      {
        method: "POST",
        body: JSON.stringify({
          email:
            email
              .trim()
              .toLowerCase(),

          password,
        }),
      }
    );

  return normaliseAccount(
    organisation
  );
}


// ============================================================
// SESSIONS
// ============================================================

export async function getSessions() {
  const sessions =
    await apiRequest(
      "/api/sessions"
    );

  return sessions.map(
    normaliseSession
  );
}

export async function getSession(
  id
) {
  const session =
    await apiRequest(
      `/api/sessions/${id}`
    );

  return normaliseSession(
    session
  );
}


export async function getOrganisationSessions(
  organisationId
) {
  const sessions =
    await getSessions();

  return sessions.filter(
    (session) =>
      String(
        session.organisationId
      ) ===
      String(
        organisationId
      )
  );
}

export async function createOrganisationSession(
  organisationId,
  session
) {
  const created =
    await apiRequest(
      "/api/sessions",
      {
        method: "POST",

        body: JSON.stringify(
          sessionPayload({
            ...session,
            organisationId,
          })
        ),
      }
    );

  return normaliseSession(
    created
  );
}

export async function updateOrganisationSession(
  id,
  updates
) {
  const updated =
    await apiRequest(
      `/api/sessions/${id}`,
      {
        method: "PUT",

        body: JSON.stringify(
          sessionPayload(
            updates
          )
        ),
      }
    );

  return normaliseSession(
    updated
  );
}

export async function deleteOrganisationSession(
  id
) {
  return apiRequest(
    `/api/sessions/${id}`,
    {
      method: "DELETE",
    }
  );
}

export {
  API_BASE_URL,
  normaliseSession,
};

