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

const interests = [
  ["⚽", "Football"],
  ["🏀", "Basketball"],
  ["🌊", "Swimming"],
  ["🥋", "Martial Arts"],
  ["💃", "Dance"],
  ["♫", "Music"],
  ["🎨", "Art"],
  ["🎮", "Gaming"],
  ["•••", "Other"],
];

export default function InterestsScreen() {
  const router = useRouter();

  const {
    signupData,
    setSignupData,
  } = useSignup();

  const toggle = (name) => {
    setSignupData((current) => {
      const selected =
        current.interests.includes(name);

      return {
        ...current,
        interests: selected
          ? current.interests.filter(
              (item) => item !== name
            )
          : [...current.interests, name],
      };
    });
  };

  return (
    <SignupScreen
      step={5}
      title="What are they interested in?"
      subtitle="Select all that apply."
    >
      <View style={styles.grid}>
        {interests.map(([icon, name]) => {
          const selected =
            signupData.interests.includes(name);

          return (
            <Pressable
              key={name}
              onPress={() => toggle(name)}
              style={[
                styles.card,
                selected && styles.selected,
              ]}
            >
              {selected && (
                <View style={styles.check}>
                  <Text style={styles.checkText}>
                    ✓
                  </Text>
                </View>
              )}

              <Text style={styles.icon}>
                {icon}
              </Text>

              <Text style={styles.name}>
                {name}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <GradientButton
        title="Continue"
        disabled={
          signupData.interests.length === 0
        }
        onPress={() =>
          router.push("/onboarding/safety")
        }
      />
    </SignupScreen>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 24,
  },

  card: {
    width: "31.5%",
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },

  selected: {
    borderColor: COLORS.pink,
    backgroundColor: "#17103A",
  },

  icon: {
    fontSize: 25,
    marginBottom: 7,
  },

  name: {
    color: COLORS.white,
    fontSize: 10,
    textAlign: "center",
  },

  check: {
    position: "absolute",
    right: 6,
    top: 6,
    backgroundColor: COLORS.purple,
    width: 18,
    height: 18,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  checkText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "900",
  },
});
