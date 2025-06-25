import { useForgotPasswordMutation } from "@/lib/features/user/userService";
import { useTheme } from "@/lib/hooks/useTheme";
import { ForgotPassword, forgotPasswordSchema } from "@/lib/schemas/userSchema";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { colors, typo, layout } = useTheme();
  const [forgotPassword, { isLoading: isSubmitting }] =
    useForgotPasswordMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPassword>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPassword) => {
    try {
      const response = await forgotPassword(data).unwrap();
      Alert.alert(
        "Success",
        response.message ||
          "A password reset link has been sent to your email.",
        [
          {
            text: "OK",
            onPress: () => router.replace("/auth/login"),
          },
        ]
      );
    } catch (error: any) {
      if (error.message === "ACTION_QUEUED") {
        return; // Queued actions handled by Toast and SyncStatus
      }
      Alert.alert(
        "Error",
        error?.data?.message || "Failed to send reset link. Please try again.",
        [{ text: "OK" }]
      );
    }
  };

  const handleBackToLogin = () => {
    router.push("/auth/login");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
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
            style={{ alignItems: "center", marginBottom: layout.spacing.xl }}
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
          <View style={{ flex: 1 }}>
            {/* Email Input */}
            <View style={{ marginBottom: layout.spacing.xl }}>
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
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    mode="outlined"
                    placeholder="Enter your email"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    right={<TextInput.Icon icon="email-outline" />}
                    style={{
                      backgroundColor: colors.card,
                      fontSize: typo.body1.fontSize,
                      ...typo.body1,
                    }}
                    outlineStyle={{
                      borderColor: errors.email ? colors.error : colors.border,
                      borderWidth: 1,
                      borderRadius: layout.borderRadius.medium,
                    }}
                    theme={{
                      colors: {
                        outline: colors.border,
                        outlineVariant: colors.border,
                      },
                    }}
                    disabled={isSubmitting}
                  />
                )}
              />
              {errors.email && (
                <Text
                  style={{
                    color: colors.error,
                    fontSize: typo.paragraph.fontSize,
                    marginTop: layout.spacing.xs,
                    ...typo.paragraph,
                  }}
                >
                  {errors.email.message}
                </Text>
              )}
            </View>

            {/* Send Reset Link Button */}
            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              loading={isSubmitting}
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
              style={{ alignItems: "center" }}
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
