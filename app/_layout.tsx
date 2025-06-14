import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme, SafeAreaView } from "react-native";
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";
import { store } from "@/lib/store";
import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
  Inter_400Regular_Italic,
} from "@expo-google-fonts/inter";
import {
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";
import { Colors } from "@/lib/constants/Colors";
import { Typo } from "@/lib/constants/Typo";
import { Layout } from "@/lib/constants/Layout";
import Toast from "react-native-toast-message";
import { useQueueProcessor } from "@/lib/utils/queueProcessor";
import { registerBackgroundTask } from "@/lib/utils/registerBackgroundTask";
import { OfflineBanner } from "@/components/feedbacks/OfflineBanner";
import { SyncStatus } from "@/components/feedbacks/SyncStatus";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    Inter_400Regular_Italic,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // Initialize queue processor and background task
  useQueueProcessor();
  useEffect(() => {
    registerBackgroundTask();
  }, []);

  if (!loaded && !error) return null;

  const colorSet = isDark ? Colors.dark : Colors.light;

  const paperTheme = {
    ...(isDark ? MD3DarkTheme : MD3LightTheme),
    roundness: Layout.borderRadius.medium,
    colors: {
      ...MD3LightTheme.colors,
      primary: colorSet.primary,
      secondary: colorSet.accent,
      background: colorSet.background,
      surface: colorSet.card,
      error: colorSet.error,
      text: colorSet.text,
      onSurface: colorSet.text,
      outline: colorSet.border,
    },
    custom: {
      colors: colorSet,
      typo: Typo,
      layout: Layout,
      mode: isDark ? "dark" : "light",
    },
  };

  return (
    <StoreProvider store={store}>
      <PaperProvider theme={paperTheme}>
        <SafeAreaView style={{ flex: 1, backgroundColor: colorSet.background }}>
          <StatusBar style={isDark ? "light" : "dark"} />
          <OfflineBanner />
          <SyncStatus />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(onboarding-slides)" />
            <Stack.Screen name="auth" />
            <Stack.Screen name="(setup)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(bluetooth)" />
          </Stack>
          <Toast />
        </SafeAreaView>
      </PaperProvider>
    </StoreProvider>
  );
}
