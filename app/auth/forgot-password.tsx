import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "@/lib/hooks/useTheme";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { colors, typo, layout } = useTheme();

  const handleSendResetLink = () => {
    // Implement your logic to send the reset link here
    // You can use a library like axios to make an API request to your backend
    // For simplicity, we'll just log the email to the console
    console.log("Reset link sent to:", email);
  };

  const handleBackToLogin = () => {
    router.push("/auth/login");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: layout.spacing.lg,
            paddingTop: layout.spacing.xxl,
            paddingBottom: layout.spacing.md,
          }}
        >
          {/* Lock Icon */}
          <View
            style={{
              alignItems: "center",
              marginBottom: layout.spacing.xl,
            }}
          >
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: colors.primary,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="lock-closed"
                size={32}
                color={colors.textInverse}
              />
            </View>
          </View>

          {/* Title and Description */}
          <Text
            style={{
              fontSize: typo.h5.fontSize,
              fontWeight: "700",
              color: colors.text,
              textAlign: "center",
              marginBottom: layout.spacing.md,
              ...typo.h5,
            }}
          >
            Forgot Password?
          </Text>
          <Text
            style={{
              fontSize: typo.body2.fontSize,
              color: "rgba(17, 12, 9, 0.6)",
              textAlign: "center",
              marginBottom: layout.spacing.xxl,
              lineHeight: typo.body1.lineHeight,
              ...typo.body2,
            }}
          >
            Enter your email address to reset your password.
          </Text>

          {/* Form */}
          <View
            style={{
              flex: 1,
            }}
          >
            {/* Email Input */}
            <View
              style={{
                marginBottom: layout.spacing.xl,
              }}
            >
              <Text
                style={{
                  fontSize: typo.body3.fontSize,
                  color: colors.text,
                  marginBottom: layout.spacing.sm,
                  fontWeight: "500",
                  ...typo.body3,
                }}
              >
                Email Address
              </Text>
              <TextInput
                mode="outlined"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                right={<TextInput.Icon icon="email-outline" />}
                style={{
                  backgroundColor: colors.card,
                  fontSize: typo.body1.fontSize,
                  ...typo.body1,
                }}
                outlineStyle={{
                  borderColor: colors.border,
                  borderWidth: 1,
                  borderRadius: layout.borderRadius.medium,
                }}
                theme={{
                  colors: {
                    outline: colors.border,
                    outlineVariant: colors.border,
                  },
                }}
              />
            </View>

            {/* Send Reset Link Button */}
            <Button
              mode="contained"
              onPress={handleSendResetLink}
              style={{
                borderRadius: layout.borderRadius.medium,
                paddingVertical: layout.spacing.sm,
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
              Send Reset Link
            </Button>

            {/* Back to Login Link */}
            <TouchableOpacity
              onPress={handleBackToLogin}
              style={{
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: typo.body3.fontSize,
                  color: colors.text,
                  fontWeight: "500",
                  ...typo.body3,
                }}
              >
                Back to Login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
