import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";

import { useState } from "react";

import JoinziieLogo from "../../components/JoinziieLogo";
import BookingRow from "../../components/activities/BookingRow";

import { activities } from "../../data/activities";
import { COLORS, GRADIENT } from "../../constants/theme";
import { LinearGradient } from "expo-linear-gradient";

import { useActivities } from "../../context/ActivityContext";

export default function ActivitiesScreen() {
  const [tab, setTab] =
    useState("upcoming");

  const { bookings } =
    useActivities();

  const visible = bookings.filter(
    (booking) =>
      tab === "upcoming"
        ? !booking.past
        : booking.past
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <JoinziieLogo />

        <View style={styles.titleRow}>
          <View>
            <Text style={styles.heading}>
              My Activities
            </Text>

            <Text style={styles.subtitle}>
              Your bookings, events and progress.
            </Text>
          </View>

          <View style={styles.streak}>
            <Text style={styles.fire}>
              🔥
            </Text>

            <View>
              <Text style={styles.streakTitle}>
                3 week streak
              </Text>

              <Text style={styles.streakText}>
                Keep showing up!
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.tabs}>
          <Pressable
            onPress={() =>
              setTab("upcoming")
            }
            style={[
              styles.tab,
              tab === "upcoming" &&
                styles.tabSelected,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                tab === "upcoming" &&
                  styles.tabTextSelected,
              ]}
            >
              Upcoming
            </Text>
          </Pressable>

          <Pressable
            onPress={() =>
              setTab("past")
            }
            style={[
              styles.tab,
              tab === "past" &&
                styles.tabSelected,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                tab === "past" &&
                  styles.tabTextSelected,
              ]}
            >
              Past
            </Text>
          </Pressable>
        </View>

        <View style={styles.list}>
          {visible.map(
            (booking) => {
              const activity =
                activities.find(
                  (item) =>
                    item.id ===
                    booking.activityId
                );

              if (!activity) return null;

              return (
                <BookingRow
                  key={booking.id}
                  activity={activity}
                  status={booking.status}
                  going={booking.going}
                />
              );
            }
          )}
        </View>

        {visible.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              No activities here yet.
            </Text>
          </View>
        )}

        <Pressable style={styles.viewAll}>
          <Text style={styles.viewAllText}>
            View All Activities
          </Text>

          <Text style={styles.viewAllArrow}>
            ›
          </Text>
        </Pressable>

        <LinearGradient
          colors={GRADIENT}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.aiCard}
        >
          <View style={styles.aiIcon}>
            <Text style={styles.robot}>
              ✦
            </Text>
          </View>

          <View style={styles.aiContent}>
            <Text style={styles.aiSmall}>
              Need recommendations?
            </Text>

            <Text style={styles.aiTitle}>
              Ask Joinziie AI
            </Text>

            <Text style={styles.aiText}>
              Personalised activity suggestions based on your interests.
            </Text>
          </View>

          <View style={styles.aiArrow}>
            <Text style={styles.aiArrowText}>
              →
            </Text>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingTop: 17,
    paddingBottom: 35,
  },

  titleRow: {
    marginTop: 28,
  },

  heading: {
    color: COLORS.white,
    fontSize: 31,
    fontWeight: "900",
  },

  subtitle: {
    color: COLORS.secondary,
    fontSize: 13,
    marginTop: 4,
  },

  streak: {
    minHeight: 65,
    marginTop: 16,
    borderRadius: 15,
    backgroundColor: "#07101F",
    borderWidth: 1,
    borderColor: "#263854",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  fire: {
    fontSize: 30,
    marginRight: 12,
  },

  streakTitle: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "900",
  },

  streakText: {
    color: COLORS.secondary,
    fontSize: 10,
    marginTop: 3,
  },

  tabs: {
    flexDirection: "row",
    minHeight: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#263854",
    backgroundColor: "#07101F",
    marginTop: 18,
    overflow: "hidden",
  },

  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  tabSelected: {
    backgroundColor: COLORS.purple,
  },

  tabText: {
    color: "#D7DDED",
    fontSize: 13,
  },

  tabTextSelected: {
    color: COLORS.white,
    fontWeight: "800",
  },

  list: {
    gap: 10,
    marginTop: 15,
  },

  empty: {
    minHeight: 150,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyText: {
    color: COLORS.secondary,
  },

  viewAll: {
    minHeight: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.purple,
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  viewAllText: {
    color: COLORS.pink,
    fontSize: 13,
    fontWeight: "800",
  },

  viewAllArrow: {
    position: "absolute",
    right: 16,
    color: COLORS.pink,
    fontSize: 25,
  },

  aiCard: {
    minHeight: 125,
    borderRadius: 18,
    marginTop: 15,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  aiIcon: {
    width: 58,
    height: 58,
    borderRadius: 30,
    backgroundColor:
      "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },

  robot: {
    color: COLORS.white,
    fontSize: 30,
  },

  aiContent: {
    flex: 1,
    paddingHorizontal: 13,
  },

  aiSmall: {
    color: "#F1DFFF",
    fontSize: 9,
  },

  aiTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "900",
    marginTop: 2,
  },

  aiText: {
    color: "#F3E8FF",
    fontSize: 9,
    lineHeight: 14,
    marginTop: 3,
  },

  aiArrow: {
    width: 42,
    height: 42,
    borderRadius: 24,
    backgroundColor:
      "rgba(255,255,255,0.15)",
    borderWidth: 1,
    borderColor:
      "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },

  aiArrowText: {
    color: COLORS.white,
    fontSize: 24,
  },
});
