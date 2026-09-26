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
import { ORG_SESSIONS } from "../../../data/organisationDemo";

import {
  COLORS,
  GRADIENT,
} from "../../../constants/theme";

export default function EditSessionScreen() {
  const router = useRouter();

  const safeBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/organisation-dashboard/sessions");
    }
  };
  const { id } = useLocalSearchParams();

  const session =
    ORG_SESSIONS.find(
      (item) => item.id === String(id)
    ) || ORG_SESSIONS[0];

  const [title, setTitle] =
    useState(session.title);

  const [date, setDate] =
    useState(session.date);

  const [location, setLocation] =
    useState(session.location);

  const [capacity, setCapacity] =
    useState(session.capacity.split("/")[1]?.trim() || "20");

  const [description, setDescription] =
    useState(
      "A structured session hosted by 1WAYFIT MMA."
    );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
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
          Edit Session
        </Text>

        <Text style={styles.subtitle}>
          Update session information.
        </Text>

        <Field
          label="Session Title"
          value={title}
          onChangeText={setTitle}
        />

        <Field
          label="Date & Time"
          value={date}
          onChangeText={setDate}
        />

        <Field
          label="Location"
          value={location}
          onChangeText={setLocation}
        />

        <Field
          label="Capacity"
          value={capacity}
          onChangeText={setCapacity}
          keyboardType="number-pad"
        />

        <Text style={styles.label}>
          Description
        </Text>

        <TextInput
          multiline
          value={description}
          onChangeText={setDescription}
          style={styles.textArea}
          textAlignVertical="top"
        />

        <Pressable
          onPress={safeBack}
        >
          <LinearGradient
            colors={GRADIENT}
            style={styles.save}
          >
            <Text style={styles.saveText}>
              Save Changes
            </Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function Field({
  label,
  ...props
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput
        {...props}
        placeholderTextColor={COLORS.muted}
        style={styles.input}
      />
    </View>
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
    alignItems: "center",
    justifyContent: "space-between",
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
    marginTop: 4,
    marginBottom: 22,
  },

  field: {
    marginBottom: 16,
  },

  label: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 7,
  },

  input: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    color: COLORS.white,
    paddingHorizontal: 13,
    fontSize: 12,
  },

  textArea: {
    minHeight: 135,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    color: COLORS.white,
    padding: 13,
    fontSize: 12,
    marginBottom: 20,
  },

  save: {
    minHeight: 54,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  saveText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "900",
  },
});

