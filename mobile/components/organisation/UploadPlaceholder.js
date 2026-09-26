import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { COLORS } from "../../constants/theme";

export default function UploadPlaceholder({
  title,
  subtitle,
  added = false,
  onPress,
  height = 135,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.box,
        {
          height,
        },
        added &&
          styles.addedBox,
      ]}
    >
      <Text style={styles.icon}>
        {added ? "✓" : "+"}
      </Text>

      <Text style={styles.title}>
        {added
          ? `${title} Added`
          : title}
      </Text>

      <Text style={styles.subtitle}>
        {added
          ? "Tap to replace"
          : subtitle}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    width: "100%",
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: COLORS.purple,
    backgroundColor: "#0C1020",
    alignItems: "center",
    justifyContent: "center",
  },

  addedBox: {
    borderStyle: "solid",
    borderColor: COLORS.success,
    backgroundColor: "#0A2014",
  },

  icon: {
    color: COLORS.pink,
    fontSize: 30,
    fontWeight: "500",
  },

  title: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 7,
  },

  subtitle: {
    color: COLORS.secondary,
    fontSize: 9,
    marginTop: 4,
  },
});
