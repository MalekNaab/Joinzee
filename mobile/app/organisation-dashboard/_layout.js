import { Stack } from "expo-router";

import {
  OrganisationSessionProvider,
} from "../../context/OrganisationSessionContext";

export default function OrganisationDashboardRootLayout() {
  return (
    <OrganisationSessionProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="session/[id]" />
        <Stack.Screen name="session/[id]-edit" />
        <Stack.Screen name="session/[id]-attendees" />
        <Stack.Screen name="session/[id]-attendance" />
        <Stack.Screen name="session/[id]-message" />
        <Stack.Screen name="draft/[id]" />
        <Stack.Screen name="draft/[id]-edit" />
        <Stack.Screen name="create-session" />
        <Stack.Screen name="analytics" />
      </Stack>
    </OrganisationSessionProvider>
  );
}

