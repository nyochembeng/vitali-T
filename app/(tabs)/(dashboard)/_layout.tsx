import React from "react";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@/lib/hooks/useTheme";

export default function DashboardLayout() {
  const { colors, mode } = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <StatusBar style={mode === "dark" ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="vitals-details" />
        <Stack.Screen name="alert-details" />
        <Stack.Screen name="generate-report" />
      </Stack>
    </SafeAreaView>
  );
}
