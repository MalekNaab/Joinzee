import { Pressable, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { GRADIENT } from "../constants/theme";

export default function GradientButton({
  title,
  onPress,
  disabled = false,
  arrow = false,
}) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: disabled ? 0.4 : pressed ? 0.85 : 1,
      })}
    >
      <LinearGradient
        colors={GRADIENT}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.button}
      >
        <Text style={styles.title}>
          {title}
        </Text>

        {arrow && (
          <Text style={styles.arrow}>→</Text>
        )}
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 18,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  arrow: {
    color: "#FFFFFF",
    fontSize: 20,
  },
});
