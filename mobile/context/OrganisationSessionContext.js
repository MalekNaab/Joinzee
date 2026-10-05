import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  createOrganisationSession,
  deleteOrganisationSession,
  getOrganisationSessions,
  updateOrganisationSession,
} from "../services/api";

import {
  useAuth,
} from "./AuthContext";

const OrganisationSessionContext =
  createContext(null);

export function OrganisationSessionProvider({
  children,
}) {
  const {
    user,
    userType,
    loading: authLoading,
  } = useAuth();

  const organisationId =
    user?._id ||
    user?.id ||
    null;

  const [
    sessions,
    setSessions,
  ] =
    useState([]);

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  const [
    error,
    setError,
  ] =
    useState(null);


  const loadSessions =
    async () => {

      if (authLoading) {
        setLoading(true);
        return;
      }

      if (
        !organisationId ||
        userType !==
          "organisation"
      ) {
        setSessions([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const liveSessions =
          await getOrganisationSessions(
            organisationId
          );

        setSessions(
          liveSessions
        );
      } catch (err) {
        console.error(
          "Could not load organisation sessions:",
          err
        );

        setError(
          err.message
        );
      } finally {
        setLoading(false);
      }
    };


  useEffect(() => {
    loadSessions();
  }, [
    authLoading,
    organisationId,
    userType,
  ]);


  const getSessionById =
    (id) => {
      return sessions.find(
        (session) =>
          String(
            session.id
          ) ===
          String(id)
      );
    };


  const addSession =
    async (
      session
    ) => {
      if (
        !organisationId
      ) {
        throw new Error(
          "Organisation is not signed in."
        );
      }

      const created =
        await createOrganisationSession(
          organisationId,
          session
        );

      setSessions(
        (current) => [
          created,
          ...current,
        ]
      );

      return created;
    };


  const updateSession =
    async (
      id,
      updates
    ) => {
      const updated =
        await updateOrganisationSession(
          id,
          updates
        );

      setSessions(
        (current) =>
          current.map(
            (session) =>
              String(
                session.id
              ) ===
              String(id)
                ? updated
                : session
          )
      );

      return updated;
    };


  const publishSession =
    async (
      id
    ) => {
      return updateSession(
        id,
        {
          status:
            "upcoming",
        }
      );
    };


  const cancelSession =
    async (
      id
    ) => {
      return updateSession(
        id,
        {
          status:
            "cancelled",
        }
      );
    };


  const deleteSession =
    async (
      id
    ) => {
      await deleteOrganisationSession(
        id
      );

      setSessions(
        (current) =>
          current.filter(
            (session) =>
              String(
                session.id
              ) !==
              String(id)
          )
      );

      return true;
    };


  return (
    <OrganisationSessionContext.Provider
      value={{
        organisationId,

        sessions,
        loading,
        error,

        loadSessions,

        getSessionById,

        addSession,
        updateSession,
        publishSession,
        cancelSession,
        deleteSession,
      }}
    >
      {children}
    </OrganisationSessionContext.Provider>
  );
}


export function useOrganisationSessions() {
  const context =
    useContext(
      OrganisationSessionContext
    );

  if (!context) {
    throw new Error(
      "useOrganisationSessions must be used inside OrganisationSessionProvider"
    );
  }

  return context;
}
