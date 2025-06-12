import React from "react";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@/lib/hooks/useTheme";

export default function HistoryLayout() {
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
        <Stack.Screen name="activity-history" />
        <Stack.Screen name="contractions-history" />
        <Stack.Screen name="fetal-movements-history" />
        <Stack.Screen name="vitals-history" />
        <Stack.Screen name="sleep-history" />
      </Stack>
    </SafeAreaView>
  );
}
