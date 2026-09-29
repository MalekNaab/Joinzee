const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  "https://joinziie-api.onrender.com";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const text = await response.text();

  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) {
    const message =
      data?.message ||
      `Request failed with ${response.status}`;

    throw new Error(message);
  }

  return data;
}

export const getSessionBookings = (sessionId) =>
  request(`/api/bookings/session/${sessionId}`);

export const getSessionBookingCount = (sessionId) =>
  request(`/api/bookings/session/${sessionId}/count`);

export const getUserBookings = (userId) =>
  request(`/api/bookings/user/${userId}`);

export const createBooking = (sessionId, userId) =>
  request("/api/bookings", {
    method: "POST",
    body: JSON.stringify({
      sessionId,
      userId,
    }),
  });

export const updateBookingStatus = (
  bookingId,
  status
) =>
  request(`/api/bookings/${bookingId}/status`, {
    method: "PATCH",
    body: JSON.stringify({
      status,
    }),
  });

export const deleteBooking = (bookingId) =>
  request(`/api/bookings/${bookingId}`, {
    method: "DELETE",
  });

export { API_BASE_URL };
