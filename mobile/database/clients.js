export const CLIENT_SEED = [
  {
    id: "client_1",

    accountType: "young-person",

    email: "jayden@test.com",
    password: "test123",

    firstName: "Jayden",
    lastName: "Smith",

    dateOfBirth: "2009-04-14",
    age: 17,

    phone: "+44 7711 123456",

    postcode: "W12 7RH",

    interests: [
      "Football",
      "Basketball",
      "Martial Arts",
      "Gaming",
      "Music",
    ],

    savedActivities: [
      "session_2",
    ],

    bookings: [
      {
        id: "booking_1",
        organisationId: "org_1",
        sessionId: "session_1",
        status: "confirmed",
      },
    ],

    notificationPreferences: {
      push: true,
      email: true,
      sms: false,
    },
  },

  {
    id: "client_2",

    accountType: "young-person",

    email: "aaliyah@test.com",
    password: "test123",

    firstName: "Aaliyah",
    lastName: "Mohammed",

    age: 19,

    phone: "+44 7711 222333",

    postcode: "W10",

    interests: [
      "Martial Arts",
      "Fitness",
      "Art",
    ],

    savedActivities: [],

    bookings: [
      {
        id: "booking_2",
        organisationId: "org_1",
        sessionId: "session_1",
        status: "confirmed",
      },
    ],

    notificationPreferences: {
      push: true,
      email: true,
      sms: false,
    },
  },

  {
    id: "client_3",

    accountType: "young-person",

    email: "fatima@test.com",
    password: "test123",

    firstName: "Fatima",
    lastName: "Said",

    age: 18,

    phone: "+44 7711 555888",

    postcode: "NW10",

    interests: [
      "Fitness",
      "Education",
      "Martial Arts",
    ],

    savedActivities: [],

    bookings: [
      {
        id: "booking_3",
        organisationId: "org_1",
        sessionId: "session_1",
        status: "pending",
      },
    ],

    notificationPreferences: {
      push: true,
      email: false,
      sms: false,
    },
  },

  {
    id: "parent_1",

    accountType: "parent",

    email: "sarah@test.com",
    password: "test123",

    firstName: "Sarah",
    lastName: "Johnson",

    phone: "+44 7700 900123",

    postcode: "W12",

    children: [
      {
        id: "child_1",

        firstName: "Daniel",
        lastName: "Johnson",

        age: 12,

        school: "West London School",

        interests: [
          "Football",
          "Basketball",
          "Swimming",
          "Martial Arts",
        ],
      },
    ],

    savedActivities: [],

    bookings: [
      {
        id: "booking_4",
        childId: "child_1",
        organisationId: "org_1",
        sessionId: "session_4",
        status: "confirmed",
      },
    ],

    notificationPreferences: {
      push: true,
      email: true,
      sms: false,
    },
  },
];
