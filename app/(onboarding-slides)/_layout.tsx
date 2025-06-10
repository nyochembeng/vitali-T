import React from "react";
import { Stack } from "expo-router";

export default function IntroLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onboarding-slide1" />
      <Stack.Screen name="onboarding-slide2" />
      <Stack.Screen name="onboarding-slide3" />
    </Stack>
  );
}
