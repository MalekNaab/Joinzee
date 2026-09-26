import { useRouter } from "expo-router";

import OrganisationSignupScreen from "../../components/organisation/OrganisationSignupScreen";
import FormField from "../../components/FormField";
import GradientButton from "../../components/GradientButton";

import { useSignup } from "../../context/SignupContext";

export default function OrganisationDetails() {
  const router = useRouter();

  const {
    signupData,
    updateOrganisation,
  } = useSignup();

  const organisation =
    signupData.organisation;

  const canContinue =
    organisation.name.trim() &&
    organisation.organisationType.trim();

  return (
    <OrganisationSignupScreen
      step={3}
      title="Organisation Details"
      subtitle="Tell us about your organisation."
    >
      <FormField
        label="Organisation Name"
        placeholder="1WAYFIT MMA"
        value={organisation.name}
        onChangeText={(value) =>
          updateOrganisation(
            "name",
            value
          )
        }
      />

      <FormField
        label="Organisation Type"
        placeholder="Martial Arts Club"
        value={
          organisation.organisationType
        }
        onChangeText={(value) =>
          updateOrganisation(
            "organisationType",
            value
          )
        }
      />

      <FormField
        label="Registration Number (Optional)"
        placeholder="12345678"
        value={
          organisation.registrationNumber
        }
        onChangeText={(value) =>
          updateOrganisation(
            "registrationNumber",
            value
          )
        }
      />

      <FormField
        label="Website (Optional)"
        placeholder="www.example.com"
        value={organisation.website}
        onChangeText={(value) =>
          updateOrganisation(
            "website",
            value
          )
        }
      />

      <GradientButton
        title="Continue"
        disabled={!canContinue}
        onPress={() =>
          router.push(
            "/organisation/contact"
          )
        }
      />
    </OrganisationSignupScreen>
  );
}
