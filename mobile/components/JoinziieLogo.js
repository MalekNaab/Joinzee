import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/theme";

export default function JoinziieLogo({ large = false }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <Text
          style={[
            styles.mark,
            large && styles.markLarge,
          ]}
        >
          J
        </Text>

        <Text
          style={[
            styles.text,
            large && styles.textLarge,
          ]}
        >
          Joinz
          <Text style={styles.ii}>ii</Text>
          e
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  mark: {
    color: COLORS.purple,
    fontSize: 30,
    fontWeight: "900",
  },

  markLarge: {
    fontSize: 40,
  },

  text: {
    color: COLORS.white,
    fontWeight: "900",
    fontSize: 25,
  },

  textLarge: {
    fontSize: 36,
  },

  ii: {
    color: COLORS.pink,
  },
});
