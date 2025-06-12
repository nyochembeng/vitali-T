import { useRouter } from "expo-router";
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
import { useTheme } from "@/lib/hooks/useTheme";

export default function SignUpScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { colors, typo, layout } = useTheme();

  const handleSignUp = () => {
    if (password === confirmPassword) {
      // Perform sign-up logic here
      console.log("Sign-up with:", {
        fullName,
        email,
        password,
      });
      router.push("/profile-setup");
    }
  };

  const handleLogin = () => {
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
          <View
            style={{
              flex: 1,
            }}
          >
            {/* Full Name Input */}
            <View
              style={{
                marginBottom: layout.spacing.md,
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
                Full Name
              </Text>
              <TextInput
                mode="outlined"
                placeholder="Enter your full name"
                value={fullName}
                onChangeText={setFullName}
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

            {/* Email Input */}
            <View
              style={{
                marginBottom: layout.spacing.md,
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
                placeholder="Enter your email address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
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
                marginBottom: layout.spacing.md,
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
                placeholder="Create a password"
                value={password}
                onChangeText={setPassword}
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

            {/* Confirm Password Input */}
            <View
              style={{
                marginBottom: layout.spacing.md,
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
                Confirm Password
              </Text>
              <TextInput
                mode="outlined"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                right={
                  <TextInput.Icon
                    icon={showConfirmPassword ? "eye-off" : "eye"}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
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

            {/* Sign Up Button */}
            <Button
              mode="contained"
              onPress={handleSignUp}
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
