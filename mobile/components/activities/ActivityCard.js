import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useRouter } from "expo-router";

import ActivityImagePlaceholder from "./ActivityImagePlaceholder";
import { COLORS } from "../../constants/theme";

export default function ActivityCard({
  activity,
  onSave,
  saved = false,
  compact = false,
}) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() =>
        router.push(`/activity/${activity.id}`)
      }
      style={styles.card}
    >
      <View>
        <ActivityImagePlaceholder
          category={activity.category}
          height={compact ? 145 : 190}
        />

        <View style={styles.category}>
          <Text style={styles.categoryText}>
            {activity.category}
          </Text>
        </View>

        <Pressable
          onPress={(event) => {
            event.stopPropagation?.();
            onSave?.(activity);
          }}
          style={[
            styles.heart,
            saved && styles.heartSaved,
          ]}
        >
          <Text
            style={[
              styles.heartText,
              saved && styles.heartTextSaved,
            ]}
          >
            {saved ? "♥" : "♡"}
          </Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          {activity.title}
        </Text>

        <View style={styles.organisationRow}>
          <Text style={styles.organisation}>
            {activity.organisation}
          </Text>

          {activity.verified && (
            <View style={styles.verified}>
              <Text style={styles.verifiedText}>
                ✓
              </Text>
            </View>
          )}
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.meta}>
            Ages {activity.ageRange}
          </Text>

          <Text style={styles.dot}>•</Text>

          <Text style={styles.meta}>
            {activity.distance}
          </Text>
        </View>

        <Text style={styles.meta}>
          {activity.location}
        </Text>

        <View style={styles.metaRow}>
          <Text style={styles.meta}>
            {activity.day}
          </Text>

          <Text style={styles.dot}>•</Text>

          <Text style={styles.meta}>
            {activity.time}
          </Text>
        </View>

        <View style={styles.bottom}>
          <Text
            style={[
              styles.price,
              activity.price === 0 &&
                styles.free,
            ]}
          >
            {activity.price === 0
              ? "FREE"
              : `£${activity.price}`}
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
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },

  category: {
    position: "absolute",
    left: 12,
    top: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "rgba(3,6,23,0.88)",
  },

  categoryText: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: "700",
  },

  heart: {
    position: "absolute",
    top: 11,
    right: 11,
    width: 34,
    height: 34,
    borderRadius: 18,
    backgroundColor: "rgba(3,6,23,0.88)",
    alignItems: "center",
    justifyContent: "center",
  },

  heartSaved: {
    backgroundColor: COLORS.pink,
  },

  heartText: {
    color: COLORS.white,
    fontSize: 20,
  },

  heartTextSaved: {
    color: COLORS.white,
  },

  content: {
    padding: 14,
  },

  title: {
    color: COLORS.white,
    fontWeight: "900",
    fontSize: 16,
  },

  organisationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 5,
  },

  organisation: {
    color: COLORS.secondary,
    fontSize: 11,
  },

  verified: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: COLORS.blue,
    alignItems: "center",
    justifyContent: "center",
  },

  verifiedText: {
    color: COLORS.white,
    fontSize: 8,
    fontWeight: "900",
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },

  meta: {
    color: COLORS.secondary,
    fontSize: 10,
  },

  dot: {
    color: COLORS.muted,
    marginHorizontal: 5,
  },

  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 13,
  },

  price: {
    color: COLORS.orange,
    fontSize: 13,
    fontWeight: "900",
  },

  free: {
    color: COLORS.success,
  },

  spaces: {
    color: COLORS.secondary,
    fontSize: 9,
  },
});
