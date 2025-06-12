import React from "react";
import { View, StatusBar } from "react-native";
import { Text, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "@/lib/hooks/useTheme";

export default function LogoutConfirmationScreen() {
  const { colors, typo, layout, mode } = useTheme();
  const router = useRouter();

  const handleLogout = () => {
    // Perform logout logic here, e.g., clear user session, tokens, etc.
    console.log("User logged out");
    // After logout, navigate to the login screen
    router.replace("/auth/login");
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: layout.spacing.lg,
      }}
    >
      <StatusBar
        barStyle={mode === "dark" ? "light-content" : "dark-content"}
      />

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: layout.spacing.xxl,
        }}
      >
        <View
          style={{
            marginBottom: layout.spacing.lg,
          }}
        >
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              // backgroundColor: colors.surfaceVariant,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="logout"
              size={40}
              color={colors.primary}
            />
          </View>
        </View>

        <Text
          variant="headlineMedium"
          style={{
            fontWeight: "600",
            marginBottom: layout.spacing.md,
            textAlign: "center",
            ...typo.h3,
          }}
        >
          Log Out
        </Text>

        <View
          style={{
            paddingHorizontal: layout.spacing.lg,
            paddingVertical: layout.spacing.md,
            borderRadius: layout.borderRadius.large,
            marginHorizontal: layout.spacing.sm,
            // backgroundColor: colors.surfaceVariant,
          }}
        >
          <Text
            variant="bodyMedium"
            style={{
              textAlign: "center",
              lineHeight: typo.body1.lineHeight,
              ...typo.body1,
            }}
          >
            Are you sure you want to log out from Vitali-T?
          </Text>
        </View>
      </View>

      <View
        style={{
          paddingBottom: layout.spacing.lg,
          gap: layout.spacing.sm,
        }}
      >
        <Button
          mode="contained"
          onPress={handleLogout}
          style={{
            borderRadius: layout.borderRadius.large,
            paddingVertical: layout.spacing.sm,
            elevation: 2,
          }}
          contentStyle={{
            paddingVertical: layout.spacing.sm,
          }}
          labelStyle={{
            fontSize: typo.button.fontSize,
            fontWeight: "600",
            color: colors.textInverse,
            ...typo.button,
          }}
          buttonColor={colors.primary}
        >
          Log Out
        </Button>

        <Button
          mode="outlined"
          onPress={handleCancel}
          style={{
            borderRadius: layout.borderRadius.large,
            borderWidth: 1,
            borderColor: colors.border,
          }}
          contentStyle={{
            paddingVertical: layout.spacing.sm,
          }}
          labelStyle={{
            fontSize: typo.button.fontSize,
            fontWeight: "500",
            color: colors.text,
            ...typo.button,
          }}
        >
          Cancel
        </Button>
      </View>
    </SafeAreaView>
  );
}
