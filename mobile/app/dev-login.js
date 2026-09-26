import {
  Alert,
  Pressable,
  SafeAreaView,
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
  LinearGradient,
} from "expo-linear-gradient";

import {
  useAuth,
} from "../context/AuthContext";

import {
  COLORS,
  GRADIENT,
} from "../constants/theme";


export default function DevLoginScreen() {
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
      "organisation"
    );


  const [
    email,
    setEmail,
  ] =
    useState(
      "info@1wayfitmma.co.uk"
    );


  const [
    password,
    setPassword,
  ] =
    useState(
      "test123"
    );


  const changeType =
    (type) => {
      setAccountType(type);

      if (
        type ===
        "organisation"
      ) {
        setEmail(
          "info@1wayfitmma.co.uk"
        );
      } else if (
        type ===
        "parent"
      ) {
        setEmail(
          "sarah@test.com"
        );
      } else {
        setEmail(
          "jayden@test.com"
        );
      }

      setPassword(
        "test123"
      );
    };


  const login =
    async () => {
      try {
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


        router.replace(
          "/discover"
        );
      } catch (
        error
      ) {
        Alert.alert(
          "Login Failed",
          error.message
        );
      }
    };


  return (
    <SafeAreaView
      style={
        styles.safe
      }
    >
      <View
        style={
          styles.container
        }
      >
        <Text
          style={
            styles.heading
          }
        >
          Joinziie Test Login
        </Text>

        <Text
          style={
            styles.subtitle
          }
        >
          Temporary local database login
        </Text>


        <View
          style={
            styles.types
          }
        >
          <TypeButton
            title="Organisation"
            active={
              accountType ===
              "organisation"
            }
            onPress={() =>
              changeType(
                "organisation"
              )
            }
          />

          <TypeButton
            title="Young Person"
            active={
              accountType ===
              "young-person"
            }
            onPress={() =>
              changeType(
                "young-person"
              )
            }
          />

          <TypeButton
            title="Parent"
            active={
              accountType ===
              "parent"
            }
            onPress={() =>
              changeType(
                "parent"
              )
            }
          />
        </View>


        <Text
          style={
            styles.label
          }
        >
          Email
        </Text>

        <TextInput
          value={email}
          onChangeText={
            setEmail
          }
          autoCapitalize="none"
          style={
            styles.input
          }
        />


        <Text
          style={
            styles.label
          }
        >
          Password
        </Text>

        <TextInput
          value={
            password
          }
          onChangeText={
            setPassword
          }
          secureTextEntry
          style={
            styles.input
          }
        />


        <Pressable
          onPress={
            login
          }
        >
          <LinearGradient
            colors={
              GRADIENT
            }
            style={
              styles.login
            }
          >
            <Text
              style={
                styles.loginText
              }
            >
              Sign In
            </Text>
          </LinearGradient>
        </Pressable>


        <View
          style={
            styles.credentials
          }
        >
          <Text
            style={
              styles.credentialsTitle
            }
          >
            Test Accounts
          </Text>

          <Text
            style={
              styles.credentialsText
            }
          >
            Organisation:
            info@1wayfitmma.co.uk
          </Text>

          <Text
            style={
              styles.credentialsText
            }
          >
            Young person:
            jayden@test.com
          </Text>

          <Text
            style={
              styles.credentialsText
            }
          >
            Parent:
            sarah@test.com
          </Text>

          <Text
            style={
              styles.credentialsText
            }
          >
            Password:
            test123
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}


function TypeButton({
  title,
  active,
  onPress,
}) {
  return (
    <Pressable
      onPress={
        onPress
      }
      style={[
        styles.typeButton,

        active &&
          styles.typeButtonActive,
      ]}
    >
      <Text
        style={[
          styles.typeText,

          active &&
            styles.typeTextActive,
        ]}
      >
        {title}
      </Text>
    </Pressable>
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
      width:
        "100%",

      maxWidth:
        480,

      alignSelf:
        "center",

      padding:
        22,

      paddingTop:
        70,
    },


    heading: {
      color:
        COLORS.white,

      fontSize:
        30,

      fontWeight:
        "900",
    },


    subtitle: {
      color:
        COLORS.secondary,

      fontSize:
        12,

      marginTop:
        5,

      marginBottom:
        26,
    },


    types: {
      flexDirection:
        "row",

      gap:
        7,

      marginBottom:
        24,
    },


    typeButton: {
      flex:
        1,

      minHeight:
        48,

      borderRadius:
        12,

      borderWidth:
        1,

      borderColor:
        COLORS.border,

      alignItems:
        "center",

      justifyContent:
        "center",
    },


    typeButtonActive: {
      backgroundColor:
        COLORS.purple,
    },


    typeText: {
      color:
        COLORS.secondary,

      fontSize:
        9,

      fontWeight:
        "700",
    },


    typeTextActive: {
      color:
        COLORS.white,
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


    input: {
      height:
        54,

      borderRadius:
        12,

      borderWidth:
        1,

      borderColor:
        COLORS.border,

      backgroundColor:
        COLORS.surface,

      color:
        COLORS.white,

      paddingHorizontal:
        14,

      marginBottom:
        16,
    },


    login: {
      minHeight:
        55,

      borderRadius:
        14,

      alignItems:
        "center",

      justifyContent:
        "center",

      marginTop:
        5,
    },


    loginText: {
      color:
        COLORS.white,

      fontSize:
        13,

      fontWeight:
        "900",
    },


    credentials: {
      marginTop:
        25,

      padding:
        15,

      borderRadius:
        14,

      borderWidth:
        1,

      borderColor:
        COLORS.border,

      backgroundColor:
        COLORS.surface,
    },


    credentialsTitle: {
      color:
        COLORS.white,

      fontSize:
        13,

      fontWeight:
        "900",

      marginBottom:
        9,
    },


    credentialsText: {
      color:
        COLORS.secondary,

      fontSize:
        10,

      marginTop:
        4,
    },

  });
