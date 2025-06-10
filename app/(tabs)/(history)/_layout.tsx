import React from "react";
import { Stack } from "expo-router";

export default function HistoryLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="activity-history" />
      <Stack.Screen name="contractions-history" />
      <Stack.Screen name="fetal-movements-history" />
      <Stack.Screen name="vitals-history" />
      <Stack.Screen name="sleep-history" />
    </Stack>
  );
}
