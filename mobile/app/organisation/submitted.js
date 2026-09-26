import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";

import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import JoinziieLogo from "../../components/JoinziieLogo";
import GradientButton from "../../components/GradientButton";

import {
  COLORS,
  GRADIENT,
} from "../../constants/theme";

export default function OrganisationSubmitted() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <JoinziieLogo />

        <View style={styles.spacerTop} />

        <LinearGradient
          colors={GRADIENT}
          style={styles.circle}
        >
          <Text style={styles.tick}>
            ✓
          </Text>
        </LinearGradient>

        <Text style={styles.heading}>
          Application Submitted!
        </Text>

        <Text style={styles.text}>
          Thanks! We'll review your organisation
          and get back to you soon.
        </Text>

        <View style={styles.statusCard}>
          <Text style={styles.statusLabel}>
            STATUS
          </Text>

          <Text style={styles.status}>
            Under Review
          </Text>

          <Text style={styles.statusText}>
            Verification is required before your
            organisation can publish activities
            on Joinziie.
          </Text>
        </View>

        <View style={styles.spacer} />

        <View style={styles.button}>
          <GradientButton
            title="Go to Home"
            onPress={() =>
              router.replace("/")
            }
          />
        </View>

        <Pressable>
          <Text style={styles.explore}>
            Explore Joinziie
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    flex: 1,
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
    alignItems: "center",
    padding: 22,
    paddingTop: 35,
  },

  spacerTop: {
    height: 60,
  },

  circle: {
    width: 96,
    height: 96,
    borderRadius: 55,
    alignItems: "center",
    justifyContent: "center",
  },

  tick: {
    color: COLORS.white,
    fontSize: 49,
    fontWeight: "900",
  },

  heading: {
    color: COLORS.white,
    fontSize: 25,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 25,
  },

  text: {
    color: COLORS.secondary,
    fontSize: 11,
    lineHeight: 17,
    textAlign: "center",
    marginTop: 11,
    maxWidth: 300,
  },

  statusCard: {
    width: "100%",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.purple,
    borderRadius: 15,
    padding: 18,
    marginTop: 28,
    alignItems: "center",
  },

  statusLabel: {
    color: COLORS.muted,
    fontSize: 8,
  },

  status: {
    color: COLORS.pink,
    fontSize: 17,
    fontWeight: "900",
    marginTop: 5,
  },

  statusText: {
    color: COLORS.secondary,
    fontSize: 9,
    lineHeight: 14,
    textAlign: "center",
    marginTop: 7,
  },

  spacer: {
    flex: 1,
  },

  button: {
    width: "100%",
  },

  explore: {
    color: COLORS.pink,
    fontSize: 10,
    fontWeight: "700",
    marginTop: 17,
  },
});
