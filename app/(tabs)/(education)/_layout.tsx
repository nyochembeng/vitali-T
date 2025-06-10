import React from "react";
import { Stack } from "expo-router";

export default function EducationLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="pregnancy-tips" />
      <Stack.Screen name="emergency-guidelines" />
      <Stack.Screen name="vital-signs-education" />
    </Stack>
  );
}
