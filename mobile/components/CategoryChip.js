import {
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

import { COLORS } from "../constants/theme";

export default function CategoryChip({
  title,
  icon,
  selected = false,
  onPress,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        selected && styles.selected,
      ]}
    >
      <Text style={styles.icon}>
        {icon}
      </Text>

      <Text
        style={[
          styles.text,
          selected && styles.selectedText,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: 38,
    paddingHorizontal: 13,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  selected: {
    backgroundColor: "#17103A",
    borderColor: COLORS.pink,
  },

  icon: {
    fontSize: 14,
  },

  text: {
    color: COLORS.secondary,
    fontSize: 11,
    fontWeight: "600",
  },

  selectedText: {
    color: COLORS.white,
  },
});
