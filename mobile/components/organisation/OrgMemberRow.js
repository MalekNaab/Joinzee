import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";

export default function OrgMemberRow({ item }) {
  return (
    <Pressable style={styles.card}>
      <View
        style={[
          styles.initials,
          { backgroundColor: item.color },
        ]}
      >
        <Text style={styles.initialsText}>{item.initials}</Text>
      </View>

      <View style={styles.textWrap}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.role}>{item.role}</Text>
      </View>

      <View style={styles.status}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={18}
        color={COLORS.white}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 10,
  },

  initials: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  initialsText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "900",
  },

  textWrap: {
    flex: 1,
  },

  name: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "800",
  },

  role: {
    color: COLORS.secondary,
    fontSize: 10.5,
    marginTop: 2,
  },

  status: {
    minWidth: 82,
    height: 34,
    borderRadius: 20,
    backgroundColor: "#1E6E3C",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    marginRight: 8,
  },

  statusText: {
    color: "#D2FFE1",
    fontSize: 10.5,
    fontWeight: "800",
  },
});
