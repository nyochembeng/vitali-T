import CustomAppBar from "@/components/utils/CustomAppBar";
import { useTheme } from "@/lib/hooks/useTheme";
import { useAuth } from "@/lib/hooks/useAuth";
import {
  ThemePreferences,
  themePreferencesSchema,
} from "@/lib/schemas/settingsSchema";
import { MaterialIcons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import { Button, RadioButton, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import {
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} from "@/lib/features/settings/settingsService";

export default function ThemeSettingsScreen() {
  const { colors, typo, layout } = useTheme();
  const { user, isActionQueued } = useAuth();
  const { data: settings } = useGetSettingsQuery();
  const [updateSettings, { isLoading: isUpdating }] =
    useUpdateSettingsMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ThemePreferences>({
    resolver: zodResolver(themePreferencesSchema),
    defaultValues: {
      mode: settings?.themePreferences?.mode || "light",
    },
  });

  const onSubmit = async (data: ThemePreferences) => {
    if (!user?.userId) return;
    try {
      const result = await updateSettings({
        data: { themePreferences: data },
      }).unwrap();
      if ("queued" in result && result.queued) {
        return; // Queued actions handled by Toast and SyncStatus
      }
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Theme settings updated successfully.",
      });
    } catch (error: any) {
      if (error.message === "ACTION_QUEUED") {
        return; // Queued actions handled by Toast and SyncStatus
      }
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error?.data?.message || "Failed to update theme settings.",
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomAppBar title="Theme Settings" rightAction="notifications" />
      <View style={{ flex: 1, paddingHorizontal: layout.spacing.sm }}>
        <View style={{ marginTop: layout.spacing.lg, gap: layout.spacing.sm }}>
          <Text
            style={{
              ...typo.subtitle2,
              color: colors.text,
              marginBottom: layout.spacing.xs,
            }}
          >
            Choose App Theme
          </Text>
          <Controller
            control={control}
            name="mode"
            render={({ field: { onChange, value } }) => (
              <>
                <TouchableOpacity
                  style={[
                    {
                      flexDirection: "row",
                      alignItems: "center",
                      padding: layout.spacing.sm,
                      borderRadius: layout.borderRadius.medium,
                      borderWidth: 2,
                      borderColor: "transparent",
                    },
                    value === "light" && { borderColor: colors.primary },
                  ]}
                  onPress={() => onChange("light")}
                  disabled={isActionQueued || isUpdating}
                >
                  <View
                    style={{
                      width: layout.spacing.xl,
                      height: layout.spacing.xl,
                      borderRadius: layout.borderRadius.small,
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: layout.spacing.sm,
                    }}
                  >
                    <MaterialIcons
                      name="wb-sunny"
                      size={24}
                      color={colors.primary}
                    />
                  </View>
                  <Text style={{ ...typo.body1, flex: 1, color: colors.text }}>
                    Light Mode
                  </Text>
                  <RadioButton
                    value="light"
                    status={value === "light" ? "checked" : "unchecked"}
                    onPress={() => onChange("light")}
                    color={colors.primary}
                    disabled={isActionQueued || isUpdating}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    {
                      flexDirection: "row",
                      alignItems: "center",
                      padding: layout.spacing.sm,
                      borderRadius: layout.borderRadius.medium,
                      borderWidth: 2,
                      borderColor: "transparent",
                    },
                    value === "dark" && { borderColor: colors.primary },
                  ]}
                  onPress={() => onChange("dark")}
                  disabled={isActionQueued || isUpdating}
                >
                  <View
                    style={{
                      width: layout.spacing.xl,
                      height: layout.spacing.xl,
                      borderRadius: layout.borderRadius.small,
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: layout.spacing.sm,
                    }}
                  >
                    <MaterialIcons
                      name="nights-stay"
                      size={24}
                      color={colors.accent}
                    />
                  </View>
                  <Text style={{ ...typo.body1, flex: 1, color: colors.text }}>
                    Dark Mode
                  </Text>
                  <RadioButton
                    value="dark"
                    status={value === "dark" ? "checked" : "unchecked"}
                    onPress={() => onChange("dark")}
                    color={colors.primary}
                    disabled={isActionQueued || isUpdating}
                  />
                </TouchableOpacity>
                {errors.mode && (
                  <Text style={{ color: colors.error, ...typo.body3 }}>
                    {errors.mode.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>
        <View style={{ marginTop: layout.spacing.xl }}>
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
              ...typo.button,
              fontWeight: "600",
              color: colors.textInverse,
            }}
            buttonColor={colors.primary}
          >
            Save Settings
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
