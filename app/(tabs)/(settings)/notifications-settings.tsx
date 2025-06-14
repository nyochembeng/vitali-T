import NotificationSettingItem from "@/components/settings/NotificationSettingItem";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useTheme } from "@/lib/hooks/useTheme";
import { useAuth } from "@/lib/hooks/useAuth";
import {
  NotificationPreferences,
  notificationPreferencesSchema,
} from "@/lib/schemas/settingsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import {
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} from "@/lib/features/settings/settingsService";

interface NotificationSetting {
  id: keyof NotificationPreferences;
  title: string;
  description: string;
  icon: string;
}

const NOTIFICATION_SETTINGS: NotificationSetting[] = [
  {
    id: "monitoringAlerts",
    title: "Monitoring Alerts",
    description: "Receive alerts about unusual health readings",
    icon: "heart-pulse",
  },
  {
    id: "dailyHealthTips",
    title: "Daily Health Tips",
    description: "Get a helpful health or wellness tip each day",
    icon: "lightbulb-outline",
  },
  {
    id: "weeklyReports",
    title: "Weekly Reports",
    description: "Weekly summary of your logged vitals and activities",
    icon: "chart-bar",
  },
  {
    id: "symptomReminders",
    title: "Reminders to Log Symptoms",
    description: "Gentle nudges to keep your symptom tracking updated",
    icon: "clipboard-text-outline",
  },
];

export default function NotificationSettingsScreen() {
  const { colors, typo, layout } = useTheme();
  const router = useRouter();
  const { user, isActionQueued } = useAuth();
  const { data: settings } = useGetSettingsQuery(user?.userId as string, {
    skip: !user?.userId,
  });
  const [updateSettings, { isLoading: isUpdating }] =
    useUpdateSettingsMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NotificationPreferences>({
    resolver: zodResolver(notificationPreferencesSchema),
    defaultValues: {
      monitoringAlerts:
        settings?.notificationPreferences?.monitoringAlerts ?? true,
      dailyHealthTips:
        settings?.notificationPreferences?.dailyHealthTips ?? true,
      weeklyReports: settings?.notificationPreferences?.weeklyReports ?? true,
      symptomReminders:
        settings?.notificationPreferences?.symptomReminders ?? true,
    },
  });

  const onSubmit = async (data: NotificationPreferences) => {
    if (!user?.userId) return;
    try {
      const result = await updateSettings({
        userId: user.userId,
        data: { notificationPreferences: data },
      }).unwrap();
      if ("queued" in result && result.queued) {
        return; // Queued actions handled by Toast and SyncStatus
      }
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Notification settings updated successfully.",
      });
      router.back();
    } catch (error: any) {
      if (error.message === "ACTION_QUEUED") {
        return; // Queued actions handled by Toast and SyncStatus
      }
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error?.data?.message || "Failed to update settings.",
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomAppBar title="Notification Settings" rightAction="notifications" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: layout.spacing.xl,
          paddingTop: layout.spacing.sm,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingBottom: layout.spacing.lg }}>
          {NOTIFICATION_SETTINGS.map((setting) => (
            <Controller
              key={setting.id}
              control={control}
              name={setting.id}
              render={({ field: { onChange, value } }) => (
                <NotificationSettingItem
                  setting={{ ...setting, enabled: value as boolean }}
                  onToggle={(id, enabled) => onChange(enabled)}
                  disabled={isActionQueued || isUpdating}
                />
              )}
            />
          ))}
          {Object.keys(errors).map((key) => (
            <Text
              key={key}
              style={{
                color: colors.error,
                ...typo.body3,
                marginHorizontal: layout.spacing.md,
              }}
            >
              {errors[key as keyof NotificationPreferences]?.message}
            </Text>
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
          onPress={handleSubmit(onSubmit)}
          disabled={isUpdating || isActionQueued}
          loading={isUpdating}
          style={{
            borderRadius: layout.borderRadius.large,
            elevation: layout.elevation,
          }}
          contentStyle={{ paddingVertical: layout.spacing.xs }}
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
