import React from "react";
import { Stack } from "expo-router";

export default function DashboardLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="vitals-details" />
      <Stack.Screen name="alert-details" />
      <Stack.Screen name="generate-report" />
    </Stack>
  );
}
