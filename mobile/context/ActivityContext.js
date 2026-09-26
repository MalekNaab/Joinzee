import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import { activities } from "../data/activities";

const ActivityContext = createContext(null);

export function ActivityProvider({ children }) {
  const [matchedIds, setMatchedIds] = useState([]);
  const [passedIds, setPassedIds] = useState([]);

  const [bookings, setBookings] = useState([
    {
      id: "booking-1",
      activityId: "1",
      status: "confirmed",
      past: false,
      going: 8,
    },
    {
      id: "booking-2",
      activityId: "2",
      status: "pending",
      past: false,
      going: 12,
    },
    {
      id: "booking-3",
      activityId: "3",
      status: "confirmed",
      past: false,
      going: 8,
    },
    {
      id: "booking-4",
      activityId: "5",
      status: "confirmed",
      past: true,
      going: 6,
    },
  ]);

  const matchActivity = (id) => {
    setMatchedIds((current) =>
      current.includes(id)
        ? current
        : [...current, id]
    );

    setPassedIds((current) =>
      current.filter((item) => item !== id)
    );
  };

  const unmatchActivity = (id) => {
    setMatchedIds((current) =>
      current.filter((item) => item !== id)
    );
  };

  const passActivity = (id) => {
    setPassedIds((current) =>
      current.includes(id)
        ? current
        : [...current, id]
    );
  };

  const matchedActivities = useMemo(
    () =>
      activities.filter((activity) =>
        matchedIds.includes(activity.id)
      ),
    [matchedIds]
  );

  const availableSwipeActivities = useMemo(
    () =>
      activities.filter(
        (activity) =>
          !passedIds.includes(activity.id) &&
          !matchedIds.includes(activity.id)
      ),
    [passedIds, matchedIds]
  );

  return (
    <ActivityContext.Provider
      value={{
        matchedIds,
        passedIds,
        bookings,
        setBookings,

        matchActivity,
        unmatchActivity,
        passActivity,

        matchedActivities,
        availableSwipeActivities,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivities() {
  const context = useContext(ActivityContext);

  if (!context) {
    throw new Error(
      "useActivities must be used inside ActivityProvider"
    );
  }

  return context;
}
