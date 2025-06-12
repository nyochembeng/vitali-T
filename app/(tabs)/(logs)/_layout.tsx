import React from "react";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/lib/hooks/useTheme";
import { StatusBar } from "expo-status-bar";

export default function SettingsLayout() {
  const { colors, mode } = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <StatusBar
        style={mode === "dark" ? "light" : "dark"}
        backgroundColor={colors.background}
      />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.background,
          },
          animation: "fade",
          animationDuration: 300,
        }}
      >
        <Stack.Screen name="settings" />
        <Stack.Screen name="notifications-settings" />
        <Stack.Screen name="theme-settings" />
        <Stack.Screen name="privacy-policy" />
      </Stack>
    </SafeAreaView>
  );
}
