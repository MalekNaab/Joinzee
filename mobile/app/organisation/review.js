import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useRouter } from "expo-router";

import OrganisationSignupScreen from "../../components/organisation/OrganisationSignupScreen";
import GradientButton from "../../components/GradientButton";

import { COLORS } from "../../constants/theme";
import { useSignup } from "../../context/SignupContext";

export default function OrganisationReview() {
  const router = useRouter();

  const {
    signupData,
  } = useSignup();

  const organisation =
    signupData.organisation;

  return (
    <OrganisationSignupScreen
      step={8}
      title="Review & Submit"
      subtitle="Please check your details."
    >
      <View style={styles.card}>
        <Text style={styles.label}>
          Organisation
        </Text>

        <Text style={styles.primary}>
          {organisation.name}
        </Text>

        <Text style={styles.secondary}>
          {
            organisation.organisationType
          }
        </Text>

        {!!organisation.website && (
          <Text style={styles.secondary}>
            {organisation.website}
          </Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          Contact
        </Text>

        <Text style={styles.primary}>
          {organisation.contactName ||
            "Not provided"}
        </Text>

        <Text style={styles.secondary}>
          {organisation.contactEmail}
        </Text>

        <Text style={styles.secondary}>
          {organisation.phone}
        </Text>

        <Text style={styles.secondary}>
          {organisation.address}
        </Text>

        <Text style={styles.secondary}>
          {organisation.postcode}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          Audience
        </Text>

        <View style={styles.tags}>
          {organisation.audiences.map(
            (audience) => (
              <View
                key={audience}
                style={styles.tag}
              >
                <Text
                  style={
                    styles.tagText
                  }
                >
                  {audience}
                </Text>
              </View>
            )
          )}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          About
        </Text>

        <Text style={styles.description}>
          {organisation.description}
        </Text>
      </View>

      <View style={styles.media}>
        <Text style={styles.mediaText}>
          Logo:{" "}
          {organisation.logoAdded
            ? "✓ Added"
            : "Not added"}
        </Text>

        <Text style={styles.mediaText}>
          Activity images:{" "}
          {organisation.activityImagesAdded
            ? "✓ Added"
            : "Not added"}
        </Text>
      </View>

      <GradientButton
        title="Submit for Review"
        onPress={() =>
          router.replace(
            "/organisation/submitted"
          )
        }
      />
    </OrganisationSignupScreen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 13,
    marginBottom: 10,
  },

  label: {
    color: COLORS.pink,
    fontSize: 9,
    fontWeight: "800",
    marginBottom: 6,
  },

  primary: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "900",
  },

  secondary: {
    color: COLORS.secondary,
    fontSize: 9,
    marginTop: 3,
  },

  description: {
    color: COLORS.secondary,
    fontSize: 10,
    lineHeight: 16,
  },

  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },

  tag: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.purple,
    backgroundColor: "#17103A",
    paddingHorizontal: 8,
    paddingVertical: 5,
  },

  tagText: {
    color: COLORS.white,
    fontSize: 8,
  },

  media: {
    backgroundColor: "#0A2014",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#184B2C",
    padding: 12,
    marginBottom: 21,
  },

  mediaText: {
    color: COLORS.success,
    fontSize: 9,
    marginVertical: 2,
  },
});
