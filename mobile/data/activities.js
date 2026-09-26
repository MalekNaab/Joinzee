export const activities = [
  {
    id: "1",
    title: "Youth MMA Session",
    organisation: "1WAYFIT",
    category: "Martial Arts",
    ageRange: "12–16",
    location: "West London",
    distance: "1.4 miles",
    day: "Wednesday",
    time: "5:00 PM",
    price: 0,
    spaces: 8,
    verified: true,
    description:
      "A beginner-friendly youth MMA session focused on confidence, fitness, discipline and practical martial arts skills.",
  },

  {
    id: "2",
    title: "Community Football Training",
    organisation: "Westside Football Club",
    category: "Football",
    ageRange: "10–15",
    location: "Hammersmith",
    distance: "2.1 miles",
    day: "Monday",
    time: "6:00 PM",
    price: 5,
    spaces: 12,
    verified: true,
    description:
      "Weekly football coaching for young people of all abilities with drills, small-sided games and match preparation.",
  },

  {
    id: "3",
    title: "Creative Coding Club",
    organisation: "Future Makers",
    category: "Coding",
    ageRange: "13–18",
    location: "Shepherd's Bush",
    distance: "2.8 miles",
    day: "Saturday",
    time: "1:00 PM",
    price: 10,
    spaces: 6,
    verified: true,
    description:
      "Learn web development, simple games and creative programming in a relaxed and supportive group.",
  },

  {
    id: "4",
    title: "Basketball Development",
    organisation: "London Hoops",
    category: "Basketball",
    ageRange: "14–21",
    location: "Acton",
    distance: "3.5 miles",
    day: "Friday",
    time: "7:00 PM",
    price: 8,
    spaces: 4,
    verified: false,
    description:
      "Basketball development session covering skills, fitness, teamwork and structured games.",
  },

  {
    id: "5",
    title: "Music Production Workshop",
    organisation: "Youth Sound Lab",
    category: "Music",
    ageRange: "16–25",
    location: "Notting Hill",
    distance: "4.2 miles",
    day: "Sunday",
    time: "2:00 PM",
    price: 0,
    spaces: 10,
    verified: true,
    description:
      "A hands-on introduction to beat making, recording, arranging and music production.",
  },
];

export function getActivityById(id) {
  return activities.find((activity) => activity.id === String(id));
}
