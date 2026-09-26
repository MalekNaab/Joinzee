import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  useMemo,
  useState,
} from "react";

import {
  useRouter,
} from "expo-router";

import OrgDashboardLayout from "../../../components/organisation/OrgDashboardLayout";
import OrgSessionCard from "../../../components/organisation/OrgSessionCard";

import {
  useOrganisationSessions,
} from "../../../context/OrganisationSessionContext";

import {
  COLORS,
} from "../../../constants/theme";

const tabs = [
  {
    id: "upcoming",
    label: "Upcoming",
  },
  {
    id: "past",
    label: "Past",
  },
  {
    id: "draft",
    label: "Drafts",
  },
];

export default function OrganisationSessionsScreen() {
  const router =
    useRouter();

  const {
    sessions,
  } =
    useOrganisationSessions();

  const [
    activeTab,
    setActiveTab,
  ] =
    useState("upcoming");

  const visibleSessions =
    useMemo(
      () =>
        sessions.filter(
          (session) =>
            session.status ===
            activeTab
        ),
      [
        sessions,
        activeTab,
      ]
    );

  const openSession = (
    session
  ) => {
    if (
      session.status ===
      "draft"
    ) {
      router.push(
        `/organisation-dashboard/draft/${session.id}`
      );

      return;
    }

    router.push(
      `/organisation-dashboard/session/${session.id}`
    );
  };

  return (
    <OrgDashboardLayout
      title="Sessions"
      subtitle="Create and manage your activities."
      actionTitle="Create Session"
      actionVariant="gradient"
    >
      <View
        style={
          styles.tabRow
        }
      >
        {tabs.map(
          (tab) => {
            const active =
              activeTab ===
              tab.id;

            const count =
              sessions.filter(
                (session) =>
                  session.status ===
                  tab.id
              ).length;

            return (
              <Pressable
                key={tab.id}
                onPress={() =>
                  setActiveTab(
                    tab.id
                  )
                }
                style={[
                  styles.tab,
                  active &&
                    styles.activeTab,
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    active &&
                      styles.activeTabText,
                  ]}
                >
                  {tab.label}
                </Text>

                <View
                  style={[
                    styles.countBadge,
                    active &&
                      styles.activeCountBadge,
                  ]}
                >
                  <Text
                    style={[
                      styles.countText,
                      active &&
                        styles.activeCountText,
                    ]}
                  >
                    {count}
                  </Text>
                </View>
              </Pressable>
            );
          }
        )}
      </View>

      <View
        style={
          styles.resultHeader
        }
      >
        <Text
          style={
            styles.resultText
          }
        >
          {
            visibleSessions.length
          }{" "}
          {activeTab ===
          "draft"
            ? "drafts"
            : "sessions"}
        </Text>
      </View>

      {visibleSessions.map(
        (session) => (
          <OrgSessionCard
            key={
              session.id
            }
            item={
              session
            }
            onPress={() =>
              openSession(
                session
              )
            }
          />
        )
      )}

      {visibleSessions.length ===
        0 && (
        <View
          style={
            styles.empty
          }
        >
          <Text
            style={
              styles.emptyTitle
            }
          >
            Nothing here yet
          </Text>

          <Text
            style={
              styles.emptyText
            }
          >
            Sessions will
            appear here when
            available.
          </Text>
        </View>
      )}
    </OrgDashboardLayout>
  );
}

const styles =
  StyleSheet.create({
    tabRow: {
      minHeight: 58,
      borderRadius: 14,
      borderWidth: 1,
      borderColor:
        COLORS.border,
      backgroundColor:
        COLORS.surface,
      padding: 5,
      flexDirection:
        "row",
      marginBottom: 13,
    },

    tab: {
      flex: 1,
      borderRadius: 10,
      alignItems:
        "center",
      justifyContent:
        "center",
      flexDirection:
        "row",
      gap: 6,
    },

    activeTab: {
      backgroundColor:
        COLORS.purple,
    },

    tabText: {
      color:
        COLORS.white,
      fontSize: 12,
      fontWeight:
        "700",
    },

    activeTabText: {
      color:
        COLORS.white,
      fontWeight:
        "900",
    },

    countBadge: {
      minWidth: 20,
      height: 20,
      borderRadius: 12,
      backgroundColor:
        "#252C3D",
      alignItems:
        "center",
      justifyContent:
        "center",
      paddingHorizontal: 5,
    },

    activeCountBadge: {
      backgroundColor:
        "rgba(255,255,255,0.18)",
    },

    countText: {
      color:
        COLORS.secondary,
      fontSize: 8,
      fontWeight:
        "800",
    },

    activeCountText: {
      color:
        COLORS.white,
    },

    resultHeader: {
      marginBottom: 10,
    },

    resultText: {
      color:
        COLORS.secondary,
      fontSize: 10,
    },

    empty: {
      minHeight: 220,
      borderRadius: 16,
      borderWidth: 1,
      borderColor:
        COLORS.border,
      backgroundColor:
        COLORS.surface,
      alignItems:
        "center",
      justifyContent:
        "center",
      padding: 20,
    },

    emptyTitle: {
      color:
        COLORS.white,
      fontSize: 16,
      fontWeight:
        "900",
    },

    emptyText: {
      color:
        COLORS.secondary,
      fontSize: 10,
      marginTop: 6,
      textAlign:
        "center",
    },
  });
