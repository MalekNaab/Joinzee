import {
  Alert,
  Platform,
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
  useEffect,
  useState,
} from "react";

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
  getSession as getSessionFromApi,
} from "../../../services/api";

import {
  useAuth,
} from "../../../context/AuthContext";

import {
  COLORS,
  GRADIENT,
} from "../../../constants/theme";


export default function OrganisationSessionDetails() {
  const router =
    useRouter();

  const {
    id,
  } =
    useLocalSearchParams();

  const {
    loading: authLoading,
  } =
    useAuth();

  const {
    loading,
    getSessionById,
    cancelSession,
    deleteSession,
  } =
    useOrganisationSessions();

  const [
    busy,
    setBusy,
  ] =
    useState(null);

  const contextSession =
    getSessionById(
      String(id)
    );

  const [
    remoteSession,
    setRemoteSession,
  ] = useState(null);

  const [
    directLoading,
    setDirectLoading,
  ] = useState(true);

  const session =
    contextSession ||
    remoteSession;


  useEffect(() => {
    let active = true;

    const loadDirectSession =
      async () => {
        if (!id) {
          setDirectLoading(false);
          return;
        }

        if (contextSession) {
          setDirectLoading(false);
          return;
        }

        try {
          setDirectLoading(true);

          const found =
            await getSessionFromApi(
              String(id)
            );

          if (active) {
            setRemoteSession(
              found
            );
          }
        } catch (error) {
          console.error(
            "Could not load session directly:",
            error
          );
        } finally {
          if (active) {
            setDirectLoading(
              false
            );
          }
        }
      };

    loadDirectSession();

    return () => {
      active = false;
    };
  }, [
    id,
    contextSession,
  ]);


  const safeBack =
    () => {
      if (
        router.canGoBack()
      ) {
        router.back();
      } else {
        router.replace(
          "/organisation-dashboard/sessions"
        );
      }
    };


  const performCancel =
    async () => {
      try {
        setBusy("cancel");

        await cancelSession(
          String(id)
        );

        router.replace(
          "/organisation-dashboard/sessions"
        );
      } catch (error) {
        console.error(
          error
        );

        Alert.alert(
          "Could not cancel session",
          error.message ||
            "Please try again."
        );
      } finally {
        setBusy(null);
      }
    };


  const handleCancel =
    () => {
      if (
        Platform.OS === "web"
      ) {
        const confirmed =
          globalThis.confirm(
            "Cancel this session? It will be moved out of Upcoming sessions."
          );

        if (confirmed) {
          performCancel();
        }

        return;
      }

      Alert.alert(
        "Cancel Session",
        "Are you sure you want to cancel this session?",
        [
          {
            text: "Keep Session",
            style: "cancel",
          },
          {
            text: "Cancel Session",
            style: "destructive",
            onPress: performCancel,
          },
        ]
      );
    };


  const performDelete =
    async () => {
      try {
        setBusy("delete");

        await deleteSession(
          String(id)
        );

        router.replace(
          "/organisation-dashboard/sessions"
        );
      } catch (error) {
        console.error(
          error
        );

        Alert.alert(
          "Could not delete session",
          error.message ||
            "Please try again."
        );
      } finally {
        setBusy(null);
      }
    };


  const handleDelete =
    () => {
      if (
        Platform.OS === "web"
      ) {
        const confirmed =
          globalThis.confirm(
            "Permanently delete this session? This cannot be undone."
          );

        if (confirmed) {
          performDelete();
        }

        return;
      }

      Alert.alert(
        "Delete Session",
        "This permanently removes the session from MongoDB. Continue?",
        [
          {
            text: "Keep Session",
            style: "cancel",
          },
          {
            text: "Delete",
            style: "destructive",
            onPress: performDelete,
          },
        ]
      );
    };


  if (
    authLoading ||
    loading ||
    (
      !session &&
      directLoading
    )
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
              styles.loadingText
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
              styles.notFoundTitle
            }
          >
            Session not found
          </Text>

          <Pressable
            onPress={
              safeBack
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


  const rawStatus =
    session.rawStatus ||
    session.status;

  const statusText =
    rawStatus === "cancelled"
      ? "Cancelled"
      : rawStatus === "draft"
        ? "Draft"
        : rawStatus === "completed"
          ? "Completed"
          : "Published";

  const statusStyle =
    rawStatus === "cancelled"
      ? styles.statusCancelled
      : rawStatus === "draft"
        ? styles.statusDraft
        : styles.statusPublished;

  const statusTextStyle =
    rawStatus === "cancelled"
      ? styles.statusCancelledText
      : rawStatus === "draft"
        ? styles.statusDraftText
        : styles.statusPublishedText;

  const dateAndTime =
    [
      session.date,
      session.time,
    ]
      .filter(Boolean)
      .join(" • ");

  const priceText =
    session.isFree ||
    Number(session.price) === 0
      ? "Free"
      : `£${session.price}`;

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
            styles.topBar
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
              size={28}
              color={
                COLORS.white
              }
            />
          </Pressable>

          <JoinziieLogo />

          <View
            style={
              styles.topSpacer
            }
          />
        </View>


        <Text
          style={
            styles.pageTitle
          }
        >
          Session Details
        </Text>


        <View
          style={
            styles.hero
          }
        >
          <View
            style={
              styles.heroImage
            }
          >
            <Text
              style={
                styles.heroLabel
              }
            >
              {session.label ||
                session.category ||
                "Session"}
            </Text>

            <Text
              style={
                styles.placeholder
              }
            >
              Session Image
            </Text>
          </View>

          <View
            style={
              styles.heroContent
            }
          >
            <Text
              style={
                styles.sessionTitle
              }
            >
              {session.title}
            </Text>

            <View
              style={[
                styles.statusBadge,
                statusStyle,
              ]}
            >
              <View
                style={[
                  styles.statusDot,
                  rawStatus ===
                    "cancelled"
                    ? styles.redDot
                    : rawStatus ===
                        "draft"
                      ? styles.orangeDot
                      : styles.greenDot,
                ]}
              />

              <Text
                style={[
                  styles.statusText,
                  statusTextStyle,
                ]}
              >
                {statusText}
              </Text>
            </View>
          </View>
        </View>


        <View
          style={
            styles.infoGrid
          }
        >
          <InfoCard
            icon="calendar-outline"
            label="Date & Time"
            value={
              dateAndTime ||
              "TBC"
            }
          />

          <InfoCard
            icon="location-outline"
            label="Location"
            value={
              session.location ||
              "TBC"
            }
          />

          <InfoCard
            icon="people-outline"
            label="Capacity"
            value={
              session.capacity ||
              `${session.booked || 0} / ${session.capacityLimit || 0}`
            }
          />

          <InfoCard
            icon="pricetag-outline"
            label="Price"
            value={
              priceText
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
            About this session
          </Text>

          <Text
            style={
              styles.body
            }
          >
            {session.description ||
              "No description has been added for this session."}
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

          <DetailRow
            label="Category"
            value={
              session.category ||
              session.label ||
              "Not set"
            }
          />

          <DetailRow
            label="Age Range"
            value={
              session.ageRange ||
              "Not set"
            }
          />

          <DetailRow
            label="Bookings"
            value={
              String(
                session.booked ||
                0
              )
            }
          />

          <DetailRow
            label="Capacity"
            value={
              String(
                session.capacityLimit ||
                0
              )
            }
          />
        </View>


        {rawStatus !==
          "cancelled" && (
          <Pressable
            disabled={
              busy !== null
            }
            onPress={() =>
              router.push(
                `/organisation-dashboard/session/${id}/edit`
              )
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
                Edit Session
              </Text>
            </LinearGradient>
          </Pressable>
        )}


        <Pressable
          style={
            styles.secondaryButton
          }
          onPress={() =>
            router.push(
              `/organisation-dashboard/session/${id}/attendance`
            )
          }
        >
          <Ionicons
            name="checkmark-circle-outline"
            size={20}
            color={
              COLORS.white
            }
          />

          <Text
            style={
              styles.secondaryText
            }
          >
            Manage Attendance
          </Text>
        </Pressable>


        <Pressable
          style={
            styles.secondaryButton
          }
          onPress={() =>
            router.push(
              `/organisation-dashboard/session/${id}-message`
            )
          }
        >
          <Ionicons
            name="chatbubble-outline"
            size={20}
            color={
              COLORS.white
            }
          />

          <Text
            style={
              styles.secondaryText
            }
          >
            Message Attendees
          </Text>
        </Pressable>


        {rawStatus !==
          "cancelled" && (
          <Pressable
            disabled={
              busy !== null
            }
            style={
              styles.cancelButton
            }
            onPress={
              handleCancel
            }
          >
            <Ionicons
              name="close-circle-outline"
              size={20}
              color="#FFB347"
            />

            <Text
              style={
                styles.cancelText
              }
            >
              {busy === "cancel"
                ? "Cancelling..."
                : "Cancel Session"}
            </Text>
          </Pressable>
        )}


        <Pressable
          disabled={
            busy !== null
          }
          style={
            styles.deleteButton
          }
          onPress={
            handleDelete
          }
        >
          <Ionicons
            name="trash-outline"
            size={20}
            color="#FF6277"
          />

          <Text
            style={
              styles.deleteText
            }
          >
            {busy === "delete"
              ? "Deleting..."
              : "Delete Session"}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}


function InfoCard({
  icon,
  label,
  value,
}) {
  return (
    <View
      style={
        styles.infoCard
      }
    >
      <Ionicons
        name={icon}
        size={22}
        color={
          COLORS.pink
        }
      />

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
  );
}


function DetailRow({
  label,
  value,
}) {
  return (
    <View
      style={
        styles.detailRow
      }
    >
      <Text
        style={
          styles.detailLabel
        }
      >
        {label}
      </Text>

      <Text
        style={
          styles.detailValue
        }
      >
        {value}
      </Text>
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
      paddingHorizontal: 18,
      paddingTop: 18,
      paddingBottom: 50,
    },

    center: {
      flex: 1,
      alignItems: "center",
      justifyContent:
        "center",
    },

    loadingText: {
      color:
        COLORS.secondary,
      fontSize: 14,
    },

    topBar: {
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

    topSpacer: {
      width: 44,
    },

    pageTitle: {
      color:
        COLORS.white,
      fontSize: 29,
      fontWeight: "900",
      marginTop: 30,
      marginBottom: 18,
    },

    hero: {
      borderRadius: 18,
      overflow: "hidden",
      borderWidth: 1,
      borderColor:
        COLORS.border,
      backgroundColor:
        COLORS.surface,
    },

    heroImage: {
      height: 190,
      backgroundColor:
        "#111A2F",
      alignItems: "center",
      justifyContent:
        "center",
    },

    heroLabel: {
      color:
        COLORS.pink,
      fontSize: 28,
      fontWeight: "900",
    },

    placeholder: {
      color:
        COLORS.secondary,
      fontSize: 10,
      marginTop: 8,
    },

    heroContent: {
      padding: 17,
    },

    sessionTitle: {
      color:
        COLORS.white,
      fontSize: 24,
      fontWeight: "900",
    },

    statusBadge: {
      alignSelf:
        "flex-start",
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginTop: 10,
      paddingHorizontal: 11,
      paddingVertical: 6,
      borderRadius: 20,
    },

    statusPublished: {
      backgroundColor:
        "#103722",
    },

    statusCancelled: {
      backgroundColor:
        "#3D1820",
    },

    statusDraft: {
      backgroundColor:
        "#3D3017",
    },

    statusDot: {
      width: 7,
      height: 7,
      borderRadius: 7,
    },

    greenDot: {
      backgroundColor:
        "#3FE984",
    },

    redDot: {
      backgroundColor:
        "#FF6277",
    },

    orangeDot: {
      backgroundColor:
        "#FFB347",
    },

    statusText: {
      fontSize: 10,
      fontWeight: "800",
    },

    statusPublishedText: {
      color:
        "#53EF94",
    },

    statusCancelledText: {
      color:
        "#FF8090",
    },

    statusDraftText: {
      color:
        "#FFC768",
    },

    infoGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      marginTop: 15,
    },

    infoCard: {
      width: "48.8%",
      minHeight: 110,
      borderRadius: 15,
      borderWidth: 1,
      borderColor:
        COLORS.border,
      backgroundColor:
        COLORS.surface,
      padding: 14,
    },

    infoLabel: {
      color:
        COLORS.secondary,
      fontSize: 9,
      marginTop: 10,
    },

    infoValue: {
      color:
        COLORS.white,
      fontSize: 12,
      fontWeight: "800",
      marginTop: 4,
    },

    card: {
      borderRadius: 16,
      borderWidth: 1,
      borderColor:
        COLORS.border,
      backgroundColor:
        COLORS.surface,
      padding: 16,
      marginTop: 15,
    },

    sectionTitle: {
      color:
        COLORS.white,
      fontSize: 17,
      fontWeight: "900",
      marginBottom: 10,
    },

    body: {
      color:
        COLORS.secondary,
      fontSize: 11,
      lineHeight: 18,
    },

    detailRow: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      borderBottomWidth: 1,
      borderBottomColor:
        COLORS.border,
      paddingVertical: 10,
    },

    detailLabel: {
      color:
        COLORS.secondary,
      fontSize: 11,
    },

    detailValue: {
      color:
        COLORS.white,
      fontSize: 11,
      fontWeight: "800",
    },

    primaryButton: {
      height: 54,
      borderRadius: 14,
      marginTop: 18,
      flexDirection: "row",
      alignItems: "center",
      justifyContent:
        "center",
      gap: 8,
    },

    primaryText: {
      color:
        COLORS.white,
      fontWeight: "900",
      fontSize: 13,
    },

    secondaryButton: {
      height: 52,
      borderRadius: 14,
      borderWidth: 1,
      borderColor:
        COLORS.border,
      marginTop: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent:
        "center",
      gap: 8,
    },

    secondaryText: {
      color:
        COLORS.white,
      fontSize: 12,
      fontWeight: "700",
    },

    cancelButton: {
      height: 52,
      borderRadius: 14,
      borderWidth: 1,
      borderColor:
        "#785425",
      marginTop: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent:
        "center",
      gap: 8,
    },

    cancelText: {
      color:
        "#FFB347",
      fontSize: 12,
      fontWeight: "800",
    },

    deleteButton: {
      height: 52,
      borderRadius: 14,
      borderWidth: 1,
      borderColor:
        "#73303B",
      marginTop: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent:
        "center",
      gap: 8,
    },

    deleteText: {
      color:
        "#FF6277",
      fontSize: 12,
      fontWeight: "800",
    },

    notFoundTitle: {
      color:
        COLORS.white,
      fontSize: 22,
      fontWeight: "900",
    },

    backLink: {
      color:
        COLORS.pink,
      marginTop: 15,
    },
  });





