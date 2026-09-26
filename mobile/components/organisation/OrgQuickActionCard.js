import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";

export default function OrgQuickActionCard({
  icon,
  title,
  subtitle,
  accent = COLORS.purple,
  onPress,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
    >
      <View
        style={[
          styles.iconWrap,
          {
            backgroundColor: accent,
          },
        ]}
      >
        <Ionicons
          name={icon}
          size={24}
          color={COLORS.white}
        />
      </View>

      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.subtitle}>
        {subtitle}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "23.5%",
    minHeight: 124,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 14,
  },

  pressed: {
    opacity: 0.72,
    transform: [
      {
        scale: 0.98,
      },
    ],
  },

  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  title: {
    color: COLORS.white,
    fontSize: 11.5,
    fontWeight: "800",
    textAlign: "center",
  },

  subtitle: {
    color: COLORS.secondary,
    fontSize: 8.5,
    lineHeight: 12,
    textAlign: "center",
    marginTop: 5,
  },
});
