import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import ActivityCard from "../../components/activities/ActivityCard";
import JoinziieLogo from "../../components/JoinziieLogo";

import { activities } from "../../data/activities";
import { COLORS } from "../../constants/theme";

export default function SavedScreen() {
  const demoSaved = [
    activities[0],
    activities[2],
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <JoinziieLogo />

        <Text style={styles.heading}>
          Saved
        </Text>

        <Text style={styles.subtitle}>
          Activities you've liked and want to come back to.
        </Text>

        <View style={styles.cards}>
          {demoSaved.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              saved
            />
          ))}
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
    padding: 18,
    paddingBottom: 35,
  },

  heading: {
    color: COLORS.white,
    fontSize: 27,
    fontWeight: "900",
    marginTop: 28,
  },

  subtitle: {
    color: COLORS.secondary,
    fontSize: 11,
    lineHeight: 17,
    marginTop: 5,
    marginBottom: 20,
  },

  cards: {
    gap: 14,
  },
});
