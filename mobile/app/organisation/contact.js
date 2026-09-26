import { useRouter } from "expo-router";

import OrganisationSignupScreen from "../../components/organisation/OrganisationSignupScreen";
import FormField from "../../components/FormField";
import GradientButton from "../../components/GradientButton";

import { useSignup } from "../../context/SignupContext";

export default function OrganisationContact() {
  const router = useRouter();

  const {
    signupData,
    updateOrganisation,
  } = useSignup();

  const organisation =
    signupData.organisation;

  return (
    <OrganisationSignupScreen
      step={4}
      title="Contact Information"
      subtitle="How can people contact you?"
    >
      <FormField
        label="Contact Name"
        placeholder="Alex Smith"
        value={
          organisation.contactName
        }
        onChangeText={(value) =>
          updateOrganisation(
            "contactName",
            value
          )
        }
      />

      <FormField
        label="Email Address"
        placeholder="info@example.com"
        keyboardType="email-address"
        value={
          organisation.contactEmail
        }
        onChangeText={(value) =>
          updateOrganisation(
            "contactEmail",
            value
          )
        }
      />

      <FormField
        label="Phone Number"
        placeholder="+44 7700 900123"
        keyboardType="phone-pad"
        value={organisation.phone}
        onChangeText={(value) =>
          updateOrganisation(
            "phone",
            value
          )
        }
      />

      <FormField
        label="Address"
        placeholder="White City, London"
        value={
          organisation.address
        }
        onChangeText={(value) =>
          updateOrganisation(
            "address",
            value
          )
        }
      />

      <FormField
        label="Postcode"
        placeholder="W12 7RH"
        value={
          organisation.postcode
        }
        onChangeText={(value) =>
          updateOrganisation(
            "postcode",
            value
          )
        }
      />

      <GradientButton
        title="Continue"
        onPress={() =>
          router.push(
            "/organisation/type"
          )
        }
      />
    </OrganisationSignupScreen>
  );
}
