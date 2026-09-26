import {
  StyleSheet,
  Text,
  TextInput,
} from "react-native";

import { useRouter } from "expo-router";

import OrganisationSignupScreen from "../../components/organisation/OrganisationSignupScreen";
import GradientButton from "../../components/GradientButton";

import { COLORS } from "../../constants/theme";
import { useSignup } from "../../context/SignupContext";

export default function OrganisationAbout() {
  const router = useRouter();

  const {
    signupData,
    updateOrganisation,
  } = useSignup();

  const organisation =
    signupData.organisation;

  return (
    <OrganisationSignupScreen
      step={6}
      title="About Your Organisation"
      subtitle="Tell families and young people what you do."
    >
      <Text style={styles.label}>
        Short Description
      </Text>

      <TextInput
        multiline
        value={
          organisation.description
        }
        onChangeText={(value) =>
          updateOrganisation(
            "description",
            value
          )
        }
        placeholder="We provide exciting sessions that help young people build confidence, develop skills and stay active."
        placeholderTextColor={
          COLORS.muted
        }
        style={styles.textArea}
        textAlignVertical="top"
      />

      <Text style={styles.count}>
        {organisation.description.length}
        /500
      </Text>

      <GradientButton
        title="Continue"
        disabled={
          organisation.description.trim()
            .length < 20
        }
        onPress={() =>
          router.push(
            "/organisation/images"
          )
        }
      />
    </OrganisationSignupScreen>
  );
}

const styles = StyleSheet.create({
  label: {
    color: COLORS.secondary,
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 7,
  },

  textArea: {
    minHeight: 175,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    color: COLORS.white,
    padding: 13,
    fontSize: 12,
    lineHeight: 19,
  },

  count: {
    color: COLORS.muted,
    fontSize: 9,
    textAlign: "right",
    marginTop: 6,
    marginBottom: 20,
  },
});
