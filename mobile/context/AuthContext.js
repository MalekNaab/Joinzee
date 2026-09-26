import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getCurrentSession,
  getOrganisationById,
  getClientById,
  initialiseMockDatabase,
  loginOrganisation,
  loginClient,
  logout as databaseLogout,
} from "../services/mockDatabase";


const AuthContext =
  createContext(null);


export function AuthProvider({
  children,
}) {
  const [
    user,
    setUser,
  ] =
    useState(null);

  const [
    userType,
    setUserType,
  ] =
    useState(null);

  const [
    loading,
    setLoading,
  ] =
    useState(true);


  useEffect(() => {
    restoreSession();
  }, []);


  const restoreSession =
    async () => {
      try {
        await initialiseMockDatabase();

        const session =
          await getCurrentSession();

        if (!session) {
          setLoading(false);
          return;
        }


        if (
          session.userType ===
          "organisation"
        ) {
          const organisation =
            await getOrganisationById(
              session.userId
            );

          setUser(
            organisation
          );

          setUserType(
            "organisation"
          );
        } else {
          const client =
            await getClientById(
              session.userId
            );

          setUser(client);

          setUserType(
            session.userType
          );
        }
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
        await loginOrganisation(
          email,
          password
        );

      setUser(
        organisation
      );

      setUserType(
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
        await loginClient(
          email,
          password
        );

      setUser(client);

      setUserType(
        client.accountType
      );

      return client;
    };


  const signOut =
    async () => {
      await databaseLogout();

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
