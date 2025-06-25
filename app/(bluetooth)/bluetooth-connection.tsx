import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BluetoothIcon from "@/components/bluetooth/BluetoothIcon";
import DeviceListItem from "@/components/bluetooth/DeviceListItem";
import ScanningAnimation from "@/components/bluetooth/ScanningAnimation";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useTheme } from "@/lib/hooks/useTheme";
import useBLE from "@/lib/hooks/useBLE";
import { RootState } from "@/lib/store";
import {
  scanStarted,
  scanStopped,
  deviceFound,
  connected,
  disconnected,
} from "@/lib/features/ble/bleSlice";
import { Device } from "@/lib/schemas/deviceSchema";
import { useAuth } from "@/lib/hooks/useAuth";

type ConnectionState =
  | "scanning"
  | "connecting"
  | "no-devices"
  | "connection-failed"
  | "connected";

export default function BluetoothConnectionScreen() {
  const [connectionState, setConnectionState] =
    useState<ConnectionState>("scanning");
  const [connectingDeviceId, setConnectingDeviceId] = useState<string | null>(
    null
  );
  const router = useRouter();
  const { colors, typo, layout } = useTheme();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const {
    requestPermissions,
    scanForPeripherals,
    connectToDevice,
    disconnectFromDevice,
    connectedDevice,
    allDevices,
  } = useBLE();
  const { isScanning, devices, connectedDeviceId } = useSelector(
    (state: RootState) => state.ble
  );

  // Request BLE permissions and start scanning
  useEffect(() => {
    const initializeBLE = async () => {
      const granted = await requestPermissions();
      if (granted) {
        dispatch(scanStarted());
        scanForPeripherals();
      } else {
        setConnectionState("connection-failed");
        dispatch(scanStopped());
      }
    };

    initializeBLE();

    return () => {
      dispatch(scanStopped());
    };
  }, [dispatch, requestPermissions, scanForPeripherals]);

  // Update devices in Redux when allDevices changes
  useEffect(() => {
    allDevices.forEach((bleDevice) => {
      const device: Device = {
        deviceId: bleDevice.deviceId,
        model: bleDevice.model || "Unknown",
        firmwareVersion: bleDevice.firmwareVersion || "Unknown",
        batteryLevel: bleDevice.batteryLevel || 100,
        status: bleDevice.status,
        lastSyncTime: bleDevice.lastSyncTime || new Date().toISOString(),
        pairedTo: bleDevice.pairedTo || null,
        isConnected: bleDevice.isConnected || false,
        rssi: bleDevice.rssi ?? null,
      };
      dispatch(deviceFound(device));
    });

    if (!isScanning && allDevices.length === 0) {
      setConnectionState("no-devices");
    } else if (!isScanning && allDevices.length > 0) {
      setConnectionState("scanning");
    }
  }, [allDevices, isScanning, dispatch]);

  // Update connection state when connectedDevice changes
  useEffect(() => {
    if (connectedDevice && connectedDeviceId === connectedDevice.deviceId) {
      setConnectionState("connected");
      dispatch(connected(connectedDevice.deviceId));
    }
  }, [connectedDevice, connectedDeviceId, dispatch]);

  const handleConnect = async (device: Device) => {
    // Check if device is unpaired or paired to current user
    if (device.pairedTo && device.pairedTo !== user?.userId) {
      setConnectionState("connection-failed");
      dispatch(scanStopped());
      return;
    }

    setConnectionState("connecting");
    setConnectingDeviceId(device.deviceId);
    dispatch(scanStopped());

    try {
      const bleDevice = allDevices.find((d) => d.deviceId === device.deviceId);
      if (bleDevice) {
        await connectToDevice(bleDevice);
      } else {
        throw new Error("Device not found in BLE scan");
      }
    } catch (error) {
      console.error("Connection failed:", error);
      setConnectionState("connection-failed");
      setConnectingDeviceId(null);
    }
  };

  const handleRetryConnection = async () => {
    setConnectionState("connecting");
    dispatch(scanStarted());
    scanForPeripherals();
  };

  const handleScanAgain = () => {
    setConnectionState("scanning");
    dispatch(scanStarted());
    scanForPeripherals();
  };

  const handleRefresh = () => {
    setConnectionState("scanning");
    dispatch(scanStarted());
    scanForPeripherals();
  };

  const handleStartMonitoring = () => {
    router.push("/vitals-details");
  };

  const handleChangeDevice = () => {
    disconnectFromDevice();
    dispatch(disconnected());
    setConnectionState("scanning");
    setConnectingDeviceId(null);
    dispatch(scanStarted());
    scanForPeripherals();
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
      <ScanningAnimation isActive={isScanning}>
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
              onConnect={() => handleConnect(device)}
              status={
                connectingDeviceId === device.deviceId
                  ? "connecting"
                  : device.status
              }
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
      <ScanningAnimation isActive={true}>
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
        Connecting to{" "}
        {devices.find((d) => d.deviceId === connectingDeviceId)?.model ||
          "Device"}
        ...
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
