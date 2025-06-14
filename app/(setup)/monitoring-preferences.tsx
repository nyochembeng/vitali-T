import { useTheme } from "@/lib/hooks/useTheme";
import { useAuth } from "@/lib/hooks/useAuth";
import {
  MonitoringPreferences,
  monitoringPreferencesSchema,
} from "@/lib/schemas/settingsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Button, RadioButton, Switch } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import {
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} from "@/lib/features/settings/settingsService";

const NotificationFrequencyButton: React.FC<{
  label: string;
  value: "daily" | "weekly" | "monthly";
  isSelected: boolean;
  onPress: () => void;
  disabled: boolean;
}> = ({ label, value, isSelected, onPress, disabled }) => {
  const { colors, typo, layout } = useTheme();
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        backgroundColor: isSelected ? colors.primary : colors.primaryLight,
        paddingVertical: layout.spacing.sm,
        paddingHorizontal: layout.spacing.md,
        borderRadius: layout.borderRadius.medium,
        alignItems: "center",
        opacity: disabled ? 0.6 : 1,
      }}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={{
          fontSize: typo.body3.fontSize,
          fontWeight: isSelected ? "600" : "500",
          color: isSelected ? colors.textInverse : "rgba(17, 12, 9, 0.6)",
          ...typo.body3,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default function MonitoringPreferencesScreen() {
  const router = useRouter();
  const { colors, typo, layout } = useTheme();
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
  } = useForm<MonitoringPreferences>({
    resolver: zodResolver(monitoringPreferencesSchema),
    defaultValues: {
      alertSensitivity:
        settings?.monitoringPreferences?.alertSensitivity || "standard",
      notificationFrequency:
        settings?.monitoringPreferences?.notificationFrequency || "daily",
      reminderNotifications:
        settings?.monitoringPreferences?.reminderNotifications ?? true,
      healthEducationUpdates:
        settings?.monitoringPreferences?.healthEducationUpdates ?? true,
      insightsFromDataTrends:
        settings?.monitoringPreferences?.insightsFromDataTrends ?? true,
    },
  });

  const onSubmit = async (data: MonitoringPreferences) => {
    if (!user?.userId) return;
    try {
      const result = await updateSettings({
        userId: user.userId,
        data: { monitoringPreferences: data },
      }).unwrap();
      if ("queued" in result && result.queued) {
        return; // Queued actions handled by Toast and SyncStatus
      }
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Monitoring preferences updated successfully.",
      });
      router.push("/getting-started");
    } catch (error: any) {
      if (error.message === "ACTION_QUEUED") {
        return; // Queued actions handled by Toast and SyncStatus
      }
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error?.data?.message || "Failed to update preferences.",
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: layout.spacing.lg,
          paddingTop: layout.spacing.md,
          paddingBottom: layout.spacing.md,
        }}
      >
        <Text
          style={{
            fontSize: typo.h5.fontSize,
            fontWeight: "700",
            color: colors.text,
            textAlign: "center",
            marginBottom: layout.spacing.xl,
            ...typo.h3,
          }}
        >
          Monitoring Preferences
        </Text>
        <View style={{ marginBottom: layout.spacing.xl }}>
          <Text
            style={{
              fontSize: typo.body2.fontSize,
              fontWeight: "500",
              color: colors.text,
              marginBottom: layout.spacing.sm,
              ...typo.body2,
            }}
          >
            Alert Sensitivity
          </Text>
          <Controller
            control={control}
            name="alertSensitivity"
            render={({ field: { onChange, value } }) => (
              <View style={{ flexDirection: "row", gap: layout.spacing.lg }}>
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center" }}
                  onPress={() => onChange("standard")}
                  disabled={isActionQueued || isUpdating}
                >
                  <RadioButton
                    value="standard"
                    status={value === "standard" ? "checked" : "unchecked"}
                    onPress={() => onChange("standard")}
                    color={colors.primary}
                    disabled={isActionQueued || isUpdating}
                  />
                  <Text
                    style={{
                      fontSize: typo.body1.fontSize,
                      color: colors.text,
                      marginLeft: layout.spacing.sm,
                      ...typo.body1,
                    }}
                  >
                    Standard
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center" }}
                  onPress={() => onChange("sensitive")}
                  disabled={isActionQueued || isUpdating}
                >
                  <RadioButton
                    value="sensitive"
                    status={value === "sensitive" ? "checked" : "unchecked"}
                    onPress={() => onChange("sensitive")}
                    color={colors.primary}
                    disabled={isActionQueued || isUpdating}
                  />
                  <Text
                    style={{
                      fontSize: typo.body1.fontSize,
                      color: colors.text,
                      marginLeft: layout.spacing.sm,
                      ...typo.body1,
                    }}
                  >
                    Sensitive
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
          {errors.alertSensitivity && (
            <Text style={{ color: colors.error, ...typo.body3 }}>
              {errors.alertSensitivity.message}
            </Text>
          )}
        </View>
        <View style={{ marginBottom: layout.spacing.xl }}>
          <Text
            style={{
              fontSize: typo.body2.fontSize,
              fontWeight: "500",
              color: colors.text,
              marginBottom: layout.spacing.sm,
              ...typo.body2,
            }}
          >
            Notification Frequency
          </Text>
          <Controller
            control={control}
            name="notificationFrequency"
            render={({ field: { onChange, value } }) => (
              <View style={{ flexDirection: "row", gap: layout.spacing.sm }}>
                <NotificationFrequencyButton
                  label="Daily"
                  value="daily"
                  isSelected={value === "daily"}
                  onPress={() => onChange("daily")}
                  disabled={isActionQueued || isUpdating}
                />
                <NotificationFrequencyButton
                  label="Weekly"
                  value="weekly"
                  isSelected={value === "weekly"}
                  onPress={() => onChange("weekly")}
                  disabled={isActionQueued || isUpdating}
                />
                <NotificationFrequencyButton
                  label="Monthly"
                  value="monthly"
                  isSelected={value === "monthly"}
                  onPress={() => onChange("monthly")}
                  disabled={isActionQueued || isUpdating}
                />
              </View>
            )}
          />
          {errors.notificationFrequency && (
            <Text style={{ color: colors.error, ...typo.body3 }}>
              {errors.notificationFrequency.message}
            </Text>
          )}
        </View>
        <View style={{ marginBottom: layout.spacing.xl }}>
          <Controller
            control={control}
            name="reminderNotifications"
            render={({ field: { value, onChange } }) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingVertical: layout.spacing.sm,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                }}
              >
                <View style={{ flex: 1, marginRight: layout.spacing.sm }}>
                  <Text
                    style={{
                      fontSize: typo.body2.fontSize,
                      fontWeight: "500",
                      color: colors.text,
                      marginBottom: layout.spacing.xs,
                      ...typo.body2,
                    }}
                  >
                    Reminder Notifications
                  </Text>
                  <Text
                    style={{
                      fontSize: typo.body3.fontSize,
                      color: "rgba(17, 12, 9, 0.6)",
                      lineHeight: typo.body1.lineHeight,
                      ...typo.body3,
                    }}
                  >
                    Enable notifications for daily reminders
                  </Text>
                </View>
                <Switch
                  value={value}
                  onValueChange={onChange}
                  color={colors.primary}
                  disabled={isActionQueued || isUpdating}
                />
              </View>
            )}
          />
          {errors.reminderNotifications && (
            <Text style={{ color: colors.error, ...typo.body3 }}>
              {errors.reminderNotifications.message}
            </Text>
          )}
          <Controller
            control={control}
            name="healthEducationUpdates"
            render={({ field: { onChange, value } }) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingVertical: layout.spacing.sm,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                }}
              >
                <View style={{ flex: 1, marginRight: layout.spacing.sm }}>
                  <Text
                    style={{
                      fontSize: typo.body2.fontSize,
                      fontWeight: "500",
                      color: colors.text,
                      marginBottom: layout.spacing.xs,
                      ...typo.body2,
                    }}
                  >
                    Health Education Updates
                  </Text>
                  <Text
                    style={{
                      fontSize: typo.body3.fontSize,
                      color: "rgba(17, 12, 9, 0.6)",
                      lineHeight: typo.body1.lineHeight,
                      ...typo.body3,
                    }}
                  >
                    Receive regular health tips and articles
                  </Text>
                </View>
                <Switch
                  value={value}
                  onValueChange={onChange}
                  color={colors.primary}
                  disabled={isActionQueued || isUpdating}
                />
              </View>
            )}
          />
          {errors.healthEducationUpdates && (
            <Text style={{ color: colors.error, ...typo.body3 }}>
              {errors.healthEducationUpdates.message}
            </Text>
          )}
          <Controller
            control={control}
            name="insightsFromDataTrends"
            render={({ field: { onChange, value } }) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingVertical: layout.spacing.sm,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                }}
              >
                <View style={{ flex: 1, marginRight: layout.spacing.sm }}>
                  <Text
                    style={{
                      fontSize: typo.body2.fontSize,
                      fontWeight: "500",
                      color: colors.text,
                      marginBottom: layout.spacing.xs,
                      ...typo.body2,
                    }}
                  >
                    Insights from Data Trends
                  </Text>
                  <Text
                    style={{
                      fontSize: typo.body3.fontSize,
                      color: "rgba(17, 12, 9, 0.6)",
                      lineHeight: typo.body1.lineHeight,
                      ...typo.body3,
                    }}
                  >
                    Get personalized health trend insights based on your
                    monitoring data
                  </Text>
                </View>
                <Switch
                  value={value}
                  onValueChange={onChange}
                  color={colors.primary}
                  disabled={isActionQueued || isUpdating}
                />
              </View>
            )}
          />
          {errors.insightsFromDataTrends && (
            <Text style={{ color: colors.error, ...typo.body3 }}>
              {errors.insightsFromDataTrends.message}
            </Text>
          )}
        </View>
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          disabled={isUpdating || isActionQueued}
          loading={isUpdating}
          style={{
            borderRadius: layout.borderRadius.medium,
            paddingVertical: layout.spacing.sm,
            marginTop: layout.spacing.sm,
            marginBottom: layout.spacing.lg,
          }}
          labelStyle={{
            fontSize: typo.button.fontSize,
            fontWeight: "600",
            color: colors.textInverse,
            ...typo.button,
          }}
          buttonColor={colors.primary}
        >
          Save and Continue
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
