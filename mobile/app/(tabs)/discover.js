import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";

import {
  useRouter,
} from "expo-router";

import JoinziieLogo from "../../components/JoinziieLogo";
import SwipeCard from "../../components/activities/SwipeCard";

import { COLORS } from "../../constants/theme";
import { useActivities } from "../../context/ActivityContext";

export default function DiscoverScreen() {
  const router = useRouter();

  const {
    availableSwipeActivities,
    matchActivity,
    passActivity,
  } = useActivities();

  const current =
    availableSwipeActivities[0];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              J
            </Text>
          </View>

          <JoinziieLogo />

          <Pressable
            style={styles.notification}
            onPress={() =>
              router.push("/notifications")
            }
          >
            <Text style={styles.notificationIcon}>
              ♧
            </Text>

            <View style={styles.notificationDot} />
          </Pressable>
        </View>

        <Text style={styles.heading}>
          Find your next{" "}
          <Text style={styles.highlight}>
            activity
          </Text>
        </Text>

        <Text style={styles.subtitle}>
          Swipe to discover amazing opportunities near you.
        </Text>

        <View style={styles.deck}>
          {current ? (
            <SwipeCard
              key={current.id}
              activity={current}
              onLike={(activity) =>
                matchActivity(activity.id)
              }
              onPass={(activity) =>
                passActivity(activity.id)
              }
            />
          ) : (
            <View style={styles.empty}>
              <Text style={styles.emptyIcon}>
                ✦
              </Text>

              <Text style={styles.emptyTitle}>
                You're all caught up
              </Text>

              <Text style={styles.emptyText}>
                Explore more activities or check back later.
              </Text>

              <Pressable
                style={styles.exploreButton}
                onPress={() =>
                  router.push("/(tabs)/explore")
                }
              >
                <Text style={styles.exploreButtonText}>
                  Explore Activities
                </Text>
              </Pressable>
            </View>
          )}
        </View>

        <View style={styles.deckInfo}>
          <View style={styles.dots}>
            <View style={styles.dotActive} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>

          <Text style={styles.nearby}>
            {availableSwipeActivities.length} activities nearby
          </Text>
        </View>

        <Pressable style={styles.filterButton}>
          <Text style={styles.filterIcon}>
            ☷
          </Text>

          <Text style={styles.filterText}>
            Filters
          </Text>
        </Pressable>

        <View style={styles.instructions}>
          <Text style={styles.passInstruction}>
            ← Swipe left to pass
          </Text>

          <View style={styles.divider} />

          <Text style={styles.likeInstruction}>
            Swipe right to like →
          </Text>
        </View>
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
    maxWidth: 520,
    alignSelf: "center",
    paddingHorizontal: 17,
    paddingTop: 17,
    paddingBottom: 30,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  avatar: {
    width: 43,
    height: 43,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: COLORS.purple,
    backgroundColor: "#15223C",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "900",
  },

  notification: {
    width: 43,
    height: 43,
    alignItems: "center",
    justifyContent: "center",
  },

  notificationIcon: {
    color: COLORS.white,
    fontSize: 28,
  },

  notificationDot: {
    position: "absolute",
    right: 3,
    top: 4,
    width: 10,
    height: 10,
    borderRadius: 8,
    backgroundColor: "#FF3A87",
  },

  heading: {
    color: COLORS.white,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "900",
    marginTop: 25,
  },

  highlight: {
    color: COLORS.pink,
  },

  subtitle: {
    color: "#D3D8E5",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 5,
  },

  deck: {
    marginTop: 20,
    alignItems: "center",
  },

  deckInfo: {
    alignItems: "center",
    marginTop: 17,
  },

  dots: {
    flexDirection: "row",
    gap: 7,
  },

  dot: {
    width: 9,
    height: 9,
    borderRadius: 6,
    backgroundColor: "#24324B",
  },

  dotActive: {
    width: 9,
    height: 9,
    borderRadius: 6,
    backgroundColor: COLORS.purple,
  },

  nearby: {
    color: COLORS.white,
    fontSize: 12,
    marginTop: 9,
  },

  filterButton: {
    marginTop: 15,
    minHeight: 55,
    borderRadius: 28,
    backgroundColor: COLORS.purple,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  filterIcon: {
    color: COLORS.white,
    fontSize: 22,
  },

  filterText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "800",
  },

  instructions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },

  passInstruction: {
    color: "#FF4386",
    fontSize: 10,
  },

  likeInstruction: {
    color: "#4E7FFF",
    fontSize: 10,
  },

  divider: {
    width: 1,
    height: 25,
    backgroundColor: "#35415A",
    marginHorizontal: 14,
  },

  empty: {
    width: "100%",
    minHeight: 420,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#27354D",
    backgroundColor: "#07101F",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },

  emptyIcon: {
    color: COLORS.purple,
    fontSize: 45,
  },

  emptyTitle: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "900",
    marginTop: 15,
  },

  emptyText: {
    color: COLORS.secondary,
    textAlign: "center",
    fontSize: 12,
    marginTop: 7,
  },

  exploreButton: {
    marginTop: 22,
    backgroundColor: COLORS.purple,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
  },

  exploreButtonText: {
    color: COLORS.white,
    fontWeight: "800",
    fontSize: 11,
  },
});

