import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useRouter } from "expo-router";

import YoungSignupScreen from "../../components/YoungSignupScreen";
import GradientButton from "../../components/GradientButton";

import { COLORS } from "../../constants/theme";
import { useSignup } from "../../context/SignupContext";

const ages = [
  "15 or under",
  "16–18",
  "19–21",
  "22–25",
];

export default function AgeScreen() {
  const router = useRouter();

  const {
    signupData,
    updateYoungPerson,
  } = useSignup();

  const age = signupData.youngPerson.age;

  const isUnderAge = age === "15 or under";

  return (
    <YoungSignupScreen
      step={3}
      title="How old are you?"
      subtitle="This helps us find suitable activities and opportunities for you."
    >
      <View style={styles.list}>
        {ages.map((item) => {
          const selected = age === item;

          return (
            <Pressable
              key={item}
              style={[
                styles.item,
                selected && styles.selected,
                item === "15 or under" && styles.underAgeItem,
                selected &&
                  item === "15 or under" &&
                  styles.underAgeSelected,
              ]}
              onPress={() =>
                updateYoungPerson("age", item)
              }
            >
              <Text
                style={[
                  styles.ageText,
                  selected && styles.ageTextSelected,
                ]}
              >
                {item}
              </Text>

              {item !== "15 or under" && (
                <Text style={styles.description}>
                  Young Person
                </Text>
              )}

              {item === "15 or under" && (
                <Text style={styles.description}>
                  Parent / Guardian signup required
                </Text>
              )}

              {selected && (
                <View style={styles.checkCircle}>
                  <Text style={styles.check}>✓</Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>

      {isUnderAge && (
        <View style={styles.warningBox}>
          <Text style={styles.warningTitle}>
            Parent / Guardian account required
          </Text>

          <Text style={styles.warningText}>
            If you are 15 or under, a parent or guardian needs to create your Joinziie profile.
          </Text>

          <Pressable
            style={styles.parentButton}
            onPress={() =>
              router.replace("/onboarding/account-type")
            }
          >
            <Text style={styles.parentButtonText}>
              Go to Parent / Guardian signup
            </Text>
          </Pressable>
        </View>
      )}

      <GradientButton
        title="Continue"
        disabled={!age || isUnderAge}
        onPress={() =>
          router.push("/young-person/details")
        }
      />
    </YoungSignupScreen>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 10,
    marginBottom: 22,
  },

  item: {
    minHeight: 78,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    justifyContent: "center",
    paddingHorizontal: 16,
    position: "relative",
  },

  selected: {
    borderColor: COLORS.pink,
    backgroundColor: "#17103A",
  },

  underAgeItem: {
    borderColor: "#453443",
  },

  underAgeSelected: {
    borderColor: COLORS.orange,
    backgroundColor: "#251510",
  },

  ageText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "800",
  },

  ageTextSelected: {
    color: COLORS.white,
  },

  description: {
    color: COLORS.secondary,
    fontSize: 10,
    marginTop: 4,
  },

  checkCircle: {
    position: "absolute",
    right: 15,
    width: 25,
    height: 25,
    borderRadius: 20,
    backgroundColor: COLORS.purple,
    alignItems: "center",
    justifyContent: "center",
  },

  check: {
    color: COLORS.white,
    fontWeight: "900",
    fontSize: 13,
  },

  warningBox: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.orange,
    backgroundColor: "#21150E",
    padding: 14,
    marginBottom: 20,
  },

  warningTitle: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "800",
  },

  warningText: {
    color: COLORS.secondary,
    fontSize: 10,
    lineHeight: 16,
    marginTop: 5,
  },

  parentButton: {
    marginTop: 12,
    minHeight: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.orange,
    alignItems: "center",
    justifyContent: "center",
  },

  parentButtonText: {
    color: COLORS.orange,
    fontSize: 10,
    fontWeight: "700",
  },
});
