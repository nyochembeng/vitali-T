import React from "react";
import { Stack } from "expo-router";

export default function BluetoothLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="bluetooth-connection" />
    </Stack>
  );
}
