import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, GRADIENT } from "../constants/theme";

export default function ProgressHeader({
  step,
  total = 6,
  title,
}) {
  const router = useRouter();

  return (
    <View>
      <View style={styles.top}>
        <Pressable
          onPress={() => router.back()}
          style={styles.back}
        >
          <Text style={styles.backText}>←</Text>
        </Pressable>

        <View style={styles.logoWrap}>
          <Text style={styles.logoIcon}>J</Text>
          <Text style={styles.logo}>Joinziie</Text>
        </View>
      </View>

      <View style={styles.progressBackground}>
        <LinearGradient
          colors={GRADIENT}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.progress,
            { width: `${(step / total) * 100}%` },
          ]}
        />
      </View>

      <Text style={styles.step}>
        Step {step} of {total} — {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    minHeight: 55,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 19,
  },

  back: {
    position: "absolute",
    left: 0,
    width: 48,
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },

  backText: {
    color: COLORS.white,
    fontSize: 26,
  },

  logoWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  logoIcon: {
    fontSize: 29,
    fontWeight: "900",
    color: COLORS.purple,
  },

  logo: {
    fontSize: 26,
    fontWeight: "900",
    color: COLORS.white,
  },

  progressBackground: {
    height: 5,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 100,
    overflow: "hidden",
  },

  progress: {
    height: "100%",
    borderRadius: 100,
  },

  step: {
    color: COLORS.textSecondary,
    marginTop: 10,
    fontSize: 14,
  },
});
