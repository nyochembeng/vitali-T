import React from "react";
import { Stack } from "expo-router";

export default function LogsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="log-contractions" />
      <Stack.Screen name="log-symptoms" />
      <Stack.Screen name="log-fetal-movements" />
      <Stack.Screen name="log-activity" />
      <Stack.Screen name="log-sleep" />
    </Stack>
  );
}
