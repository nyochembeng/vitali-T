import React, { useState } from "react";
import { View, ScrollView, StyleSheet, StatusBar } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { NotificationSettingItem } from "@/components/settings/NotificationSettingItem";
import CustomAppBar from "@/components/utils/CustomAppBar";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  icon: string;
  enabled: boolean;
}

export default function NotificationSettingsScreen() {
  const theme = useTheme();
  const router = useRouter();

  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: "monitoring-alerts",
      title: "Monitoring Alerts",
      description: "Receive alerts about unusual health readings",
      icon: "heart-pulse",
      enabled: true,
    },
    {
      id: "daily-health-tips",
      title: "Daily Health Tips",
      description: "Get a helpful health or wellness tip each day",
      icon: "lightbulb-outline",
      enabled: true,
    },
    {
      id: "weekly-reports",
      title: "Weekly Reports",
      description: "Weekly summary of your logged vitals and activities",
      icon: "chart-bar",
      enabled: true,
    },
    {
      id: "symptom-reminders",
      title: "Reminders to Log Symptoms",
      description: "Gentle nudges to keep your symptom tracking updated",
      icon: "clipboard-text-outline",
      enabled: true,
    },
  ]);

  const handleToggle = (id: string, enabled: boolean) => {
    setSettings((prev) =>
      prev.map((setting) =>
        setting.id === id ? { ...setting, enabled } : setting
      )
    );
  };

  const handleSave = () => {
    // Here you would typically save the settings to a backend or local storage
    console.log("Settings saved:", settings);
    // Navigate back to the settings screen
    router.back();
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
      />

      <CustomAppBar title="Notification Settings" rightAction="notifications" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.settingsContainer}>
          {settings.map((setting) => (
            <NotificationSettingItem
              key={setting.id}
              setting={setting}
              onToggle={handleToggle}
            />
          ))}
        </View>
      </ScrollView>

      <View
        style={[styles.footer, { backgroundColor: theme.colors.background }]}
      >
        <Button
          mode="contained"
          onPress={handleSave}
          style={[styles.saveButton, { backgroundColor: "#B8860B" }]}
          contentStyle={styles.saveButtonContent}
          labelStyle={styles.saveButtonLabel}
        >
          Save Settings
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  headerIcon: {
    marginRight: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
    paddingTop: 16,
  },
  settingsContainer: {
    paddingBottom: 24,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: 34,
  },
  saveButton: {
    borderRadius: 25,
    elevation: 2,
  },
  saveButtonContent: {
    paddingVertical: 8,
  },
  saveButtonLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});
