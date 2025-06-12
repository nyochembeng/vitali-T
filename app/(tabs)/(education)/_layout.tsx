import React from "react";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@/lib/hooks/useTheme";

export default function EducationLayout() {
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
        <Stack.Screen name="pregnancy-tips" />
        <Stack.Screen name="emergency-guidelines" />
        <Stack.Screen name="vital-signs-education" />
      </Stack>
    </SafeAreaView>
  );
}
