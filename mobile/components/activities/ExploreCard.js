import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useRouter } from "expo-router";

import ActivityImagePlaceholder from "./ActivityImagePlaceholder";
import { COLORS } from "../../constants/theme";

export default function ExploreCard({
  activity,
  matched = false,
  onToggleMatch,
}) {
  const router = useRouter();

  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        router.push(
          `/activity/${activity.id}`
        )
      }
    >
      <View>
        <ActivityImagePlaceholder
          category={activity.category}
          height={155}
        />

        <Pressable
          style={styles.heart}
          onPress={(event) => {
            event.stopPropagation?.();
            onToggleMatch?.(activity);
          }}
        >
          <Text
            style={[
              styles.heartText,
              matched &&
                styles.heartMatched,
            ]}
          >
            {matched ? "♥" : "♡"}
          </Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.category}>
          <Text style={styles.categoryText}>
            {activity.category}
          </Text>
        </View>

        <Text
          style={styles.title}
          numberOfLines={2}
        >
          {activity.title}
        </Text>

        <Text style={styles.meta}>
          👥 Ages {activity.ageRange}
        </Text>

        <Text style={styles.meta}>
          ◷ {activity.day},{" "}
          {activity.time}
        </Text>

        <Text
          style={styles.meta}
          numberOfLines={1}
        >
          📍 {activity.location}
        </Text>

        <View style={styles.bottom}>
          <Text style={styles.rating}>
            ⭐ 4.8
          </Text>

          <Text style={styles.spaces}>
            {activity.spaces} spaces left
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48.5%",
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#263854",
    overflow: "hidden",
    backgroundColor: "#07101F",
  },

  heart: {
    position: "absolute",
    right: 9,
    top: 9,
    width: 34,
    height: 34,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:
      "rgba(2,6,23,0.80)",
  },

  heartText: {
    color: COLORS.white,
    fontSize: 23,
  },

  heartMatched: {
    color: COLORS.pink,
  },

  content: {
    padding: 11,
  },

  category: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.purple,
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 7,
  },

  categoryText: {
    color: COLORS.white,
    fontSize: 8,
    fontWeight: "800",
  },

  title: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "900",
    minHeight: 34,
  },

  meta: {
    color: COLORS.secondary,
    fontSize: 8.5,
    marginTop: 5,
  },

  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 9,
  },

  rating: {
    color: COLORS.white,
    fontSize: 8,
  },

  spaces: {
    color: COLORS.success,
    fontSize: 8,
    fontWeight: "700",
  },
});
