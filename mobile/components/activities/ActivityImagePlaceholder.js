import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import {
  COLORS,
  GRADIENT,
} from "../../constants/theme";

export default function ActivityImagePlaceholder({
  category,
  height = 190,
}) {
  return (
    <View style={[styles.wrapper, { height }]}>
      <LinearGradient
        colors={[
          "#11172A",
          "#1B1240",
          "#28132D",
        ]}
        style={styles.background}
      >
        <View style={styles.glowOne} />
        <View style={styles.glowTwo} />

        <Text style={styles.icon}>
          {category === "Football"
            ? "⚽"
            : category === "Basketball"
            ? "🏀"
            : category === "Martial Arts"
            ? "🥋"
            : category === "Coding"
            ? "⌨"
            : category === "Music"
            ? "♫"
            : "✦"}
        </Text>

        <Text style={styles.title}>
          Activity Image
        </Text>

        <Text style={styles.subtitle}>
          Replace with final Joinziie artwork
        </Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: "hidden",
    borderRadius: 18,
    backgroundColor: COLORS.surface,
  },

  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  glowOne: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 100,
    backgroundColor: "rgba(139,44,245,0.13)",
    top: -25,
    left: -15,
  },

  glowTwo: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 100,
    backgroundColor: "rgba(255,104,45,0.10)",
    bottom: -35,
    right: -15,
  },

  icon: {
    fontSize: 36,
  },

  title: {
    color: COLORS.white,
    fontWeight: "800",
    fontSize: 14,
    marginTop: 8,
  },

  subtitle: {
    color: COLORS.muted,
    fontSize: 9,
    marginTop: 4,
  },
});
