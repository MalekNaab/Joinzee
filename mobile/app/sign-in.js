import {
  Alert,
  KeyboardAvoidingView,
  Platform,
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
  useRouter,
} from "expo-router";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  LinearGradient,
} from "expo-linear-gradient";

import JoinziieLogo from "../components/JoinziieLogo";

import {
  useAuth,
} from "../context/AuthContext";

import {
  COLORS,
  GRADIENT,
} from "../constants/theme";


export default function SignInScreen() {
  const router =
    useRouter();

  const {
    organisationLogin,
    clientLogin,
  } =
    useAuth();


  const [
    accountType,
    setAccountType,
  ] =
    useState(
      "client"
    );


  const [
    email,
    setEmail,
  ] =
    useState("");


  const [
    password,
    setPassword,
  ] =
    useState("");


  const [
    showPassword,
    setShowPassword,
  ] =
    useState(false);


  const [
    loading,
    setLoading,
  ] =
    useState(false);


  const signIn =
    async () => {

      if (
        !email.trim() ||
        !password.trim()
      ) {
        Alert.alert(
          "Missing Details",
          "Please enter your email address and password."
        );

        return;
      }


      try {
        setLoading(true);


        if (
          accountType ===
          "organisation"
        ) {
          await organisationLogin(
            email,
            password
          );

          router.replace(
            "/organisation-dashboard"
          );

          return;
        }


        const user =
          await clientLogin(
            email,
            password
          );


        if (
          user.accountType ===
          "parent"
        ) {
          router.replace(
            "/discover"
          );

          return;
        }


        router.replace(
          "/discover"
        );

      } catch (
        error
      ) {

        Alert.alert(
          "Sign In Failed",
          error?.message ||
            "We could not sign you in."
        );

      } finally {

        setLoading(false);

      }
    };


  const fillTestAccount =
    (type) => {

      if (
        type ===
        "organisation"
      ) {
        setAccountType(
          "organisation"
        );

        setEmail(
          "info@1wayfitmma.co.uk"
        );

        setPassword(
          "test123"
        );

        return;
      }


      if (
        type ===
        "parent"
      ) {
        setAccountType(
          "client"
        );

        setEmail(
          "parent@test.com"
        );

        setPassword(
          "test123"
        );

        return;
      }


      setAccountType(
        "client"
      );

      setEmail(
        "young@test.com"
      );

      setPassword(
        "test123"
      );
    };


  return (
    <SafeAreaView
      style={
        styles.safe
      }
    >
      <KeyboardAvoidingView
        style={
          styles.flex
        }
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
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
              onPress={() =>
                router.replace("/")
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
                styles.headerSpacer
              }
            />
          </View>


          {/* HERO */}

          <View
            style={
              styles.hero
            }
          >
            <Text
              style={
                styles.heading
              }
            >
              Welcome back
            </Text>

            <Text
              style={
                styles.subtitle
              }
            >
              Sign in to continue discovering, booking and managing activities.
            </Text>
          </View>


          {/* ACCOUNT TYPE */}

          <Text
            style={
              styles.sectionLabel
            }
          >
            I am signing in as
          </Text>


          <View
            style={
              styles.accountTypes
            }
          >

            <Pressable
              onPress={() =>
                setAccountType(
                  "client"
                )
              }
              style={[
                styles.accountCard,

                accountType ===
                  "client" &&
                  styles.accountCardSelected,
              ]}
            >

              <View
                style={
                  styles.accountIcon
                }
              >
                <Ionicons
                  name="person-outline"
                  size={25}
                  color={
                    accountType ===
                    "client"
                      ? COLORS.pink
                      : COLORS.secondary
                  }
                />
              </View>

              <View
                style={
                  styles.accountContent
                }
              >
                <Text
                  style={
                    styles.accountTitle
                  }
                >
                  Parent / Young Person
                </Text>

                <Text
                  style={
                    styles.accountText
                  }
                >
                  Find and manage activities
                </Text>
              </View>

              <Ionicons
                name={
                  accountType ===
                  "client"
                    ? "checkmark-circle"
                    : "ellipse-outline"
                }
                size={25}
                color={
                  accountType ===
                  "client"
                    ? COLORS.pink
                    : COLORS.secondary
                }
              />

            </Pressable>


            <Pressable
              onPress={() =>
                setAccountType(
                  "organisation"
                )
              }
              style={[
                styles.accountCard,

                accountType ===
                  "organisation" &&
                  styles.accountCardSelected,
              ]}
            >

              <View
                style={
                  styles.accountIcon
                }
              >
                <Ionicons
                  name="business-outline"
                  size={25}
                  color={
                    accountType ===
                    "organisation"
                      ? COLORS.pink
                      : COLORS.secondary
                  }
                />
              </View>

              <View
                style={
                  styles.accountContent
                }
              >
                <Text
                  style={
                    styles.accountTitle
                  }
                >
                  Organisation
                </Text>

                <Text
                  style={
                    styles.accountText
                  }
                >
                  Manage sessions and members
                </Text>
              </View>

              <Ionicons
                name={
                  accountType ===
                  "organisation"
                    ? "checkmark-circle"
                    : "ellipse-outline"
                }
                size={25}
                color={
                  accountType ===
                  "organisation"
                    ? COLORS.pink
                    : COLORS.secondary
                }
              />

            </Pressable>

          </View>


          {/* EMAIL */}

          <Text
            style={
              styles.label
            }
          >
            Email Address
          </Text>

          <View
            style={
              styles.inputWrap
            }
          >
            <Ionicons
              name="mail-outline"
              size={19}
              color={
                COLORS.secondary
              }
            />

            <TextInput
              value={
                email
              }
              onChangeText={
                setEmail
              }
              placeholder="you@example.com"
              placeholderTextColor={
                COLORS.muted
              }
              autoCapitalize="none"
              autoCorrect={
                false
              }
              keyboardType="email-address"
              style={
                styles.input
              }
            />
          </View>


          {/* PASSWORD */}

          <View
            style={
              styles.passwordHeader
            }
          >
            <Text
              style={
                styles.label
              }
            >
              Password
            </Text>

            <Pressable>
              <Text
                style={
                  styles.forgot
                }
              >
                Forgot password?
              </Text>
            </Pressable>
          </View>


          <View
            style={
              styles.inputWrap
            }
          >
            <Ionicons
              name="lock-closed-outline"
              size={19}
              color={
                COLORS.secondary
              }
            />

            <TextInput
              value={
                password
              }
              onChangeText={
                setPassword
              }
              placeholder="Enter your password"
              placeholderTextColor={
                COLORS.muted
              }
              secureTextEntry={
                !showPassword
              }
              style={
                styles.input
              }
            />

            <Pressable
              onPress={() =>
                setShowPassword(
                  (current) =>
                    !current
                )
              }
            >
              <Ionicons
                name={
                  showPassword
                    ? "eye-off-outline"
                    : "eye-outline"
                }
                size={21}
                color={
                  COLORS.secondary
                }
              />
            </Pressable>

          </View>


          {/* LOGIN BUTTON */}

          <Pressable
            onPress={
              signIn
            }
            disabled={
              loading
            }
            style={
              styles.loginWrap
            }
          >
            <LinearGradient
              colors={
                GRADIENT
              }
              style={
                styles.loginButton
              }
            >
              <Text
                style={
                  styles.loginText
                }
              >
                {loading
                  ? "Signing In..."
                  : "Sign In"}
              </Text>

              {!loading && (
                <Ionicons
                  name="arrow-forward"
                  size={21}
                  color={
                    COLORS.white
                  }
                />
              )}
            </LinearGradient>
          </Pressable>


          {/* SIGNUP */}

          <View
            style={
              styles.signupRow
            }
          >
            <Text
              style={
                styles.signupText
              }
            >
              Don't have an account?
            </Text>

            <Pressable
              onPress={() =>
                router.replace("/")
              }
            >
              <Text
                style={
                  styles.signupLink
                }
              >
                Sign Up
              </Text>
            </Pressable>
          </View>


          {/* TEST ACCOUNTS */}

          <View
            style={
              styles.testBox
            }
          >
            <Text
              style={
                styles.testTitle
              }
            >
              Development Test Accounts
            </Text>

            <Text
              style={
                styles.testDescription
              }
            >
              Tap an account to fill the login details automatically.
            </Text>


            <View
              style={
                styles.testButtons
              }
            >

              <Pressable
                onPress={() =>
                  fillTestAccount(
                    "young"
                  )
                }
                style={
                  styles.testButton
                }
              >
                <Text
                  style={
                    styles.testButtonText
                  }
                >
                  Young Person
                </Text>
              </Pressable>


              <Pressable
                onPress={() =>
                  fillTestAccount(
                    "parent"
                  )
                }
                style={
                  styles.testButton
                }
              >
                <Text
                  style={
                    styles.testButtonText
                  }
                >
                  Parent
                </Text>
              </Pressable>


              <Pressable
                onPress={() =>
                  fillTestAccount(
                    "organisation"
                  )
                }
                style={
                  styles.testButton
                }
              >
                <Text
                  style={
                    styles.testButtonText
                  }
                >
                  Organisation
                </Text>
              </Pressable>

            </View>

            <Text
              style={
                styles.testPassword
              }
            >
              Test password: test123
            </Text>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


const styles =
  StyleSheet.create({

    flex: {
      flex: 1,
    },


    safe: {
      flex: 1,

      backgroundColor:
        COLORS.background,
    },


    container: {
      width:
        "100%",

      maxWidth:
        500,

      alignSelf:
        "center",

      paddingHorizontal:
        20,

      paddingTop:
        18,

      paddingBottom:
        45,
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
      width:
        44,

      height:
        44,

      alignItems:
        "flex-start",

      justifyContent:
        "center",
    },


    headerSpacer: {
      width:
        44,
    },


    hero: {
      marginTop:
        45,

      marginBottom:
        27,
    },


    heading: {
      color:
        COLORS.white,

      fontSize:
        32,

      fontWeight:
        "900",
    },


    subtitle: {
      color:
        COLORS.secondary,

      fontSize:
        13,

      lineHeight:
        20,

      marginTop:
        8,

      maxWidth:
        390,
    },


    sectionLabel: {
      color:
        COLORS.white,

      fontSize:
        12,

      fontWeight:
        "800",

      marginBottom:
        10,
    },


    accountTypes: {
      gap:
        10,

      marginBottom:
        25,
    },


    accountCard: {
      minHeight:
        78,

      borderRadius:
        15,

      borderWidth:
        1,

      borderColor:
        COLORS.border,

      backgroundColor:
        COLORS.surface,

      flexDirection:
        "row",

      alignItems:
        "center",

      paddingHorizontal:
        14,
    },


    accountCardSelected: {
      borderColor:
        COLORS.purple,

      backgroundColor:
        "#15112B",
    },


    accountIcon: {
      width:
        48,

      height:
        48,

      borderRadius:
        13,

      backgroundColor:
        "#151A2D",

      alignItems:
        "center",

      justifyContent:
        "center",

      marginRight:
        12,
    },


    accountContent: {
      flex:
        1,
    },


    accountTitle: {
      color:
        COLORS.white,

      fontSize:
        13,

      fontWeight:
        "900",
    },


    accountText: {
      color:
        COLORS.secondary,

      fontSize:
        9,

      marginTop:
        4,
    },


    label: {
      color:
        COLORS.white,

      fontSize:
        11,

      fontWeight:
        "700",

      marginBottom:
        7,
    },


    passwordHeader: {
      flexDirection:
        "row",

      alignItems:
        "center",

      justifyContent:
        "space-between",

      marginTop:
        17,
    },


    forgot: {
      color:
        COLORS.pink,

      fontSize:
        9,

      fontWeight:
        "700",

      marginBottom:
        7,
    },


    inputWrap: {
      height:
        55,

      borderRadius:
        13,

      borderWidth:
        1,

      borderColor:
        COLORS.border,

      backgroundColor:
        COLORS.surface,

      flexDirection:
        "row",

      alignItems:
        "center",

      paddingHorizontal:
        14,

      gap:
        9,
    },


    input: {
      flex:
        1,

      height:
        "100%",

      color:
        COLORS.white,

      fontSize:
        12,

      outlineStyle:
        "none",
    },


    loginWrap: {
      marginTop:
        24,
    },


    loginButton: {
      height:
        57,

      borderRadius:
        14,

      flexDirection:
        "row",

      alignItems:
        "center",

      justifyContent:
        "center",

      gap:
        9,
    },


    loginText: {
      color:
        COLORS.white,

      fontSize:
        14,

      fontWeight:
        "900",
    },


    signupRow: {
      flexDirection:
        "row",

      justifyContent:
        "center",

      marginTop:
        18,

      gap:
        5,
    },


    signupText: {
      color:
        COLORS.secondary,

      fontSize:
        10,
    },


    signupLink: {
      color:
        COLORS.pink,

      fontSize:
        10,

      fontWeight:
        "900",
    },


    testBox: {
      marginTop:
        35,

      borderRadius:
        15,

      borderWidth:
        1,

      borderColor:
        COLORS.border,

      backgroundColor:
        COLORS.surface,

      padding:
        15,
    },


    testTitle: {
      color:
        COLORS.white,

      fontSize:
        12,

      fontWeight:
        "900",
    },


    testDescription: {
      color:
        COLORS.secondary,

      fontSize:
        9,

      lineHeight:
        14,

      marginTop:
        5,
    },


    testButtons: {
      flexDirection:
        "row",

      gap:
        7,

      marginTop:
        13,
    },


    testButton: {
      flex:
        1,

      minHeight:
        40,

      borderRadius:
        10,

      borderWidth:
        1,

      borderColor:
        COLORS.purple,

      alignItems:
        "center",

      justifyContent:
        "center",
    },


    testButtonText: {
      color:
        COLORS.white,

      fontSize:
        8,

      fontWeight:
        "800",

      textAlign:
        "center",
    },


    testPassword: {
      color:
        COLORS.pink,

      fontSize:
        8,

      textAlign:
        "center",

      marginTop:
        12,
    },

  });

