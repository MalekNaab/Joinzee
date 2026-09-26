import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useRouter } from "expo-router";

import SignupScreen from "../../components/SignupScreen";
import GradientButton from "../../components/GradientButton";

import { COLORS } from "../../constants/theme";
import { useSignup } from "../../context/SignupContext";

const items = [
  [
    "guardian",
    "I confirm that I am the parent or legal guardian of this child.",
  ],
  [
    "terms",
    "I agree to the Terms of Use and Privacy Policy.",
  ],
  [
    "participation",
    "I give permission for my child to join activities.",
  ],
  [
    "organiserContact",
    "I give permission for organisers to contact me regarding participation.",
  ],
];

export default function SafetyScreen() {
  const router = useRouter();

  const {
    signupData,
    setSignupData,
  } = useSignup();

  const toggle = (key) => {
    setSignupData((current) => ({
      ...current,
      permissions: {
        ...current.permissions,
        [key]: !current.permissions[key],
      },
    }));
  };

  const complete =
    Object.values(
      signupData.permissions
    ).every(Boolean);

  return (
    <SignupScreen
      step={6}
      title="Safety & Permissions"
      subtitle="Your child's safety is our priority."
    >
      <View style={styles.items}>
        {items.map(([key, label]) => {
          const checked =
            signupData.permissions[key];

          return (
            <Pressable
              key={key}
              style={styles.item}
              onPress={() => toggle(key)}
            >
              <View
                style={[
                  styles.checkbox,
                  checked &&
                    styles.checkboxSelected,
                ]}
              >
                {checked && (
                  <Text style={styles.tick}>
                    ✓
                  </Text>
                )}
              </View>

              <Text style={styles.text}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.note}>
        <Text style={styles.noteIcon}>✓</Text>

        <Text style={styles.noteText}>
          Permissions can be managed later
          from your account settings.
        </Text>
      </View>

      <GradientButton
        title="Continue"
        disabled={!complete}
        onPress={() =>
          router.push("/onboarding/review")
        }
      />
    </SignupScreen>
  );
}

const styles = StyleSheet.create({
  items: {
    gap: 10,
  },

  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
  },

  checkbox: {
    width: 21,
    height: 21,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: COLORS.purple,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  checkboxSelected: {
    backgroundColor: COLORS.purple,
  },

  tick: {
    color: COLORS.white,
    fontWeight: "900",
    fontSize: 11,
  },

  text: {
    flex: 1,
    color: COLORS.white,
    fontSize: 11,
    lineHeight: 17,
  },

  note: {
    flexDirection: "row",
    backgroundColor: "#0B2416",
    borderRadius: 10,
    padding: 12,
    marginTop: 16,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: "#184E2C",
  },

  noteIcon: {
    color: COLORS.success,
    fontWeight: "900",
    marginRight: 9,
  },

  noteText: {
    color: COLORS.secondary,
    fontSize: 10,
    flex: 1,
  },
});
