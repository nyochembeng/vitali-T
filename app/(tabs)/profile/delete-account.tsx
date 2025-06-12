import React from "react";
import { View, ScrollView } from "react-native";
import { Text, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useTheme } from "@/lib/hooks/useTheme";

export default function DeleteAccountScreen() {
  const { colors, typo, layout } = useTheme();
  const router = useRouter();

  const handleDeleteAccount = () => {
    console.log("Account deletion requested");
    router.push("/auth/login");
  };

  const handleCancel = () => {
    console.log("Deletion cancellation requested");
    router.back();
  };

  const handleContactSupport = () => {
    console.log("Support request initiated");
    router.push("/help");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <CustomAppBar title="Delete Account" rightAction="help" />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: layout.spacing.lg,
        }}
      >
        {/* Trash Icon */}
        <View
          style={{
            alignItems: "center",
            marginTop: layout.spacing.xl,
            marginBottom: layout.spacing.xl,
          }}
        >
          <View
            style={{
              width: layout.spacing.xl * 3.75, // 120px approximation
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
          <MaterialIcons
            name="warning"
            size={20}
            color={colors.warning}
          />
          <Text
            style={{
              ...typo.body2,
              color: colors.text,
              flex: 1,
              marginLeft: layout.spacing.sm,
              lineHeight: typo.body2.lineHeight,
            }}
          >
            Are you sure you want to delete your Vitali-T account? This action
            is irreversible.
          </Text>
        </View>

        {/* Information Section */}
        <View
          style={{
            marginBottom: layout.spacing.xl,
          }}
        >
          <Text
            style={{
              ...typo.subtitle2,
              color: colors.text,
              fontWeight: "500",
              marginBottom: layout.spacing.sm,
            }}
          >
            This will permanently delete:
          </Text>

          <View
            style={{
              gap: layout.spacing.sm,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
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
              <Text
                style={{
                  ...typo.body2,
                  color: colors.text,
                  flex: 1,
                  lineHeight: typo.body2.lineHeight,
                }}
              >
                Your profile and personal information
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
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
              <Text
                style={{
                  ...typo.body2,
                  color: colors.text,
                  flex: 1,
                  lineHeight: typo.body2.lineHeight,
                }}
              >
                Your activity history and preferences
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
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
              <Text
                style={{
                  ...typo.body2,
                  color: colors.text,
                  flex: 1,
                  lineHeight: typo.body2.lineHeight,
                }}
              >
                All saved data and settings
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View
          style={{
            gap: layout.spacing.sm,
            marginBottom: layout.spacing.md,
          }}
        >
          <Button
            mode="contained"
            onPress={handleDeleteAccount}
            style={{
              backgroundColor: colors.primary,
              borderRadius: layout.borderRadius.large,
              paddingVertical: layout.spacing.xs,
            }}
            labelStyle={{
              ...typo.button,
              fontWeight: "500",
              color: colors.textInverse,
            }}
          >
            Delete My Account
          </Button>

          <Button
            mode="outlined"
            onPress={handleCancel}
            style={{
              borderColor: colors.primary,
              borderRadius: layout.borderRadius.large,
              paddingVertical: layout.spacing.xs,
            }}
            labelStyle={{
              ...typo.button,
              fontWeight: "500",
              color: colors.primary,
            }}
          >
            Cancel
          </Button>
        </View>

        {/* Support Link */}
        <Button
          mode="text"
          onPress={handleContactSupport}
          style={{
            alignSelf: "center",
          }}
          labelStyle={{
            ...typo.caption,
            color: colors.text + "99", // 60% opacity
          }}
        >
          Need help? Contact Support
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}