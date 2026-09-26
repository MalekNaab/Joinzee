import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { COLORS, GRADIENT } from "../../constants/theme";

const heights = [28, 30, 32, 48, 44, 52, 64, 57, 63, 70, 68, 84];

export default function OrgAnalyticsChart() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Member Growth</Text>

      <View style={styles.chartArea}>
        <LinearGradient
          colors={["rgba(126,69,232,0.10)", "rgba(255,99,71,0.02)"]}
          style={styles.chartBg}
        />

        <View style={styles.barsRow}>
          {heights.map((height, index) => (
            <View key={index} style={styles.barWrap}>
              <LinearGradient
                colors={GRADIENT}
                style={[styles.bar, { height }]}
              />
            </View>
          ))}
        </View>
      </View>

      <View style={styles.labels}>
        <Text style={styles.label}>1 May</Text>
        <Text style={styles.label}>8 May</Text>
        <Text style={styles.label}>15 May</Text>
        <Text style={styles.label}>22 May</Text>
        <Text style={styles.label}>30 May</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    padding: 14,
  },

  title: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 10,
  },

  chartArea: {
    height: 145,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    justifyContent: "flex-end",
    paddingHorizontal: 8,
    paddingBottom: 10,
  },

  chartBg: {
    ...StyleSheet.absoluteFillObject,
  },

  barsRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 100,
  },

  barWrap: {
    width: "7%",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  bar: {
    width: "100%",
    borderRadius: 8,
  },

  labels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  label: {
    color: COLORS.secondary,
    fontSize: 9,
  },
});
