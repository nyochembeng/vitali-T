import { useRouter } from "expo-router";
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

export default function SignUpScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleSignUp = () => {
    if (password === confirmPassword) {
      //   Perform sign-up logic here
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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <Text style={styles.appName}>Vitali-T</Text>
          <Text style={styles.title}>Create Your Account</Text>

          {/* Form */}
          <View style={styles.formContainer}>
            {/* Full Name Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                mode="outlined"
                placeholder="Enter your full name"
                value={fullName}
                onChangeText={setFullName}
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

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                mode="outlined"
                placeholder="Enter your email address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
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

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
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

            {/* Confirm Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
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

            {/* Sign Up Button */}
            <Button
              mode="contained"
              onPress={handleSignUp}
              style={styles.signUpButton}
              labelStyle={styles.signUpButtonText}
              buttonColor="#A67C5A"
            >
              Sign Up
            </Button>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={handleLogin}>
                <Text style={styles.loginLink}>Log In</Text>
              </TouchableOpacity>
            </View>
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
    paddingTop: 60,
    paddingBottom: 32,
  },
  appName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1A1A",
    textAlign: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1A1A1A",
    textAlign: "center",
    marginBottom: 40,
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
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
  signUpButton: {
    borderRadius: 12,
    paddingVertical: 8,
    marginTop: 12,
    marginBottom: 24,
  },
  signUpButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontSize: 14,
    color: "#666666",
  },
  loginLink: {
    fontSize: 14,
    color: "#A67C5A",
    fontWeight: "600",
  },
});
