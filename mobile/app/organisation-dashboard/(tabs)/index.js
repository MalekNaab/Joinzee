import {
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";

import {
  useRouter,
} from "expo-router";

import OrgDashboardLayout from "../../../components/organisation/OrgDashboardLayout";
import OrgStatCard from "../../../components/organisation/OrgStatCard";
import OrgSessionCard from "../../../components/organisation/OrgSessionCard";
import OrgQuickActionCard from "../../../components/organisation/OrgQuickActionCard";

import {
  ORG_PROFILE,
} from "../../../data/organisationDemo";

import {
  useOrganisationSessions,
} from "../../../context/OrganisationSessionContext";

import {
  COLORS,
} from "../../../constants/theme";


export default function OrganisationHomeScreen() {
  const router =
    useRouter();

  const {
    sessions,
    loading,
  } =
    useOrganisationSessions();

  const upcomingSessions =
    sessions.filter(
      (session) =>
        session.status ===
        "upcoming"
    );

  const dashboardStats =
    ORG_PROFILE.stats.map(
      (stat) => {
        if (
          stat.label ===
          "Upcoming Sessions"
        ) {
          return {
            ...stat,
            value:
              String(
                upcomingSessions.length
              ),
            change:
              "Live",
          };
        }

        return stat;
      }
    );


  const openSession =
    (id) => {
      router.push(
        `/organisation-dashboard/session/${id}`
      );
    };


  return (
    <OrgDashboardLayout
      actionTitle="View Profile"
    >
      <View
        style={
          styles.statsGrid
        }
      >
        {dashboardStats.map(
          (stat) => (
            <OrgStatCard
              key={
                stat.label
              }
              value={
                stat.value
              }
              label={
                stat.label
              }
              change={
                stat.change
              }
              accent={
                stat.accent
              }
            />
          )
        )}
      </View>


      <View
        style={
          styles.sectionHeader
        }
      >
        <Text
          style={
            styles.sectionTitle
          }
        >
          Upcoming Sessions
        </Text>

        <Pressable
          onPress={() =>
            router.push(
              "/organisation-dashboard/sessions"
            )
          }
        >
          <Text
            style={
              styles.link
            }
          >
            View all
          </Text>
        </Pressable>
      </View>


      {loading && (
        <Text
          style={
            styles.loading
          }
        >
          Loading sessions...
        </Text>
      )}


      {!loading &&
        upcomingSessions
          .slice(0, 3)
          .map(
            (item) => (
              <OrgSessionCard
                key={
                  item.id
                }
                item={
                  item
                }
                onPress={() =>
                  openSession(
                    item.id
                  )
                }
              />
            )
          )}


      {!loading &&
        upcomingSessions.length ===
          0 && (
          <Text
            style={
              styles.loading
            }
          >
            No upcoming sessions yet.
          </Text>
        )}


      <Text
        style={
          styles.sectionTitle
        }
      >
        Quick Actions
      </Text>


      <View
        style={
          styles.quickGrid
        }
      >
        <OrgQuickActionCard
          icon="add"
          title="Create Session"
          subtitle="Add new activity"
          accent={
            COLORS.purple
          }
          onPress={() =>
            router.push(
              "/organisation-dashboard/create-session"
            )
          }
        />

        <OrgQuickActionCard
          icon="people-outline"
          title="Manage Members"
          subtitle="View your community"
          accent="#2B314A"
          onPress={() =>
            router.push(
              "/organisation-dashboard/members"
            )
          }
        />

        <OrgQuickActionCard
          icon="bar-chart-outline"
          title="View Analytics"
          subtitle="Track performance"
          accent="#2B314A"
          onPress={() =>
            router.push(
              "/organisation-dashboard/analytics"
            )
          }
        />

        <OrgQuickActionCard
          icon="settings-outline"
          title="Organisation Settings"
          subtitle="Update details"
          accent="#2B314A"
          onPress={() =>
            router.push(
              "/organisation-dashboard/more"
            )
          }
        />
      </View>
    </OrgDashboardLayout>
  );
}


const styles =
  StyleSheet.create({
    statsGrid: {
      flexDirection:
        "row",
      justifyContent:
        "space-between",
      marginBottom:
        22,
    },

    sectionHeader: {
      flexDirection:
        "row",
      justifyContent:
        "space-between",
      alignItems:
        "center",
      marginBottom:
        12,
    },

    sectionTitle: {
      color:
        COLORS.white,
      fontSize:
        18,
      fontWeight:
        "900",
      marginBottom:
        12,
    },

    link: {
      color:
        COLORS.purple,
      fontSize:
        12,
      fontWeight:
        "800",
    },

    quickGrid: {
      flexDirection:
        "row",
      justifyContent:
        "space-between",
      marginTop:
        2,
    },

    loading: {
      color:
        COLORS.secondary,
      fontSize:
        12,
      marginBottom:
        18,
    },
  });
