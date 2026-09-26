import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

import YoungSignupScreen from "../../components/YoungSignupScreen";
import FormField from "../../components/FormField";
import GradientButton from "../../components/GradientButton";

import { useSignup } from "../../context/SignupContext";

export default function YoungDetailsScreen() {
  const router = useRouter();

  const {
    signupData,
    updateYoungPerson,
  } = useSignup();

  const person = signupData.youngPerson;

  return (
    <YoungSignupScreen
      step={4}
      title="Your details"
      subtitle="Let's get you signed up!"
    >
      <FormField
        label="Full Name"
        placeholder="Jayden Smith"
        value={person.fullName}
        onChangeText={(value) =>
          updateYoungPerson("fullName", value)
        }
      />

      <FormField
        label="Email Address"
        placeholder="jayden.smith@email.com"
        keyboardType="email-address"
        value={person.email}
        onChangeText={(value) =>
          updateYoungPerson("email", value)
        }
      />

      <FormField
        label="Phone Number"
        placeholder="+44 7711 123456"
        keyboardType="phone-pad"
        value={person.phone}
        onChangeText={(value) =>
          updateYoungPerson("phone", value)
        }
      />

      <FormField
        label="Postcode"
        placeholder="W12 7RH"
        value={person.postcode}
        onChangeText={(value) =>
          updateYoungPerson("postcode", value)
        }
      />

      <View style={styles.button}>
        <GradientButton
          title="Continue"
          onPress={() =>
            router.push("/young-person/about")
          }
        />
      </View>
    </YoungSignupScreen>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
  },
});
