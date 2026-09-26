import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

import JoinziieLogo from "../JoinziieLogo";
import {
  COLORS,
  GRADIENT,
} from "../../constants/theme";

export default function OrganisationSignupScreen({
  step,
  title,
  subtitle,
  children,
}) {
  const router = useRouter();

  const progress = (step / 9) * 100;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}
      >
        <View style={styles.header}>
          <Pressable
            style={styles.back}
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>
              ←
            </Text>
          </Pressable>

          <JoinziieLogo />
        </View>

        <View style={styles.track}>
          <LinearGradient
            colors={GRADIENT}
            style={[
              styles.progress,
              {
                width: `${progress}%`,
              },
            ]}
          />
        </View>

        <Text style={styles.step}>
          Step {step} of 9
        </Text>

        <Text style={styles.title}>
          {title}
        </Text>

        {!!subtitle && (
          <Text style={styles.subtitle}>
            {subtitle}
          </Text>
        )}

        <View style={styles.content}>
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 35,
  },

  header: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  back: {
    position: "absolute",
    left: 0,
    width: 40,
    height: 40,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },

  backText: {
    color: COLORS.white,
    fontSize: 21,
  },

  track: {
    height: 4,
    backgroundColor: COLORS.surface3,
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 14,
  },

  progress: {
    height: "100%",
  },

  step: {
    color: COLORS.secondary,
    fontSize: 11,
    marginTop: 8,
  },

  title: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 23,
  },

  subtitle: {
    color: COLORS.secondary,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    marginTop: 5,
  },

  content: {
    marginTop: 24,
  },
});
