import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useRouter } from "expo-router";

import OrganisationSignupScreen from "../../components/organisation/OrganisationSignupScreen";
import UploadPlaceholder from "../../components/organisation/UploadPlaceholder";
import GradientButton from "../../components/GradientButton";

import { COLORS } from "../../constants/theme";
import { useSignup } from "../../context/SignupContext";

export default function OrganisationImages() {
  const router = useRouter();

  const {
    signupData,
    updateOrganisation,
  } = useSignup();

  const organisation =
    signupData.organisation;

  return (
    <OrganisationSignupScreen
      step={7}
      title="Upload Logo & Images"
      subtitle="Add a logo and photos of your organisation or activities."
    >
      <Text style={styles.label}>
        Organisation Logo
      </Text>

      <UploadPlaceholder
        title="Upload Logo"
        subtitle="PNG or JPG"
        added={
          organisation.logoAdded
        }
        onPress={() =>
          updateOrganisation(
            "logoAdded",
            !organisation.logoAdded
          )
        }
        height={145}
      />

      <Text style={styles.label2}>
        Activity Photos
      </Text>

      <UploadPlaceholder
        title="Add Activity Images"
        subtitle="Add photos showing your sessions"
        added={
          organisation.activityImagesAdded
        }
        onPress={() =>
          updateOrganisation(
            "activityImagesAdded",
            !organisation.activityImagesAdded
          )
        }
        height={175}
      />

      <View style={styles.note}>
        <Text style={styles.noteText}>
          For this MVP these are placeholders.
          Real image uploads will be connected
          when we add storage/backend support.
        </Text>
      </View>

      <GradientButton
        title="Continue"
        onPress={() =>
          router.push(
            "/organisation/review"
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

  label2: {
    color: COLORS.secondary,
    fontSize: 11,
    fontWeight: "600",
    marginTop: 19,
    marginBottom: 7,
  },

  note: {
    backgroundColor: "#141126",
    borderRadius: 10,
    padding: 11,
    marginVertical: 17,
  },

  noteText: {
    color: COLORS.secondary,
    fontSize: 9,
    lineHeight: 14,
  },
});
