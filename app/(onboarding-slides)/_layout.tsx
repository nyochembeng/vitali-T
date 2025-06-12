import React from "react";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@/lib/hooks/useTheme";

export default function IntroLayout() {
  const { colors, mode, layout } = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        padding: layout.spacing.lg,
      }}
    >
      <StatusBar style={mode === "dark" ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="onboarding-slide1" />
        <Stack.Screen name="onboarding-slide2" />
        <Stack.Screen name="onboarding-slide3" />
      </Stack>
    </SafeAreaView>
  );
}
