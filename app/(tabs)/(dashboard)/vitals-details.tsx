import VitalDetailCard from "@/components/dashboard/VitalDetailCard";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useTheme } from "@/lib/hooks/useTheme";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { useGetVitalsQuery } from "@/lib/features/vitals/vitalsService";

export default function VitalsDetailsScreen() {
  const [showStopDialog, setShowStopDialog] = useState(false);
  const router = useRouter();
  const { colors, typo, layout } = useTheme();
  const { user, isActionQueued } = useAuth();
  const {
    data: vitals = [],
    isLoading,
    isFetching,
  } = useGetVitalsQuery(user?.userId as string, {
    skip: !user?.userId,
    pollingInterval: 1000, // Poll every 1 second for real-time updates
  });

  const handleInfo = () => {
    if (isActionQueued) return;
    router.push("/vital-signs-education");
  };

  const handleStopMonitoring = () => {
    if (isActionQueued) return;
    setShowStopDialog(true);
  };

  const confirmStopMonitoring = () => {
    if (isActionQueued) return;
    setShowStopDialog(false);
    console.log("Monitoring stopped");
    router.push("/dashboard");
  };

  const cancelStopMonitoring = () => {
    if (isActionQueued) return;
    setShowStopDialog(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomAppBar
        title="Vitals Details"
        rightAction="info"
        onInfoPress={handleInfo}
      />

      <ScrollView
        style={{ flex: 1, paddingHorizontal: layout.spacing.lg }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: layout.spacing.sm,
          paddingBottom: layout.spacing.xxl,
        }}
      >
        {isLoading || isFetching ? (
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
        ) : vitals.length === 0 ? (
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
        ) : (
          vitals.map((vital) => (
            <VitalDetailCard key={vital.vitalId} vital={vital} />
          ))
        )}
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
          contentStyle={{ paddingVertical: layout.spacing.sm }}
          icon="stop-circle-outline"
          disabled={isActionQueued}
          loading={isLoading}
        >
          Stop Monitoring
        </Button>
      </View>

      <Portal>
        <Dialog
          visible={showStopDialog}
          onDismiss={cancelStopMonitoring}
          style={{ backgroundColor: colors.card }}
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
              style={{ borderRadius: layout.borderRadius.medium }}
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
