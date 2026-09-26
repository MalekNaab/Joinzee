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

import JoinziieLogo from "../../../components/JoinziieLogo";

import {
  useOrganisationSessions,
} from "../../../context/OrganisationSessionContext";

import {
  COLORS,
  GRADIENT,
} from "../../../constants/theme";


const categoryOptions = [
  "MMA",
  "BJJ",
  "Boxing",
  "Self-Defence",
  "Fitness",
  "Kids",
  "Other",
];


export default function EditDraftSessionScreen() {
  const router =
    useRouter();

  const {
    id,
  } =
    useLocalSearchParams();

  const {
    getSessionById,
    updateSession,
    publishSession,
  } =
    useOrganisationSessions();

  const draft =
    getSessionById(id);

  if (!draft) {
    return (
      <SafeAreaView
        style={
          styles.safe
        }
      >
        <View
          style={
            styles.notFound
          }
        >
          <Text
            style={
              styles.notFoundTitle
            }
          >
            Draft not found
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
              Return to Sessions
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }


  const [
    title,
    setTitle,
  ] =
    useState(
      draft.title || ""
    );

  const [
    category,
    setCategory,
  ] =
    useState(
      draft.label || ""
    );

  const [
    date,
    setDate,
  ] =
    useState(
      draft.date ===
      "Not scheduled"
        ? ""
        : draft.date
    );

  const [
    time,
    setTime,
  ] =
    useState("");

  const [
    location,
    setLocation,
  ] =
    useState(
      draft.location ===
      "TBC"
        ? ""
        : draft.location
    );

  const [
    capacity,
    setCapacity,
  ] =
    useState(
      draft.capacity
        ?.split("/")?.[1]
        ?.trim() || "20"
    );

  const [
    price,
    setPrice,
  ] =
    useState("");

  const [
    description,
    setDescription,
  ] =
    useState("");


  const goBackToDraft = () => {
    router.replace(
      `/organisation-dashboard/draft/${draft.id}`
    );
  };


  const saveDraft = () => {
    updateSession(
      draft.id,
      {
        title:
          title.trim() ||
          draft.title,

        label:
          category ||
          draft.label,

        date:
          date.trim()
            ? time.trim()
              ? `${date.trim()}, ${time.trim()}`
              : date.trim()
            : "Not scheduled",

        location:
          location.trim() ||
          "TBC",

        capacity:
          `0 / ${
            capacity.trim() ||
            "20"
          }`,

        price:
          price.trim(),

        description:
          description.trim(),

        status:
          "draft",
      }
    );

    Alert.alert(
      "Draft Saved",
      "Your draft changes have been saved for this app session.",
      [
        {
          text: "OK",

          onPress: () =>
            router.replace(
              `/organisation-dashboard/draft/${draft.id}`
            ),
        },
      ]
    );
  };


  const publish = () => {
    if (
      !title.trim() ||
      !category ||
      !date.trim() ||
      !time.trim() ||
      !location.trim() ||
      !capacity.trim()
    ) {
      Alert.alert(
        "Complete Required Fields",
        "Please complete the title, category, date, time, location and capacity before publishing."
      );

      return;
    }

    updateSession(
      draft.id,
      {
        title:
          title.trim(),

        label:
          category,

        date:
          `${date.trim()}, ${time.trim()}`,

        location:
          location.trim(),

        capacity:
          `0 / ${capacity.trim()}`,

        price:
          price.trim(),

        description:
          description.trim(),
      }
    );

    publishSession(
      draft.id
    );

    Alert.alert(
      "Session Published",
      "This session has moved from Drafts to Upcoming.",
      [
        {
          text: "View Sessions",

          onPress: () =>
            router.replace(
              "/organisation-dashboard/sessions"
            ),
        },
      ]
    );
  };


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

        {/* HEADER */}

        <View
          style={
            styles.header
          }
        >
          <Pressable
            onPress={
              goBackToDraft
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


        {/* TITLE */}

        <Text
          style={
            styles.heading
          }
        >
          Edit Draft
        </Text>

        <Text
          style={
            styles.subtitle
          }
        >
          Complete your session details and publish when ready.
        </Text>


        {/* STATUS */}

        <View
          style={
            styles.statusCard
          }
        >
          <View
            style={
              styles.statusIcon
            }
          >
            <Ionicons
              name="create-outline"
              size={24}
              color="#D7B9FF"
            />
          </View>

          <View
            style={
              styles.statusContent
            }
          >
            <Text
              style={
                styles.statusTitle
              }
            >
              Draft Session
            </Text>

            <Text
              style={
                styles.statusText
              }
            >
              Changes are not visible publicly until you publish.
            </Text>
          </View>

          <View
            style={
              styles.draftBadge
            }
          >
            <Text
              style={
                styles.draftBadgeText
              }
            >
              Draft
            </Text>
          </View>
        </View>


        {/* SESSION TITLE */}

        <Field
          label="Session Title *"
          value={
            title
          }
          onChangeText={
            setTitle
          }
          placeholder="Advanced MMA Drills"
        />


        {/* CATEGORY */}

        <Text
          style={
            styles.label
          }
        >
          Category *
        </Text>

        <View
          style={
            styles.categories
          }
        >
          {categoryOptions.map(
            (item) => {
              const selected =
                category === item;

              return (
                <Pressable
                  key={item}
                  onPress={() =>
                    setCategory(
                      item
                    )
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


        {/* DATE + TIME */}

        <View
          style={
            styles.twoColumns
          }
        >
          <View
            style={
              styles.column
            }
          >
            <Field
              label="Date *"
              value={
                date
              }
              onChangeText={
                setDate
              }
              placeholder="20 Sep 2026"
            />
          </View>

          <View
            style={
              styles.column
            }
          >
            <Field
              label="Time *"
              value={
                time
              }
              onChangeText={
                setTime
              }
              placeholder="6:00 PM"
            />
          </View>
        </View>


        {/* LOCATION */}

        <Field
          label="Location *"
          value={
            location
          }
          onChangeText={
            setLocation
          }
          placeholder="White City, London"
        />


        {/* CAPACITY + PRICE */}

        <View
          style={
            styles.twoColumns
          }
        >
          <View
            style={
              styles.column
            }
          >
            <Field
              label="Capacity *"
              value={
                capacity
              }
              onChangeText={
                setCapacity
              }
              placeholder="16"
              keyboardType="number-pad"
            />
          </View>

          <View
            style={
              styles.column
            }
          >
            <Field
              label="Price"
              value={
                price
              }
              onChangeText={
                setPrice
              }
              placeholder="0 = Free"
              keyboardType="numeric"
            />
          </View>
        </View>


        {/* DESCRIPTION */}

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
          placeholder="Tell participants what this session is about..."
          placeholderTextColor={
            COLORS.muted
          }
          style={
            styles.textArea
          }
          textAlignVertical="top"
        />


        {/* IMAGE */}

        <Text
          style={
            styles.label
          }
        >
          Session Image
        </Text>

        <Pressable
          style={
            styles.imageUpload
          }
        >
          <Ionicons
            name="image-outline"
            size={36}
            color={
              COLORS.pink
            }
          />

          <Text
            style={
              styles.uploadTitle
            }
          >
            Add Session Image
          </Text>

          <Text
            style={
              styles.uploadText
            }
          >
            Upload placeholder for now
          </Text>
        </Pressable>


        {/* SAVE DRAFT */}

        <Pressable
          onPress={
            saveDraft
          }
          style={
            styles.saveButton
          }
        >
          <Ionicons
            name="save-outline"
            size={20}
            color={
              COLORS.white
            }
          />

          <Text
            style={
              styles.saveText
            }
          >
            Save Draft
          </Text>
        </Pressable>


        {/* PUBLISH */}

        <Pressable
          onPress={
            publish
          }
        >
          <LinearGradient
            colors={
              GRADIENT
            }
            style={
              styles.publishButton
            }
          >
            <Ionicons
              name="cloud-upload-outline"
              size={20}
              color={
                COLORS.white
              }
            />

            <Text
              style={
                styles.publishText
              }
            >
              Publish Session
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


    container: {
      width: "100%",
      maxWidth: 520,
      alignSelf: "center",
      padding: 18,
      paddingBottom: 45,
    },


    header: {
      flexDirection:
        "row",
      alignItems:
        "center",
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
      fontWeight:
        "900",
      marginTop: 30,
    },


    subtitle: {
      color:
        COLORS.secondary,
      fontSize: 12,
      lineHeight: 18,
      marginTop: 4,
      marginBottom: 18,
    },


    statusCard: {
      minHeight: 90,
      borderRadius: 16,
      borderWidth: 1,
      borderColor:
        COLORS.border,
      backgroundColor:
        COLORS.surface,
      flexDirection:
        "row",
      alignItems:
        "center",
      padding: 14,
      marginBottom: 18,
    },


    statusIcon: {
      width: 48,
      height: 48,
      borderRadius: 14,
      backgroundColor:
        "#2A1747",
      alignItems:
        "center",
      justifyContent:
        "center",
      marginRight: 11,
    },


    statusContent: {
      flex: 1,
    },


    statusTitle: {
      color:
        COLORS.white,
      fontSize: 13,
      fontWeight:
        "900",
    },


    statusText: {
      color:
        COLORS.secondary,
      fontSize: 9,
      lineHeight: 13,
      marginTop: 4,
    },


    draftBadge: {
      backgroundColor:
        "#4C286E",
      borderRadius: 18,
      paddingHorizontal: 10,
      paddingVertical: 6,
    },


    draftBadgeText: {
      color:
        "#E4C4FF",
      fontSize: 8,
      fontWeight:
        "800",
    },


    field: {
      marginBottom: 16,
    },


    label: {
      color:
        COLORS.white,
      fontSize: 11,
      fontWeight:
        "700",
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


    categories: {
      flexDirection:
        "row",
      flexWrap:
        "wrap",
      gap: 8,
      marginBottom: 17,
    },


    category: {
      paddingHorizontal: 13,
      paddingVertical: 9,
      borderRadius: 18,
      borderWidth: 1,
      borderColor:
        COLORS.border,
      backgroundColor:
        COLORS.surface,
    },


    categorySelected: {
      backgroundColor:
        COLORS.purple,
      borderColor:
        COLORS.pink,
    },


    categoryText: {
      color:
        COLORS.secondary,
      fontSize: 9,
      fontWeight:
        "600",
    },


    categoryTextSelected: {
      color:
        COLORS.white,
      fontWeight:
        "900",
    },


    twoColumns: {
      flexDirection:
        "row",
      gap: 10,
    },


    column: {
      flex: 1,
    },


    textArea: {
      minHeight: 140,
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
      marginBottom: 18,
    },


    imageUpload: {
      minHeight: 135,
      borderRadius: 14,
      borderWidth: 1,
      borderStyle:
        "dashed",
      borderColor:
        COLORS.purple,
      backgroundColor:
        "#0C1020",
      alignItems:
        "center",
      justifyContent:
        "center",
      marginBottom: 18,
    },


    uploadTitle: {
      color:
        COLORS.white,
      fontSize: 12,
      fontWeight:
        "800",
      marginTop: 8,
    },


    uploadText: {
      color:
        COLORS.secondary,
      fontSize: 9,
      marginTop: 4,
    },


    saveButton: {
      minHeight: 54,
      borderRadius: 14,
      borderWidth: 1,
      borderColor:
        COLORS.border,
      flexDirection:
        "row",
      alignItems:
        "center",
      justifyContent:
        "center",
      gap: 8,
    },


    saveText: {
      color:
        COLORS.white,
      fontSize: 12,
      fontWeight:
        "800",
    },


    publishButton: {
      minHeight: 55,
      borderRadius: 14,
      marginTop: 10,
      flexDirection:
        "row",
      alignItems:
        "center",
      justifyContent:
        "center",
      gap: 8,
    },


    publishText: {
      color:
        COLORS.white,
      fontSize: 13,
      fontWeight:
        "900",
    },


    notFound: {
      flex: 1,
      alignItems:
        "center",
      justifyContent:
        "center",
    },


    notFoundTitle: {
      color:
        COLORS.white,
      fontSize: 22,
      fontWeight:
        "900",
    },


    backLink: {
      color:
        COLORS.pink,
      marginTop: 14,
    },

  });
