import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  router,
  useLocalSearchParams,
} from "expo-router";

import {
  getSessionBookings,
  updateBookingStatus,
} from "../../../../services/bookingsApi";

export default function SessionAttendancePage() {
  const params = useLocalSearchParams();

  const id = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");

  const loadBookings = useCallback(async () => {
    if (!id) return;

    try {
      setError("");

      const data = await getSessionBookings(id);

      setBookings(
        Array.isArray(data) ? data : []
      );
    } catch (err) {
      console.error(err);

      setError(
        err?.message ||
          "Could not load attendees."
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const changeStatus = async (
    bookingId,
    status
  ) => {
    try {
      setUpdatingId(bookingId);

      await updateBookingStatus(
        bookingId,
        status
      );

      await loadBookings();
    } catch (err) {
      setError(
        err?.message ||
          "Could not update attendance."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const getName = (booking) => {
    const user = booking?.userId;

    if (!user) return "Unknown attendee";

    if (user.name) return user.name;

    const fullName = [
      user.firstName,
      user.lastName,
    ]
      .filter(Boolean)
      .join(" ");

    if (fullName) return fullName;

    return user.email || "Attendee";
  };

  const attended = bookings.filter(
    (booking) =>
      booking.status === "attended"
  ).length;

  const noShows = bookings.filter(
    (booking) =>
      booking.status === "no_show"
  ).length;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>
          Loading attendees...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>‹</Text>
        </Pressable>

        <Text style={styles.logo}>
          J Joinziie
        </Text>
      </View>

      <Text style={styles.title}>
        Manage Attendance
      </Text>

      <Text style={styles.subtitle}>
        View bookings and mark attendance.
      </Text>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {bookings.length}
          </Text>
          <Text style={styles.statLabel}>
            Booked
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {attended}
          </Text>
          <Text style={styles.statLabel}>
            Attended
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {noShows}
          </Text>
          <Text style={styles.statLabel}>
            No Shows
          </Text>
        </View>
      </View>

      {!!error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>
            {error}
          </Text>
        </View>
      )}

      {bookings.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>
            No attendees yet
          </Text>

          <Text style={styles.emptyText}>
            Bookings for this session will
            appear here.
          </Text>
        </View>
      ) : (
        bookings.map((booking) => {
          const user = booking.userId || {};
          const busy =
            updatingId === booking._id;

          return (
            <View
              key={booking._id}
              style={styles.card}
            >
              <View style={styles.personRow}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {getName(booking)
                      .charAt(0)
                      .toUpperCase()}
                  </Text>
                </View>

                <View style={styles.personInfo}>
                  <Text style={styles.name}>
                    {getName(booking)}
                  </Text>

                  <Text style={styles.email}>
                    {user.email ||
                      "No email available"}
                  </Text>

                  <Text style={styles.accountType}>
                    {user.accountType ||
                      "Member"}
                  </Text>
                </View>

                <View
                  style={[
                    styles.statusBadge,
                    booking.status ===
                      "attended" &&
                      styles.attendedBadge,
                    booking.status ===
                      "no_show" &&
                      styles.noShowBadge,
                  ]}
                >
                  <Text
                    style={styles.statusText}
                  >
                    {booking.status}
                  </Text>
                </View>
              </View>

              <View style={styles.actions}>
                <Pressable
                  disabled={busy}
                  onPress={() =>
                    changeStatus(
                      booking._id,
                      "attended"
                    )
                  }
                  style={[
                    styles.actionButton,
                    styles.attendButton,
                  ]}
                >
                  <Text
                    style={
                      styles.actionButtonText
                    }
                  >
                    ✓ Attended
                  </Text>
                </Pressable>

                <Pressable
                  disabled={busy}
                  onPress={() =>
                    changeStatus(
                      booking._id,
                      "no_show"
                    )
                  }
                  style={[
                    styles.actionButton,
                    styles.noShowButton,
                  ]}
                >
                  <Text
                    style={
                      styles.actionButtonText
                    }
                  >
                    ✕ No Show
                  </Text>
                </Pressable>

                <Pressable
                  disabled={busy}
                  onPress={() =>
                    changeStatus(
                      booking._id,
                      "booked"
                    )
                  }
                  style={[
                    styles.actionButton,
                    styles.resetButton,
                  ]}
                >
                  <Text
                    style={
                      styles.actionButtonText
                    }
                  >
                    Reset
                  </Text>
                </Pressable>
              </View>
            </View>
          );
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#030719",
  },

  content: {
    width: "100%",
    maxWidth: 760,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 80,
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#030719",
  },

  loadingText: {
    color: "#ffffff",
    marginTop: 14,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 35,
  },

  backButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },

  backText: {
    color: "#ffffff",
    fontSize: 40,
    lineHeight: 40,
  },

  logo: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "900",
  },

  title: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "900",
  },

  subtitle: {
    color: "#8991a8",
    marginTop: 6,
    marginBottom: 24,
  },

  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#0d1326",
    borderWidth: 1,
    borderColor: "#232b41",
    borderRadius: 16,
    padding: 18,
  },

  statNumber: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "900",
  },

  statLabel: {
    color: "#8f97ab",
    marginTop: 4,
    fontSize: 12,
  },

  card: {
    backgroundColor: "#0d1326",
    borderWidth: 1,
    borderColor: "#232b41",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
  },

  personRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#8b2cf5",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "900",
  },

  personInfo: {
    flex: 1,
    marginLeft: 14,
  },

  name: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },

  email: {
    color: "#969db0",
    fontSize: 12,
    marginTop: 3,
  },

  accountType: {
    color: "#d52bd9",
    fontSize: 11,
    marginTop: 4,
    textTransform: "capitalize",
  },

  statusBadge: {
    backgroundColor: "#252c3d",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },

  attendedBadge: {
    backgroundColor: "#0e6c4b",
  },

  noShowBadge: {
    backgroundColor: "#7c2632",
  },

  statusText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
  },

  actions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 18,
  },

  actionButton: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: "center",
  },

  attendButton: {
    backgroundColor: "#146c51",
  },

  noShowButton: {
    backgroundColor: "#7d2936",
  },

  resetButton: {
    backgroundColor: "#282e42",
  },

  actionButtonText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "800",
  },

  empty: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0d1326",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#232b41",
    padding: 50,
  },

  emptyTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "900",
  },

  emptyText: {
    color: "#8f97ab",
    marginTop: 8,
    textAlign: "center",
  },

  errorBox: {
    backgroundColor: "#441a25",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },

  errorText: {
    color: "#ff7d93",
  },
});

