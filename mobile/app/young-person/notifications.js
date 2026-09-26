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

const items = [
  ["push", "Push Notifications"],
  ["email", "Email Updates"],
  ["sms", "SMS Notifications"],
];

export default function NotificationsScreen() {
  const router = useRouter();

  const {
    signupData,
    setSignupData,
  } = useSignup();

  const toggle = (key) => {
    setSignupData((current) => ({
      ...current,
      notifications: {
        ...current.notifications,
        [key]: !current.notifications[key],
      },
    }));
  };

  return (
    <YoungSignupScreen
      step={7}
      title="Stay in the loop"
      subtitle="How would you like to receive updates?"
    >
      <View style={styles.list}>
        {items.map(([key, label]) => {
          const enabled =
            signupData.notifications[key];

          return (
            <Pressable
              key={key}
              style={styles.row}
              onPress={() => toggle(key)}
            >
              <Text style={styles.label}>
                {label}
              </Text>

              <View
                style={[
                  styles.switch,
                  enabled && styles.switchOn,
                ]}
              >
                <View
                  style={[
                    styles.knob,
                    enabled && styles.knobOn,
                  ]}
                />
              </View>
            </Pressable>
          );
        })}
      </View>

      <GradientButton
        title="Continue"
        onPress={() =>
          router.push("/young-person/review")
        }
      />
    </YoungSignupScreen>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 10,
    marginBottom: 24,
  },

  row: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 13,
  },

  label: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "600",
  },

  switch: {
    width: 44,
    height: 24,
    borderRadius: 20,
    backgroundColor: "#303649",
    padding: 3,
  },

  switchOn: {
    backgroundColor: COLORS.purple,
  },

  knob: {
    width: 18,
    height: 18,
    borderRadius: 20,
    backgroundColor: COLORS.white,
  },

  knobOn: {
    alignSelf: "flex-end",
  },
});
