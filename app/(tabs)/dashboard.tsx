import QuickActionButton from "@/components/dashboard/QuickActionButton";
import VitalCard from "@/components/dashboard/VitalCard";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useTheme } from "@/lib/hooks/useTheme";
import { useAuth } from "@/lib/hooks/useAuth";
import { Alert } from "@/lib/schemas/alertSchema";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, SafeAreaView, ScrollView, View } from "react-native";
import { Button, Card, Dialog, Portal, Text } from "react-native-paper";
import { useGetVitalsQuery } from "@/lib/features/vitals/vitalsService";
import { useGetAlertsQuery } from "@/lib/features/alerts/alertService";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import useBLE from "@/lib/hooks/useBLE";
import { disconnected } from "@/lib/features/ble/bleSlice";
import Toast from "react-native-toast-message";

interface QuickAction {
  id: string;
  title: string;
  icon: string;
  onPress: () => void;
}

export default function DashboardScreen() {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [showStopDialog, setShowStopDialog] = useState(false);
  const router = useRouter();
  const { colors, typo, layout } = useTheme();
  const { user, isActionQueued } = useAuth();
  const dispatch = useDispatch();
  const { disconnectFromDevice, connectedDevice } = useBLE();
  const { latestVitals } = useSelector((state: RootState) => state.ble);
  const {
    data: vitals = [],
    isLoading: isVitalsLoading,
    isFetching: isVitalsFetching,
  } = useGetVitalsQuery(user?.userId as string, {
    skip: !user?.userId,
    pollingInterval: 1000, // Poll every 1 second for backend updates
  });
  const {
    data: alerts = [],
    isLoading: isAlertsLoading,
    isFetching: isAlertsFetching,
    isError: isAlertsError,
  } = useGetAlertsQuery(user?.userId as string, {
    skip: !user?.userId,
    pollingInterval: 5000, // Poll every 5 seconds for alerts
  });

  const quickActions: QuickAction[] = [
    {
      id: "1",
      title: "Symptoms",
      icon: "alert-circle-outline",
      onPress: () => router.push("/log-symptoms"),
    },
    {
      id: "2",
      title: "Movement",
      icon: "run",
      onPress: () => router.push("/log-fetal-movements"),
    },
    {
      id: "3",
      title: "Activity",
      icon: "heart",
      onPress: () => router.push("/log-activity"),
    },
    {
      id: "4",
      title: "Sleep",
      icon: "moon-waning-crescent",
      onPress: () => router.push("/log-sleep"),
    },
    {
      id: "5",
      title: "Contractions",
      icon: "pulse",
      onPress: () => router.push("/log-contractions"),
    },
  ];

  const handleStartMonitoring = () => {
    if (isActionQueued) return;
    router.push("/bluetooth-connection");
    setIsMonitoring(true);
  };

  const handleStopMonitoring = () => {
    if (isActionQueued) return;
    setShowStopDialog(true);
  };

  const handleViewVitalsDetails = () => {
    if (isActionQueued) return;
    router.push("/vitals-details");
  };

  const confirmStopMonitoring = () => {
    if (isActionQueued) return;
    setIsMonitoring(false);
    setShowStopDialog(false);
    if (connectedDevice) {
      disconnectFromDevice();
      dispatch(disconnected());
    }
    Toast.show({
      type: "success",
      text1: "Monitoring Stopped",
      text2: "Device monitoring has been stopped.",
    });
  };

  const cancelStopMonitoring = () => {
    if (isActionQueued) return;
    setShowStopDialog(false);
  };

  const handleAlertPress = (alert: Alert) => {
    if (isActionQueued) return;
    router.push({
      pathname: "/alert-details",
      params: {
        ...alert,
        acknowledged: alert.acknowledged.toString(), // Serialize boolean to string
      },
    });
  };

  if (isAlertsError) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Failed to load alerts.",
    });
  }

  // Get the latest unacknowledged alert (if any)
  const latestAlert = alerts
    .filter((alert) => !alert.acknowledged)
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )[0];

  // Combine backend vitals with real-time BLE vitals
  const displayedVitals = isMonitoring && latestVitals ? latestVitals : vitals;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomAppBar title="Dashboard" isHome />

      <ScrollView
        style={{ flex: 1, paddingHorizontal: layout.spacing.sm }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: layout.spacing.lg }}
      >
        {isMonitoring && (
          <View
            style={{
              alignItems: "center",
              marginTop: layout.spacing.sm,
              marginBottom: layout.spacing.xs,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
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

        {isMonitoring && (isAlertsLoading || isAlertsFetching) && (
          <View
            style={{
              alignItems: "center",
              marginVertical: layout.spacing.sm,
            }}
          >
            <Text
              style={{
                fontSize: typo.body2.fontSize,
                color: colors.text,
                ...typo.body2,
              }}
            >
              Loading alerts...
            </Text>
          </View>
        )}

        {isMonitoring && latestAlert && (
          <Pressable
            onPress={() => handleAlertPress(latestAlert)}
            disabled={isActionQueued}
            style={({ pressed }) => [
              {
                marginBottom: layout.spacing.sm,
                paddingVertical: layout.spacing.sm,
                backgroundColor:
                  latestAlert.riskLevel === "High"
                    ? colors.errorLight
                    : latestAlert.riskLevel === "Moderate"
                      ? colors.warningLight
                      : colors.successLight,
                elevation: 2,
              },
              pressed && { opacity: 0.7, transform: [{ scale: 0.98 }] },
              isActionQueued && { opacity: 0.6 },
            ]}
          >
            <Card
              style={{ backgroundColor: "transparent", elevation: 0 }}
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
                  color={
                    latestAlert.riskLevel === "High"
                      ? colors.error
                      : latestAlert.riskLevel === "Moderate"
                        ? colors.warning
                        : colors.success
                  }
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
                  {latestAlert.alertType}: {latestAlert.value}
                </Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={20}
                  color={colors.text}
                  style={{ marginLeft: layout.spacing.sm }}
                />
              </Card.Content>
            </Card>
          </Pressable>
        )}

        {isMonitoring ? (
          <View style={{ marginBottom: layout.spacing.lg }}>
            <Button
              mode="outlined"
              style={{
                marginBottom: layout.spacing.sm,
                borderRadius: layout.borderRadius.medium,
                borderColor: colors.primary,
              }}
              contentStyle={{ paddingVertical: layout.spacing.sm }}
              onPress={handleViewVitalsDetails}
              icon="chart-line"
              textColor={colors.primary}
              disabled={isActionQueued}
            >
              View Details
            </Button>
            <Button
              mode="contained"
              style={{ borderRadius: layout.borderRadius.medium }}
              buttonColor={colors.error}
              contentStyle={{ paddingVertical: layout.spacing.sm }}
              onPress={handleStopMonitoring}
              icon="bluetooth-off"
              disabled={isActionQueued}
            >
              Stop Monitoring
            </Button>
          </View>
        ) : (
          <Button
            mode="contained"
            style={{
              marginTop: layout.spacing.sm,
              marginBottom: layout.spacing.lg,
              borderRadius: layout.borderRadius.medium,
            }}
            buttonColor={colors.primary}
            contentStyle={{ paddingVertical: layout.spacing.sm }}
            onPress={handleStartMonitoring}
            icon="bluetooth"
            disabled={isActionQueued}
            loading={isVitalsLoading || isAlertsLoading}
          >
            Start Monitoring
          </Button>
        )}

        {(isVitalsLoading || isVitalsFetching) && !isMonitoring && (
          <View
            style={{
              alignItems: "center",
              marginVertical: layout.spacing.lg,
            }}
          >
            <Text
              style={{
                fontSize: typo.body2.fontSize,
                color: colors.text,
                ...typo.body2,
              }}
            >
              Loading vitals...
            </Text>
          </View>
        )}

        {(!isVitalsLoading || isMonitoring) && displayedVitals.length === 0 && (
          <View
            style={{
              alignItems: "center",
              marginVertical: layout.spacing.lg,
            }}
          >
            <Text
              style={{
                fontSize: typo.body2.fontSize,
                color: colors.text,
                ...typo.body2,
              }}
            >
              No vitals data available
            </Text>
          </View>
        )}

        {(!isVitalsLoading || isMonitoring) && displayedVitals.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginHorizontal: -layout.spacing.xs,
            }}
          >
            {displayedVitals.map((vital) => (
              <View key={vital.vitalId} style={{ width: "50%" }}>
                <VitalCard metric={vital} />
              </View>
            ))}
          </View>
        )}

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
              color: colors.text,
              marginBottom: layout.spacing.sm,
              ...typo.body2,
            }}
          >
            Quick Actions
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: layout.spacing.xs }}
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
                <QuickActionButton
                  key={action.id}
                  action={{
                    ...action,
                    onPress: () => !isActionQueued && action.onPress(),
                  }}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>

      <Portal>
        <Dialog
          visible={showStopDialog}
          onDismiss={cancelStopMonitoring}
          style={{ backgroundColor: colors.card }}
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
                color: colors.text,
                lineHeight: typo.body1.lineHeight,
                ...typo.body1,
              }}
            >
              Are you sure you want to stop monitoring? This will disconnect
              your device and end the current session.
            </Text>
          </Dialog.Content>
          <Dialog.Actions style={{ paddingTop: layout.spacing.sm }}>
            <Button
              onPress={cancelStopMonitoring}
              textColor={colors.text}
              disabled={isActionQueued}
            >
              Cancel
            </Button>
            <Button
              onPress={confirmStopMonitoring}
              buttonColor={colors.error}
              mode="contained"
              style={{ borderRadius: layout.borderRadius.small }}
              disabled={isActionQueued}
            >
              Stop
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
}
