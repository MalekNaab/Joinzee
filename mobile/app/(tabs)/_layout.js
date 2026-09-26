import { Tabs } from "expo-router";
import { Text } from "react-native";

import { COLORS } from "../../constants/theme";

function Icon({
  children,
  focused,
}) {
  return (
    <Text
      style={{
        color: focused
          ? COLORS.pink
          : "#CFD7EA",
        fontSize: 20,
      }}
    >
      {children}
    </Text>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: "#030A16",
          borderTopColor: "#1C2A42",
          height: 72,
          paddingTop: 7,
          paddingBottom: 8,
        },

        tabBarActiveTintColor:
          COLORS.pink,

        tabBarInactiveTintColor:
          "#CFD7EA",

        tabBarLabelStyle: {
          fontSize: 9,
          fontWeight: "700",
        },
      }}
    >
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          tabBarIcon: ({ focused }) => (
            <Icon focused={focused}>
              ◉
            </Icon>
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ focused }) => (
            <Icon focused={focused}>
              ⌕
            </Icon>
          ),
        }}
      />

      <Tabs.Screen
        name="matches"
        options={{
          title: "Matches",
          tabBarIcon: ({ focused }) => (
            <Icon focused={focused}>
              ♡
            </Icon>
          ),
        }}
      />

      <Tabs.Screen
        name="activities"
        options={{
          title: "My Activities",
          tabBarIcon: ({ focused }) => (
            <Icon focused={focused}>
              ▣
            </Icon>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <Icon focused={focused}>
              ♙
            </Icon>
          ),
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
