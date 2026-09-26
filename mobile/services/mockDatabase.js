import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  ORGANISATION_SEED,
} from "../database/organisations";

import {
  CLIENT_SEED,
} from "../database/clients";


const KEYS = {
  organisations:
    "@joinziie_mock_organisations",

  clients:
    "@joinziie_mock_clients",

  session:
    "@joinziie_mock_session",
};


/* ============================================================
   INITIALISE
   ============================================================ */

export async function initialiseMockDatabase() {
  const organisations =
    await AsyncStorage.getItem(
      KEYS.organisations
    );

  const clients =
    await AsyncStorage.getItem(
      KEYS.clients
    );


  if (!organisations) {
    await AsyncStorage.setItem(
      KEYS.organisations,
      JSON.stringify(
        ORGANISATION_SEED
      )
    );
  }


  if (!clients) {
    await AsyncStorage.setItem(
      KEYS.clients,
      JSON.stringify(
        CLIENT_SEED
      )
    );
  }
}


/* ============================================================
   ORGANISATIONS
   ============================================================ */

export async function getOrganisations() {
  await initialiseMockDatabase();

  const value =
    await AsyncStorage.getItem(
      KEYS.organisations
    );

  return value
    ? JSON.parse(value)
    : [];
}


export async function saveOrganisations(
  organisations
) {
  await AsyncStorage.setItem(
    KEYS.organisations,
    JSON.stringify(
      organisations
    )
  );
}


export async function getOrganisationById(
  id
) {
  const organisations =
    await getOrganisations();

  return (
    organisations.find(
      (organisation) =>
        organisation.id === id
    ) || null
  );
}


export async function updateOrganisation(
  organisationId,
  updates
) {
  const organisations =
    await getOrganisations();

  const updated =
    organisations.map(
      (organisation) =>
        organisation.id ===
        organisationId
          ? {
              ...organisation,
              ...updates,
            }
          : organisation
    );

  await saveOrganisations(
    updated
  );

  return getOrganisationById(
    organisationId
  );
}


/* ============================================================
   EVENTS / SESSIONS
   ============================================================ */

export async function getOrganisationEvents(
  organisationId
) {
  const organisation =
    await getOrganisationById(
      organisationId
    );

  return (
    organisation?.events || []
  );
}


export async function addOrganisationEvent(
  organisationId,
  event
) {
  const organisations =
    await getOrganisations();

  const newEvent = {
    ...event,

    id:
      event.id ||
      `session_${Date.now()}`,
  };


  const updated =
    organisations.map(
      (organisation) => {
        if (
          organisation.id !==
          organisationId
        ) {
          return organisation;
        }

        return {
          ...organisation,

          events: [
            ...(organisation.events ||
              []),

            newEvent,
          ],
        };
      }
    );


  await saveOrganisations(
    updated
  );

  return newEvent;
}


export async function updateOrganisationEvent(
  organisationId,
  eventId,
  updates
) {
  const organisations =
    await getOrganisations();

  const updated =
    organisations.map(
      (organisation) => {
        if (
          organisation.id !==
          organisationId
        ) {
          return organisation;
        }

        return {
          ...organisation,

          events:
            organisation.events.map(
              (event) =>
                event.id ===
                eventId
                  ? {
                      ...event,
                      ...updates,
                    }
                  : event
            ),
        };
      }
    );


  await saveOrganisations(
    updated
  );


  const events =
    await getOrganisationEvents(
      organisationId
    );

  return events.find(
    (event) =>
      event.id === eventId
  );
}


export async function deleteOrganisationEvent(
  organisationId,
  eventId
) {
  const organisations =
    await getOrganisations();

  const updated =
    organisations.map(
      (organisation) => {
        if (
          organisation.id !==
          organisationId
        ) {
          return organisation;
        }

        return {
          ...organisation,

          events:
            organisation.events.filter(
              (event) =>
                event.id !==
                eventId
            ),
        };
      }
    );


  await saveOrganisations(
    updated
  );

  return true;
}


/* ============================================================
   CLIENTS
   ============================================================ */

export async function getClients() {
  await initialiseMockDatabase();

  const value =
    await AsyncStorage.getItem(
      KEYS.clients
    );

  return value
    ? JSON.parse(value)
    : [];
}


export async function saveClients(
  clients
) {
  await AsyncStorage.setItem(
    KEYS.clients,
    JSON.stringify(clients)
  );
}


export async function getClientById(
  id
) {
  const clients =
    await getClients();

  return (
    clients.find(
      (client) =>
        client.id === id
    ) || null
  );
}


export async function updateClient(
  clientId,
  updates
) {
  const clients =
    await getClients();

  const updated =
    clients.map(
      (client) =>
        client.id ===
        clientId
          ? {
              ...client,
              ...updates,
            }
          : client
    );

  await saveClients(
    updated
  );

  return getClientById(
    clientId
  );
}


/* ============================================================
   CLIENT BOOKINGS
   ============================================================ */

export async function addClientBooking(
  clientId,
  booking
) {
  const clients =
    await getClients();

  const newBooking = {
    ...booking,

    id:
      booking.id ||
      `booking_${Date.now()}`,
  };


  const updated =
    clients.map(
      (client) => {
        if (
          client.id !==
          clientId
        ) {
          return client;
        }

        return {
          ...client,

          bookings: [
            ...(client.bookings ||
              []),

            newBooking,
          ],
        };
      }
    );


  await saveClients(
    updated
  );

  return newBooking;
}


/* ============================================================
   LOGIN
   ============================================================ */

export async function loginOrganisation(
  email,
  password
) {
  const organisations =
    await getOrganisations();

  const organisation =
    organisations.find(
      (item) =>
        item.email
          .toLowerCase() ===
          email
            .trim()
            .toLowerCase() &&
        item.password === password
    );


  if (!organisation) {
    throw new Error(
      "Invalid organisation email or password."
    );
  }


  const session = {
    userType:
      "organisation",

    userId:
      organisation.id,
  };


  await AsyncStorage.setItem(
    KEYS.session,
    JSON.stringify(session)
  );


  return organisation;
}


export async function loginClient(
  email,
  password
) {
  const clients =
    await getClients();

  const client =
    clients.find(
      (item) =>
        item.email
          .toLowerCase() ===
          email
            .trim()
            .toLowerCase() &&
        item.password === password
    );


  if (!client) {
    throw new Error(
      "Invalid email or password."
    );
  }


  const session = {
    userType:
      client.accountType,

    userId:
      client.id,
  };


  await AsyncStorage.setItem(
    KEYS.session,
    JSON.stringify(session)
  );


  return client;
}


/* ============================================================
   CURRENT SESSION
   ============================================================ */

export async function getCurrentSession() {
  const value =
    await AsyncStorage.getItem(
      KEYS.session
    );

  return value
    ? JSON.parse(value)
    : null;
}


export async function logout() {
  await AsyncStorage.removeItem(
    KEYS.session
  );
}


/* ============================================================
   RESET DEV DATABASE
   ============================================================ */

export async function resetMockDatabase() {
  await AsyncStorage.removeItem(
    KEYS.organisations
  );

  await AsyncStorage.removeItem(
    KEYS.clients
  );

  await AsyncStorage.removeItem(
    KEYS.session
  );

  await initialiseMockDatabase();

  return true;
}
