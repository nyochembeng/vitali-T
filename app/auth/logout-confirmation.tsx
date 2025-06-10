import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function LogoutConfirmationScreen() {
  const theme = useTheme();
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
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
      />

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: theme.colors.surfaceVariant },
            ]}
          >
            <MaterialCommunityIcons name="logout" size={40} color="#B8860B" />
          </View>
        </View>

        <Text
          variant="headlineMedium"
          style={[styles.title, { color: theme.colors.onBackground }]}
        >
          Log Out
        </Text>

        <View
          style={[
            styles.messageContainer,
            { backgroundColor: theme.colors.surfaceVariant },
          ]}
        >
          <Text
            variant="bodyMedium"
            style={[styles.message, { color: theme.colors.onSurfaceVariant }]}
          >
            Are you sure you want to log out from Vitali-T?
          </Text>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          mode="contained"
          onPress={handleLogout}
          style={[styles.logoutButton, { backgroundColor: "#B8860B" }]}
          contentStyle={styles.buttonContent}
          labelStyle={styles.logoutButtonLabel}
        >
          Log Out
        </Button>

        <Button
          mode="outlined"
          onPress={handleCancel}
          style={[styles.cancelButton, { borderColor: theme.colors.outline }]}
          contentStyle={styles.buttonContent}
          labelStyle={[
            styles.cancelButtonLabel,
            { color: theme.colors.onSurface },
          ]}
        >
          Cancel
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 100,
  },
  iconContainer: {
    marginBottom: 32,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "600",
    marginBottom: 24,
    textAlign: "center",
  },
  messageContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderRadius: 16,
    marginHorizontal: 16,
  },
  message: {
    textAlign: "center",
    lineHeight: 22,
  },
  buttonsContainer: {
    paddingBottom: 34,
    gap: 16,
  },
  logoutButton: {
    borderRadius: 25,
    elevation: 2,
  },
  cancelButton: {
    borderRadius: 25,
    borderWidth: 1,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  logoutButtonLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  cancelButtonLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
});
