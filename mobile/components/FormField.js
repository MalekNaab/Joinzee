import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { COLORS } from "../constants/theme";

export default function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
}) {
  return (
    <View style={styles.group}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.muted}
        keyboardType={keyboardType}
        autoCapitalize={
          keyboardType === "email-address"
            ? "none"
            : "sentences"
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    marginBottom: 13,
  },

  label: {
    color: COLORS.secondary,
    fontSize: 11,
    marginBottom: 6,
    fontWeight: "600",
  },

  input: {
    minHeight: 46,
    borderRadius: 9,
    paddingHorizontal: 13,
    color: COLORS.white,
    backgroundColor: COLORS.surface2,
    borderWidth: 1,
    borderColor: COLORS.border,
    fontSize: 13,
  },
});
