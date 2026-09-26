import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/theme";

export default function OrgStatCard({
  value,
  label,
  change,
  accent = "#43F58E",
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.change, { color: accent }]}>
        {change}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "23.5%",
    minHeight: 112,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    padding: 12,
    justifyContent: "space-between",
  },

  value: {
    color: COLORS.white,
    fontSize: 21,
    fontWeight: "900",
  },

  label: {
    color: COLORS.white,
    fontSize: 8.5,
    lineHeight: 13,
    marginTop: 6,
  },

  change: {
    fontSize: 8.5,
    fontWeight: "800",
    marginTop: 8,
  },
});
