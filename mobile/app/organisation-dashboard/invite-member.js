import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  LinearGradient,
} from "expo-linear-gradient";

import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import JoinziieLogo from "../../components/JoinziieLogo";

import {
  COLORS,
  GRADIENT,
} from "../../constants/theme";

import {
  cancelInvitation,
  createInvitation,
  getInvitations,
} from "../../services/invitationsApi";


export default function InviteMemberPage() {
  const router = useRouter();

  const params =
    useLocalSearchParams();

  const rawOrganisationId =
    params.organisationId;

  const organisationId =
    Array.isArray(
      rawOrganisationId
    )
      ? rawOrganisationId[0]
      : rawOrganisationId;

  const [email, setEmail] =
    useState("");

  const [role, setRole] =
    useState("participant");

  const [
    invitations,
    setInvitations,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [sending, setSending] =
    useState(false);

  const [
    cancellingId,
    setCancellingId,
  ] = useState(null);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");


  const loadInvitations =
    useCallback(async () => {
      try {
        setError("");

        const data =
          await getInvitations(
            organisationId
          );

        setInvitations(
          Array.isArray(data)
            ? data
            : []
        );
      } catch (loadError) {
        setError(
          loadError.message
        );
      } finally {
        setLoading(false);
      }
    }, [organisationId]);


  useEffect(() => {
    loadInvitations();
  }, [loadInvitations]);


  async function handleSend() {
    const cleanEmail =
      email
        .trim()
        .toLowerCase();

    setError("");
    setSuccess("");

    if (!cleanEmail) {
      setError(
        "Enter an email address."
      );
      return;
    }

    if (
      !cleanEmail.includes("@")
    ) {
      setError(
        "Enter a valid email address."
      );
      return;
    }

    try {
      setSending(true);

      await createInvitation({
        organisationId,
        email: cleanEmail,
        role,
      });

      setEmail("");

      setSuccess(
        `Invitation created for ${cleanEmail}.`
      );

      await loadInvitations();
    } catch (sendError) {
      setError(
        sendError.message
      );
    } finally {
      setSending(false);
    }
  }


  async function handleCancel(
    invitationId
  ) {
    try {
      setError("");
      setSuccess("");
      setCancellingId(
        invitationId
      );

      await cancelInvitation(
        invitationId
      );

      setSuccess(
        "Invitation cancelled."
      );

      await loadInvitations();
    } catch (cancelError) {
      setError(
        cancelError.message
      );
    } finally {
      setCancellingId(null);
    }
  }


  const pendingInvitations =
    invitations.filter(
      (item) =>
        item.status === "pending"
    );


  return (
    <SafeAreaView
      style={styles.safe}
    >
      <ScrollView
        contentContainerStyle={
          styles.container
        }
        showsVerticalScrollIndicator={
          false
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
              color={COLORS.white}
            />
          </Pressable>

          <JoinziieLogo />

          <View
            style={
              styles.iconButton
            }
          />
        </View>

        <Text
          style={styles.title}
        >
          Invite Member
        </Text>

        <Text
          style={styles.subtitle}
        >
          Invite someone to join
          your organisation.
        </Text>


        <View
          style={styles.card}
        >
          <Text
            style={styles.label}
          >
            Email address
          </Text>

          <View
            style={
              styles.inputWrap
            }
          >
            <Ionicons
              name="mail-outline"
              size={20}
              color={
                COLORS.secondary
              }
            />

            <TextInput
              value={email}
              onChangeText={
                setEmail
              }
              placeholder="person@example.com"
              placeholderTextColor={
                COLORS.secondary
              }
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
            />
          </View>


          <Text
            style={[
              styles.label,
              {
                marginTop: 20,
              },
            ]}
          >
            Member role
          </Text>

          <View
            style={
              styles.roleRow
            }
          >
            <Pressable
              style={[
                styles.roleButton,
                role ===
                  "participant" &&
                  styles.roleActive,
              ]}
              onPress={() =>
                setRole(
                  "participant"
                )
              }
            >
              <Ionicons
                name="person-outline"
                size={20}
                color={
                  COLORS.white
                }
              />

              <Text
                style={
                  styles.roleText
                }
              >
                Participant
              </Text>
            </Pressable>


            <Pressable
              style={[
                styles.roleButton,
                role ===
                  "coach" &&
                  styles.roleActive,
              ]}
              onPress={() =>
                setRole("coach")
              }
            >
              <Ionicons
                name="school-outline"
                size={20}
                color={
                  COLORS.white
                }
              />

              <Text
                style={
                  styles.roleText
                }
              >
                Coach
              </Text>
            </Pressable>
          </View>


          {!!error && (
            <View
              style={
                styles.errorBox
              }
            >
              <Text
                style={
                  styles.errorText
                }
              >
                {error}
              </Text>
            </View>
          )}


          {!!success && (
            <View
              style={
                styles.successBox
              }
            >
              <Text
                style={
                  styles.successText
                }
              >
                {success}
              </Text>
            </View>
          )}


          <Pressable
            onPress={
              handleSend
            }
            disabled={sending}
            style={
              styles.sendWrap
            }
          >
            <LinearGradient
              colors={GRADIENT}
              style={
                styles.sendButton
              }
            >
              {sending ? (
                <ActivityIndicator
                  color={
                    COLORS.white
                  }
                />
              ) : (
                <>
                  <Ionicons
                    name="paper-plane-outline"
                    size={18}
                    color={
                      COLORS.white
                    }
                  />

                  <Text
                    style={
                      styles.sendText
                    }
                  >
                    Send Invitation
                  </Text>
                </>
              )}
            </LinearGradient>
          </Pressable>
        </View>


        <View
          style={
            styles.sectionHeader
          }
        >
          <View>
            <Text
              style={
                styles.sectionTitle
              }
            >
              Pending Invitations
            </Text>

            <Text
              style={
                styles.sectionSubtitle
              }
            >
              Invitations waiting
              to be accepted.
            </Text>
          </View>

          <View
            style={
              styles.countPill
            }
          >
            <Text
              style={
                styles.countText
              }
            >
              {
                pendingInvitations.length
              }
            </Text>
          </View>
        </View>


        {loading ? (
          <View
            style={
              styles.loadingCard
            }
          >
            <ActivityIndicator
              color={
                COLORS.purple
              }
            />

            <Text
              style={
                styles.loadingText
              }
            >
              Loading invitations...
            </Text>
          </View>
        ) : pendingInvitations.length ===
          0 ? (
          <View
            style={
              styles.emptyCard
            }
          >
            <Ionicons
              name="mail-open-outline"
              size={30}
              color={
                COLORS.secondary
              }
            />

            <Text
              style={
                styles.emptyTitle
              }
            >
              No pending invitations
            </Text>

            <Text
              style={
                styles.emptyText
              }
            >
              New invitations will
              appear here.
            </Text>
          </View>
        ) : (
          pendingInvitations.map(
            (item) => (
              <View
                key={item._id}
                style={
                  styles.inviteCard
                }
              >
                <View
                  style={
                    styles.avatar
                  }
                >
                  <Ionicons
                    name="mail-outline"
                    size={21}
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
                    numberOfLines={1}
                    style={
                      styles.inviteEmail
                    }
                  >
                    {item.email}
                  </Text>

                  <Text
                    style={
                      styles.inviteRole
                    }
                  >
                    {item.role ===
                    "coach"
                      ? "Coach"
                      : "Participant"}
                  </Text>

                  <Text
                    style={
                      styles.pendingText
                    }
                  >
                    Pending
                  </Text>
                </View>

                <Pressable
                  disabled={
                    cancellingId ===
                    item._id
                  }
                  onPress={() =>
                    handleCancel(
                      item._id
                    )
                  }
                  style={
                    styles.cancelButton
                  }
                >
                  {cancellingId ===
                  item._id ? (
                    <ActivityIndicator
                      size="small"
                      color="#FF6B81"
                    />
                  ) : (
                    <Text
                      style={
                        styles.cancelText
                      }
                    >
                      Cancel
                    </Text>
                  )}
                </Pressable>
              </View>
            )
          )
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
      maxWidth: 480,
      alignSelf: "center",
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 40,
    },

    topBar: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems: "center",
      marginBottom: 24,
    },

    iconButton: {
      width: 42,
      height: 42,
      alignItems: "center",
      justifyContent:
        "center",
    },

    title: {
      color: COLORS.white,
      fontSize: 28,
      fontWeight: "900",
    },

    subtitle: {
      color:
        COLORS.secondary,
      fontSize: 14,
      marginTop: 4,
      marginBottom: 20,
    },

    card: {
      borderRadius: 16,
      borderWidth: 1,
      borderColor:
        COLORS.border,
      backgroundColor:
        COLORS.surface,
      padding: 16,
      marginBottom: 28,
    },

    label: {
      color: COLORS.white,
      fontSize: 13,
      fontWeight: "800",
      marginBottom: 8,
    },

    inputWrap: {
      height: 54,
      borderRadius: 12,
      borderWidth: 1,
      borderColor:
        COLORS.border,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 14,
      gap: 10,
      backgroundColor:
        "rgba(255,255,255,0.02)",
    },

    input: {
      flex: 1,
      color: COLORS.white,
      fontSize: 14,
      outlineStyle: "none",
    },

    roleRow: {
      flexDirection: "row",
      gap: 10,
    },

    roleButton: {
      flex: 1,
      height: 52,
      borderRadius: 12,
      borderWidth: 1,
      borderColor:
        COLORS.border,
      alignItems: "center",
      justifyContent:
        "center",
      flexDirection: "row",
      gap: 7,
    },

    roleActive: {
      backgroundColor:
        COLORS.purple,
      borderColor:
        COLORS.purple,
    },

    roleText: {
      color: COLORS.white,
      fontWeight: "800",
      fontSize: 12,
    },

    sendWrap: {
      marginTop: 20,
    },

    sendButton: {
      height: 54,
      borderRadius: 12,
      alignItems: "center",
      justifyContent:
        "center",
      flexDirection: "row",
      gap: 8,
    },

    sendText: {
      color: COLORS.white,
      fontSize: 13,
      fontWeight: "900",
    },

    errorBox: {
      padding: 12,
      borderRadius: 10,
      backgroundColor:
        "rgba(255,70,95,0.12)",
      marginTop: 16,
    },

    errorText: {
      color: "#FF6B81",
      fontSize: 12,
      fontWeight: "700",
    },

    successBox: {
      padding: 12,
      borderRadius: 10,
      backgroundColor:
        "rgba(67,245,142,0.10)",
      marginTop: 16,
    },

    successText: {
      color: "#43F58E",
      fontSize: 12,
      fontWeight: "700",
    },

    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent:
        "space-between",
      marginBottom: 14,
    },

    sectionTitle: {
      color: COLORS.white,
      fontSize: 18,
      fontWeight: "900",
    },

    sectionSubtitle: {
      color:
        COLORS.secondary,
      fontSize: 12,
      marginTop: 3,
    },

    countPill: {
      minWidth: 34,
      height: 28,
      borderRadius: 14,
      backgroundColor:
        COLORS.purple,
      alignItems: "center",
      justifyContent:
        "center",
      paddingHorizontal: 10,
    },

    countText: {
      color: COLORS.white,
      fontSize: 12,
      fontWeight: "900",
    },

    loadingCard: {
      minHeight: 120,
      borderRadius: 14,
      borderWidth: 1,
      borderColor:
        COLORS.border,
      backgroundColor:
        COLORS.surface,
      alignItems: "center",
      justifyContent:
        "center",
      gap: 10,
    },

    loadingText: {
      color:
        COLORS.secondary,
      fontSize: 12,
    },

    emptyCard: {
      minHeight: 140,
      borderRadius: 14,
      borderWidth: 1,
      borderColor:
        COLORS.border,
      backgroundColor:
        COLORS.surface,
      alignItems: "center",
      justifyContent:
        "center",
      gap: 8,
    },

    emptyTitle: {
      color: COLORS.white,
      fontSize: 14,
      fontWeight: "800",
    },

    emptyText: {
      color:
        COLORS.secondary,
      fontSize: 12,
    },

    inviteCard: {
      minHeight: 84,
      borderRadius: 14,
      borderWidth: 1,
      borderColor:
        COLORS.border,
      backgroundColor:
        COLORS.surface,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 14,
      paddingVertical: 12,
      marginBottom: 10,
    },

    avatar: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor:
        COLORS.purple,
      alignItems: "center",
      justifyContent:
        "center",
      marginRight: 12,
    },

    inviteInfo: {
      flex: 1,
    },

    inviteEmail: {
      color: COLORS.white,
      fontSize: 13,
      fontWeight: "800",
    },

    inviteRole: {
      color:
        COLORS.secondary,
      fontSize: 11,
      marginTop: 3,
    },

    pendingText: {
      color: "#F5B942",
      fontSize: 10,
      fontWeight: "800",
      marginTop: 3,
    },

    cancelButton: {
      minWidth: 68,
      height: 38,
      borderRadius: 10,
      borderWidth: 1,
      borderColor:
        "#7A3342",
      alignItems: "center",
      justifyContent:
        "center",
      paddingHorizontal: 10,
    },

    cancelText: {
      color: "#FF6B81",
      fontSize: 11,
      fontWeight: "800",
    },
  });
