import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  ActivityIndicator,
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import {
  router,
  useLocalSearchParams,
} from "expo-router";

import {
  cancelInvitation,
  getInvitations,
} from "../../../../services/invitationsApi";

import { COLORS } from "../../../../constants/theme";

function getInvitationId(invitation) {
  return String(
    invitation?._id ||
      invitation?.id ||
      ""
  );
}

function formatRole(value) {
  const role = String(
    value || "participant"
  ).toLowerCase();

  return role === "coach"
    ? "Coach"
    : "Participant";
}

function formatDate(value) {
  if (!value) {
    return "Not available";
  }

  const date = new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return String(value);
  }

  return date.toLocaleString(
    "en-GB",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
}

export default function InvitationDetailsScreen() {
  const params =
    useLocalSearchParams();

  const invitationId =
    Array.isArray(params.id)
      ? params.id[0]
      : params.id;

  const [invitation, setInvitation] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [cancelling, setCancelling] =
    useState(false);

  const loadInvitation =
    useCallback(async () => {
      if (!invitationId) {
        setError(
          "Invitation ID is missing."
        );
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response =
          await getInvitations();

        const invitations =
          Array.isArray(response)
            ? response
            : Array.isArray(
                response?.invitations
              )
            ? response.invitations
            : [];

        const match =
          invitations.find(
            (item) =>
              getInvitationId(
                item
              ) ===
              String(
                invitationId
              )
          );

        if (!match) {
          setInvitation(null);
          setError(
            "Invitation not found."
          );
          return;
        }

        setInvitation(match);
      } catch (err) {
        console.error(
          "Load invitation error:",
          err
        );

        setError(
          err?.message ||
            "Could not load invitation."
        );
      } finally {
        setLoading(false);
      }
    }, [invitationId]);

  useEffect(() => {
    loadInvitation();
  }, [loadInvitation]);

  const performCancel =
    async () => {
      if (!invitation) {
        return;
      }

      try {
        setCancelling(true);
        setError("");

        await cancelInvitation(
          getInvitationId(
            invitation
          )
        );

        router.replace(
          "/organisation-dashboard/members"
        );
      } catch (err) {
        console.error(
          "Cancel invitation error:",
          err
        );

        setError(
          err?.message ||
            "Could not cancel invitation."
        );
      } finally {
        setCancelling(false);
      }
    };

  const confirmCancel = () => {
    const message =
      `Cancel the invitation for ${invitation?.email}?`;

    if (
      typeof window !==
        "undefined" &&
      typeof window.confirm ===
        "function"
    ) {
      if (window.confirm(message)) {
        performCancel();
      }

      return;
    }

    Alert.alert(
      "Cancel invitation",
      message,
      [
        {
          text: "Keep Invitation",
          style: "cancel",
        },
        {
          text: "Cancel Invitation",
          style: "destructive",
          onPress: performCancel,
        },
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView
        style={styles.safe}
      >
        <View
          style={
            styles.centerState
          }
        >
          <ActivityIndicator
            size="large"
            color={
              COLORS.purple
            }
          />

          <Text
            style={
              styles.stateText
            }
          >
            Loading invitation...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (
    error &&
    !invitation
  ) {
    return (
      <SafeAreaView
        style={styles.safe}
      >
        <View
          style={
            styles.centerState
          }
        >
          <Ionicons
            name="mail-open-outline"
            size={42}
            color={
              COLORS.secondary
            }
          />

          <Text
            style={
              styles.errorTitle
            }
          >
            Invitation not found
          </Text>

          <Text
            style={
              styles.stateText
            }
          >
            {error}
          </Text>

          <Pressable
            style={
              styles.backButton
            }
            onPress={() =>
              router.replace(
                "/organisation-dashboard/members"
              )
            }
          >
            <Text
              style={
                styles.backButtonText
              }
            >
              Back to Members
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const role =
    formatRole(
      invitation?.role
    );

  const invitedAt =
    invitation?.invitedAt ||
    invitation?.createdAt;

  return (
    <SafeAreaView
      style={styles.safe}
    >
      <ScrollView
        contentContainerStyle={
          styles.scrollContent
        }
      >
        <View
          style={
            styles.container
          }
        >
          <View
            style={styles.topBar}
          >
            <Pressable
              style={
                styles.iconButton
              }
              onPress={() =>
                router.back()
              }
            >
              <Ionicons
                name="chevron-back"
                size={26}
                color={
                  COLORS.white
                }
              />
            </Pressable>

            <Text
              style={
                styles.logoText
              }
            >
              <Text
                style={{
                  color:
                    COLORS.purple,
                }}
              >
                J
              </Text>{" "}
              Joinziie
            </Text>

            <View
              style={
                styles.iconSpacer
              }
            />
          </View>

          <Text
            style={styles.title}
          >
            Invitation Details
          </Text>

          <Text
            style={
              styles.subtitle
            }
          >
            View and manage this pending invitation.
          </Text>

          <View
            style={
              styles.profileCard
            }
          >
            <View
              style={
                styles.avatar
              }
            >
              <Ionicons
                name="mail-outline"
                size={25}
                color={
                  COLORS.white
                }
              />
            </View>

            <View
              style={
                styles.profileInfo
              }
            >
              <Text
                style={
                  styles.email
                }
                numberOfLines={1}
              >
                {
                  invitation.email
                }
              </Text>

              <Text
                style={
                  styles.role
                }
              >
                {role}
              </Text>
            </View>

            <View
              style={
                styles.pendingBadge
              }
            >
              <Text
                style={
                  styles.pendingBadgeText
                }
              >
                Pending
              </Text>
            </View>
          </View>

          <Text
            style={
              styles.sectionTitle
            }
          >
            Invitation Information
          </Text>

          <View
            style={
              styles.infoCard
            }
          >
            <InfoRow
              icon="mail-outline"
              label="Email Address"
              value={
                invitation.email
              }
            />

            <View
              style={
                styles.divider
              }
            />

            <InfoRow
              icon="person-outline"
              label="Member Role"
              value={role}
            />

            <View
              style={
                styles.divider
              }
            />

            <InfoRow
              icon="hourglass-outline"
              label="Status"
              value="Pending"
            />

            <View
              style={
                styles.divider
              }
            />

            <InfoRow
              icon="calendar-outline"
              label="Invited"
              value={
                formatDate(
                  invitedAt
                )
              }
            />
          </View>

          {error ? (
            <View
              style={
                styles.errorCard
              }
            >
              <Ionicons
                name="alert-circle-outline"
                size={18}
                color="#FF6B81"
              />

              <Text
                style={
                  styles.errorText
                }
              >
                {error}
              </Text>
            </View>
          ) : null}

          <Pressable
            style={[
              styles.cancelButton,
              cancelling &&
                styles.disabledButton,
            ]}
            disabled={
              cancelling
            }
            onPress={
              confirmCancel
            }
          >
            {cancelling ? (
              <ActivityIndicator
                size="small"
                color="#FF6B81"
              />
            ) : (
              <>
                <Ionicons
                  name="close-circle-outline"
                  size={20}
                  color="#FF6B81"
                />

                <Text
                  style={
                    styles.cancelText
                  }
                >
                  Cancel Invitation
                </Text>
              </>
            )}
          </Pressable>
        </View>
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
      style={styles.infoRow}
    >
      <View
        style={
          styles.infoIcon
        }
      >
        <Ionicons
          name={icon}
          size={20}
          color="#FF2AA3"
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
        "#020617",
    },

    scrollContent: {
      flexGrow: 1,
      paddingBottom: 50,
    },

    container: {
      width: "100%",
      maxWidth: 620,
      alignSelf: "center",
      paddingHorizontal: 22,
      paddingTop: 18,
    },

    topBar: {
      height: 58,
      flexDirection: "row",
      alignItems: "center",
      justifyContent:
        "space-between",
      marginBottom: 22,
    },

    iconButton: {
      width: 42,
      height: 42,
      justifyContent:
        "center",
      alignItems: "center",
    },

    iconSpacer: {
      width: 42,
      height: 42,
    },

    logoText: {
      color: COLORS.white,
      fontSize: 19,
      fontWeight: "900",
    },

    title: {
      color: COLORS.white,
      fontSize: 28,
      fontWeight: "900",
    },

    subtitle: {
      color:
        COLORS.secondary,
      fontSize: 13,
      marginTop: 4,
      marginBottom: 22,
    },

    profileCard: {
      borderRadius: 16,
      borderWidth: 1,
      borderColor:
        COLORS.border,
      backgroundColor:
        COLORS.surface,
      padding: 16,
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 28,
    },

    avatar: {
      width: 52,
      height: 52,
      borderRadius: 26,
      backgroundColor:
        COLORS.purple,
      alignItems: "center",
      justifyContent:
        "center",
    },

    profileInfo: {
      flex: 1,
      marginLeft: 14,
      marginRight: 10,
    },

    email: {
      color: COLORS.white,
      fontSize: 15,
      fontWeight: "900",
    },

    role: {
      color:
        COLORS.secondary,
      fontSize: 11,
      marginTop: 4,
    },

    pendingBadge: {
      borderRadius: 20,
      paddingHorizontal: 14,
      paddingVertical: 7,
      backgroundColor:
        "rgba(245,185,66,0.14)",
      borderWidth: 1,
      borderColor:
        "rgba(245,185,66,0.45)",
    },

    pendingBadgeText: {
      color: "#F5B942",
      fontSize: 9,
      fontWeight: "900",
    },

    sectionTitle: {
      color: COLORS.white,
      fontSize: 18,
      fontWeight: "900",
      marginBottom: 12,
    },

    infoCard: {
      borderRadius: 16,
      borderWidth: 1,
      borderColor:
        COLORS.border,
      backgroundColor:
        COLORS.surface,
      paddingHorizontal: 16,
      marginBottom: 22,
    },

    infoRow: {
      minHeight: 74,
      flexDirection: "row",
      alignItems: "center",
    },

    infoIcon: {
      width: 32,
      alignItems: "flex-start",
    },

    infoContent: {
      flex: 1,
    },

    infoLabel: {
      color:
        COLORS.secondary,
      fontSize: 10,
      marginBottom: 5,
    },

    infoValue: {
      color: COLORS.white,
      fontSize: 13,
      fontWeight: "800",
    },

    divider: {
      height: 1,
      backgroundColor:
        COLORS.border,
    },

    errorCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      borderRadius: 12,
      borderWidth: 1,
      borderColor:
        "rgba(255,107,129,0.35)",
      backgroundColor:
        "rgba(255,107,129,0.08)",
      padding: 12,
      marginBottom: 14,
    },

    errorText: {
      color: "#FF6B81",
      fontSize: 12,
      flex: 1,
    },

    cancelButton: {
      height: 54,
      borderRadius: 14,
      borderWidth: 1,
      borderColor:
        "rgba(255,107,129,0.55)",
      flexDirection: "row",
      alignItems: "center",
      justifyContent:
        "center",
      gap: 8,
    },

    cancelText: {
      color: "#FF6B81",
      fontSize: 13,
      fontWeight: "900",
    },

    disabledButton: {
      opacity: 0.5,
    },

    centerState: {
      flex: 1,
      alignItems: "center",
      justifyContent:
        "center",
      paddingHorizontal: 24,
      gap: 12,
    },

    stateText: {
      color:
        COLORS.secondary,
      textAlign: "center",
      fontSize: 13,
    },

    errorTitle: {
      color: COLORS.white,
      fontSize: 20,
      fontWeight: "900",
    },

    backButton: {
      marginTop: 12,
      backgroundColor:
        COLORS.purple,
      borderRadius: 12,
      paddingHorizontal: 22,
      paddingVertical: 13,
    },

    backButtonText: {
      color: COLORS.white,
      fontWeight: "800",
    },
  });
