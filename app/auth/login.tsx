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

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { colors, typo, layout } = useTheme();

  const handleLogin = () => {
    // Perform login logic here
    console.log("Logging in with:", { email, password });
    router.push("/dashboard");
  };

  const handleForgotPassword = () => {
    router.push("/auth/forgot-password");
  };

  const handleSignUp = () => {
    router.push("/auth/sign-up");
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
          <View
            style={{
              flex: 1,
            }}
          >
            {/* Email Input */}
            <View
              style={{
                marginBottom: layout.spacing.lg,
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
                Email address
              </Text>
              <TextInput
                mode="outlined"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                left={<TextInput.Icon icon="email-outline" />}
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

            {/* Password Input */}
            <View
              style={{
                marginBottom: layout.spacing.lg,
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
                Password
              </Text>
              <TextInput
                mode="outlined"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
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
              onPress={handleLogin}
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
