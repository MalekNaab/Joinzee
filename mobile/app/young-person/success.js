import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import JoinziieLogo from "../../components/JoinziieLogo";
import GradientButton from "../../components/GradientButton";
import ImagePlaceholder from "../../components/ImagePlaceholder";

import {
  COLORS,
  GRADIENT,
} from "../../constants/theme";

export default function YoungSuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <JoinziieLogo />

        <View style={styles.topSpace} />

        <LinearGradient
          colors={GRADIENT}
          style={styles.circle}
        >
          <Text style={styles.tick}>✓</Text>
        </LinearGradient>

        <Text style={styles.heading}>
          Welcome to{"\n"}Joinziie!
        </Text>

        <Text style={styles.text}>
          Your account is ready.
        </Text>

        <Text style={styles.text}>
          Start discovering and joining activities you'll love.
        </Text>

        <View style={styles.image}>
          <ImagePlaceholder
            title="Young Person Celebration Artwork"
            height={130}
          />
        </View>

        <View style={styles.spacer} />

        <View style={styles.button}>
          <GradientButton
            title="Go to Home"
            onPress={() =>
              router.replace("/(tabs)/discover")
            }
          />
        </View>

        <Text style={styles.explore}>
          Explore Activities
        </Text>
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
    maxWidth: 430,
    alignSelf: "center",
    alignItems: "center",
    padding: 22,
    paddingTop: 35,
  },

  topSpace: {
    height: 55,
  },

  circle: {
    width: 92,
    height: 92,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  tick: {
    color: COLORS.white,
    fontWeight: "900",
    fontSize: 46,
  },

  heading: {
    color: COLORS.white,
    fontSize: 25,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 24,
  },

  text: {
    color: COLORS.secondary,
    fontSize: 11,
    lineHeight: 17,
    textAlign: "center",
    marginTop: 10,
  },

  image: {
    width: "100%",
    marginTop: 22,
  },

  spacer: {
    flex: 1,
  },

  button: {
    width: "100%",
  },

  explore: {
    color: COLORS.pink,
    fontWeight: "700",
    fontSize: 11,
    marginTop: 16,
  },
});

