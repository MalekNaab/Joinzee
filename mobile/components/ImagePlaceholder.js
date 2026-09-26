import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/theme";

export default function ImagePlaceholder({
  title = "Image Placeholder",
  height = 160,
}) {
  return (
    <View style={[styles.box, { height }]}>
      <Text style={styles.icon}>▧</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>
        Replace with final Joinziie artwork
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: "100%",
    borderRadius: 14,
    backgroundColor: COLORS.surface2,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: COLORS.purple,
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    color: COLORS.pink,
    fontSize: 28,
  },

  title: {
    color: COLORS.white,
    fontWeight: "700",
    marginTop: 6,
  },

  subtitle: {
    color: COLORS.muted,
    fontSize: 10,
    marginTop: 4,
  },
});
