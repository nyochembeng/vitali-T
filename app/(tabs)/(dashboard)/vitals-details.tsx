import VitalDetailCard from "@/components/dashboard/VitalDetailCard";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Button, Portal, Dialog, Text } from "react-native-paper";

interface VitalReading {
  id: string;
  name: string;
  value: string | number;
  unit: string;
  status: "normal" | "warning" | "critical";
  chartData?: number[];
  trend?: "up" | "down" | "stable";
  chartColor: string;
  hasChart?: boolean;
}

export default function VitalsDetailsScreen() {
  const [showStopDialog, setShowStopDialog] = useState(false);
  const router = useRouter();

  // Mock vital readings data
  const vitalReadings: VitalReading[] = [
    {
      id: "1",
      name: "Fetal Heart Rate",
      value: "142",
      unit: "BPM",
      status: "normal",
      chartData: [138, 140, 142, 144, 141, 143, 142, 140, 141, 143],
      chartColor: "#FF6B6B",
      hasChart: true,
    },
    {
      id: "2",
      name: "Maternal Heart Rate",
      value: "86",
      unit: "BPM",
      status: "normal",
      chartData: [80, 82, 84, 86, 85, 87, 86, 84, 85, 86],
      chartColor: "#4ECDC4",
      hasChart: true,
    },
    {
      id: "3",
      name: "Blood Pressure",
      value: "120/80",
      unit: "mmHg",
      status: "normal",
      trend: "stable",
      chartColor: "#45B7D1",
      hasChart: false,
    },
    {
      id: "4",
      name: "Oxygen Saturation",
      value: "98",
      unit: "%",
      status: "normal",
      chartColor: "#96CEB4",
      hasChart: false,
    },
    {
      id: "5",
      name: "Temperature",
      value: "37.2",
      unit: "°C",
      status: "normal",
      trend: "up",
      chartColor: "#FFD93D",
      hasChart: false,
    },
    {
      id: "6",
      name: "Respiratory Rate",
      value: "16",
      unit: "breaths/min",
      status: "normal",
      trend: "stable",
      chartColor: "#B8860B",
      hasChart: false,
    },
    {
      id: "7",
      name: "Heart Rate Variability",
      value: "68",
      unit: "ms",
      status: "normal",
      chartData: [65, 67, 68, 70, 69, 71, 68, 66, 67, 69],
      chartColor: "#20B2AA",
      hasChart: true,
    },
    {
      id: "8",
      name: "Shock Index",
      value: "0.7",
      unit: "",
      status: "normal",
      trend: "stable",
      chartColor: "#32CD32",
      hasChart: false,
    },
  ];

  const handleInfo = () => {
    router.push("/vital-signs-education");
  };

  const handleStopMonitoring = () => {
    setShowStopDialog(true);
  };

  const confirmStopMonitoring = () => {
    setShowStopDialog(false);
    // Logic to stop monitoring goes here
    // For example, disconnect from the device or stop the session
    console.log("Monitoring stopped");
    // Navigate back to dashboard
    router.push("/dashboard");
  };

  const cancelStopMonitoring = () => {
    setShowStopDialog(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomAppBar
        title="Vitals Details"
        rightAction="info"
        onInfoPress={handleInfo}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {vitalReadings.map((vital) => (
          <VitalDetailCard key={vital.id} vital={vital} />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={handleStopMonitoring}
          style={styles.stopButton}
          buttonColor="#8B5A3C"
          contentStyle={styles.stopButtonContent}
          icon="stop-circle-outline"
        >
          Stop Monitoring
        </Button>
      </View>

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
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 100,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    padding: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  stopButton: {
    borderRadius: 12,
    elevation: 2,
  },
  stopButtonContent: {
    paddingVertical: 8,
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
