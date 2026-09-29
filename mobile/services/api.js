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
  if (!account) {
    return account;
  }

  return {
    ...account,

    // MongoDB uses _id.
    // Existing Joinziie screens often expect id.
    id: account.id || account._id,
  };
}

export async function loginClient(email, password) {
  const account = await apiRequest(
    "/api/auth/login/user",
    {
      method: "POST",
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        password,
      }),
    }
  );

  return normaliseAccount(account);
}

export async function loginOrganisation(email, password) {
  const organisation = await apiRequest(
    "/api/auth/login/organisation",
    {
      method: "POST",
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        password,
      }),
    }
  );

  return normaliseAccount(organisation);
}

export async function getSessions() {
  return apiRequest("/api/sessions");
}

export { API_BASE_URL };
