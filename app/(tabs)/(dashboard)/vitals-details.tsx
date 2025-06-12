import VitalDetailCard from "@/components/dashboard/VitalDetailCard";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import { Button, Portal, Dialog, Text } from "react-native-paper";
import { useTheme } from "@/lib/hooks/useTheme";

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
  const { colors, typo, layout } = useTheme();

  // Mock vital readings data
  const vitalReadings: VitalReading[] = [
    {
      id: "1",
      name: "Fetal Heart Rate",
      value: "142",
      unit: "BPM",
      status: "normal",
      chartData: [138, 140, 142, 144, 141, 143, 142, 140, 141, 143],
      chartColor: colors.error,
      hasChart: true,
    },
    {
      id: "2",
      name: "Maternal Heart Rate",
      value: "86",
      unit: "BPM",
      status: "normal",
      chartData: [80, 82, 84, 86, 85, 87, 86, 84, 85, 86],
      chartColor: colors.info,
      hasChart: true,
    },
    {
      id: "3",
      name: "Blood Pressure",
      value: "120/80",
      unit: "mmHg",
      status: "normal",
      trend: "stable",
      chartColor: colors.infoDark,
      hasChart: false,
    },
    {
      id: "4",
      name: "Oxygen Saturation",
      value: "98",
      unit: "%",
      status: "normal",
      chartColor: colors.success,
      hasChart: false,
    },
    {
      id: "5",
      name: "Temperature",
      value: "37.2",
      unit: "°C",
      status: "normal",
      trend: "up",
      chartColor: colors.warning,
      hasChart: false,
    },
    {
      id: "6",
      name: "Respiratory Rate",
      value: "16",
      unit: "breaths/min",
      status: "normal",
      trend: "stable",
      chartColor: colors.primary,
      hasChart: false,
    },
    {
      id: "7",
      name: "Heart Rate Variability",
      value: "68",
      unit: "ms",
      status: "normal",
      chartData: [65, 67, 68, 70, 69, 71, 68, 66, 67, 69],
      chartColor: colors.successDark,
      hasChart: true,
    },
    {
      id: "8",
      name: "Shock Index",
      value: "0.7",
      unit: "",
      status: "normal",
      trend: "stable",
      chartColor: colors.successLight,
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
    console.log("Monitoring stopped");
    // Navigate back to dashboard
    router.push("/dashboard");
  };

  const cancelStopMonitoring = () => {
    setShowStopDialog(false);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <CustomAppBar
        title="Vitals Details"
        rightAction="info"
        onInfoPress={handleInfo}
      />

      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: layout.spacing.lg,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: layout.spacing.sm,
          paddingBottom: layout.spacing.xxl,
        }}
      >
        {vitalReadings.map((vital) => (
          <VitalDetailCard key={vital.id} vital={vital} />
        ))}
      </ScrollView>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: colors.card,
          padding: layout.spacing.sm,
          paddingBottom: layout.spacing.lg,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        }}
      >
        <Button
          mode="contained"
          onPress={handleStopMonitoring}
          style={{
            borderRadius: layout.borderRadius.medium,
            elevation: layout.elevation,
          }}
          buttonColor={colors.primary}
          contentStyle={{
            paddingVertical: layout.spacing.sm,
          }}
          icon="stop-circle-outline"
        >
          Stop Monitoring
        </Button>
      </View>

      <Portal>
        <Dialog
          visible={showStopDialog}
          onDismiss={cancelStopMonitoring}
          style={{
            backgroundColor: colors.card,
          }}
        >
          <Dialog.Title
            style={{
              fontSize: typo.h4.fontSize,
              fontWeight: "600",
              color: colors.text,
              ...typo.h4,
            }}
          >
            Stop Monitoring?
          </Dialog.Title>
          <Dialog.Content>
            <Text
              style={{
                fontSize: typo.body1.fontSize,
                color: colors.text,
                lineHeight: typo.body1.lineHeight,
                ...typo.body1,
              }}
            >
              Are you sure you want to stop monitoring? This will disconnect
              your device and end the current session.
            </Text>
          </Dialog.Content>
          <Dialog.Actions
            style={{
              paddingTop: layout.spacing.sm,
            }}
          >
            <Button onPress={cancelStopMonitoring} textColor={colors.text}>
              Cancel
            </Button>
            <Button
              onPress={confirmStopMonitoring}
              buttonColor={colors.error}
              mode="contained"
              style={{
                borderRadius: layout.borderRadius.medium,
              }}
            >
              Stop
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
}
