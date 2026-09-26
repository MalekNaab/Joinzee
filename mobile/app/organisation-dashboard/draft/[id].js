import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

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

export default function DraftSessionDetails() {
  const router =
    useRouter();

  const {
    id,
  } =
    useLocalSearchParams();

  const {
    getSessionById,
    publishSession,
    deleteSession,
  } =
    useOrganisationSessions();

  const draft =
    getSessionById(id);

  if (
    !draft ||
    draft.status !==
      "draft"
  ) {
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

  const completion =
    draft.id === "9"
      ? 65
      : 45;

  const missingFields =
    draft.id === "9"
      ? [
          "Date & time",
          "Session image",
          "Price / Free setting",
        ]
      : [
          "Date & time",
          "Location",
          "Description",
          "Session image",
        ];

  const continueEditing =
    () => {
      router.push(
        `/organisation-dashboard/draft/${draft.id}-edit`
      );
    };

  const publishDraft =
    () => {
      Alert.alert(
        "Publish Session?",
        `"${draft.title}" will move from Drafts to Upcoming.`,
        [
          {
            text: "Cancel",
            style:
              "cancel",
          },
          {
            text: "Publish",

            onPress:
              () => {
                publishSession(
                  draft.id
                );

                router.replace(
                  "/organisation-dashboard/sessions"
                );
              },
          },
        ]
      );
    };

  

  const deleteDraft = () => {
      Alert.alert(
        "Delete Draft?",
        `This will remove "${draft.title}".`,
        [
          {
            text:
              "Keep Draft",
            style:
              "cancel",
          },
          {
            text:
              "Delete",
            style:
              "destructive",

            onPress:
              () => {
                deleteSession(
                  draft.id
                );

                router.replace(
                  "/organisation-dashboard/sessions"
                );
              },
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
            onPress={() =>
              router.back()
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
          Draft Session
        </Text>

        <Text
          style={
            styles.subtitle
          }
        >
          Finish setting up
          this session before
          publishing.
        </Text>

        <View
          style={
            styles.heroCard
          }
        >
          <View
            style={
              styles.imagePlaceholder
            }
          >
            <Text
              style={
                styles.heroLabel
              }
            >
              {draft.label}
            </Text>

            <Text
              style={
                styles.placeholderText
              }
            >
              Session Image
              Placeholder
            </Text>
          </View>

          <View
            style={
              styles.heroContent
            }
          >
            <View
              style={
                styles.titleRow
              }
            >
              <Text
                style={
                  styles.sessionTitle
                }
              >
                {draft.title}
              </Text>

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

            <View
              style={
                styles.notPublished
              }
            >
              <Ionicons
                name="eye-off-outline"
                size={15}
                color="#D7B9FF"
              />

              <Text
                style={
                  styles.notPublishedText
                }
              >
                Not published
              </Text>
            </View>
          </View>
        </View>

        <View
          style={
            styles.card
          }
        >
          <View
            style={
              styles.cardTop
            }
          >
            <Text
              style={
                styles.sectionTitle
              }
            >
              Setup Progress
            </Text>

            <Text
              style={
                styles.percentage
              }
            >
              {completion}%
            </Text>
          </View>

          <View
            style={
              styles.progressTrack
            }
          >
            <View
              style={[
                styles.progressBar,
                {
                  width:
                    `${completion}%`,
                },
              ]}
            />
          </View>

          <Text
            style={
              styles.progressText
            }
          >
            Complete the
            missing information
            before publishing.
          </Text>
        </View>

        <View
          style={
            styles.card
          }
        >
          <Text
            style={
              styles.sectionTitle
            }
          >
            Session Information
          </Text>

          <InfoRow
            icon="pricetag-outline"
            label="Category"
            value={
              draft.label
            }
          />

          <InfoRow
            icon="calendar-outline"
            label="Date & Time"
            value={
              draft.date
            }
          />

          <InfoRow
            icon="location-outline"
            label="Location"
            value={
              draft.location
            }
          />

          <InfoRow
            icon="people-outline"
            label="Capacity"
            value={
              draft.capacity
            }
          />
        </View>

        <View
          style={
            styles.card
          }
        >
          <Text
            style={
              styles.sectionTitle
            }
          >
            Missing Information
          </Text>

          <Text
            style={
              styles.helpText
            }
          >
            Complete these fields
            before the activity
            can go live.
          </Text>

          {missingFields.map(
            (field) => (
              <Pressable
                key={field}
                onPress={
                  continueEditing
                }
                style={
                  styles.missingRow
                }
              >
                <View
                  style={
                    styles.warningIcon
                  }
                >
                  <Ionicons
                    name="alert-outline"
                    size={17}
                    color="#FFB42E"
                  />
                </View>

                <Text
                  style={
                    styles.missingText
                  }
                >
                  {field}
                </Text>

                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={
                    COLORS.secondary
                  }
                />
              </Pressable>
            )
          )}
        </View>

        <Pressable
          onPress={
            continueEditing
          }
        >
          <LinearGradient
            colors={
              GRADIENT
            }
            style={
              styles.primaryButton
            }
          >
            <Ionicons
              name="create-outline"
              size={20}
              color={
                COLORS.white
              }
            />

            <Text
              style={
                styles.primaryText
              }
            >
              Continue Editing
            </Text>
          </LinearGradient>
        </Pressable>

        <Pressable
          onPress={
            publishDraft
          }
          style={
            styles.publishButton
          }
        >
          <Ionicons
            name="cloud-upload-outline"
            size={20}
            color="#53EF94"
          />

          <Text
            style={
              styles.publishText
            }
          >
            Publish Session
          </Text>
        </Pressable>

        <Pressable
          onPress={
            deleteDraft
          }
          style={
            styles.deleteButton
          }
        >
          <Ionicons
            name="trash-outline"
            size={20}
            color="#FF6177"
          />

          <Text
            style={
              styles.deleteText
            }
          >
            Delete Draft
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({
  icon,
  label,
  value,
}) {
  return (
    <View
      style={
        styles.infoRow
      }
    >
      <View
        style={
          styles.infoIcon
        }
      >
        <Ionicons
          name={icon}
          size={20}
          color={
            COLORS.pink
          }
        />
      </View>

      <View
        style={
          styles.infoContent
        }
      >
        <Text
          style={
            styles.infoLabel
          }
        >
          {label}
        </Text>

        <Text
          style={
            styles.infoValue
          }
        >
          {value}
        </Text>
      </View>
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

    heroCard: {
      borderRadius: 18,
      borderWidth: 1,
      borderColor:
        COLORS.border,
      backgroundColor:
        COLORS.surface,
      overflow: "hidden",
    },

    imagePlaceholder: {
      height: 190,
      backgroundColor:
        "#111A2F",
      alignItems:
        "center",
      justifyContent:
        "center",
    },

    heroLabel: {
      color:
        COLORS.pink,
      fontSize: 31,
      fontWeight:
        "900",
    },

    placeholderText: {
      color:
        COLORS.secondary,
      fontSize: 9,
      marginTop: 7,
    },

    heroContent: {
      padding: 17,
    },

    titleRow: {
      flexDirection: "row",
      alignItems:
        "center",
      justifyContent:
        "space-between",
    },

    sessionTitle: {
      flex: 1,
      color:
        COLORS.white,
      fontSize: 22,
      fontWeight:
        "900",
      paddingRight: 10,
    },

    draftBadge: {
      backgroundColor:
        "#4C286E",
      borderRadius: 18,
      paddingHorizontal: 11,
      paddingVertical: 6,
    },

    draftBadgeText: {
      color:
        "#E4C4FF",
      fontSize: 9,
      fontWeight:
        "800",
    },

    notPublished: {
      flexDirection: "row",
      alignItems:
        "center",
      gap: 6,
      marginTop: 11,
    },

    notPublishedText: {
      color:
        "#D7B9FF",
      fontSize: 10,
    },

    card: {
      marginTop: 15,
      borderRadius: 16,
      borderWidth: 1,
      borderColor:
        COLORS.border,
      backgroundColor:
        COLORS.surface,
      padding: 16,
    },

    cardTop: {
      flexDirection: "row",
      alignItems:
        "center",
      justifyContent:
        "space-between",
    },

    sectionTitle: {
      color:
        COLORS.white,
      fontSize: 17,
      fontWeight:
        "900",
    },

    percentage: {
      color:
        COLORS.pink,
      fontSize: 13,
      fontWeight:
        "900",
    },

    progressTrack: {
      height: 10,
      borderRadius: 20,
      backgroundColor:
        "#22293A",
      marginTop: 14,
      overflow:
        "hidden",
    },

    progressBar: {
      height: "100%",
      borderRadius: 20,
      backgroundColor:
        COLORS.purple,
    },

    progressText: {
      color:
        COLORS.secondary,
      fontSize: 9,
      lineHeight: 14,
      marginTop: 9,
    },

    infoRow: {
      minHeight: 64,
      flexDirection: "row",
      alignItems:
        "center",
      borderBottomWidth: 1,
      borderBottomColor:
        COLORS.border,
    },

    infoIcon: {
      width: 42,
    },

    infoContent: {
      flex: 1,
    },

    infoLabel: {
      color:
        COLORS.secondary,
      fontSize: 8,
    },

    infoValue: {
      color:
        COLORS.white,
      fontSize: 11,
      fontWeight:
        "700",
      marginTop: 3,
    },

    helpText: {
      color:
        COLORS.secondary,
      fontSize: 9,
      marginTop: 5,
      marginBottom: 9,
    },

    missingRow: {
      minHeight: 54,
      flexDirection: "row",
      alignItems:
        "center",
      borderBottomWidth: 1,
      borderBottomColor:
        COLORS.border,
    },

    warningIcon: {
      width: 36,
    },

    missingText: {
      flex: 1,
      color:
        COLORS.white,
      fontSize: 10,
      fontWeight:
        "700",
    },

    primaryButton: {
      minHeight: 55,
      borderRadius: 14,
      marginTop: 18,
      flexDirection: "row",
      alignItems:
        "center",
      justifyContent:
        "center",
      gap: 8,
    },

    primaryText: {
      color:
        COLORS.white,
      fontSize: 13,
      fontWeight:
        "900",
    },

    publishButton: {
      minHeight: 53,
      borderRadius: 14,
      borderWidth: 1,
      borderColor:
        "#26653E",
      backgroundColor:
        "#0C2117",
      marginTop: 10,
      flexDirection: "row",
      alignItems:
        "center",
      justifyContent:
        "center",
      gap: 8,
    },

    publishText: {
      color:
        "#53EF94",
      fontSize: 12,
      fontWeight:
        "800",
    },

    deleteButton: {
      minHeight: 53,
      borderRadius: 14,
      borderWidth: 1,
      borderColor:
        "#77333D",
      marginTop: 10,
      flexDirection: "row",
      alignItems:
        "center",
      justifyContent:
        "center",
      gap: 8,
    },

    deleteText: {
      color:
        "#FF6177",
      fontSize: 12,
      fontWeight:
        "800",
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



