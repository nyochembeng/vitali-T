import React from "react";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/lib/hooks/useTheme";
import { StatusBar } from "expo-status-bar";

export default function LogsLayout() {
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
        <Stack.Screen name="log-contractions" />
        <Stack.Screen name="log-symptoms" />
        <Stack.Screen name="log-fetal-movements" />
        <Stack.Screen name="log-activity" />
        <Stack.Screen name="log-sleep" />
      </Stack>
    </SafeAreaView>
  );
}
