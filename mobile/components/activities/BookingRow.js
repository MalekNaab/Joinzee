import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import ActivityImagePlaceholder from "./ActivityImagePlaceholder";
import { COLORS } from "../../constants/theme";

export default function BookingRow({
  activity,
  status = "confirmed",
  going = 8,
}) {
  const confirmed =
    status === "confirmed";

  return (
    <Pressable style={styles.card}>
      <View style={styles.image}>
        <ActivityImagePlaceholder
          category={activity.category}
          height={108}
        />
      </View>

      <View style={styles.content}>
        <Text
          style={styles.title}
          numberOfLines={1}
        >
          {activity.title}
        </Text>

        <Text style={styles.meta}>
          ▣ {activity.day},{" "}
          {activity.time}
        </Text>

        <Text
          style={styles.meta}
          numberOfLines={1}
        >
          📍 {activity.location}
        </Text>

        <Text style={styles.meta}>
          👥 {going} going
        </Text>
      </View>

      <View
        style={[
          styles.status,
          confirmed
            ? styles.confirmed
            : styles.pending,
        ]}
      >
        <Text
          style={[
            styles.statusText,
            confirmed
              ? styles.confirmedText
              : styles.pendingText,
          ]}
        >
          {confirmed
            ? "✓ Confirmed"
            : "◷ Pending"}
        </Text>
      </View>

      <Text style={styles.chevron}>
        ›
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 128,
    borderRadius: 15,
    backgroundColor: "#07101F",
    borderWidth: 1,
    borderColor: "#263854",
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },

  image: {
    width: 105,
    borderRadius: 12,
    overflow: "hidden",
  },

  content: {
    flex: 1,
    paddingHorizontal: 12,
  },

  title: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "900",
  },

  meta: {
    color: COLORS.secondary,
    fontSize: 9,
    marginTop: 5,
  },

  status: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 6,
  },

  confirmed: {
    backgroundColor: "#0D3827",
    borderWidth: 1,
    borderColor: "#32D783",
  },

  pending: {
    backgroundColor: "#3A270A",
    borderWidth: 1,
    borderColor: "#DA941C",
  },

  statusText: {
    fontSize: 8,
    fontWeight: "800",
  },

  confirmedText: {
    color: "#55E69C",
  },

  pendingText: {
    color: "#F2A929",
  },

  chevron: {
    color: COLORS.secondary,
    fontSize: 24,
  },
});
