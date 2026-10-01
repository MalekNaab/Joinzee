import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { Ionicons } from "@expo/vector-icons";

import OrgDashboardLayout from "../../../components/organisation/OrgDashboardLayout";
import OrgMemberRow from "../../../components/organisation/OrgMemberRow";
import OrgStatCard from "../../../components/organisation/OrgStatCard";

import {
  useOrganisationSessions,
} from "../../../context/OrganisationSessionContext";

import {
  getSessionBookings,
} from "../../../services/bookingsApi";

import { COLORS } from "../../../constants/theme";

const filters = [
  "All",
  "Coaches",
  "Participants",
  "Pending",
];

const MEMBER_COLORS = [
  "#6F4BFF",
  "#7E45E8",
  "#8292A6",
  "#8FA1B5",
  "#5047DB",
  "#9C27B0",
  "#5C6BC0",
  "#455A64",
];

function getId(value) {
  if (!value) return null;

  if (typeof value === "object") {
    return String(
      value._id ||
      value.id ||
      value.userId ||
      ""
    );
  }

  return String(value);
}

function getInitials(name, email) {
  if (name) {
    const parts = String(name)
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (parts.length >= 2) {
      return (
        parts[0][0] +
        parts[parts.length - 1][0]
      ).toUpperCase();
    }

    if (parts.length === 1) {
      return parts[0]
        .slice(0, 2)
        .toUpperCase();
    }
  }

  if (email) {
    return String(email)
      .slice(0, 2)
      .toUpperCase();
  }

  return "M";
}

function getRole(accountType) {
  const type = String(
    accountType || ""
  ).toLowerCase();

  if (
    type === "coach" ||
    type === "trainer"
  ) {
    return "Coach";
  }

  if (type === "parent") {
    return "Parent";
  }

  if (
    type === "young_person" ||
    type === "youngperson"
  ) {
    return "Young Person";
  }

  return "Participant";
}

function getUserFromBooking(booking) {
  if (!booking) return {};

  if (
    booking.user &&
    typeof booking.user === "object"
  ) {
    return booking.user;
  }

  if (
    booking.userId &&
    typeof booking.userId === "object"
  ) {
    return booking.userId;
  }

  if (
    booking.member &&
    typeof booking.member === "object"
  ) {
    return booking.member;
  }

  return {};
}

function normaliseMember(
  booking,
  index
) {
  const user = getUserFromBooking(
    booking
  );

  const rawUserId =
    user._id ||
    user.id ||
    booking.userId ||
    booking.user ||
    booking.memberId;

  const id =
    getId(rawUserId) ||
    `member-${index}`;

  const email =
    user.email ||
    booking.email ||
    "";

  const name =
    user.name ||
    user.fullName ||
    user.displayName ||
    booking.name ||
    email ||
    `Member ${index + 1}`;

  const accountType =
    user.accountType ||
    booking.accountType ||
    user.role ||
    booking.role ||
    "";

  const bookingStatus = String(
    booking.status || ""
  ).toLowerCase();

  const pending =
    bookingStatus === "pending" ||
    bookingStatus === "requested";

  return {
    id,
    initials: getInitials(
      name,
      email
    ),
    name,
    email,
    role: getRole(accountType),
    accountType,
    status: pending
      ? "Pending"
      : "Active",
    color:
      MEMBER_COLORS[
        index %
          MEMBER_COLORS.length
      ],
  };
}

function getSessionId(session) {
  return (
    session?.id ||
    session?._id ||
    null
  );
}

function sessionHasFinished(session) {
  const status = String(
    session?.status || ""
  ).toLowerCase();

  if (
    status === "past" ||
    status === "completed" ||
    status === "finished"
  ) {
    return true;
  }

  if (
    status === "draft" ||
    status === "cancelled" ||
    status === "canceled"
  ) {
    return false;
  }

  const date = session?.date;

  if (!date) return false;

  const time =
    session?.time || "23:59";

  const parsed = new Date(
    `${date}T${time}`
  );

  if (
    Number.isNaN(
      parsed.getTime()
    )
  ) {
    return false;
  }

  return parsed.getTime() <
    Date.now();
}

