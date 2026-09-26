import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useRouter } from "expo-router";

import SignupScreen from "../../components/SignupScreen";
import FormField from "../../components/FormField";
import GradientButton from "../../components/GradientButton";

import { COLORS } from "../../constants/theme";
import { useSignup } from "../../context/SignupContext";

const genders = [
  "Male",
  "Female",
  "Prefer not to say",
];

export default function ChildDetailsScreen() {
  const router = useRouter();

  const {
    signupData,
    updateChild,
  } = useSignup();

  const child = signupData.child;

  return (
    <SignupScreen
      step={4}
      title="Child details"
      subtitle="Tell us about your child."
    >
      <FormField
        label="Full Name"
        placeholder="Daniel Johnson"
        value={child.fullName}
        onChangeText={(value) =>
          updateChild("fullName", value)
        }
      />

      <FormField
        label="Date of Birth"
        placeholder="12 May 2012"
        value={child.dateOfBirth}
        onChangeText={(value) =>
          updateChild("dateOfBirth", value)
        }
      />

      <FormField
        label="Age"
        placeholder="12"
        keyboardType="numeric"
        value={child.age}
        onChangeText={(value) =>
          updateChild("age", value)
        }
      />

      <Text style={styles.label}>
        Gender
      </Text>

      <View style={styles.genderRow}>
        {genders.map((gender) => {
          const selected =
            child.gender === gender;

          return (
            <Pressable
              key={gender}
              style={[
                styles.gender,
                selected &&
                  styles.genderSelected,
              ]}
              onPress={() =>
                updateChild("gender", gender)
              }
            >
              <Text
                style={[
                  styles.genderText,
                  selected &&
                    styles.genderTextSelected,
                ]}
              >
                {gender}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <FormField
        label="School (Optional)"
        placeholder="West London School"
        value={child.school}
        onChangeText={(value) =>
          updateChild("school", value)
        }
      />

      <GradientButton
        title="Continue"
        onPress={() =>
          router.push("/onboarding/interests")
        }
      />
    </SignupScreen>
  );
}

const styles = StyleSheet.create({
  label: {
    color: COLORS.secondary,
    fontSize: 11,
    marginBottom: 7,
    fontWeight: "600",
  },

  genderRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 15,
  },

  gender: {
    flex: 1,
    minHeight: 39,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },

  genderSelected: {
    backgroundColor: COLORS.purple,
    borderColor: COLORS.pink,
  },

  genderText: {
    color: COLORS.secondary,
    fontSize: 10,
    textAlign: "center",
  },

  genderTextSelected: {
    color: COLORS.white,
    fontWeight: "700",
  },
});
