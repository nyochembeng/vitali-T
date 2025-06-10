import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import CustomAppBar from "@/components/utils/CustomAppBar";

export default function DeleteAccountScreen() {
  const router = useRouter();

  const handleDeleteAccount = () => {
    // Logic to delete the account goes here
    console.log("Account deletion requested");
    // After deletion, navigate to the login screen
    router.push("/auth/login");
  };
  const handleCancel = () => {
    console.log("Deletion cancellation requested");
    // Navigate back to the previous screen
    router.back();
  };
  const handleContactSupport = () => {
    console.log("Support request initiated");
    // Navigate to the support screen
    router.push("/help");
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomAppBar title="Delete Account" rightAction="help" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Trash Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <MaterialIcons name="delete-outline" size={48} color="#A0826A" />
          </View>
        </View>

        {/* Warning Message */}
        <View style={styles.warningContainer}>
          <MaterialIcons name="warning" size={20} color="#D2691E" />
          <Text style={styles.warningText}>
            Are you sure you want to delete your Vitali-T account? This action
            is irreversible.
          </Text>
        </View>

        {/* Information Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>This will permanently delete:</Text>

          <View style={styles.infoList}>
            <View style={styles.infoItem}>
              <View style={styles.bullet} />
              <Text style={styles.infoText}>
                Your profile and personal information
              </Text>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.bullet} />
              <Text style={styles.infoText}>
                Your activity history and preferences
              </Text>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.bullet} />
              <Text style={styles.infoText}>All saved data and settings</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleDeleteAccount}
            style={styles.deleteButton}
            labelStyle={styles.deleteButtonText}
          >
            Delete My Account
          </Button>

          <Button
            mode="outlined"
            onPress={handleCancel}
            style={styles.cancelButton}
            labelStyle={styles.cancelButtonText}
          >
            Cancel
          </Button>
        </View>

        {/* Support Link */}
        <Button
          mode="text"
          onPress={handleContactSupport}
          style={styles.supportButton}
          labelStyle={styles.supportButtonText}
        >
          Need help? Contact Support
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  placeholder: {
    width: 48,
  },
  iconContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F5F0EC",
    alignItems: "center",
    justifyContent: "center",
  },
  warningContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF8F0",
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
    alignItems: "flex-start",
  },
  warningText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  infoSection: {
    marginBottom: 40,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 16,
  },
  infoList: {
    gap: 12,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#666",
    marginTop: 8,
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 24,
  },
  deleteButton: {
    backgroundColor: "#A0826A",
    borderRadius: 12,
    paddingVertical: 4,
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  cancelButton: {
    borderColor: "#A0826A",
    borderRadius: 12,
    paddingVertical: 4,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#A0826A",
  },
  supportButton: {
    alignSelf: "center",
  },
  supportButtonText: {
    fontSize: 14,
    color: "#999",
  },
});
