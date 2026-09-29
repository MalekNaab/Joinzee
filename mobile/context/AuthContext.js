import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  loginClient as apiLoginClient,
  loginOrganisation as apiLoginOrganisation,
} from "../services/api";

const AuthContext = createContext(null);

const SESSION_KEY = "@joinziie_live_session";

export function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(null);

  const [userType, setUserType] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    restoreSession();
  }, []);

  const saveSession =
    async (
      account,
      type
    ) => {
      await AsyncStorage.setItem(
        SESSION_KEY,
        JSON.stringify({
          user: account,
          userType: type,
        })
      );
    };

  const restoreSession =
    async () => {
      try {
        const stored =
          await AsyncStorage.getItem(
            SESSION_KEY
          );

        if (!stored) {
          return;
        }

        const session =
          JSON.parse(stored);

        if (
          !session?.user ||
          !session?.userType
        ) {
          await AsyncStorage.removeItem(
            SESSION_KEY
          );

          return;
        }

        setUser(
          session.user
        );

        setUserType(
          session.userType
        );

      } catch (error) {
        console.error(
          "Could not restore Joinziie session:",
          error
        );

        await AsyncStorage.removeItem(
          SESSION_KEY
        );

      } finally {
        setLoading(false);
      }
    };

  const organisationLogin =
    async (
      email,
      password
    ) => {
      const organisation =
        await apiLoginOrganisation(
          email,
          password
        );

      setUser(
        organisation
      );

      setUserType(
        "organisation"
      );

      await saveSession(
        organisation,
        "organisation"
      );

      return organisation;
    };

  const clientLogin =
    async (
      email,
      password
    ) => {
      const client =
        await apiLoginClient(
          email,
          password
        );

      const type =
        client.accountType ||
        "parent";

      setUser(
        client
      );

      setUserType(
        type
      );

      await saveSession(
        client,
        type
      );

      return client;
    };

  const signOut =
    async () => {
      await AsyncStorage.removeItem(
        SESSION_KEY
      );

      setUser(null);
      setUserType(null);
    };

  return (
    <AuthContext.Provider
      value={{
        user,
        userType,
        loading,
        organisationLogin,
        clientLogin,
        signOut,
        restoreSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}
