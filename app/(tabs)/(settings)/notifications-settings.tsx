import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { NotificationSettingItem } from "@/components/settings/NotificationSettingItem";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useTheme } from "@/lib/hooks/useTheme";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  icon: string;
  enabled: boolean;
}

export default function NotificationSettingsScreen() {
  const { colors, typo, layout } = useTheme();
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
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <CustomAppBar title="Notification Settings" rightAction="notifications" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: layout.spacing.xl,
          paddingTop: layout.spacing.sm,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            paddingBottom: layout.spacing.lg,
          }}
        >
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
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: layout.spacing.sm,
          paddingBottom: layout.spacing.lg,
          backgroundColor: colors.background,
        }}
      >
        <Button
          mode="contained"
          onPress={handleSave}
          style={{
            borderRadius: layout.borderRadius.large,
            elevation: layout.elevation,
          }}
          contentStyle={{
            paddingVertical: layout.spacing.xs,
          }}
          labelStyle={{
            fontSize: typo.button.fontSize,
            fontWeight: "600",
            color: colors.textInverse,
            ...typo.button,
          }}
          buttonColor={colors.primary}
        >
          Save Settings
        </Button>
      </View>
    </SafeAreaView>
  );
}
