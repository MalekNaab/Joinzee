import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import JoinziieLogo from "../../../components/JoinziieLogo";

import {
  COLORS,
  GRADIENT,
} from "../../../constants/theme";

export default function MessageAttendeesScreen() {
  const router = useRouter();

  const safeBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/organisation-dashboard/sessions");
    }
  };
  const { id } = useLocalSearchParams();

  const [message, setMessage] =
    useState("");

  const send = () => {
    if (!message.trim()) {
      return;
    }

    router.back();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
      >
        <View style={styles.header}>
          <Pressable onPress={safeBack} style={styles.back}>
            <Ionicons
              name="chevron-back"
              size={29}
              color={COLORS.white}
            />
          </Pressable>

          <JoinziieLogo />

          <View style={styles.spacer} />
        </View>

        <Text style={styles.heading}>
          Message Attendees
        </Text>

        <Text style={styles.subtitle}>
          Send an update to everyone booked onto session #{id}.
        </Text>

        <View style={styles.recipientCard}>
          <Ionicons
            name="people-outline"
            size={27}
            color={COLORS.pink}
          />

          <View>
            <Text style={styles.recipientTitle}>
              All Attendees
            </Text>

            <Text style={styles.recipientText}>
              12 participants will receive this message
            </Text>
          </View>
        </View>

        <Text style={styles.label}>
          Message
        </Text>

        <TextInput
          value={message}
          onChangeText={setMessage}
          multiline
          placeholder="Example: Training starts 15 minutes later tonight..."
          placeholderTextColor={COLORS.muted}
          textAlignVertical="top"
          style={styles.messageBox}
        />

        <Pressable onPress={send}>
          <LinearGradient
            colors={GRADIENT}
            style={styles.send}
          >
            <Ionicons
              name="send"
              size={19}
              color={COLORS.white}
            />

            <Text style={styles.sendText}>
              Send Message
            </Text>
          </LinearGradient>
        </Pressable>
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
    maxWidth: 520,
    alignSelf: "center",
    padding: 18,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  back: {
    width: 44,
    height: 44,
    justifyContent: "center",
  },

  spacer: {
    width: 44,
  },

  heading: {
    color: COLORS.white,
    fontSize: 29,
    fontWeight: "900",
    marginTop: 30,
  },

  subtitle: {
    color: COLORS.secondary,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
  },

  recipientCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    minHeight: 80,
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 12,
  },

  recipientTitle: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "800",
  },

  recipientText: {
    color: COLORS.secondary,
    fontSize: 9,
    marginTop: 4,
  },

  label: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 7,
  },

  messageBox: {
    minHeight: 190,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    color: COLORS.white,
    padding: 14,
    fontSize: 12,
  },

  send: {
    minHeight: 54,
    borderRadius: 14,
    marginTop: 18,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  sendText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "900",
  },
});

