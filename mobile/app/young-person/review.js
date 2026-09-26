import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useRouter } from "expo-router";

import YoungSignupScreen from "../../components/YoungSignupScreen";
import GradientButton from "../../components/GradientButton";

import { COLORS } from "../../constants/theme";
import { useSignup } from "../../context/SignupContext";

export default function YoungReviewScreen() {
  const router = useRouter();

  const {
    signupData,
  } = useSignup();

  const person = signupData.youngPerson;

  return (
    <YoungSignupScreen
      step={8}
      title="Review & Confirm"
      subtitle="Please check your details."
    >
      <View style={styles.card}>
        <Text style={styles.primary}>
          {person.fullName || "Young Person"}
        </Text>

        <Text style={styles.secondary}>
          Age {person.age || "—"}
        </Text>

        <Text style={styles.secondary}>
          {person.email}
        </Text>

        <Text style={styles.secondary}>
          {person.postcode}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>
          Interests
        </Text>

        <View style={styles.tags}>
          {signupData.interests.map((interest) => (
            <View key={interest} style={styles.tag}>
              <Text style={styles.tagText}>
                {interest}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <GradientButton
        title="Create Account"
        onPress={() =>
          router.replace("/young-person/success")
        }
      />
    </YoungSignupScreen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    marginBottom: 12,
  },

  primary: {
    color: COLORS.white,
    fontWeight: "800",
    fontSize: 14,
  },

  secondary: {
    color: COLORS.secondary,
    fontSize: 10,
    marginTop: 4,
  },

  heading: {
    color: COLORS.pink,
    fontWeight: "700",
    fontSize: 11,
    marginBottom: 8,
  },

  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },

  tag: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.purple,
    backgroundColor: "#17103A",
  },

  tagText: {
    color: COLORS.white,
    fontSize: 9,
  },
});
