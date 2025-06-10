import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const router = useRouter();

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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Lock Icon */}
          <View style={styles.iconContainer}>
            <View style={styles.lockCircle}>
              <Ionicons name="lock-closed" size={32} color="#fff" />
            </View>
          </View>

          {/* Title and Description */}
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.description}>
            Enter your email address to reset your password.
          </Text>

          {/* Form */}
          <View style={styles.formContainer}>
            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                mode="outlined"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                right={<TextInput.Icon icon="email-outline" />}
                style={styles.textInput}
                outlineStyle={styles.inputOutline}
                theme={{
                  colors: {
                    outline: "#E5E5E5",
                    outlineVariant: "#E5E5E5",
                  },
                }}
              />
            </View>

            {/* Send Reset Link Button */}
            <Button
              mode="contained"
              onPress={handleSendResetLink}
              style={styles.resetButton}
              labelStyle={styles.resetButtonText}
              buttonColor="#A67C5A"
            >
              Send Reset Link
            </Button>

            {/* Back to Login Link */}
            <TouchableOpacity
              onPress={handleBackToLogin}
              style={styles.backToLoginContainer}
            >
              <Text style={styles.backToLoginText}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 32,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  lockCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#A67C5A",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1A1A1A",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    marginBottom: 48,
    lineHeight: 24,
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 32,
  },
  inputLabel: {
    fontSize: 14,
    color: "#1A1A1A",
    marginBottom: 8,
    fontWeight: "500",
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    fontSize: 16,
  },
  inputOutline: {
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderRadius: 12,
  },
  resetButton: {
    borderRadius: 12,
    paddingVertical: 8,
    marginBottom: 24,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  backToLoginContainer: {
    alignItems: "center",
  },
  backToLoginText: {
    fontSize: 14,
    color: "#666666",
    fontWeight: "500",
  },
});
