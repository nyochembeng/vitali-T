import React from "react";
import { Stack } from "expo-router";

export default function SetupLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="profile-setup" />
      <Stack.Screen name="getting-started" />
      <Stack.Screen name="monitoring-preferences" />
    </Stack>
  );
}
