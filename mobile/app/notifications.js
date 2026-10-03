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

import {
  useCallback,
  useState,
} from "react";

import {
  useFocusEffect,
  useRouter,
} from "expo-router";

import { Ionicons } from "@expo/vector-icons";

import JoinziieLogo from "../components/JoinziieLogo";

import { COLORS } from "../constants/theme";

import { useAuth } from "../context/AuthContext";

import {
  getPendingInvitationsForUser,
  acceptInvitation,
  declineInvitation,
} from "../services/invitationsApi";


export default function NotificationsScreen() {
  const router = useRouter();

  const { user } = useAuth();

  const [invitations, setInvitations] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [processingId, setProcessingId] =
    useState(null);

  const [error, setError] =
    useState("");


  const email =
    user?.email ||
    user?.user?.email ||
    "";


  const userId =
    user?._id ||
    user?.id ||
    user?.user?._id ||
    user?.user?.id ||
    null;


  const loadInvitations =
    useCallback(async () => {
      try {
        setLoading(true);
        setError("");

        if (!email) {
          setInvitations([]);
          setError(
            "Could not find the email for the logged-in account."
          );

          return;
        }

        const data =
          await getPendingInvitationsForUser(
            email
          );

        setInvitations(
          Array.isArray(data)
            ? data
            : []
        );
      } catch (err) {
        console.error(
          "Load invitations error:",
          err
        );

        setError(
          err?.message ||
            "Could not load invitations."
        );
      } finally {
        setLoading(false);
      }
    }, [email]);


  useFocusEffect(
    useCallback(() => {
      loadInvitations();
    }, [loadInvitations])
  );


  async function handleAccept(
    invitation
  ) {
    try {
      setProcessingId(
        invitation._id
      );

      await acceptInvitation(
        invitation._id,
        {
          email,
          userId,
        }
      );

      setInvitations((current) =>
        current.filter(
          (item) =>
            item._id !==
            invitation._id
        )
      );

      Alert.alert(
        "Invitation accepted",
        "You have accepted the invitation."
      );
    } catch (err) {
      Alert.alert(
        "Could not accept invitation",
        err?.message ||
          "Please try again."
      );
    } finally {
      setProcessingId(null);
    }
  }


  function confirmDecline(
    invitation
  ) {
    Alert.alert(
      "Decline invitation?",
      `Decline the invitation for ${invitation.email}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Decline",
          style: "destructive",
          onPress: () =>
            handleDecline(
              invitation
            ),
        },
      ]
    );
  }


  async function handleDecline(
    invitation
  ) {
    try {
      setProcessingId(
        invitation._id
      );

      await declineInvitation(
        invitation._id,
        {
          email,
        }
      );

      setInvitations((current) =>
        current.filter(
          (item) =>
            item._id !==
            invitation._id
        )
      );

      Alert.alert(
        "Invitation declined",
        "The invitation has been declined."
      );
    } catch (err) {
      Alert.alert(
        "Could not decline invitation",
        err?.message ||
          "Please try again."
      );
    } finally {
      setProcessingId(null);
    }
  }


  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.container
        }
      >
        <View style={styles.topBar}>
          <Pressable
            style={styles.backButton}
            onPress={() =>
              router.back()
            }
          >
            <Ionicons
              name="chevron-back"
              size={26}
              color={COLORS.white}
            />
          </Pressable>

          <JoinziieLogo />

          <View
            style={
              styles.headerSpacer
            }
          />
        </View>


        <Text style={styles.title}>
          Notifications
        </Text>

        <Text style={styles.subtitle}>
          Invitations and account
          updates will appear here.
        </Text>


        {email ? (
          <View style={styles.accountBar}>
            <Ionicons
              name="person-circle-outline"
              size={20}
              color={COLORS.pink}
            />

            <Text
              style={
                styles.accountText
              }
            >
              {email}
            </Text>
          </View>
        ) : null}


        {loading ? (
          <View style={styles.stateCard}>
            <ActivityIndicator
              size="large"
              color={COLORS.purple}
            />

            <Text
              style={
                styles.stateTitle
              }
            >
              Loading notifications
            </Text>
          </View>
        ) : error ? (
          <View style={styles.stateCard}>
            <Ionicons
              name="alert-circle-outline"
              size={42}
              color="#FF5576"
            />

            <Text
              style={
                styles.stateTitle
              }
            >
              Something went wrong
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
                styles.retryButton
              }
              onPress={
                loadInvitations
              }
            >
              <Text
                style={
                  styles.retryText
                }
              >
                Try again
              </Text>
            </Pressable>
          </View>
        ) : invitations.length ===
          0 ? (
          <View style={styles.stateCard}>
            <Ionicons
              name="notifications-outline"
              size={46}
              color={
                COLORS.secondary
              }
            />

            <Text
              style={
                styles.stateTitle
              }
            >
              You're all caught up
            </Text>

            <Text
              style={
                styles.stateText
              }
            >
              You don't have any
              pending invitations.
            </Text>
          </View>
        ) : (
          <View style={styles.list}>
            <Text
              style={
                styles.sectionTitle
              }
            >
              Pending Invitations
            </Text>

            {invitations.map(
              (invitation) => {
                const busy =
                  processingId ===
                  invitation._id;

                const role =
                  invitation.role ===
                  "coach"
                    ? "Coach"
                    : "Participant";

                return (
                  <View
                    key={
                      invitation._id
                    }
                    style={
                      styles.inviteCard
                    }
                  >
                    <View
                      style={
                        styles.inviteTop
                      }
                    >
                      <View
                        style={
                          styles.inviteIcon
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
                          styles.inviteInfo
                        }
                      >
                        <Text
                          style={
                            styles.inviteTitle
                          }
                        >
                          Organisation
                          invitation
                        </Text>

                        <Text
                          style={
                            styles.inviteText
                          }
                        >
                          You've been
                          invited to
                          join as{" "}
                          {role}.
                        </Text>
                      </View>

                      <View
                        style={
                          styles.pendingBadge
                        }
                      >
                        <Text
                          style={
                            styles.pendingText
                          }
                        >
                          Pending
                        </Text>
                      </View>
                    </View>


                    <View
                      style={
                        styles.details
                      }
                    >
                      <View
                        style={
                          styles.detailRow
                        }
                      >
                        <Ionicons
                          name="person-outline"
                          size={17}
                          color={
                            COLORS.secondary
                          }
                        />

                        <Text
                          style={
                            styles.detailLabel
                          }
                        >
                          Role
                        </Text>

                        <Text
                          style={
                            styles.detailValue
                          }
                        >
                          {role}
                        </Text>
                      </View>

                      {invitation.organisationId ? (
                        <View
                          style={
                            styles.detailRow
                          }
                        >
                          <Ionicons
                            name="business-outline"
                            size={17}
                            color={
                              COLORS.secondary
                            }
                          />

                          <Text
                            style={
                              styles.detailLabel
                            }
                          >
                            Organisation
                          </Text>

                          <Text
                            numberOfLines={
                              1
                            }
                            style={
                              styles.detailValue
                            }
                          >
                            Invitation
                          </Text>
                        </View>
                      ) : null}
                    </View>


                    <View
                      style={
                        styles.actionRow
                      }
                    >
                      <Pressable
                        disabled={busy}
                        style={[
                          styles.actionButton,
                          styles.declineButton,
                          busy &&
                            styles.disabled,
                        ]}
                        onPress={() =>
                          confirmDecline(
                            invitation
                          )
                        }
                      >
                        <Ionicons
                          name="close"
                          size={19}
                          color="#FF5576"
                        />

                        <Text
                          style={
                            styles.declineText
                          }
                        >
                          Decline
                        </Text>
                      </Pressable>

                      <Pressable
                        disabled={busy}
                        style={[
                          styles.actionButton,
                          styles.acceptButton,
                          busy &&
                            styles.disabled,
                        ]}
                        onPress={() =>
                          handleAccept(
                            invitation
                          )
                        }
                      >
                        {busy ? (
                          <ActivityIndicator
                            color={
                              COLORS.white
                            }
                          />
                        ) : (
                          <>
                            <Ionicons
                              name="checkmark"
                              size={19}
                              color={
                                COLORS.white
                              }
                            />

                            <Text
                              style={
                                styles.acceptText
                              }
                            >
                              Accept
                            </Text>
                          </>
                        )}
                      </Pressable>
                    </View>
                  </View>
                );
              }
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
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

    topBar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent:
        "space-between",
    },

    backButton: {
      width: 44,
      height: 44,
      alignItems: "center",
      justifyContent: "center",
    },

    headerSpacer: {
      width: 44,
    },

    title: {
      color: COLORS.white,
      fontSize: 29,
      fontWeight: "900",
      marginTop: 30,
    },

    subtitle: {
      color: COLORS.secondary,
      fontSize: 13,
      lineHeight: 20,
      marginTop: 5,
      marginBottom: 20,
    },

    accountBar: {
      minHeight: 48,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: "#23314A",
      backgroundColor: "#0B1425",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 14,
      gap: 9,
      marginBottom: 20,
    },

    accountText: {
      color: COLORS.white,
      fontSize: 12,
      fontWeight: "700",
    },

    list: {
      gap: 12,
    },

    sectionTitle: {
      color: COLORS.white,
      fontSize: 18,
      fontWeight: "900",
      marginBottom: 3,
    },

    inviteCard: {
      borderRadius: 18,
      borderWidth: 1,
      borderColor: "#28354D",
      backgroundColor: "#0B1425",
      padding: 16,
    },

    inviteTop: {
      flexDirection: "row",
      alignItems: "center",
    },

    inviteIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor:
        COLORS.purple,
      alignItems: "center",
      justifyContent: "center",
    },

    inviteInfo: {
      flex: 1,
      marginLeft: 12,
    },

    inviteTitle: {
      color: COLORS.white,
      fontSize: 15,
      fontWeight: "900",
    },

    inviteText: {
      color: COLORS.secondary,
      fontSize: 11,
      lineHeight: 17,
      marginTop: 3,
    },

    pendingBadge: {
      borderRadius: 20,
      borderWidth: 1,
      borderColor: "#805E1F",
      backgroundColor:
        "rgba(210,155,42,0.12)",
      paddingHorizontal: 10,
      paddingVertical: 6,
    },

    pendingText: {
      color: "#F5B942",
      fontSize: 9,
      fontWeight: "800",
    },

    details: {
      marginTop: 16,
      borderTopWidth: 1,
      borderTopColor: "#26334A",
      paddingTop: 10,
      gap: 10,
    },

    detailRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },

    detailLabel: {
      color: COLORS.secondary,
      fontSize: 11,
    },

    detailValue: {
      color: COLORS.white,
      fontSize: 11,
      fontWeight: "800",
      marginLeft: "auto",
      maxWidth: "50%",
    },

    actionRow: {
      flexDirection: "row",
      gap: 10,
      marginTop: 17,
    },

    actionButton: {
      flex: 1,
      minHeight: 48,
      borderRadius: 14,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
    },

    declineButton: {
      borderWidth: 1,
      borderColor: "#9A3650",
      backgroundColor:
        "rgba(255,85,118,0.05)",
    },

    declineText: {
      color: "#FF5576",
      fontWeight: "800",
      fontSize: 12,
    },

    acceptButton: {
      backgroundColor:
        COLORS.purple,
    },

    acceptText: {
      color: COLORS.white,
      fontWeight: "900",
      fontSize: 12,
    },

    disabled: {
      opacity: 0.6,
    },

    stateCard: {
      minHeight: 260,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: "#27354D",
      backgroundColor: "#07101F",
      alignItems: "center",
      justifyContent: "center",
      padding: 30,
    },

    stateTitle: {
      color: COLORS.white,
      fontSize: 18,
      fontWeight: "900",
      textAlign: "center",
      marginTop: 14,
    },

    stateText: {
      color: COLORS.secondary,
      fontSize: 12,
      lineHeight: 19,
      textAlign: "center",
      marginTop: 7,
    },

    retryButton: {
      marginTop: 18,
      backgroundColor:
        COLORS.purple,
      paddingHorizontal: 20,
      paddingVertical: 11,
      borderRadius: 18,
    },

    retryText: {
      color: COLORS.white,
      fontSize: 11,
      fontWeight: "800",
    },
  });
