import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useRouter } from "expo-router";

import OrganisationSignupScreen from "../../components/organisation/OrganisationSignupScreen";
import GradientButton from "../../components/GradientButton";

import { COLORS } from "../../constants/theme";
import { useSignup } from "../../context/SignupContext";

const types = [
  ["⚽", "Sports Club"],
  ["♥", "Charity / CIC"],
  ["🏫", "School / College"],
  ["👥", "Community Group"],
  ["🏋", "Fitness / Gym"],
  ["✦", "Youth Group"],
  ["•••", "Other"],
];

const audiences = [
  "Children (Under 11)",
  "Young People (11–18)",
  "Young Adults (18–25)",
  "Families",
  "All of the above",
];

export default function OrganisationType() {
  const router = useRouter();

  const {
    signupData,
    setSignupData,
    updateOrganisation,
  } = useSignup();

  const organisation =
    signupData.organisation;

  const toggleAudience = (name) => {
    setSignupData((current) => {
      const existing =
        current.organisation.audiences;

      const selected =
        existing.includes(name);

      return {
        ...current,

        organisation: {
          ...current.organisation,

          audiences: selected
            ? existing.filter(
                (item) =>
                  item !== name
              )
            : [
                ...existing,
                name,
              ],
        },
      };
    });
  };

  return (
    <OrganisationSignupScreen
      step={5}
      title="Organisation Type"
      subtitle="Select what best describes your organisation."
    >
      <View style={styles.grid}>
        {types.map(
          ([icon, name]) => {
            const selected =
              organisation.organisationType ===
              name;

            return (
              <Pressable
                key={name}
                style={[
                  styles.typeCard,
                  selected &&
                    styles.selectedCard,
                ]}
                onPress={() =>
                  updateOrganisation(
                    "organisationType",
                    name
                  )
                }
              >
                <Text style={styles.icon}>
                  {icon}
                </Text>

                <Text style={styles.typeName}>
                  {name}
                </Text>

                {selected && (
                  <View
                    style={
                      styles.check
                    }
                  >
                    <Text
                      style={
                        styles.checkText
                      }
                    >
                      ✓
                    </Text>
                  </View>
                )}
              </Pressable>
            );
          }
        )}
      </View>

      <Text style={styles.heading}>
        Who do you work with?
      </Text>

      <View style={styles.audienceList}>
        {audiences.map((name) => {
          const selected =
            organisation.audiences.includes(
              name
            );

          return (
            <Pressable
              key={name}
              style={[
                styles.audience,
                selected &&
                  styles.audienceSelected,
              ]}
              onPress={() =>
                toggleAudience(name)
              }
            >
              <Text
                style={[
                  styles.audienceText,
                  selected &&
                    styles.audienceTextSelected,
                ]}
              >
                {name}
              </Text>

              {selected && (
                <Text
                  style={
                    styles.audienceTick
                  }
                >
                  ✓
                </Text>
              )}
            </Pressable>
          );
        })}
      </View>

      <GradientButton
        title="Continue"
        disabled={
          !organisation.organisationType ||
          organisation.audiences.length ===
            0
        }
        onPress={() =>
          router.push(
            "/organisation/about"
          )
        }
      />
    </OrganisationSignupScreen>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  typeCard: {
    width: "48.8%",
    minHeight: 91,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  selectedCard: {
    borderColor: COLORS.pink,
    backgroundColor: "#17103A",
  },

  icon: {
    fontSize: 26,
  },

  typeName: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "700",
    marginTop: 7,
  },

  check: {
    position: "absolute",
    right: 7,
    top: 7,
    width: 18,
    height: 18,
    borderRadius: 10,
    backgroundColor: COLORS.purple,
    alignItems: "center",
    justifyContent: "center",
  },

  checkText: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: "900",
  },

  heading: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "800",
    marginTop: 23,
    marginBottom: 10,
  },

  audienceList: {
    gap: 7,
    marginBottom: 24,
  },

  audience: {
    minHeight: 43,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  audienceSelected: {
    backgroundColor: "#17103A",
    borderColor: COLORS.purple,
  },

  audienceText: {
    color: COLORS.secondary,
    fontSize: 10,
  },

  audienceTextSelected: {
    color: COLORS.white,
    fontWeight: "700",
  },

  audienceTick: {
    color: COLORS.pink,
    fontWeight: "900",
  },
});
