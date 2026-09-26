export const ORGANISATION_SEED = [
  {
    id: "org_1",

    email: "info@1wayfitmma.co.uk",
    password: "test123",

    name: "1WAYFIT MMA",
    organisationType: "Martial Arts Club",

    verified: true,

    description:
      "MMA and self-defence classes for all ages and abilities. Build confidence, get fit and learn real skills in a supportive community.",

    phone: "+44 20 7946 0123",
    website: "www.1wayfitmma.co.uk",

    location: {
      name: "White City, London",
      postcode: "W12 7RH",
    },

    categories: [
      "MMA",
      "BJJ",
      "Self-Defence",
      "Fitness",
    ],

    stats: {
      totalMembers: 124,
      upcomingSessions: 18,
      attendanceRate: 87,
      averageRating: 4.8,
    },

    verification: {
      status: "verified",
      dbs: true,
      insurance: true,
      safeguarding: true,
      firstAid: true,
    },

    staff: [
      {
        id: "staff_1",
        name: "Coach Alex",
        email: "alex@1wayfitmma.co.uk",
        role: "Head Coach",
        status: "active",
      },

      {
        id: "staff_2",
        name: "Chris Roberts",
        email: "chris@1wayfitmma.co.uk",
        role: "Coach",
        status: "active",
      },
    ],

    events: [
      {
        id: "session_1",
        title: "No-Gi Fundamentals",
        category: "BJJ",
        date: "2026-09-19",
        time: "18:00",
        displayDate: "Today, 6:00 PM",
        location: "White City, London",

        capacity: 20,
        booked: 12,

        price: 0,
        status: "upcoming",

        description:
          "Fundamental no-gi Brazilian Jiu-Jitsu training suitable for multiple experience levels.",

        attendees: [
          {
            clientId: "client_1",
            status: "confirmed",
            attendance: null,
          },

          {
            clientId: "client_2",
            status: "confirmed",
            attendance: null,
          },

          {
            clientId: "client_3",
            status: "pending",
            attendance: null,
          },
        ],
      },

      {
        id: "session_2",
        title: "Striking for MMA",
        category: "Boxing",
        date: "2026-09-24",
        time: "19:00",
        displayDate: "Thu, 7:00 PM",
        location: "White City, London",

        capacity: 16,
        booked: 8,

        price: 0,
        status: "upcoming",

        description:
          "MMA striking session covering boxing, kickboxing and cage striking.",
      },

      {
        id: "session_3",
        title: "Strength & Conditioning",
        category: "S&C",
        date: "2026-09-26",
        time: "10:00",
        displayDate: "Sat, 10:00 AM",
        location: "White City, London",

        capacity: 20,
        booked: 15,

        price: 0,
        status: "upcoming",
      },

      {
        id: "session_4",
        title: "Kids BJJ (Ages 8–12)",
        category: "Kids",
        date: "2026-09-27",
        time: "11:00",
        displayDate: "Sun, 11:00 AM",
        location: "White City, London",

        capacity: 16,
        booked: 10,

        price: 0,
        status: "upcoming",
      },

      {
        id: "session_5",
        title: "Open Mat",
        category: "Open",
        date: "2026-09-27",
        time: "16:00",
        displayDate: "Sun, 4:00 PM",
        location: "White City, London",

        capacity: 30,
        booked: 20,

        price: 0,
        status: "upcoming",
      },

      {
        id: "session_6",
        title: "MMA Fundamentals",
        category: "MMA",
        date: "2026-09-10",
        time: "18:00",
        displayDate: "10 Sep, 6:00 PM",
        location: "White City, London",

        capacity: 20,
        booked: 18,

        attendance: 17,

        status: "past",
      },

      {
        id: "session_9",
        title: "Advanced MMA Drills",
        category: "MMA",

        date: "",
        time: "",

        displayDate: "Not scheduled",

        location: "White City, London",

        capacity: 16,
        booked: 0,

        price: null,

        description: "",

        status: "draft",
      },

      {
        id: "session_10",
        title: "Beginner Self-Defence",
        category: "Self-Defence",

        date: "",
        time: "",

        displayDate: "Not scheduled",

        location: "TBC",

        capacity: 20,
        booked: 0,

        price: null,

        description: "",

        status: "draft",
      },
    ],
  },
];
