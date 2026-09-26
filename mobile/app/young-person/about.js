import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useRouter } from "expo-router";

import YoungSignupScreen from "../../components/YoungSignupScreen";
import FormField from "../../components/FormField";
import GradientButton from "../../components/GradientButton";

import { COLORS } from "../../constants/theme";
import { useSignup } from "../../context/SignupContext";

const genders = [
  "Male",
  "Female",
  "Prefer not to say",
];

const descriptions = [
  "Student",
  "Apprentice",
  "Working",
  "Other",
];

export default function YoungAboutScreen() {
  const router = useRouter();

  const {
    signupData,
    updateYoungPerson,
  } = useSignup();

  const person = signupData.youngPerson;

  return (
    <YoungSignupScreen
      step={5}
      title="More about you"
      subtitle="Help us personalise your experience."
    >
      <Text style={styles.label}>Gender</Text>

      <View style={styles.genderRow}>
        {genders.map((gender) => {
          const selected = person.gender === gender;

          return (
            <Pressable
              key={gender}
              style={[
                styles.gender,
                selected && styles.selected,
              ]}
              onPress={() =>
                updateYoungPerson("gender", gender)
              }
            >
              <Text
                style={[
                  styles.genderText,
                  selected && styles.selectedText,
                ]}
              >
                {gender}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <FormField
        label="School / College (Optional)"
        placeholder="West London College"
        value={person.school}
        onChangeText={(value) =>
          updateYoungPerson("school", value)
        }
      />

      <Text style={styles.label}>
        What best describes you?
      </Text>

      <View style={styles.descriptionList}>
        {descriptions.map((item) => {
          const selected =
            person.description === item;

          return (
            <Pressable
              key={item}
              style={[
                styles.description,
                selected && styles.descriptionSelected,
              ]}
              onPress={() =>
                updateYoungPerson("description", item)
              }
            >
              <Text style={styles.descriptionText}>
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <GradientButton
        title="Continue"
        onPress={() =>
          router.push("/young-person/interests")
        }
      />
    </YoungSignupScreen>
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
    marginBottom: 17,
  },

  gender: {
    flex: 1,
    minHeight: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },

  selected: {
    backgroundColor: COLORS.purple,
    borderColor: COLORS.pink,
  },

  genderText: {
    color: COLORS.secondary,
    textAlign: "center",
    fontSize: 10,
  },

  selectedText: {
    color: COLORS.white,
    fontWeight: "700",
  },

  descriptionList: {
    gap: 7,
    marginBottom: 24,
  },

  description: {
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: 13,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  descriptionSelected: {
    borderColor: COLORS.purple,
    backgroundColor: "#17103A",
  },

  descriptionText: {
    color: COLORS.white,
    fontSize: 11,
  },
});
