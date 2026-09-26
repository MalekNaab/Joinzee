import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useRouter } from "expo-router";

import SignupScreen from "../../components/SignupScreen";
import GradientButton from "../../components/GradientButton";

import { COLORS } from "../../constants/theme";
import { useSignup } from "../../context/SignupContext";

export default function ReviewScreen() {
  const router = useRouter();

  const { signupData } = useSignup();

  const {
    parent,
    child,
    interests,
  } = signupData;

  return (
    <SignupScreen
      step={7}
      title="Review & Confirm"
      subtitle="Please check your details."
    >
      <View style={styles.card}>
        <Text style={styles.label}>
          👨‍👩‍👧 Parent / Guardian
        </Text>

        <Text style={styles.primary}>
          {parent.fullName || "Not provided"}
        </Text>

        <Text style={styles.secondary}>
          {parent.email}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          ⚽ Child
        </Text>

        <Text style={styles.primary}>
          {child.fullName || "Not provided"}
        </Text>

        <Text style={styles.secondary}>
          Age {child.age || "—"}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          Interests
        </Text>

        <View style={styles.tags}>
          {interests.map((interest) => (
            <View
              key={interest}
              style={styles.tag}
            >
              <Text style={styles.tagText}>
                {interest}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.safety}>
        <View>
          <Text style={styles.safetyTitle}>
            Safety & Permissions
          </Text>

          <Text style={styles.safetyText}>
            All confirmed
          </Text>
        </View>

        <Text style={styles.safetyTick}>
          ✓
        </Text>
      </View>

      <GradientButton
        title="Create Account"
        onPress={() =>
          router.replace("/onboarding/success")
        }
      />
    </SignupScreen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 13,
    marginBottom: 10,
  },

  label: {
    color: COLORS.pink,
    fontSize: 10,
    fontWeight: "700",
    marginBottom: 6,
  },

  primary: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "800",
  },

  secondary: {
    color: COLORS.secondary,
    fontSize: 10,
    marginTop: 3,
  },

  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },

  tag: {
    backgroundColor: "#161032",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderWidth: 1,
    borderColor: COLORS.purple,
  },

  tagText: {
    color: COLORS.white,
    fontSize: 9,
  },

  safety: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0B2416",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#174A29",
    padding: 13,
    marginBottom: 22,
  },

  safetyTitle: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 11,
  },

  safetyText: {
    color: COLORS.success,
    fontSize: 9,
    marginTop: 2,
  },

  safetyTick: {
    color: COLORS.success,
    fontSize: 18,
    fontWeight: "900",
  },
});
