import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useState } from "react";

import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import JoinziieLogo from "../../components/JoinziieLogo";

import {
  COLORS,
  GRADIENT,
} from "../../constants/theme";

import {
  useOrganisationSessions,
} from "../../context/OrganisationSessionContext";

export default function CreateOrganisationSession() {
  const router = useRouter();

  const {
    addSession,
  } = useOrganisationSessions();

  const safeBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/organisation-dashboard/sessions");
    }
  };

  const [title, setTitle] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [ageRange, setAgeRange] =
    useState("");

  const [date, setDate] =
    useState("");

  const [time, setTime] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [capacity, setCapacity] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [description, setDescription] =
    useState("");


  const saveToDatabase =
    async (status) => {
      const publishing =
        status === "upcoming";

      if (
        publishing &&
        (
          !title.trim() ||
          !category ||
          !date.trim() ||
          !time.trim() ||
          !location.trim() ||
          !capacity.trim()
        )
      ) {
        Alert.alert(
          "Complete Required Fields",
          "Please complete the title, category, date, time, location and capacity."
        );

        return;
      }

      try {
        await addSession({
          title:
            title.trim() ||
            "Untitled Session",

          category:
            category ||
            "Other",

          ageRange:
            ageRange.trim(),

          date:
            date.trim(),

          time:
            time.trim(),

          location:
            location.trim() ||
            "TBC",

          capacityLimit:
            Number(
              capacity
            ) || 0,

          price:
            Number(
              price
            ) || 0,

          description:
            description.trim(),

          status,
        });

        Alert.alert(
          publishing
            ? "Session Published"
            : "Draft Saved",

          publishing
            ? "The session has been saved to MongoDB and is now live."
            : "The draft has been saved to MongoDB."
        );

        router.replace(
          "/organisation-dashboard/sessions"
        );

      } catch (error) {
        console.error(
          error
        );

        Alert.alert(
          "Could not save session",
          error.message ||
            "Please try again."
        );
      }
    };
  const categories = [
    "Martial Arts",
    "Sports",
    "Fitness",
    "Education",
    "Arts",
    "Other",
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}
      >
        <View style={styles.header}>
          <Pressable
            onPress={safeBack}
            style={styles.back}
          >
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
          Create Session
        </Text>

        <Text style={styles.subtitle}>
          Add a new activity or session to Joinziie.
        </Text>

        <Field
          label="Session Title"
          value={title}
          onChangeText={setTitle}
          placeholder="No-Gi Fundamentals"
        />

        <Text style={styles.label}>
          Category
        </Text>

        <View style={styles.categories}>
          {categories.map(
            (item) => {
              const selected =
                category === item;

              return (
                <Pressable
                  key={item}
                  onPress={() =>
                    setCategory(item)
                  }
                  style={[
                    styles.category,
                    selected &&
                      styles.categorySelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      selected &&
                        styles.categoryTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              );
            }
          )}
        </View>

        <Field
          label="Age Range"
          value={ageRange}
          onChangeText={setAgeRange}
          placeholder="13–17"
        />

        <View style={styles.twoColumns}>
          <View style={styles.column}>
            <Field
              label="Date"
              value={date}
              onChangeText={setDate}
              placeholder="20 Sep 2026"
            />
          </View>

          <View style={styles.column}>
            <Field
              label="Time"
              value={time}
              onChangeText={setTime}
              placeholder="6:00 PM"
            />
          </View>
        </View>

        <Field
          label="Location"
          value={location}
          onChangeText={setLocation}
          placeholder="White City, London"
        />

        <View style={styles.twoColumns}>
          <View style={styles.column}>
            <Field
              label="Capacity"
              value={capacity}
              onChangeText={setCapacity}
              placeholder="20"
              keyboardType="number-pad"
            />
          </View>

          <View style={styles.column}>
            <Field
              label="Price"
              value={price}
              onChangeText={setPrice}
              placeholder="0 = Free"
              keyboardType="numeric"
            />
          </View>
        </View>

        <Text style={styles.label}>
          Description
        </Text>

        <TextInput
          multiline
          value={description}
          onChangeText={setDescription}
          placeholder="Tell participants about this session..."
          placeholderTextColor={COLORS.muted}
          style={styles.textArea}
          textAlignVertical="top"
        />

        <Text style={styles.label}>
          Session Image
        </Text>

        <Pressable style={styles.imageUpload}>
          <Ionicons
            name="image-outline"
            size={34}
            color={COLORS.pink}
          />

          <Text style={styles.uploadTitle}>
            Add Session Image
          </Text>

          <Text style={styles.uploadText}>
            Image upload placeholder for the MVP
          </Text>
        </Pressable>

        <Pressable onPress={() => saveToDatabase("upcoming")}>
          <LinearGradient
            colors={GRADIENT}
            style={styles.publish}
          >
            <Text style={styles.publishText}>
              Publish Session
            </Text>
          </LinearGradient>
        </Pressable>

        <Pressable
          onPress={() => saveToDatabase("draft")}
          style={styles.draft}
        >
          <Text style={styles.draftText}>
            Save as Draft
          </Text>
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
        placeholderTextColor={
          COLORS.muted
        }
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor:
      COLORS.background,
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
    justifyContent:
      "space-between",
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
    fontSize: 13,
    marginTop: 5,
    marginBottom: 24,
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
    backgroundColor:
      COLORS.surface,
    color: COLORS.white,
    paddingHorizontal: 13,
    fontSize: 12,
  },

  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },

  category: {
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor:
      COLORS.surface,
  },

  categorySelected: {
    backgroundColor:
      COLORS.purple,
    borderColor: COLORS.pink,
  },

  categoryText: {
    color: COLORS.secondary,
    fontSize: 10,
  },

  categoryTextSelected: {
    color: COLORS.white,
    fontWeight: "800",
  },

  twoColumns: {
    flexDirection: "row",
    gap: 10,
  },

  column: {
    flex: 1,
  },

  textArea: {
    minHeight: 140,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor:
      COLORS.surface,
    color: COLORS.white,
    padding: 13,
    fontSize: 12,
    marginBottom: 18,
  },

  imageUpload: {
    minHeight: 130,
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: COLORS.purple,
    backgroundColor: "#0C1020",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  uploadTitle: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 8,
  },

  uploadText: {
    color: COLORS.secondary,
    fontSize: 9,
    marginTop: 4,
  },

  publish: {
    height: 55,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  publishText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "900",
  },

  draft: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  draftText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "700",
  },
});


