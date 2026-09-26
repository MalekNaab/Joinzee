import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import JoinziieLogo from "../../components/JoinziieLogo";
import ExploreCard from "../../components/activities/ExploreCard";

import { COLORS } from "../../constants/theme";
import { useActivities } from "../../context/ActivityContext";

export default function MatchesScreen() {
  const {
    matchedActivities,
    matchedIds,
    unmatchActivity,
  } = useActivities();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
      >
        <JoinziieLogo />

        <Text style={styles.heading}>
          Your Matches
        </Text>

        <Text style={styles.subtitle}>
          Activities you've liked while discovering Joinziie.
        </Text>

        {matchedActivities.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.heart}>
              ♡
            </Text>

            <Text style={styles.emptyTitle}>
              No matches yet
            </Text>

            <Text style={styles.emptyText}>
              Swipe right on activities you like and they'll appear here.
            </Text>
          </View>
        ) : (
          <View style={styles.grid}>
            {matchedActivities.map(
              (activity) => (
                <ExploreCard
                  key={activity.id}
                  activity={activity}
                  matched={matchedIds.includes(
                    activity.id
                  )}
                  onToggleMatch={() =>
                    unmatchActivity(
                      activity.id
                    )
                  }
                />
              )
            )}
          </View>
        )}
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
    maxWidth: 540,
    alignSelf: "center",
    padding: 17,
    paddingBottom: 35,
  },

  heading: {
    color: COLORS.white,
    fontSize: 30,
    fontWeight: "900",
    marginTop: 28,
  },

  subtitle: {
    color: COLORS.secondary,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
    marginBottom: 23,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  empty: {
    marginTop: 50,
    minHeight: 330,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#263854",
    backgroundColor: "#07101F",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },

  heart: {
    color: COLORS.pink,
    fontSize: 50,
  },

  emptyTitle: {
    color: COLORS.white,
    fontSize: 19,
    fontWeight: "900",
    marginTop: 13,
  },

  emptyText: {
    color: COLORS.secondary,
    textAlign: "center",
    fontSize: 11,
    lineHeight: 17,
    marginTop: 7,
  },
});
