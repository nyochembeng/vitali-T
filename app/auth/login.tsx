import { useTheme } from "@/lib/hooks/useTheme";
import { Login, loginSchema } from "@/lib/schemas/userSchema";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/lib/hooks/useAuth";

export default function LoginScreen() {
  const router = useRouter();
  const { colors, typo, layout } = useTheme();
  const { login, isLoggingIn, isActionQueued } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit = async (data: Login) => {
    try {
      const result = await login(data);
      if ("queued" in result && result.queued) {
        return; // Queued actions handled by Toast and SyncStatus
      }
      router.replace("/dashboard");
    } catch (error: any) {
      Alert.alert(
        "Login Failed",
        error?.data?.message || "Invalid email or password. Please try again.",
        [{ text: "OK" }]
      );
    }
  };

  const handleForgotPassword = () => {
    router.push("/auth/forgot-password");
  };

  const handleSignUp = () => {
    router.push("/auth/sign-up");
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
            paddingTop: layout.spacing.md,
            paddingBottom: layout.spacing.md,
          }}
        >
          {/* Heart Icon */}
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
              <Ionicons name="heart" size={32} color={colors.textInverse} />
            </View>
          </View>

          {/* Welcome Text */}
          <Text
            style={{
              fontSize: typo.h5.fontSize,
              fontWeight: "700",
              color: colors.text,
              textAlign: "center",
              marginBottom: layout.spacing.sm,
              ...typo.h5,
            }}
          >
            Welcome Back
          </Text>
          <Text
            style={{
              fontSize: typo.body2.fontSize,
              color: "rgba(17, 12, 9, 0.6)",
              textAlign: "center",
              marginBottom: layout.spacing.xxl,
              ...typo.body2,
            }}
          >
            Sign in to continue
          </Text>

          {/* Form */}
          <View style={{ flex: 1 }}>
            {/* Email Input */}
            <View style={{ marginBottom: layout.spacing.lg }}>
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
                    left={<TextInput.Icon icon="email-outline" />}
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
                    disabled={isActionQueued}
                  />
                )}
              />
              {errors.email && (
                <Text
                  style={{
                    color: colors.error,
                    fontSize: typo.body4.fontSize,
                    marginTop: layout.spacing.xs,
                    ...typo.body4,
                  }}
                >
                  {errors.email.message}
                </Text>
              )}
            </View>

            {/* Password Input */}
            <View style={{ marginBottom: layout.spacing.lg }}>
              <Text
                style={{
                  fontSize: typo.body3.fontSize,
                  color: colors.text,
                  marginBottom: layout.spacing.sm,
                  fontWeight: "500",
                  ...typo.body3,
                }}
              >
                Password
              </Text>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    mode="outlined"
                    placeholder="Enter your password"
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={!showPassword}
                    left={<TextInput.Icon icon="lock-outline" />}
                    right={
                      <TextInput.Icon
                        icon={showPassword ? "eye-off" : "eye"}
                        onPress={() => setShowPassword(!showPassword)}
                      />
                    }
                    style={{
                      backgroundColor: colors.card,
                      fontSize: typo.body1.fontSize,
                      ...typo.body1,
                    }}
                    outlineStyle={{
                      borderColor: errors.password
                        ? colors.error
                        : colors.border,
                      borderWidth: 1,
                      borderRadius: layout.borderRadius.medium,
                    }}
                    theme={{
                      colors: {
                        outline: colors.border,
                        outlineVariant: colors.border,
                      },
                    }}
                    disabled={isActionQueued}
                  />
                )}
              />
              {errors.password && (
                <Text
                  style={{
                    color: colors.error,
                    fontSize: typo.body4.fontSize,
                    marginTop: layout.spacing.xs,
                    ...typo.body4,
                  }}
                >
                  {errors.password.message}
                </Text>
              )}
            </View>

            {/* Forgot Password */}
            <TouchableOpacity
              onPress={handleForgotPassword}
              style={{
                alignSelf: "flex-end",
                marginBottom: layout.spacing.xl,
              }}
            >
              <Text
                style={{
                  fontSize: typo.body3.fontSize,
                  color: colors.primary,
                  fontWeight: "500",
                  ...typo.body3,
                }}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* Login Button */}
            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              disabled={isLoggingIn || isActionQueued}
              loading={isLoggingIn}
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
              Login
            </Button>

            {/* Sign Up Link */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: typo.body3.fontSize,
                  color: "rgba(17, 12, 9, 0.6)",
                  ...typo.body3,
                }}
              >
                {`Don't have an account? `}
              </Text>
              <TouchableOpacity onPress={handleSignUp}>
                <Text
                  style={{
                    fontSize: typo.body3.fontSize,
                    color: colors.primary,
                    fontWeight: "600",
                    ...typo.body3,
                  }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
