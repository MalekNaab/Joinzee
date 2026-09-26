import { useRouter } from "expo-router";
import { router } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";

import JoinziieLogo from "./JoinziieLogo";
import { COLORS, GRADIENT } from "../constants/theme";
import { LinearGradient } from "expo-linear-gradient";

export default function SignupScreen({
  step,
  title,
  subtitle,
  children,
}) {
  const router = useRouter();

  const progress = (step / 8) * 100;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
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

        <View style={styles.progressTrack}>
          <LinearGradient
            colors={GRADIENT}
            style={[
              styles.progress,
              { width: `${progress}%` },
            ]}
          />
        </View>

        <Text style={styles.step}>
          Step {step} of 8
        </Text>

        <Text style={styles.title}>
          {title}
        </Text>

        {subtitle ? (
          <Text style={styles.subtitle}>
            {subtitle}
          </Text>
        ) : null}

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
    maxWidth: 430,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 35,
  },

  header: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },

  back: {
    position: "absolute",
    left: 0,
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.surface,
  },

  backText: {
    color: COLORS.white,
    fontSize: 21,
  },

  progressTrack: {
    marginTop: 14,
    height: 4,
    borderRadius: 20,
    backgroundColor: COLORS.surface3,
    overflow: "hidden",
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
    fontSize: 23,
    lineHeight: 29,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 24,
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