export default function OrganisationMembersScreen() {
  const {
    sessions,
    loading: sessionsLoading,
  } = useOrganisationSessions();

  const [
    bookings,
    setBookings,
  ] = useState([]);

  const [
    bookingsLoading,
    setBookingsLoading,
  ] = useState(true);

  const [
    bookingsError,
    setBookingsError,
  ] = useState(null);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    activeFilter,
    setActiveFilter,
  ] = useState("All");

  const [
    showAll,
    setShowAll,
  ] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadBookings() {
      if (sessionsLoading) {
        return;
      }

      if (
        !Array.isArray(sessions) ||
        sessions.length === 0
      ) {
        if (active) {
          setBookings([]);
          setBookingsLoading(false);
        }

        return;
      }

      setBookingsLoading(true);
      setBookingsError(null);

      try {
        const sessionIds =
          sessions
            .map(getSessionId)
            .filter(Boolean);

        const results =
          await Promise.allSettled(
            sessionIds.map((sessionId) =>
              getSessionBookings(
                sessionId
              )
            )
          );

        const allBookings =
          results.flatMap(
            (result) => {
              if (
                result.status !==
                "fulfilled"
              ) {
                console.warn(
                  "Could not load bookings for one session:",
                  result.reason
                );

                return [];
              }

              return Array.isArray(
                result.value
              )
                ? result.value
                : [];
            }
          );

        if (active) {
          setBookings(
            allBookings
          );
        }
      } catch (error) {
        console.error(
          "Could not load organisation members:",
          error
        );

        if (active) {
          setBookingsError(
            error.message
          );
          setBookings([]);
        }
      } finally {
        if (active) {
          setBookingsLoading(
            false
          );
        }
      }
    }

    loadBookings();

    return () => {
      active = false;
    };
  }, [
    sessions,
    sessionsLoading,
  ]);

  const members = useMemo(() => {
    const memberMap =
      new Map();

    bookings.forEach(
      (booking, index) => {
        const member =
          normaliseMember(
            booking,
            index
          );

        const key =
          member.id ||
          member.email ||
          `member-${index}`;

        if (
          !memberMap.has(key)
        ) {
          memberMap.set(
            key,
            member
          );
        } else {
          const existing =
            memberMap.get(key);

          if (
            existing.status ===
              "Pending" &&
            member.status ===
              "Active"
          ) {
            memberMap.set(
              key,
              {
                ...existing,
                ...member,
                status: "Active",
              }
            );
          }
        }
      }
    );

    return Array.from(
      memberMap.values()
    );
  }, [bookings]);

  const filteredMembers =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      return members.filter(
        (member) => {
          const matchesSearch =
            !query ||
            member.name
              ?.toLowerCase()
              .includes(query) ||
            member.email
              ?.toLowerCase()
              .includes(query) ||
            member.role
              ?.toLowerCase()
              .includes(query);

          if (!matchesSearch) {
            return false;
          }

          if (
            activeFilter ===
            "All"
          ) {
            return true;
          }

          if (
            activeFilter ===
            "Coaches"
          ) {
            return (
              member.role ===
              "Coach"
            );
          }

          if (
            activeFilter ===
            "Pending"
          ) {
            return (
              member.status ===
              "Pending"
            );
          }

          if (
            activeFilter ===
            "Participants"
          ) {
            return (
              member.role !==
              "Coach"
            );
          }

          return true;
        }
      );
    }, [
      members,
      search,
      activeFilter,
    ]);

  const visibleMembers =
    showAll
      ? filteredMembers
      : filteredMembers.slice(
          0,
          5
        );

  const sessionsHeld =
    useMemo(
      () =>
        sessions.filter(
          sessionHasFinished
        ).length,
      [sessions]
    );

  const attendanceStats =
    useMemo(() => {
      const attended =
        bookings.filter(
          (booking) =>
            String(
              booking.status || ""
            ).toLowerCase() ===
            "attended"
        ).length;

      const noShows =
        bookings.filter(
          (booking) => {
            const status =
              String(
                booking.status ||
                  ""
              ).toLowerCase();

            return (
              status ===
                "no_show" ||
              status ===
                "no-show" ||
              status ===
                "noshow"
            );
          }
        ).length;

      const completed =
        attended + noShows;

      const percentage =
        completed > 0
          ? Math.round(
              (attended /
                completed) *
                100
            )
          : 0;

      return {
        attended,
        noShows,
        percentage,
      };
    }, [bookings]);

  const loading =
    sessionsLoading ||
    bookingsLoading;

  return (
    <OrgDashboardLayout
      title="Members"
      subtitle="Manage your community."
      actionTitle="Invite"
      actionVariant="gradient"
    >
      <View
        style={
          styles.searchBar
        }
      >
        <Ionicons
          name="search-outline"
          size={22}
          color={
            COLORS.secondary
          }
        />

        <TextInput
          placeholder="Search members..."
          placeholderTextColor={
            COLORS.secondary
          }
          style={styles.input}
          value={search}
          onChangeText={
            setSearch
          }
        />
      </View>

      <View
        style={
          styles.filterRow
        }
      >
        {filters.map(
          (filter) => {
            const active =
              activeFilter ===
              filter;

            return (
              <Pressable
                key={filter}
                onPress={() =>
                  setActiveFilter(
                    filter
                  )
                }
                style={[
                  styles.filterPill,
                  active &&
                    styles.activePill,
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    active &&
                      styles.activePillText,
                  ]}
                >
                  {filter}
                </Text>
              </Pressable>
            );
          }
        )}
      </View>

      {loading ? (
        <View
          style={
            styles.loadingWrap
          }
        >
          <ActivityIndicator
            size="small"
            color={
              COLORS.purple
            }
          />

          <Text
            style={
              styles.loadingText
            }
          >
            Loading members...
          </Text>
        </View>
      ) : bookingsError ? (
        <View
          style={
            styles.messageCard
          }
        >
          <Text
            style={
              styles.errorText
            }
          >
            Could not load
            members.
          </Text>

          <Text
            style={
              styles.messageText
            }
          >
            {bookingsError}
          </Text>
        </View>
      ) : visibleMembers.length >
        0 ? (
        visibleMembers.map(
          (member) => (
            <OrgMemberRow
              key={member.id}
              item={member}
            />
          )
        )
      ) : (
        <View
          style={
            styles.messageCard
          }
        >
          <Ionicons
            name="people-outline"
            size={28}
            color={
              COLORS.secondary
            }
          />

          <Text
            style={
              styles.emptyTitle
            }
          >
            No members found
          </Text>

          <Text
            style={
              styles.messageText
            }
          >
            Members will appear
            here when they book
            organisation sessions.
          </Text>
        </View>
      )}

      {filteredMembers.length >
        5 && (
        <Pressable
          style={
            styles.viewAllButton
          }
          onPress={() =>
            setShowAll(
              (current) =>
                !current
            )
          }
        >
          <Text
            style={
              styles.viewAllText
            }
          >
            {showAll
              ? "Show fewer members"
              : `View all ${filteredMembers.length} members`}
          </Text>
        </Pressable>
      )}

      <View
        style={
          styles.analyticsHeader
        }
      >
        <Text
          style={
            styles.analyticsTitle
          }
        >
          Analytics
        </Text>

        <View
          style={
            styles.rangePill
          }
        >
          <Text
            style={
              styles.rangeText
            }
          >
            Live data
          </Text>

          <Ionicons
            name="pulse-outline"
            size={16}
            color={
              COLORS.white
            }
          />
        </View>
      </View>

      <View
        style={styles.statsRow}
      >
        <OrgStatCard
          value={String(
            members.length
          )}
          label="Total Members"
          change="Live"
          accent="#43F58E"
        />

        <OrgStatCard
          value={String(
            sessionsHeld
          )}
          label="Sessions Held"
          change="Live"
          accent="#43F58E"
        />

        <OrgStatCard
          value={`${attendanceStats.percentage}%`}
          label="Avg. Attendance"
          change={`${attendanceStats.attended} attended`}
          accent="#43F58E"
        />

        <View
          style={
            styles.emptyCard
          }
        />
      </View>
    </OrgDashboardLayout>
  );
}

