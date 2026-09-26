import { Stack } from "expo-router";
import { OrganisationSessionProvider } from "../context/OrganisationSessionContext";

import { SignupProvider } from "../context/SignupContext";
import { ActivityProvider } from "../context/ActivityContext";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <SignupProvider>
      <ActivityProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
            contentStyle: {
              backgroundColor: "#020617",
            },
          }}
        />
      </ActivityProvider>
          </SignupProvider>
    </AuthProvider>
  );
}


