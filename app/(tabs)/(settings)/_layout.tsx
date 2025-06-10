import React from "react";
import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="settings" />
      <Stack.Screen name="notifications-settings" />
      <Stack.Screen name="theme-settings" />
      <Stack.Screen name="privacy-policy" />
    </Stack>
  );
}
