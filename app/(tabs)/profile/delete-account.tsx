import React from "react";
import { Alert, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { useTheme } from "@/lib/hooks/useTheme";
import { useAuth } from "@/lib/hooks/useAuth";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useDeleteProfileMutation } from "@/lib/features/profile/profileService";
import { Typo } from "@/lib/constants/Typo";

export default function DeleteAccountScreen() {
  const router = useRouter();
  const { colors, typo, layout } = useTheme();
  const { user, isActionQueued, logout } = useAuth();
  const [deleteProfile, { isLoading }] = useDeleteProfileMutation();

  const textStyle = {
    body2: {
      ...typo.body2,
      color: colors.text,
      lineHeight: typo.body2.lineHeight,
    },
    subtitle2: {
      ...typo.subtitle2,
      color: colors.text,
      fontWeight: Typo.subtitle2.fontWeight,
    },
    caption: { ...typo.caption, color: `${colors.text}99` },
  };

  const buttonStyle = {
    contained: {
      backgroundColor: colors.primary,
      borderRadius: layout.borderRadius.large,
      paddingVertical: layout.spacing.xs,
    },
    outlined: {
      borderColor: colors.primary,
      borderRadius: layout.borderRadius.large,
      paddingVertical: layout.spacing.xs,
    },
    label: {
      ...typo.button,
      fontWeight: Typo.button.fontWeight,
    },
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete your account? This action is irreversible.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await deleteProfile(
                user?.userId as string
              ).unwrap();
              if ("queued" in result && result.queued) {
                return; // Queued actions handled by Toast and SyncStatus
              }
              await logout();
              Alert.alert("Success", "Account deleted successfully.", [
                { text: "OK", onPress: () => router.replace("/auth/login") },
              ]);
            } catch (error: any) {
              if (error.message === "ACTION_QUEUED") {
                return; // Queued actions handled by Toast and SyncStatus
              }
              Alert.alert(
                "Error",
                error?.data?.message || "Failed to delete account.",
                [{ text: "OK" }]
              );
            }
          },
        },
      ]
    );
  };

  const handleCancel = () => router.back();

  const handleContactSupport = () => router.push("/help");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomAppBar title="Delete Account" rightAction="help" />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: layout.spacing.lg,
        }}
      >
        {/* Trash Icon */}
        <View
          style={{ alignItems: "center", marginVertical: layout.spacing.xl }}
        >
          <View
            style={{
              width: layout.spacing.xl * 3.75,
              height: layout.spacing.xl * 3.75,
              borderRadius: layout.borderRadius.xl * 3.75,
              backgroundColor: colors.errorLight,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialIcons
              name="delete-outline"
              size={48}
              color={colors.error}
            />
          </View>
        </View>

        {/* Warning Message */}
        <View
          style={{
            flexDirection: "row",
            backgroundColor: colors.warningLight,
            padding: layout.spacing.md,
            borderRadius: layout.borderRadius.medium,
            marginBottom: layout.spacing.lg,
            alignItems: "flex-start",
          }}
        >
          <MaterialIcons name="warning" size={20} color={colors.warning} />
          <Text
            style={[
              textStyle.body2,
              { flex: 1, marginLeft: layout.spacing.sm },
            ]}
          >
            Are you sure you want to delete your Vitali-T account? This action
            is irreversible.
          </Text>
        </View>

        {/* Information Section */}
        <View style={{ marginBottom: layout.spacing.xl }}>
          <Text
            style={[textStyle.subtitle2, { marginBottom: layout.spacing.sm }]}
          >
            This will permanently delete:
          </Text>
          {[
            "Your profile and personal information",
            "Your activity history and preferences",
            "All saved data and settings",
          ].map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                marginBottom: layout.spacing.sm,
              }}
            >
              <View
                style={{
                  width: layout.spacing.xs,
                  height: layout.spacing.xs,
                  borderRadius: layout.borderRadius.small,
                  backgroundColor: colors.text,
                  marginTop: layout.spacing.sm,
                  marginRight: layout.spacing.sm,
                }}
              />
              <Text style={textStyle.body2}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View
          style={{ gap: layout.spacing.sm, marginBottom: layout.spacing.md }}
        >
          <Button
            mode="contained"
            onPress={handleDeleteAccount}
            disabled={isLoading || isActionQueued}
            loading={isLoading}
            style={buttonStyle.contained}
            labelStyle={[buttonStyle.label, { color: colors.textInverse }]}
          >
            Delete My Account
          </Button>
          <Button
            mode="outlined"
            onPress={handleCancel}
            disabled={isLoading || isActionQueued}
            style={buttonStyle.outlined}
            labelStyle={[buttonStyle.label, { color: colors.primary }]}
          >
            Cancel
          </Button>
        </View>

        {/* Support Link */}
        <Button
          mode="text"
          onPress={handleContactSupport}
          style={{ alignSelf: "center" }}
          labelStyle={textStyle.caption}
          disabled={isActionQueued}
        >
          Need help? Contact Support
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
