import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  addOrganisationEvent,
  deleteOrganisationEvent,
  getOrganisationEvents,
  updateOrganisationEvent,
} from "../services/mockDatabase";


const OrganisationSessionContext =
  createContext(null);


const TEST_ORGANISATION_ID =
  "org_1";


export function OrganisationSessionProvider({
  children,
}) {
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


  useEffect(() => {
    loadSessions();
  }, []);


  const loadSessions =
    async () => {
      try {
        const events =
          await getOrganisationEvents(
            TEST_ORGANISATION_ID
          );

        setSessions(events);
      } finally {
        setLoading(false);
      }
    };


  const getSessionById =
    (id) => {
      return sessions.find(
        (session) =>
          session.id ===
          String(id)
      );
    };


  const addSession =
    async (
      session
    ) => {
      const newEvent =
        await addOrganisationEvent(
          TEST_ORGANISATION_ID,
          session
        );

      setSessions(
        (current) => [
          ...current,
          newEvent,
        ]
      );

      return newEvent;
    };


  const updateSession =
    async (
      id,
      updates
    ) => {
      const updated =
        await updateOrganisationEvent(
          TEST_ORGANISATION_ID,
          String(id),
          updates
        );

      setSessions(
        (current) =>
          current.map(
            (session) =>
              session.id ===
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


  const deleteSession =
    async (
      id
    ) => {
      await deleteOrganisationEvent(
        TEST_ORGANISATION_ID,
        String(id)
      );

      setSessions(
        (current) =>
          current.filter(
            (session) =>
              session.id !==
              String(id)
          )
      );

      return true;
    };


  return (
    <OrganisationSessionContext.Provider
      value={{
        sessions,
        loading,

        loadSessions,

        getSessionById,

        addSession,
        updateSession,
        publishSession,
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
