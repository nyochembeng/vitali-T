import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Image, Dimensions } from "react-native";
import { Text, Button, Checkbox } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import SetupStep from "@/components/setup/SetupStep";
import PageIndicator from "@/components/utils/PageIndicator";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function GettingStartedScreen() {
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const router = useRouter();

  const handleComplete = () => {
    if (dontShowAgain) {
      //   Save preference to not show this screen again
      console.log("User opted to not show this screen again");
    }
    router.push("/dashboard");
  };

  const setupSteps = [
    {
      stepNumber: 1,
      title: "Open Your Dashboard",
      description:
        'After creating your account, you\'ll land on your dashboard. Tap the "Start Recording" button to begin.',
      // image: require("../assets/images/dashboard-setup.jpg"),
    },
    {
      stepNumber: 2,
      title: "Connect to Your Device",
      instructions: [
        "Turn on Bluetooth on your mobile phone",
        "Power on the Vitali-T device",
        "Search for and select the device in the app",
      ],
      // image: require("../assets/images/device-connection.jpg"),
    },
    {
      stepNumber: 3,
      title: "Monitor Maternal Heart Rate",
      instructions: [
        "Attach the ECG sensor cathodes on your chest as shown",
        "Once connected, MHR data streams live to your phone",
      ],
      // image: require("../assets/images/ecg-sensor.jpg"),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text variant="headlineSmall" style={styles.title}>
            Getting Started with Vitali-T
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            {`Welcome! Let's walk you through how to record and monitor your vital signs using Vitali-T.`}
          </Text>
        </View>

        {/* Setup Steps */}
        {setupSteps.map((step, index) => (
          <SetupStep
            key={index}
            stepNumber={step.stepNumber}
            title={step.title}
            description={step.description}
            instructions={step.instructions}
            // image={step.image}
          />
        ))}

        {/* Advanced Monitoring Section */}
        <View style={styles.advancedSection}>
          <View style={styles.advancedHeader}>
            <MaterialIcons name="devices" size={24} color="#A67B5B" />
            <Text variant="titleMedium" style={styles.advancedTitle}>
              Advanced Monitoring
            </Text>
          </View>

          {/* <Image
            source={require("../assets/images/advanced-monitoring.jpg")}
            style={styles.advancedImage}
            resizeMode="cover"
          /> */}

          <Text variant="bodyMedium" style={styles.advancedDescription}>
            Each vital sign has unique setup steps. View full tutorials for FHR,
            BP, SpO₂, and more.
          </Text>
        </View>

        {/* Success Section */}
        <View style={styles.successSection}>
          <View style={styles.successIcon}>
            <MaterialIcons name="check" size={32} color="#FFFFFF" />
          </View>

          <Text variant="titleLarge" style={styles.successTitle}>
            {`You're All Set!`}
          </Text>

          <Text variant="bodyMedium" style={styles.successDescription}>
            {`You're ready to start tracking your vitals regularly. Visit the dashboard anytime to begin new recordings.`}
          </Text>

          {/* <Image
            source={require("../assets/images/success-woman.jpg")}
            style={styles.successImage}
            resizeMode="cover"
          /> */}
        </View>

        {/* Page Indicator */}
        <PageIndicator currentPage={0} totalPages={3} />

        {/* Don't Show Again Checkbox */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={dontShowAgain ? "checked" : "unchecked"}
            onPress={() => setDontShowAgain(!dontShowAgain)}
            color="#A67B5B"
          />
          <Text variant="bodyMedium" style={styles.checkboxLabel}>
            {`Don't show this again`}
          </Text>
        </View>

        {/* Complete Button */}
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleComplete}
            style={styles.completeButton}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
          >
            Got It - Take me to Dashboard
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontWeight: "700",
    color: "#2C2C2C",
    marginBottom: 12,
  },
  subtitle: {
    color: "#666666",
    lineHeight: 20,
  },
  advancedSection: {
    marginTop: 30,
    marginBottom: 30,
  },
  advancedHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  advancedTitle: {
    color: "#2C2C2C",
    fontWeight: "600",
    marginLeft: 8,
  },
  advancedImage: {
    width: "100%",
    height: 120,
    borderRadius: 12,
    marginBottom: 12,
  },
  advancedDescription: {
    color: "#666666",
    lineHeight: 20,
  },
  successSection: {
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    borderRadius: 16,
    padding: 24,
    marginTop: 20,
    marginBottom: 30,
  },
  successIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  successTitle: {
    color: "#2C2C2C",
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  successDescription: {
    color: "#666666",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
  },
  successImage: {
    width: width * 0.6,
    height: 120,
    borderRadius: 12,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  checkboxLabel: {
    color: "#666666",
    marginLeft: 8,
  },
  buttonContainer: {
    marginTop: 10,
  },
  completeButton: {
    backgroundColor: "#A67B5B",
    borderRadius: 25,
    height: 50,
  },
  buttonContent: {
    height: 50,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
