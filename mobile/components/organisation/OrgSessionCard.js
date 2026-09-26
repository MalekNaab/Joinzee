import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import {
  COLORS,
} from "../../constants/theme";

export default function OrgSessionCard({
  item,
  onPress,
}) {
  const isPast =
    item.status === "past";

  const isDraft =
    item.status === "draft";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.thumb}>
        <Text style={styles.thumbText}>
          {item.label}
        </Text>
      </View>

      <View style={styles.content}>
        <Text
          style={styles.title}
          numberOfLines={2}
        >
          {item.title}
        </Text>

        <View style={styles.infoRow}>
          <Ionicons
            name="calendar-outline"
            size={14}
            color={COLORS.white}
          />

          <Text style={styles.infoText}>
            {item.date}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="location-outline"
            size={14}
            color={COLORS.white}
          />

          <Text
            style={styles.infoText}
            numberOfLines={1}
          >
            {item.location}
          </Text>
        </View>

        {isPast && item.attendance && (
          <View style={styles.extraRow}>
            <Ionicons
              name="checkmark-circle-outline"
              size={13}
              color="#53EF94"
            />

            <Text style={styles.attendanceText}>
              Attendance {item.attendance}
            </Text>
          </View>
        )}

        {isDraft && (
          <View style={styles.draftBadge}>
            <Text style={styles.draftBadgeText}>
              Draft
            </Text>
          </View>
        )}
      </View>

      <View style={styles.right}>
        {!isDraft && (
          <View style={styles.capacity}>
            <Text style={styles.capacityText}>
              {item.capacity}
            </Text>
          </View>
        )}

        {isDraft && (
          <View style={styles.notPublished}>
            <Text style={styles.notPublishedText}>
              Not published
            </Text>
          </View>
        )}

        <Ionicons
          name="chevron-forward"
          size={20}
          color={COLORS.white}
          style={styles.chevron}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    padding: 12,
    marginBottom: 12,
  },

  pressed: {
    opacity: 0.75,
  },

  thumb: {
    width: 92,
    height: 76,
    borderRadius: 12,
    backgroundColor: "#111A2F",
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  thumbText: {
    color: COLORS.pink,
    fontSize: 15,
    fontWeight: "900",
    textAlign: "center",
  },

  content: {
    flex: 1,
  },

  title: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 7,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },

  infoText: {
    color: COLORS.white,
    fontSize: 10.5,
  },

  extraRow: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    marginTop: 7,
  },

  attendanceText: {
    color: "#53EF94",
    fontSize: 9,
    fontWeight: "700",
  },

  draftBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#30264F",
    borderRadius: 14,
    paddingHorizontal: 9,
    paddingVertical: 5,
    marginTop: 8,
  },

  draftBadgeText: {
    color: "#D7B9FF",
    fontSize: 8,
    fontWeight: "800",
  },

  right: {
    marginLeft: 9,
    alignItems: "flex-end",
    justifyContent: "space-between",
    minHeight: 75,
  },

  capacity: {
    minWidth: 72,
    height: 34,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.11)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 9,
  },

  capacityText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "800",
  },

  notPublished: {
    borderRadius: 10,
    backgroundColor: "#282033",
    paddingHorizontal: 9,
    paddingVertical: 8,
  },

  notPublishedText: {
    color: "#D0B8DD",
    fontSize: 8,
    fontWeight: "700",
  },

  chevron: {
    marginTop: 14,
  },
});
