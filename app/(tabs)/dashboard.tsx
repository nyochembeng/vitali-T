import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Pressable,
} from "react-native";
import { Text, Button, Card, Portal, Dialog } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import VitalCard from "@/components/dashboard/VitalCard";
import QuickActionButton from "@/components/dashboard/QuickActionButton";
import { useRouter } from "expo-router";
import CustomAppBar from "@/components/utils/CustomAppBar";

interface VitalMetric {
  id: string;
  title: string;
  value: string | number;
  unit: string;
  icon: string;
  chartData?: number[];
  color?: string;
}

interface QuickAction {
  id: string;
  title: string;
  icon: string;
  onPress: () => void;
}

export default function DashboardScreen() {
  // State to track monitoring status
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [showStopDialog, setShowStopDialog] = useState(false);
  const router = useRouter();

  // Mock data - replace with actual data from your state management
  const vitals: VitalMetric[] = [
    {
      id: "1",
      title: "Fetal Heart Rate",
      value: "142",
      unit: "BPM",
      icon: "heart",
      chartData: [138, 140, 142, 144, 141, 143, 142],
      color: "#FF6B6B",
    },
    {
      id: "2",
      title: "Maternal Heart Rate",
      value: "82",
      unit: "BPM",
      icon: "heart-pulse",
      chartData: [80, 82, 84, 81, 83, 82, 84],
      color: "#4ECDC4",
    },
    {
      id: "3",
      title: "Blood Pressure",
      value: "120/80",
      unit: "mmHg",
      icon: "water",
      chartData: [118, 120, 122, 119, 121, 120, 123],
      color: "#45B7D1",
    },
    {
      id: "4",
      title: "Oxygen Saturation",
      value: "98",
      unit: "%",
      icon: "lungs",
      chartData: [97, 98, 99, 98, 97, 98, 99],
      color: "#96CEB4",
    },
    {
      id: "5",
      title: "Body Temperature",
      value: "37.2",
      unit: "°C",
      icon: "thermometer",
      chartData: [36.8, 37.0, 37.2, 37.1, 37.3, 37.2, 37.0],
      color: "#FFEAA7",
    },
    {
      id: "6",
      title: "Respiratory Rate",
      value: "16",
      unit: "BPM",
      icon: "lungs",
      chartData: [14, 15, 16, 17, 15, 16, 18],
      color: "#DDA0DD",
    },
    {
      id: "7",
      title: "Heart Rate Variability",
      value: "65",
      unit: "ms",
      icon: "chart-line-variant",
      chartData: [62, 64, 65, 67, 64, 66, 65],
      color: "#FFB347",
    },
    {
      id: "8",
      title: "Shock Index",
      value: "0.68",
      unit: "SI",
      icon: "chart-timeline-variant",
      chartData: [0.65, 0.67, 0.68, 0.7, 0.66, 0.69, 0.68],
      color: "#FF9AA2",
    },
  ];

  const quickActions: QuickAction[] = [
    {
      id: "1",
      title: "Symptoms",
      icon: "alert-circle-outline",
      onPress: () => {
        console.log("Symptoms pressed");
        router.push("/log-symptoms");
      },
    },
    {
      id: "2",
      title: "Movement",
      icon: "run",
      onPress: () => {
        console.log("Movement pressed");
        router.push("/log-fetal-movements");
      },
    },
    {
      id: "3",
      title: "Activity",
      icon: "heart",
      onPress: () => {
        console.log("Activity pressed");
        router.push("/log-activity");
      },
    },
    {
      id: "4",
      title: "Sleep",
      icon: "moon-waning-crescent",
      onPress: () => {
        console.log("Sleep pressed");
        router.push("/log-sleep");
      },
    },
    {
      id: "5",
      title: "Contractions",
      icon: "pulse",
      onPress: () => {
        console.log("Contractions pressed");
        router.push("/log-contractions");
      },
    },
  ];

  const handleStartMonitoring = () => {
    // Logic to start monitoring goes here
    // For example, connect to the Bluetooth device or start the session
    console.log("Start monitoring pressed");
    router.push("/bluetooth-connection");
    setIsMonitoring(true);
  };

  const handleStopMonitoring = () => {
    setShowStopDialog(true);
  };

  const confirmStopMonitoring = () => {
    // Logic to stop monitoring goes here
    // For example, disconnect from the device or stop the session
    setIsMonitoring(false);
    setShowStopDialog(false);
    console.log("Monitoring stopped");
  };

  const cancelStopMonitoring = () => {
    setShowStopDialog(false);
  };

  const handleAlertPress = () => {
    console.log("Alert pressed");
    router.push("/alert-details");

    // Navigate to alert details screen with sample data
    router.push({
      pathname: "/alert-details",
      params: {
        alertType: "Normal Range Alert",
        value: "All vitals normal",
        timestamp: new Date().toLocaleString(),
        safeRange: "Within expected parameters",
        riskLevel: "Low",
        recommendedAction:
          "Continue monitoring as usual. Maintain current health routine and regular check-ups.",
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomAppBar title="Dashboard" isHome />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Status Banner - Only show when monitoring is active */}
        {isMonitoring && (
          <View style={styles.statusContainer}>
            <View style={styles.statusIndicator}>
              <MaterialCommunityIcons name="circle" size={8} color="#4CAF50" />
              <Text style={styles.statusText}>Monitoring Active</Text>
            </View>
          </View>
        )}

        {/* Alert Card - Only show when monitoring is active */}
        {isMonitoring && (
          <Pressable
            onPress={handleAlertPress}
            style={({ pressed }) => [
              styles.alertCard,
              pressed && styles.alertCardPressed,
            ]}
          >
            <Card style={styles.alertCardInner} mode="contained">
              <Card.Content style={styles.alertContent}>
                <MaterialCommunityIcons
                  name="alert-outline"
                  size={20}
                  color="#FF9800"
                />
                <Text style={styles.alertText}>
                  All vital signs are within normal range
                </Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={20}
                  color="#666"
                  style={styles.chevronIcon}
                />
              </Card.Content>
            </Card>
          </Pressable>
        )}

        {/* Monitoring Control Button */}
        {isMonitoring ? (
          <Button
            mode="contained"
            style={styles.stopButton}
            buttonColor="#8B5A3C"
            contentStyle={styles.buttonContent}
            onPress={handleStopMonitoring}
            icon="bluetooth-off"
          >
            Stop Monitoring
          </Button>
        ) : (
          <Button
            mode="contained"
            style={styles.startButton}
            buttonColor="#8B5A3C"
            contentStyle={styles.buttonContent}
            onPress={handleStartMonitoring}
            icon="bluetooth"
          >
            Start Monitoring
          </Button>
        )}

        {/* Vital Signs Grid*/}
        <View style={styles.vitalsGrid}>
          {vitals.map((vital, index) => (
            <View key={vital.id} style={styles.vitalCardContainer}>
              <VitalCard metric={vital} />
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <QuickActionButton key={action.id} action={action} />
            ))}
          </View>
        </View>
      </ScrollView>

      <Portal>
        <Dialog
          visible={showStopDialog}
          onDismiss={cancelStopMonitoring}
          style={styles.dialog}
        >
          <Dialog.Title style={styles.dialogTitle}>
            Stop Monitoring?
          </Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogText}>
              Are you sure you want to stop monitoring? This will disconnect
              your device and end the current session.
            </Text>
          </Dialog.Content>
          <Dialog.Actions style={styles.dialogActions}>
            <Button onPress={cancelStopMonitoring} textColor="#666">
              Cancel
            </Button>
            <Button
              onPress={confirmStopMonitoring}
              buttonColor="#8B5A3C"
              mode="contained"
              style={styles.confirmButton}
            >
              Stop
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    backgroundColor: "#FFF",
    elevation: 0,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  statusContainer: {
    alignItems: "center",
    marginTop: 16,
    marginBottom: 12,
  },
  statusIndicator: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "500",
  },
  alertCard: {
    marginBottom: 16,
    backgroundColor: "#FFF8E1",
    elevation: 2,
  },
  alertContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  alertText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  alertCardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  alertCardInner: {
    backgroundColor: "transparent",
    elevation: 0,
  },
  chevronIcon: {
    marginLeft: 8,
  },
  stopButton: {
    marginBottom: 24,
    borderRadius: 12,
  },
  startButton: {
    marginBottom: 24,
    borderRadius: 12,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  vitalsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -6,
  },
  vitalCardContainer: {
    width: "50%",
  },
  quickActionsContainer: {
    marginTop: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: "row",
    // flexWrap: "wrap",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    elevation: 1,
  },
  dialog: {
    backgroundColor: "#FFF",
  },
  dialogTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
  },
  dialogText: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
  dialogActions: {
    paddingTop: 16,
  },
  confirmButton: {
    borderRadius: 8,
  },
});
