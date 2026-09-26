import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import JoinziieLogo from "../components/JoinziieLogo";


export default function HomeScreen() {

  const goToSignup = () => {
    router.push("/onboarding/account-type");
  };


  const goToSignIn = () => {
    router.push("/sign-in");
  };


  return (
    <SafeAreaView style={styles.safe}>

      <View style={styles.container}>


        {/* LOGO */}

        <View style={styles.logoArea}>
          <JoinziieLogo />

          <View style={styles.taglineRow}>
            <Text style={[styles.tagline, styles.purple]}>
              Find.
            </Text>

            <Text style={[styles.tagline, styles.orange]}>
              Match.
            </Text>

            <Text style={[styles.tagline, styles.blue]}>
              Join.
            </Text>
          </View>
        </View>


        {/* IMAGE PLACEHOLDER */}

        <View style={styles.imagePlaceholder}>

          <Text style={styles.placeholderIcon}>
            ▧
          </Text>

          <Text style={styles.placeholderTitle}>
            Welcome Background / Activity Image
          </Text>

          <Text style={styles.placeholderSubtitle}>
            Replace with final Joinziie artwork
          </Text>

        </View>


        {/* DESCRIPTION */}

        <Text style={styles.description}>
          Discover amazing clubs, classes and{"\n"}
          opportunities near you.
        </Text>


        <View style={styles.bottomArea}>


          {/* GET STARTED */}

          <Pressable
            onPress={goToSignup}
            style={({ pressed }) => [
              styles.buttonWrapper,
              pressed && styles.pressed,
            ]}
          >
            <LinearGradient
              colors={[
                "#9628F5",
                "#DA32B6",
                "#FF6740",
              ]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.mainButton}
            >
              <Text style={styles.mainButtonText}>
                Get Started
              </Text>
            </LinearGradient>
          </Pressable>


          {/* SIGN IN */}

          <Pressable
            onPress={goToSignIn}
            hitSlop={15}
            style={({ pressed }) => [
              styles.signInButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.accountText}>
              Already have an account?{" "}
            </Text>

            <Text style={styles.signInText}>
              Sign in
            </Text>
          </Pressable>


        </View>

      </View>

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

  safe: {
    flex: 1,
    backgroundColor: "#020617",
  },


  container: {
    flex: 1,
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 25,
  },


  logoArea: {
    alignItems: "center",
  },


  taglineRow: {
    flexDirection: "row",
    gap: 7,
    marginTop: 18,
  },


  tagline: {
    fontSize: 26,
    fontWeight: "900",
  },


  purple: {
    color: "#8B2BFF",
  },


  orange: {
    color: "#FF663D",
  },


  blue: {
    color: "#3488FF",
  },


  imagePlaceholder: {
    height: 180,
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#9B27FF",
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },


  placeholderIcon: {
    color: "#F229C3",
    fontSize: 26,
    fontWeight: "900",
    marginBottom: 10,
  },


  placeholderTitle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
  },


  placeholderSubtitle: {
    color: "#667085",
    fontSize: 9,
    marginTop: 7,
  },


  description: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 23,
    textAlign: "center",
    marginTop: 28,
  },


  bottomArea: {
    marginTop: "auto",
  },


  buttonWrapper: {
    width: "100%",
    cursor: "pointer",
  },


  mainButton: {
    height: 54,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },


  mainButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
  },


  signInButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 45,
    marginTop: 8,
    cursor: "pointer",
  },


  accountText: {
    color: "#A8B0C3",
    fontSize: 10,
  },


  signInText: {
    color: "#F02AC3",
    fontSize: 10,
    fontWeight: "900",
  },


  pressed: {
    opacity: 0.7,
  },

});