const styles =
  StyleSheet.create({
    searchBar: {
      height: 56,
      borderRadius: 14,
      borderWidth: 1,
      borderColor:
        COLORS.border,
      backgroundColor:
        COLORS.surface,
      paddingHorizontal: 14,
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 14,
      gap: 10,
    },

    input: {
      flex: 1,
      color: COLORS.white,
      fontSize: 14,
    },

    filterRow: {
      flexDirection: "row",
      gap: 8,
      marginBottom: 14,
    },

    filterPill: {
      flex: 1,
      height: 44,
      borderRadius: 12,
      borderWidth: 1,
      borderColor:
        COLORS.border,
      backgroundColor:
        COLORS.surface,
      alignItems: "center",
      justifyContent:
        "center",
    },

    activePill: {
      backgroundColor:
        COLORS.purple,
      borderColor:
        COLORS.purple,
    },

    filterText: {
      color: COLORS.white,
      fontSize: 11,
      fontWeight: "700",
    },

    activePillText: {
      color: COLORS.white,
    },

    viewAllButton: {
      height: 54,
      borderRadius: 14,
      borderWidth: 1,
      borderColor:
        COLORS.border,
      backgroundColor:
        "rgba(255,255,255,0.02)",
      alignItems: "center",
      justifyContent:
        "center",
      marginBottom: 24,
    },

    viewAllText: {
      color: COLORS.white,
      fontSize: 13,
      fontWeight: "700",
    },

    analyticsHeader: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems: "center",
      marginBottom: 12,
    },

    analyticsTitle: {
      color: COLORS.white,
      fontSize: 18,
      fontWeight: "900",
    },

    rangePill: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      height: 44,
      borderRadius: 12,
      borderWidth: 1,
      borderColor:
        COLORS.border,
      backgroundColor:
        COLORS.surface,
      paddingHorizontal: 12,
    },

    rangeText: {
      color: COLORS.white,
      fontSize: 11,
      fontWeight: "700",
    },

    statsRow: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      marginBottom: 14,
    },

    emptyCard: {
      width: "23.5%",
    },

    loadingWrap: {
      minHeight: 150,
      alignItems: "center",
      justifyContent:
        "center",
      gap: 10,
      marginBottom: 18,
    },

    loadingText: {
      color:
        COLORS.secondary,
      fontSize: 13,
    },

    messageCard: {
      minHeight: 130,
      borderRadius: 14,
      borderWidth: 1,
      borderColor:
        COLORS.border,
      backgroundColor:
        COLORS.surface,
      alignItems: "center",
      justifyContent:
        "center",
      paddingHorizontal: 22,
      marginBottom: 18,
      gap: 8,
    },

    emptyTitle: {
      color: COLORS.white,
      fontSize: 15,
      fontWeight: "800",
    },

    errorText: {
      color: "#FF6B81",
      fontSize: 14,
      fontWeight: "800",
    },

    messageText: {
      color:
        COLORS.secondary,
      fontSize: 12,
      textAlign: "center",
    },
  });
