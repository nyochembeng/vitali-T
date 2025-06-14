import BluetoothIcon from "@/components/bluetooth/BluetoothIcon";
import DeviceListItem from "@/components/bluetooth/DeviceListItem";
import ScanningAnimation from "@/components/bluetooth/ScanningAnimation";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useTheme } from "@/lib/hooks/useTheme";
import { Device } from "@/lib/schemas/deviceSchema";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { Button, Text } from "react-native-paper";

// Mock auth hook for userId; replace with actual auth context
const useAuth = () => ({ userId: "user_1234567890" }); // TODO: Implement actual auth context

type ConnectionState =
  | "scanning"
  | "connecting"
  | "no-devices"
  | "connection-failed"
  | "connected";

export default function BluetoothConnectionScreen() {
  const [connectionState, setConnectionState] =
    useState<ConnectionState>("scanning");
  const [devices, setDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [connectingDevice, setConnectingDevice] = useState<Device | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const router = useRouter();
  const { colors, typo, layout } = useTheme();
  const { userId } = useAuth();

  // Mock devices for demo, aligned with deviceSchema
  const mockDevices: Device[] = [
    {
      deviceId: "VT-001",
      model: "Vitali-T Device",
      firmwareVersion: "1.0.0",
      batteryLevel: 85,
      status: "ready",
      lastSyncTime: new Date().toISOString(),
      pairedTo: null,
      isConnected: false,
      rssi: -45,
    },
    {
      deviceId: "VT-002",
      model: "Vitali-T Pro",
      firmwareVersion: "1.1.0",
      batteryLevel: 60,
      status: "ready",
      lastSyncTime: new Date().toISOString(),
      pairedTo: null,
      isConnected: false,
      rssi: -60,
    },
  ];

  useEffect(() => {
    // Simulate scanning process
    const scanTimer = setTimeout(() => {
      setIsScanning(false);
      setDevices(mockDevices);
      setConnectionState("scanning"); // Keep as scanning to show devices
    }, 3000);

    return () => clearTimeout(scanTimer);
  }, []);

  const handleConnect = async (device: Device) => {
    // Only allow connection if device is unpaired or paired to current user
    if (device.pairedTo && device.pairedTo !== userId) {
      setConnectionState("connection-failed");
      setIsScanning(false);
      return;
    }

    setConnectionState("connecting");
    setConnectingDevice(device);
    setIsScanning(true);

    // Simulate connection attempt
    setTimeout(() => {
      // Randomly succeed or fail for demo
      const success = Math.random() > 0.3;

      if (success) {
        const updatedDevice = {
          ...device,
          status: "connected" as const,
          isConnected: true,
          pairedTo: userId, // Pair to current user
        };
        setConnectedDevice(updatedDevice);
        setConnectionState("connected");
      } else {
        setConnectionState("connection-failed");
      }
      setIsScanning(false);
      setConnectingDevice(null);
    }, 2000);
  };

  const handleRetryConnection = () => {
    setConnectionState("connecting");
    setIsScanning(true);

    setTimeout(() => {
      setConnectionState("connection-failed");
      setIsScanning(false);
    }, 2000);
  };

  const handleScanAgain = () => {
    setConnectionState("scanning");
    setIsScanning(true);
    setDevices([]);

    setTimeout(() => {
      setDevices(mockDevices);
      setIsScanning(false);
    }, 3000);
  };

  const handleRefresh = () => {
    setConnectionState("scanning");
    setIsScanning(true);
    setDevices([]);

    setTimeout(() => {
      setConnectionState("no-devices");
      setIsScanning(false);
    }, 3000);
  };

  const handleStartMonitoring = () => {
    router.push("/vitals-details");
  };

  const handleChangeDevice = () => {
    setConnectionState("scanning");
    setConnectedDevice(null);
    setConnectingDevice(null);
    setDevices([]);
    setIsScanning(true);

    setTimeout(() => {
      setDevices(mockDevices);
      setIsScanning(false);
    }, 2000);
  };

  const handleNeedHelp = () => {
    router.push("/help");
  };

  const renderScanningState = () => (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: layout.spacing.lg,
      }}
    >
      <ScanningAnimation isScanning={isScanning}>
        <BluetoothIcon state="scanning" />
      </ScanningAnimation>
      <Text
        style={{
          fontSize: typo.body1.fontSize,
          color: colors.text,
          marginTop: layout.spacing.lg,
          textAlign: "center",
          ...typo.body1,
        }}
      >
        {isScanning ? "Scanning for nearby devices..." : "Scan complete"}
      </Text>

      {devices.length > 0 && !isScanning && (
        <View style={{ width: "100%", marginTop: layout.spacing.lg }}>
          {devices.map((device) => (
            <DeviceListItem
              key={device.deviceId}
              device={device}
              onConnect={handleConnect}
            />
          ))}
        </View>
      )}
    </View>
  );

  const renderConnectingState = () => (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: layout.spacing.lg,
      }}
    >
      <ScanningAnimation isScanning={isScanning}>
        <BluetoothIcon state="scanning" />
      </ScanningAnimation>
      <Text
        style={{
          fontSize: typo.body1.fontSize,
          color: colors.text,
          marginTop: layout.spacing.lg,
          textAlign: "center",
          ...typo.body1,
        }}
      >
        Connecting to {connectingDevice?.model}...
      </Text>
    </View>
  );

  const renderNoDevicesState = () => (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: layout.spacing.lg,
      }}
    >
      <BluetoothIcon state="no-devices" />
      <Text
        style={{
          fontSize: typo.h5.fontSize,
          fontWeight: "600",
          color: colors.text,
          marginTop: layout.spacing.lg,
          textAlign: "center",
          ...typo.h5,
        }}
      >
        No devices found
      </Text>
      <Text
        style={{
          fontSize: typo.body1.fontSize,
          color: colors.text,
          marginTop: layout.spacing.sm,
          textAlign: "center",
          lineHeight: typo.body1.lineHeight,
          ...typo.body1,
        }}
      >
        Please ensure Bluetooth is enabled
      </Text>

      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: layout.spacing.lg,
          paddingVertical: layout.spacing.sm,
          paddingHorizontal: layout.spacing.md,
        }}
        onPress={handleRefresh}
      >
        <MaterialCommunityIcons
          name="refresh"
          size={20}
          color={colors.primary}
        />
        <Text
          style={{
            fontSize: typo.body1.fontSize,
            color: colors.primary,
            marginLeft: layout.spacing.sm,
            fontWeight: "500",
            ...typo.body1,
          }}
        >
          Refresh
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          fontSize: typo.body2.fontSize,
          color: colors.text,
          textAlign: "center",
          marginTop: layout.spacing.xl,
          lineHeight: typo.body2.lineHeight,
          ...typo.body2,
        }}
      >
        Make sure your Vitali-T device is nearby and powered on
      </Text>
    </View>
  );

  const renderConnectionFailedState = () => (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: layout.spacing.lg,
      }}
    >
      <BluetoothIcon state="failed" />
      <Text
        style={{
          fontSize: typo.h5.fontSize,
          fontWeight: "600",
          color: colors.text,
          marginTop: layout.spacing.lg,
          textAlign: "center",
          ...typo.h5,
        }}
      >
        Connection Failed
      </Text>
      <Text
        style={{
          fontSize: typo.body1.fontSize,
          color: colors.text,
          marginTop: layout.spacing.sm,
          textAlign: "center",
          lineHeight: typo.body1.lineHeight,
          ...typo.body1,
        }}
      >
        Please check your Bluetooth settings and try again.
      </Text>

      <View
        style={{
          width: "100%",
          marginTop: layout.spacing.lg,
          gap: layout.spacing.sm,
        }}
      >
        <Button
          mode="contained"
          onPress={handleRetryConnection}
          style={{
            borderRadius: layout.borderRadius.medium,
            paddingVertical: layout.spacing.xs,
          }}
          buttonColor={colors.primary}
          icon="refresh"
        >
          Retry Connection
        </Button>

        <Button
          mode="outlined"
          onPress={handleScanAgain}
          style={{
            borderRadius: layout.borderRadius.medium,
            paddingVertical: layout.spacing.xs,
          }}
          textColor={colors.primary}
          icon="magnify"
        >
          Scan Again
        </Button>
      </View>
    </View>
  );

  const renderConnectedState = () => (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: layout.spacing.lg,
      }}
    >
      <BluetoothIcon state="connected" />
      <Text
        style={{
          fontSize: typo.h5.fontSize,
          fontWeight: "600",
          color: colors.text,
          marginTop: layout.spacing.lg,
          textAlign: "center",
          ...typo.h5,
        }}
      >
        Device Connected!
      </Text>
      <Text
        style={{
          fontSize: typo.body1.fontSize,
          color: colors.text,
          marginTop: layout.spacing.sm,
          textAlign: "center",
          lineHeight: typo.body1.lineHeight,
          ...typo.body1,
        }}
      >
        Vitali-T Monitor {connectedDevice?.deviceId}
      </Text>

      <View
        style={{
          width: "100%",
          marginTop: layout.spacing.lg,
          gap: layout.spacing.sm,
        }}
      >
        <Button
          mode="contained"
          onPress={handleStartMonitoring}
          style={{
            borderRadius: layout.borderRadius.medium,
            paddingVertical: layout.spacing.xs,
          }}
          buttonColor={colors.primary}
        >
          Start Monitoring
        </Button>

        <TouchableOpacity onPress={handleChangeDevice}>
          <Text
            style={{
              fontSize: typo.body1.fontSize,
              color: colors.primary,
              textAlign: "center",
              marginTop: layout.spacing.sm,
              ...typo.body1,
            }}
          >
            Change Device
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (connectionState) {
      case "scanning":
        return renderScanningState();
      case "connecting":
        return renderConnectingState();
      case "no-devices":
        return renderNoDevicesState();
      case "connection-failed":
        return renderConnectionFailedState();
      case "connected":
        return renderConnectedState();
      default:
        return renderScanningState();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomAppBar
        title="Connect to Vitali-T"
        rightAction="info"
        onInfoPress={() => router.push("/getting-started")}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingHorizontal: layout.spacing.lg,
        }}
        showsVerticalScrollIndicator={false}
      >
        {renderContent()}
      </ScrollView>

      <View style={{ paddingBottom: layout.spacing.lg, alignItems: "center" }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: layout.spacing.sm,
            paddingHorizontal: layout.spacing.md,
          }}
          onPress={handleNeedHelp}
        >
          <MaterialCommunityIcons
            name="help-circle-outline"
            size={20}
            color={colors.primary}
          />
          <Text
            style={{
              fontSize: typo.body1.fontSize,
              color: colors.primary,
              marginLeft: layout.spacing.sm,
              ...typo.body1,
            }}
          >
            Need Help?
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
