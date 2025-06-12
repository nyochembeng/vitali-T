import React, { useState } from "react";
import { View, ScrollView, SafeAreaView, Pressable } from "react-native";
import { Text, Button, Card, Portal, Dialog } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import VitalCard from "@/components/dashboard/VitalCard";
import QuickActionButton from "@/components/dashboard/QuickActionButton";
import { useRouter } from "expo-router";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useTheme } from "@/lib/hooks/useTheme";

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
  const { colors, typo, layout } = useTheme();
  const chartColor = colors.accent;

  // Mock data - replace with actual data from your state management
  const vitals: VitalMetric[] = [
    {
      id: "1",
      title: "Fetal Heart Rate",
      value: "142",
      unit: "BPM",
      icon: "heart",
      chartData: [138, 140, 142, 144, 141, 143, 142],
      color: chartColor,
    },
    {
      id: "2",
      title: "Maternal Heart Rate",
      value: "82",
      unit: "BPM",
      icon: "heart-pulse",
      chartData: [80, 82, 84, 81, 83, 82, 84],
      color: chartColor,
    },
    {
      id: "3",
      title: "Blood Pressure",
      value: "120/80",
      unit: "mmHg",
      icon: "water",
      chartData: [118, 120, 122, 119, 121, 120, 123],
      color: chartColor,
    },
    {
      id: "4",
      title: "Oxygen Saturation",
      value: "98",
      unit: "%",
      icon: "lungs",
      chartData: [97, 98, 99, 98, 97, 98, 99],
      color: chartColor,
    },
    {
      id: "5",
      title: "Body Temperature",
      value: "37.2",
      unit: "°C",
      icon: "thermometer",
      chartData: [36.8, 37.0, 37.2, 37.1, 37.3, 37.2, 37.0],
      color: chartColor,
    },
    {
      id: "6",
      title: "Respiratory Rate",
      value: "16",
      unit: "BPM",
      icon: "lungs",
      chartData: [14, 15, 16, 17, 15, 16, 18],
      color: chartColor,
    },
    {
      id: "7",
      title: "Heart Rate Variability",
      value: "65",
      unit: "ms",
      icon: "chart-line-variant",
      chartData: [62, 64, 65, 67, 64, 66, 65],
      color: chartColor,
    },
    {
      id: "8",
      title: "Shock Index",
      value: "0.68",
      unit: "SI",
      icon: "chart-timeline-variant",
      chartData: [0.65, 0.67, 0.68, 0.7, 0.66, 0.69, 0.68],
      color: chartColor,
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

  const handleViewVitalsDetails = () => {
    console.log("View vitals details pressed");
    router.push("/vitals-details");
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <CustomAppBar title="Dashboard" isHome />

      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: layout.spacing.sm,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Status Banner - Only show when monitoring is active */}
        {isMonitoring && (
          <View
            style={{
              alignItems: "center",
              marginTop: layout.spacing.sm,
              marginBottom: layout.spacing.xs,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name="circle"
                size={8}
                color={colors.success}
              />
              <Text
                style={{
                  marginLeft: layout.spacing.sm,
                  fontSize: typo.body3.fontSize,
                  color: colors.success,
                  fontWeight: "500",
                  ...typo.body3,
                }}
              >
                Monitoring Active
              </Text>
            </View>
          </View>
        )}

        {/* Alert Card - Only show when monitoring is active */}
        {isMonitoring && (
          <Pressable
            onPress={handleAlertPress}
            style={({ pressed }) => [
              {
                marginBottom: layout.spacing.sm,
                paddingVertical: layout.spacing.sm,
                backgroundColor: colors.warningLight,
                elevation: 2,
              },
              pressed && {
                opacity: 0.7,
                transform: [{ scale: 0.98 }],
              },
            ]}
          >
            <Card
              style={{
                backgroundColor: "transparent",
                elevation: 0,
              }}
              mode="contained"
            >
              <Card.Content
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: layout.spacing.xs,
                }}
              >
                <MaterialCommunityIcons
                  name="alert-outline"
                  size={20}
                  color={colors.warning}
                />
                <Text
                  style={{
                    flex: 1,
                    marginLeft: layout.spacing.sm,
                    fontSize: typo.body3.fontSize,
                    color: colors.text,
                    fontWeight: "500",
                    ...typo.body3,
                  }}
                >
                  All vital signs are within normal range
                </Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={20}
                  color="rgba(17, 12, 9, 0.6)"
                  style={{
                    marginLeft: layout.spacing.sm,
                  }}
                />
              </Card.Content>
            </Card>
          </Pressable>
        )}

        {/* Monitoring Control Buttons */}
        {isMonitoring ? (
          <View style={{ marginBottom: layout.spacing.lg }}>
            {/* View Vitals Details Button */}
            <Button
              mode="outlined"
              style={{
                marginBottom: layout.spacing.sm,
                borderRadius: layout.borderRadius.medium,
                borderColor: colors.primary,
              }}
              contentStyle={{
                paddingVertical: layout.spacing.sm,
              }}
              onPress={handleViewVitalsDetails}
              icon="chart-line"
              textColor={colors.primary}
            >
              View Details
            </Button>

            {/* Stop Monitoring Button */}
            <Button
              mode="contained"
              style={{
                borderRadius: layout.borderRadius.medium,
              }}
              buttonColor={colors.error}
              contentStyle={{
                paddingVertical: layout.spacing.sm,
              }}
              onPress={handleStopMonitoring}
              icon="bluetooth-off"
            >
              Stop Monitoring
            </Button>
          </View>
        ) : (
          <Button
            mode="contained"
            style={{
              marginBottom: layout.spacing.lg,
              borderRadius: layout.borderRadius.medium,
            }}
            buttonColor={colors.primary}
            contentStyle={{
              paddingVertical: layout.spacing.sm,
            }}
            onPress={handleStartMonitoring}
            icon="bluetooth"
          >
            Start Monitoring
          </Button>
        )}

        {/* Vital Signs Grid */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginHorizontal: -layout.spacing.xs,
          }}
        >
          {vitals.map((vital, index) => (
            <View
              key={vital.id}
              style={{
                width: "50%",
              }}
            >
              <VitalCard metric={vital} />
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View
          style={{
            marginTop: layout.spacing.lg,
            marginBottom: layout.spacing.xl,
          }}
        >
          <Text
            style={{
              fontSize: typo.body2.fontSize,
              fontWeight: "600",
              color: "rgba(17, 12, 9, 0.6)",
              marginBottom: layout.spacing.sm,
              ...typo.body2,
            }}
          >
            Quick Actions
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: layout.spacing.xs,
            }}
            style={{
              backgroundColor: colors.card,
              borderRadius: layout.borderRadius.medium,
              elevation: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: layout.spacing.xl,
                padding: layout.spacing.sm,
              }}
            >
              {quickActions.map((action) => (
                <QuickActionButton key={action.id} action={action} />
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>

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
              fontSize: typo.h5.fontSize,
              fontWeight: "600",
              color: colors.text,
              ...typo.h5,
            }}
          >
            Stop Monitoring?
          </Dialog.Title>
          <Dialog.Content>
            <Text
              style={{
                fontSize: typo.body1.fontSize,
                color: "rgba(17, 12, 9, 0.6)",
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
            <Button
              onPress={cancelStopMonitoring}
              textColor="rgba(17, 12, 9, 0.6)"
            >
              Cancel
            </Button>
            <Button
              onPress={confirmStopMonitoring}
              buttonColor={colors.error}
              mode="contained"
              style={{
                borderRadius: layout.borderRadius.small,
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
