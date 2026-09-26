import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

import SignupScreen from "../../components/SignupScreen";
import FormField from "../../components/FormField";
import GradientButton from "../../components/GradientButton";

import { useSignup } from "../../context/SignupContext";

export default function ParentDetailsScreen() {
  const router = useRouter();

  const {
    signupData,
    updateParent,
  } = useSignup();

  const parent = signupData.parent;

  return (
    <SignupScreen
      step={3}
      title="Parent / Guardian details"
      subtitle="Tell us about you."
    >
      <FormField
        label="Full Name"
        placeholder="Sarah Johnson"
        value={parent.fullName}
        onChangeText={(value) =>
          updateParent("fullName", value)
        }
      />

      <FormField
        label="Email Address"
        placeholder="sarah.johnson@email.com"
        keyboardType="email-address"
        value={parent.email}
        onChangeText={(value) =>
          updateParent("email", value)
        }
      />

      <FormField
        label="Phone Number"
        placeholder="+44 7700 900123"
        keyboardType="phone-pad"
        value={parent.phone}
        onChangeText={(value) =>
          updateParent("phone", value)
        }
      />

      <FormField
        label="Relationship to child"
        placeholder="Mother"
        value={parent.relationship}
        onChangeText={(value) =>
          updateParent("relationship", value)
        }
      />

      <View style={styles.button}>
        <GradientButton
          title="Continue"
          onPress={() =>
            router.push(
              "/onboarding/child-details"
            )
          }
        />
      </View>
    </SignupScreen>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
  },
});
