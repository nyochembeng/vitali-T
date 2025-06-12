import React from "react";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@/lib/hooks/useTheme";

export default function SetupLayout() {
  const { colors, mode, layout } = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: layout.spacing.lg,
      }}
    >
      <StatusBar style={mode === "dark" ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="profile-setup" />
        <Stack.Screen name="getting-started" />
        <Stack.Screen name="monitoring-preferences" />
      </Stack>
    </SafeAreaView>
  );
}
