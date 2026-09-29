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

import {
  useEffect,
  useState,
} from "react";

import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  LinearGradient,
} from "expo-linear-gradient";

import JoinziieLogo from "../../../../components/JoinziieLogo";

import {
  useOrganisationSessions,
} from "../../../../context/OrganisationSessionContext";

import {
  useAuth,
} from "../../../../context/AuthContext";

import {
  COLORS,
  GRADIENT,
} from "../../../../constants/theme";


export default function EditSessionScreen() {
  const router =
    useRouter();

  const {
    id: routeId,
  } =
    useLocalSearchParams();

  // Expo Router includes "-edit" in this route parameter.
  // Strip it before using the value as a MongoDB ObjectId.
  const id =
    String(
      Array.isArray(routeId)
        ? routeId[0]
        : routeId || ""
    ).replace(/-edit$/, "");

  const {
    loading: authLoading,
  } =
    useAuth();

  const {
    loading,
    getSessionById,
    updateSession,
  } =
    useOrganisationSessions();

  const session =
    getSessionById(
      String(id).replace(/-edit$/, "").replace(/-edit$/, "").replace(/-edit$/, "")
    );

  const [
    title,
    setTitle,
  ] =
    useState("");

  const [
    date,
    setDate,
  ] =
    useState("");

  const [
    time,
    setTime,
  ] =
    useState("");

  const [
    location,
    setLocation,
  ] =
    useState("");

  const [
    capacity,
    setCapacity,
  ] =
    useState("");

  const [
    price,
    setPrice,
  ] =
    useState("");

  const [
    ageRange,
    setAgeRange,
  ] =
    useState("");

  const [
    category,
    setCategory,
  ] =
    useState("");

  const [
    description,
    setDescription,
  ] =
    useState("");

  const [
    saving,
    setSaving,
  ] =
    useState(false);


  useEffect(
    () => {
      if (!session) {
        return;
      }

      setTitle(
        session.title ||
        ""
      );

      setDate(
        session.date ||
        ""
      );

      setTime(
        session.time ||
        ""
      );

      setLocation(
        session.location ||
        ""
      );

      setCapacity(
        String(
          session.capacityLimit ||
          0
        )
      );

      setPrice(
        String(
          session.price ||
          0
        )
      );

      setAgeRange(
        session.ageRange ||
        ""
      );

      setCategory(
        session.category ||
        session.label ||
        ""
      );

      setDescription(
        session.description ||
        ""
      );
    },
    [session]
  );


  const safeBack =
    () => {
      if (
        router.canGoBack()
      ) {
        router.back();
      } else {
        router.replace(
          `/organisation-dashboard/session/${id}`
        );
      }
    };


  const saveChanges =
    async () => {
      if (
        !title.trim() ||
        !date.trim() ||
        !location.trim()
      ) {
        Alert.alert(
          "Missing information",
          "Please enter a title, date and location."
        );

        return;
      }

      try {
        setSaving(true);

        await updateSession(
          String(id).replace(/-edit$/, "").replace(/-edit$/, "").replace(/-edit$/, ""),
          {
            title:
              title.trim(),

            date:
              date.trim(),

            time:
              time.trim(),

            location:
              location.trim(),

            capacityLimit:
              Number(
                capacity
              ) || 0,

            price:
              Number(
                price
              ) || 0,

            ageRange:
              ageRange.trim(),

            category:
              category.trim() ||
              "Other",

            description:
              description.trim(),

            status:
              session.status,
          }
        );

        router.replace(
          `/organisation-dashboard/session/${id}`
        );
      } catch (error) {
        console.error(
          error
        );

        Alert.alert(
          "Could not save changes",
          error.message ||
            "Please try again."
        );
      } finally {
        setSaving(false);
      }
    };


  if (
    authLoading ||
    loading
  ) {
    return (
      <SafeAreaView
        style={
          styles.safe
        }
      >
        <View
          style={
            styles.center
          }
        >
          <Text
            style={
              styles.loading
            }
          >
            Loading session...
          </Text>
        </View>
      </SafeAreaView>
    );
  }


  if (!session) {
    return (
      <SafeAreaView
        style={
          styles.safe
        }
      >
        <View
          style={
            styles.center
          }
        >
          <Text
            style={
              styles.heading
            }
          >
            Session not found
          </Text>

          <Pressable
            onPress={() =>
              router.replace(
                "/organisation-dashboard/sessions"
              )
            }
          >
            <Text
              style={
                styles.backLink
              }
            >
              Back to Sessions
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }


  return (
    <SafeAreaView
      style={
        styles.safe
      }
    >
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={
          styles.container
        }
      >
        <View
          style={
            styles.header
          }
        >
          <Pressable
            onPress={
              safeBack
            }
            style={
              styles.back
            }
          >
            <Ionicons
              name="chevron-back"
              size={29}
              color={
                COLORS.white
              }
            />
          </Pressable>

          <JoinziieLogo />

          <View
            style={
              styles.spacer
            }
          />
        </View>


        <Text
          style={
            styles.heading
          }
        >
          Edit Session
        </Text>

        <Text
          style={
            styles.subtitle
          }
        >
          Changes will be saved directly to MongoDB.
        </Text>


        <Field
          label="Session Title"
          value={
            title
          }
          onChangeText={
            setTitle
          }
        />

        <Field
          label="Category"
          value={
            category
          }
          onChangeText={
            setCategory
          }
        />

        <Field
          label="Age Range"
          value={
            ageRange
          }
          onChangeText={
            setAgeRange
          }
        />


        <View
          style={
            styles.twoColumns
          }
        >
          <View
            style={
              styles.half
            }
          >
            <Field
              label="Date"
              value={
                date
              }
              onChangeText={
                setDate
              }
            />
          </View>

          <View
            style={
              styles.half
            }
          >
            <Field
              label="Time"
              value={
                time
              }
              onChangeText={
                setTime
              }
            />
          </View>
        </View>


        <Field
          label="Location"
          value={
            location
          }
          onChangeText={
            setLocation
          }
        />


        <View
          style={
            styles.twoColumns
          }
        >
          <View
            style={
              styles.half
            }
          >
            <Field
              label="Capacity"
              value={
                capacity
              }
              onChangeText={
                setCapacity
              }
              keyboardType="number-pad"
            />
          </View>

          <View
            style={
              styles.half
            }
          >
            <Field
              label="Price (£)"
              value={
                price
              }
              onChangeText={
                setPrice
              }
              keyboardType="decimal-pad"
            />
          </View>
        </View>


        <Text
          style={
            styles.label
          }
        >
          Description
        </Text>

        <TextInput
          multiline
          value={
            description
          }
          onChangeText={
            setDescription
          }
          style={
            styles.textArea
          }
          textAlignVertical="top"
          placeholder="Describe the session..."
          placeholderTextColor={
            COLORS.muted
          }
        />


        <Pressable
          disabled={
            saving
          }
          onPress={
            saveChanges
          }
        >
          <LinearGradient
            colors={
              GRADIENT
            }
            style={[
              styles.save,
              saving &&
                styles.disabled,
            ]}
          >
            <Text
              style={
                styles.saveText
              }
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
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
    <View
      style={
        styles.field
      }
    >
      <Text
        style={
          styles.label
        }
      >
        {label}
      </Text>

      <TextInput
        {...props}
        placeholderTextColor={
          COLORS.muted
        }
        style={
          styles.input
        }
      />
    </View>
  );
}


const styles =
  StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor:
        COLORS.background,
    },

    center: {
      flex: 1,
      justifyContent:
        "center",
      alignItems:
        "center",
      padding: 20,
    },

    loading: {
      color:
        COLORS.secondary,
    },

    backLink: {
      color:
        COLORS.pink,
      marginTop: 15,
    },

    container: {
      width: "100%",
      maxWidth: 520,
      alignSelf:
        "center",
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
      justifyContent:
        "center",
    },

    spacer: {
      width: 44,
    },

    heading: {
      color:
        COLORS.white,
      fontSize: 29,
      fontWeight: "900",
      marginTop: 30,
    },

    subtitle: {
      color:
        COLORS.secondary,
      fontSize: 12,
      marginTop: 4,
      marginBottom: 22,
    },

    field: {
      marginBottom: 16,
    },

    label: {
      color:
        COLORS.white,
      fontSize: 11,
      fontWeight: "700",
      marginBottom: 7,
    },

    input: {
      height: 52,
      borderRadius: 12,
      borderWidth: 1,
      borderColor:
        COLORS.border,
      backgroundColor:
        COLORS.surface,
      color:
        COLORS.white,
      paddingHorizontal: 13,
      fontSize: 12,
    },

    twoColumns: {
      flexDirection: "row",
      gap: 10,
    },

    half: {
      flex: 1,
    },

    textArea: {
      minHeight: 135,
      borderRadius: 12,
      borderWidth: 1,
      borderColor:
        COLORS.border,
      backgroundColor:
        COLORS.surface,
      color:
        COLORS.white,
      padding: 13,
      fontSize: 12,
      marginBottom: 20,
    },

    save: {
      minHeight: 54,
      borderRadius: 14,
      alignItems:
        "center",
      justifyContent:
        "center",
    },

    disabled: {
      opacity: 0.6,
    },

    saveText: {
      color:
        COLORS.white,
      fontWeight: "900",
      fontSize: 13,
    },
  });





