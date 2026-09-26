import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from "react-native";

import {
  useMemo,
  useState,
} from "react";

import JoinziieLogo from "../../components/JoinziieLogo";
import ExploreCard from "../../components/activities/ExploreCard";

import { activities } from "../../data/activities";
import { COLORS } from "../../constants/theme";
import { useActivities } from "../../context/ActivityContext";

const categories = [
  "All",
  "Sports",
  "Arts",
  "Music",
  "Education",
  "Workshops",
  "Gaming",
  "Life Skills",
  "Health & Fitness",
  "Community",
];

export default function ExploreScreen() {
  const [query, setQuery] =
    useState("");

  const [category, setCategory] =
    useState("All");

  const {
    matchedIds,
    matchActivity,
    unmatchActivity,
  } = useActivities();

  const filtered = useMemo(() => {
    const search =
      query.trim().toLowerCase();

    return activities.filter(
      (activity) => {
        const matchesSearch =
          !search ||
          activity.title
            .toLowerCase()
            .includes(search) ||
          activity.organisation
            .toLowerCase()
            .includes(search) ||
          activity.category
            .toLowerCase()
            .includes(search);

        const mapCategory =
          category === "Sports"
            ? [
                "Football",
                "Basketball",
                "Martial Arts",
              ].includes(
                activity.category
              )
            : category === "Arts"
            ? [
                "Art",
                "Music",
              ].includes(
                activity.category
              )
            : category === "All"
            ? true
            : activity.category === category;

        return (
          matchesSearch &&
          mapCategory
        );
      }
    );
  }, [query, category]);

  const toggle = (activity) => {
    if (
      matchedIds.includes(
        activity.id
      )
    ) {
      unmatchActivity(activity.id);
    } else {
      matchActivity(activity.id);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <JoinziieLogo />
        </View>

        <Text style={styles.heading}>
          Explore Activities
        </Text>

        <Text style={styles.subtitle}>
          Find exactly what you're into.
        </Text>

        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Text style={styles.searchIcon}>
              ⌕
            </Text>

            <TextInput
              value={query}
              onChangeText={setQuery}
              style={styles.search}
              placeholder="Search activities, clubs, events..."
              placeholderTextColor={COLORS.muted}
            />
          </View>

          <Pressable style={styles.filter}>
            <Text style={styles.filterIcon}>
              ☷
            </Text>
          </Pressable>
        </View>

        <View style={styles.categories}>
          {categories.map(
            (item) => (
              <Pressable
                key={item}
                onPress={() =>
                  setCategory(item)
                }
                style={[
                  styles.category,
                  category === item &&
                    styles.categorySelected,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    category === item &&
                      styles.categoryTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            )
          )}
        </View>

        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>
            Popular Near You
          </Text>

          <Text style={styles.seeAll}>
            See all ›
          </Text>
        </View>

        <View style={styles.grid}>
          {filtered.map(
            (activity) => (
              <ExploreCard
                key={activity.id}
                activity={activity}
                matched={matchedIds.includes(
                  activity.id
                )}
                onToggleMatch={toggle}
              />
            )
          )}
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
    maxWidth: 540,
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingTop: 17,
    paddingBottom: 35,
  },

  header: {
    alignItems: "center",
    marginBottom: 28,
  },

  heading: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: "900",
  },

  subtitle: {
    color: "#D5DBE8",
    fontSize: 17,
    marginTop: 3,
  },

  searchRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 18,
  },

  searchBox: {
    flex: 1,
    minHeight: 53,
    borderWidth: 1,
    borderColor: "#314462",
    borderRadius: 15,
    backgroundColor: "#07101F",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
  },

  searchIcon: {
    color: "#CAD4E8",
    fontSize: 22,
    marginRight: 8,
  },

  search: {
    flex: 1,
    color: COLORS.white,
    fontSize: 12,
  },

  filter: {
    width: 55,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#314462",
    backgroundColor: "#07101F",
    alignItems: "center",
    justifyContent: "center",
  },

  filterIcon: {
    color: COLORS.white,
    fontSize: 22,
  },

  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
    marginTop: 16,
  },

  category: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#314462",
    paddingHorizontal: 14,
    paddingVertical: 9,
    backgroundColor: "#07101F",
  },

  categorySelected: {
    backgroundColor: COLORS.purple,
    borderColor: COLORS.pink,
  },

  categoryText: {
    color: "#E1E6F1",
    fontSize: 10,
  },

  categoryTextSelected: {
    color: COLORS.white,
    fontWeight: "800",
  },

  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 12,
  },

  sectionTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "900",
  },

  seeAll: {
    color: COLORS.pink,
    fontSize: 11,
    fontWeight: "800",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
});
