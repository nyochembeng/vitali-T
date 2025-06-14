import { useTheme } from "@/lib/hooks/useTheme";
import { SignUp, signUpSchema } from "@/lib/schemas/userSchema";
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

export default function SignUpScreen() {
  const router = useRouter();
  const { colors, typo, layout } = useTheme();
  const { signUp, isSigningUp, isActionQueued } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUp>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const onSubmit = async (data: SignUp) => {
    try {
      const result = await signUp(data);
      if ("queued" in result && result.queued) {
        return; // Queued actions handled by Toast and SyncStatus
      }
      router.replace("/profile-setup");
    } catch (error: any) {
      Alert.alert(
        "Sign Up Failed",
        error?.data?.message || "Unable to create account. Please try again.",
        [{ text: "OK" }]
      );
    }
  };

  const handleLogin = () => {
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
            paddingTop: layout.spacing.xl,
            paddingBottom: layout.spacing.md,
          }}
        >
          {/* Header */}
          <Text
            style={{
              fontSize: typo.h6.fontSize,
              fontWeight: "700",
              color: colors.text,
              textAlign: "center",
              marginBottom: layout.spacing.sm,
              ...typo.h6,
            }}
          >
            Vitali-T
          </Text>
          <Text
            style={{
              fontSize: typo.h4.fontSize,
              fontWeight: "600",
              color: colors.text,
              textAlign: "center",
              marginBottom: layout.spacing.xl,
              ...typo.h4,
            }}
          >
            Create Your Account
          </Text>

          {/* Form */}
          <View style={{ flex: 1 }}>
            {/* Full Name Input */}
            <View style={{ marginBottom: layout.spacing.md }}>
              <Text
                style={{
                  fontSize: typo.body3.fontSize,
                  color: colors.text,
                  marginBottom: layout.spacing.sm,
                  fontWeight: "500",
                  ...typo.body3,
                }}
              >
                Full Name
              </Text>
              <Controller
                control={control}
                name="fullname"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    mode="outlined"
                    placeholder="Enter your full name"
                    value={value}
                    onChangeText={onChange}
                    style={{
                      backgroundColor: colors.card,
                      fontSize: typo.body1.fontSize,
                      ...typo.body1,
                    }}
                    outlineStyle={{
                      borderColor: errors.fullname
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
              {errors.fullname && (
                <Text
                  style={{
                    color: colors.error,
                    fontSize: typo.body4.fontSize,
                    marginTop: layout.spacing.xs,
                    ...typo.body4,
                  }}
                >
                  {errors.fullname.message}
                </Text>
              )}
            </View>

            {/* Email Input */}
            <View style={{ marginBottom: layout.spacing.md }}>
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
                    placeholder="Enter your email address"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
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
            <View style={{ marginBottom: layout.spacing.md }}>
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
                    placeholder="Create a password"
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={!showPassword}
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
                    maxWidth: "90%",
                  }}
                >
                  {errors.password.message}
                </Text>
              )}
            </View>

            {/* Confirm Password Input */}
            <View style={{ marginBottom: layout.spacing.md }}>
              <Text
                style={{
                  fontSize: typo.body3.fontSize,
                  color: colors.text,
                  marginBottom: layout.spacing.sm,
                  fontWeight: "500",
                  ...typo.body3,
                }}
              >
                Confirm Password
              </Text>
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    mode="outlined"
                    placeholder="Confirm your password"
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={!showConfirmPassword}
                    right={
                      <TextInput.Icon
                        icon={showConfirmPassword ? "eye-off" : "eye"}
                        onPress={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      />
                    }
                    style={{
                      backgroundColor: colors.card,
                      fontSize: typo.body1.fontSize,
                      ...typo.body1,
                    }}
                    outlineStyle={{
                      borderColor: errors.confirmPassword
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
              {errors.confirmPassword && (
                <Text
                  style={{
                    color: colors.error,
                    fontSize: typo.body4.fontSize,
                    marginTop: layout.spacing.xs,
                    ...typo.body4,
                  }}
                >
                  {errors.confirmPassword.message}
                </Text>
              )}
            </View>

            {/* Sign Up Button */}
            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              disabled={isSigningUp || isActionQueued}
              loading={isSigningUp}
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
              Sign Up
            </Button>

            {/* Login Link */}
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
                Already have an account?{" "}
              </Text>
              <TouchableOpacity onPress={handleLogin}>
                <Text
                  style={{
                    fontSize: typo.body3.fontSize,
                    color: colors.primary,
                    fontWeight: "600",
                    ...typo.body3,
                  }}
                >
                  Log In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
