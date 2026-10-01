import React, { useEffect, useMemo, useState } from "react";

import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";

import { Ionicons } from "@expo/vector-icons";

const API_URL = "https://joinziie-api.onrender.com";

const COLORS = {
  background: "#020617",
  surface: "#0F172A",
  surface2: "#111827",
  border: "#293247",
  white: "#FFFFFF",
  secondary: "#94A3B8",
  purple: "#9333EA",
  pink: "#EC4899",
  green: "#22C55E",
  red: "#EF4444",
  orange: "#F97316",
};

function roleLabel(type) {
  if (type === "young_person") return "Young Person";
  if (type === "young-person") return "Young Person";
  if (type === "parent") return "Parent";
  if (type === "coach") return "Coach";

  if (!type) return "Member";

  return String(type)
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function statusLabel(status) {
  if (!status) return "Confirmed";

  if (status === "no_show" || status === "no-show") {
    return "No Show";
  }

  return String(status)
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function statusColour(status) {
  if (status === "attended") {
    return COLORS.green;
  }

  if (status === "no_show" || status === "no-show") {
    return COLORS.red;
  }

  if (status === "cancelled") {
    return COLORS.red;
  }

  return COLORS.purple;
}

export default function MemberDetailsScreen() {
  const router = useRouter();

  const params = useLocalSearchParams();

  const id = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const email = Array.isArray(params.email)
    ? params.email[0]
    : params.email;

  const accountType = Array.isArray(params.accountType)
    ? params.accountType[0]
    : params.accountType;

  const name = Array.isArray(params.name)
    ? params.name[0]
    : params.name;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError("Member ID missing.");
      return;
    }

    loadMemberDetails();
  }, [id]);

  const loadMemberDetails = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/member-details/${encodeURIComponent(id)}`
      );

      if (!response.ok) {
        throw new Error(
          `Server returned ${response.status}`
        );
      }

      const result = await response.json();

      setData(result);
    } catch (err) {
      console.error("Member details fetch error:", err);

      setError(
        "Unable to load this member's booking information."
      );
    } finally {
      setLoading(false);
    }
  };

  const displayName = useMemo(() => {
    if (name && name !== "undefined") {
      return name;
    }

    if (email) {
      return email;
    }

    return "Member";
  }, [name, email]);

  const initials = useMemo(() => {
    if (!displayName) {
      return "M";
    }

    const text = displayName.trim();

    if (text.includes("@")) {
      return text.substring(0, 2).toUpperCase();
    }

    return text
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  }, [displayName]);

  const stats = data?.stats || {
    totalBookings: 0,
    attended: 0,
    noShows: 0,
    confirmed: 0,
  };

  const bookings = data?.bookings || [];

  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.content}
    >
      <View style={styles.topBar}>
        <Pressable
          style={styles.backButton}
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace(
                "/organisation-dashboard/(tabs)/members"
              );
            }
          }}
        >
          <Ionicons
            name="chevron-back"
            size={26}
            color={COLORS.white}
          />
        </Pressable>

        <Text style={styles.logo}>
          <Text style={styles.logoAccent}>J</Text>
          {" "}Joinziie
        </Text>

        <View style={styles.topSpacer} />
      </View>

      <Text style={styles.pageTitle}>
        Member Details
      </Text>

      <Text style={styles.pageSubtitle}>
        View account activity and booking history.
      </Text>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {initials}
          </Text>
        </View>

        <View style={styles.profileText}>
          <Text style={styles.memberName}>
            {displayName}
          </Text>

          {!!email && (
            <Text style={styles.email}>
              {email}
            </Text>
          )}

          <Text style={styles.role}>
            {roleLabel(accountType)}
          </Text>
        </View>

        <View style={styles.activeBadge}>
          <Text style={styles.activeText}>
            Active
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        Account Information
      </Text>

      <View style={styles.infoCard}>
        <InfoRow
          icon="mail-outline"
          label="Email"
          value={email || "Not available"}
        />

        <Divider />

        <InfoRow
          icon="person-outline"
          label="Account Type"
          value={roleLabel(accountType)}
        />

        <Divider />

        <InfoRow
          icon="checkmark-circle-outline"
          label="Status"
          value="Active"
        />
      </View>

      <Text style={styles.sectionTitle}>
        Activity
      </Text>

      {loading ? (
        <View style={styles.loadingCard}>
          <ActivityIndicator
            size="large"
            color={COLORS.purple}
          />

          <Text style={styles.loadingText}>
            Loading booking activity...
          </Text>
        </View>
      ) : (
        <>
          {error ? (
            <View style={styles.errorCard}>
              <Ionicons
                name="alert-circle-outline"
                size={24}
                color={COLORS.red}
              />

              <Text style={styles.errorText}>
                {error}
              </Text>

              <Pressable
                style={styles.retryButton}
                onPress={loadMemberDetails}
              >
                <Text style={styles.retryText}>
                  Retry
                </Text>
              </Pressable>
            </View>
          ) : (
            <>
              <View style={styles.statsGrid}>
                <StatBox
                  value={stats.totalBookings}
                  label="Bookings"
                />

                <StatBox
                  value={stats.attended}
                  label="Attended"
                />

                <StatBox
                  value={stats.noShows}
                  label="No Shows"
                />

                <StatBox
                  value={stats.confirmed}
                  label="Confirmed"
                />
              </View>

              <Text style={styles.sectionTitle}>
                Booking History
              </Text>

              {bookings.length === 0 ? (
                <View style={styles.emptyBookings}>
                  <Ionicons
                    name="calendar-outline"
                    size={30}
                    color={COLORS.secondary}
                  />

                  <Text style={styles.emptyTitle}>
                    No bookings yet
                  </Text>

                  <Text style={styles.emptyDescription}>
                    This member has not booked any sessions.
                  </Text>
                </View>
              ) : (
                bookings.map((booking) => (
                  <BookingCard
                    key={
                      booking.id ||
                      booking._id ||
                      `${booking.sessionId}`
                    }
                    booking={booking}
                  />
                ))
              )}
            </>
          )}
        </>
      )}

      <View style={styles.bottomSpace} />
    </ScrollView>
  );
}

function InfoRow({
  icon,
  label,
  value,
}) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIcon}>
        <Ionicons
          name={icon}
          size={19}
          color={COLORS.pink}
        />
      </View>

      <View style={styles.infoText}>
        <Text style={styles.infoLabel}>
          {label}
        </Text>

        <Text style={styles.infoValue}>
          {value}
        </Text>
      </View>
    </View>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

function StatBox({
  value,
  label,
}) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statValue}>
        {value}
      </Text>

      <Text style={styles.statLabel}>
        {label}
      </Text>
    </View>
  );
}

function BookingCard({
  booking,
}) {
  const session = booking.session;

  const status =
    booking.attendanceStatus ||
    booking.status ||
    "confirmed";

  return (
    <View style={styles.bookingCard}>
      <View style={styles.bookingTop}>
        <View style={styles.bookingIcon}>
          <Ionicons
            name="calendar-outline"
            size={21}
            color={COLORS.pink}
          />
        </View>

        <View style={styles.bookingContent}>
          <Text style={styles.bookingTitle}>
            {session?.title || "Session"}
          </Text>

          <Text style={styles.bookingCategory}>
            {session?.category || "Activity"}
          </Text>
        </View>

        <View
          style={[
            styles.statusBadge,
            {
              borderColor: statusColour(status),
            },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              {
                color: statusColour(status),
              },
            ]}
          >
            {statusLabel(status)}
          </Text>
        </View>
      </View>

      {session?.date && (
        <View style={styles.bookingMeta}>
          <Ionicons
            name="calendar-number-outline"
            size={15}
            color={COLORS.secondary}
          />

          <Text style={styles.bookingMetaText}>
            {session.date}
            {session.time
              ? ` • ${session.time}`
              : ""}
          </Text>
        </View>
      )}

      {!!session?.location && (
        <View style={styles.bookingMeta}>
          <Ionicons
            name="location-outline"
            size={15}
            color={COLORS.secondary}
          />

          <Text style={styles.bookingMetaText}>
            {session.location}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingTop: 26,
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },

  backButton: {
    width: 42,
    height: 42,
    justifyContent: "center",
  },

  logo: {
    color: COLORS.white,
    fontWeight: "900",
    fontSize: 21,
  },

  logoAccent: {
    color: COLORS.purple,
  },

  topSpacer: {
    width: 42,
  },

  pageTitle: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: "900",
  },

  pageSubtitle: {
    color: COLORS.secondary,
    fontSize: 13,
    marginTop: 4,
    marginBottom: 22,
  },

  profileCard: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.purple,
  },

  avatarText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "900",
  },

  profileText: {
    flex: 1,
    marginLeft: 14,
  },

  memberName: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "900",
  },

  email: {
    color: COLORS.secondary,
    fontSize: 12,
    marginTop: 3,
  },

  role: {
    color: COLORS.pink,
    fontSize: 11,
    fontWeight: "700",
    marginTop: 4,
  },

  activeBadge: {
    backgroundColor: "rgba(34,197,94,0.18)",
    borderRadius: 30,
    paddingHorizontal: 13,
    paddingVertical: 7,
  },

  activeText: {
    color: "#43F58E",
    fontSize: 10,
    fontWeight: "900",
  },

  sectionTitle: {
    color: COLORS.white,
    fontWeight: "900",
    fontSize: 18,
    marginBottom: 12,
    marginTop: 2,
  },

  infoCard: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 28,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 68,
  },

  infoIcon: {
    width: 38,
  },

  infoText: {
    flex: 1,
  },

  infoLabel: {
    color: COLORS.secondary,
    fontSize: 10,
    marginBottom: 3,
  },

  infoValue: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "700",
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
  },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 28,
  },

  statBox: {
    width: "48%",
    minHeight: 90,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    justifyContent: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },

  statValue: {
    color: COLORS.white,
    fontSize: 23,
    fontWeight: "900",
  },

  statLabel: {
    color: COLORS.secondary,
    fontSize: 11,
    marginTop: 5,
  },

  loadingCard: {
    minHeight: 140,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },

  loadingText: {
    color: COLORS.secondary,
    fontSize: 12,
    marginTop: 12,
  },

  errorCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    padding: 22,
    marginBottom: 24,
  },

  errorText: {
    color: COLORS.secondary,
    textAlign: "center",
    marginVertical: 12,
  },

  retryButton: {
    paddingHorizontal: 22,
    paddingVertical: 10,
    backgroundColor: COLORS.purple,
    borderRadius: 10,
  },

  retryText: {
    color: COLORS.white,
    fontWeight: "800",
  },

  emptyBookings: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    padding: 28,
    alignItems: "center",
  },

  emptyTitle: {
    color: COLORS.white,
    fontWeight: "900",
    fontSize: 15,
    marginTop: 12,
  },

  emptyDescription: {
    color: COLORS.secondary,
    fontSize: 12,
    marginTop: 5,
    textAlign: "center",
  },

  bookingCard: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },

  bookingTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  bookingIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: COLORS.surface2,
    justifyContent: "center",
    alignItems: "center",
  },

  bookingContent: {
    flex: 1,
    marginLeft: 12,
  },

  bookingTitle: {
    color: COLORS.white,
    fontWeight: "900",
    fontSize: 14,
  },

  bookingCategory: {
    color: COLORS.secondary,
    fontSize: 10,
    marginTop: 3,
  },

  statusBadge: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  statusText: {
    fontSize: 9,
    fontWeight: "900",
  },

  bookingMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 6,
  },

  bookingMetaText: {
    color: COLORS.secondary,
    fontSize: 11,
  },

  bottomSpace: {
    height: 80,
  },
});
