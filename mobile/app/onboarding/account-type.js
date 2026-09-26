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

const TYPES = [
  {
    id: "parent",
    icon: "👨‍👩‍👧",
    title: "Parent / Guardian",
    text: "Find activities for my child",
  },

  {
    id: "young",
    icon: "⚡",
    title: "Young Person",
    text: "I am 16–25 and looking for opportunities",
  },

  {
    id: "organisation",
    icon: "▣",
    title: "Organisation",
    text: "List activities, programmes and events",
  },
];

export default function AccountTypeScreen() {
  const router = useRouter();

  const {
    signupData,
    setSignupData,
  } = useSignup();

  const select = (id) => {
    setSignupData((current) => ({
      ...current,
      accountType: id,
    }));
  };

  const continueFlow = () => {
    if (
      signupData.accountType === "parent"
    ) {
      router.push(
        "/onboarding/parent-details"
      );

      return;
    }

    if (
      signupData.accountType === "young"
    ) {
      router.push(
        "/young-person/age"
      );

      return;
    }

    if (
      signupData.accountType ===
      "organisation"
    ) {
      router.push(
        "/organisation/details"
      );
    }
  };

  return (
    <SignupScreen
      step={2}
      title="Choose account type"
      subtitle="How will you be using Joinziie?"
    >
      <View style={styles.cards}>
        {TYPES.map((type) => {
          const selected =
            signupData.accountType === type.id;

          return (
            <Pressable
              key={type.id}
              style={[
                styles.card,
                selected &&
                  styles.selected,
              ]}
              onPress={() =>
                select(type.id)
              }
            >
              <View style={styles.iconBox}>
                <Text style={styles.icon}>
                  {type.icon}
                </Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.title}>
                  {type.title}
                </Text>

                <Text style={styles.text}>
                  {type.text}
                </Text>
              </View>

              <View
                style={[
                  styles.radio,
                  selected &&
                    styles.radioSelected,
                ]}
              >
                {selected && (
                  <Text style={styles.tick}>
                    ✓
                  </Text>
                )}
              </View>
            </Pressable>
          );
        })}
      </View>

      <GradientButton
        title="Continue"
        onPress={continueFlow}
      />
    </SignupScreen>
  );
}

const styles = StyleSheet.create({
  cards: {
    gap: 11,
    marginBottom: 23,
  },

  card: {
    minHeight: 101,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },

  selected: {
    borderColor: COLORS.pink,
    backgroundColor: "#161032",
  },

  iconBox: {
    width: 55,
    height: 55,
    borderRadius: 13,
    backgroundColor: "#18112F",
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    fontSize: 25,
  },

  info: {
    flex: 1,
    marginLeft: 12,
  },

  title: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "800",
  },

  text: {
    color: COLORS.secondary,
    fontSize: 10,
    lineHeight: 15,
    marginTop: 4,
  },

  radio: {
    width: 24,
    height: 24,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
  },

  radioSelected: {
    backgroundColor: COLORS.purple,
    borderColor: COLORS.pink,
  },

  tick: {
    color: COLORS.white,
    fontWeight: "900",
    fontSize: 12,
  },
});
