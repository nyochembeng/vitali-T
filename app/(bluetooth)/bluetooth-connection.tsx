import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Text, Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ScanningAnimation from "@/components/bluetooth/ScanningAnimation";
import BluetoothIcon from "@/components/bluetooth/BluetoothIcon";
import DeviceListItem from "@/components/bluetooth/DeviceListItem";
import { useRouter } from "expo-router";
import CustomAppBar from "@/components/utils/CustomAppBar";

interface BluetoothDevice {
  id: string;
  name: string;
  status: "ready" | "connecting" | "connected" | "disconnected";
  rssi?: number;
}

type ConnectionState =
  | "scanning"
  | "connecting"
  | "no-devices"
  | "connection-failed"
  | "connected";

export default function BluetoothConnectionScreen() {
  const [connectionState, setConnectionState] =
    useState<ConnectionState>("scanning");
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  const [connectedDevice, setConnectedDevice] =
    useState<BluetoothDevice | null>(null);
  const [connectingDevice, setConnectingDevice] =
    useState<BluetoothDevice | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const router = useRouter();

  // Mock devices for demo
  const mockDevices: BluetoothDevice[] = [
    {
      id: "1",
      name: "Vitali-T Device",
      status: "ready",
      rssi: -45,
    },
    {
      id: "2",
      name: "Vitali-T Pro",
      status: "ready",
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
  });

  const handleConnect = async (device: BluetoothDevice) => {
    setConnectionState("connecting");
    setConnectingDevice(device);
    setIsScanning(true);

    // Simulate connection attempt
    setTimeout(() => {
      // Randomly succeed or fail for demo
      const success = Math.random() > 0.3;

      if (success) {
        setConnectedDevice({ ...device, id: "#0213" });
        setConnectionState("connected");
      } else {
        setConnectionState("connection-failed");
      }
      setIsScanning(false);
      setConnectingDevice(null);
    }, 2000);
  };

  const handleRetryConnection = () => {
    setConnectionState("scanning");
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
    // Navigate to monitoring screen
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
    <View style={styles.centerContent}>
      <ScanningAnimation isScanning={isScanning}>
        <BluetoothIcon state="scanning" />
      </ScanningAnimation>
      <Text style={styles.statusText}>
        {isScanning ? "Scanning for nearby devices..." : "Scan complete"}
      </Text>

      {devices.length > 0 && !isScanning && (
        <View style={styles.devicesList}>
          {devices.map((device) => (
            <DeviceListItem
              key={device.id}
              device={device}
              onConnect={handleConnect}
            />
          ))}
        </View>
      )}
    </View>
  );

  const renderConnectingState = () => (
    <View style={styles.centerContent}>
      <ScanningAnimation isScanning={isScanning}>
        <BluetoothIcon state="scanning" />
      </ScanningAnimation>
      <Text style={styles.statusText}>
        Connecting to {connectingDevice?.name}...
      </Text>
    </View>
  );

  const renderNoDevicesState = () => (
    <View style={styles.centerContent}>
      <BluetoothIcon state="no-devices" />
      <Text style={styles.titleText}>No devices found</Text>
      <Text style={styles.subtitleText}>
        Please ensure Bluetooth is enabled
      </Text>

      <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
        <MaterialCommunityIcons name="refresh" size={20} color="#8B5A3C" />
        <Text style={styles.refreshText}>Refresh</Text>
      </TouchableOpacity>

      <Text style={styles.helpText}>
        Make sure your Vitali-T device is nearby and powered on
      </Text>
    </View>
  );

  const renderConnectionFailedState = () => (
    <View style={styles.centerContent}>
      <BluetoothIcon state="failed" />
      <Text style={styles.titleText}>Connection Failed</Text>
      <Text style={styles.subtitleText}>
        Please check your Bluetooth settings and try again.
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleRetryConnection}
          style={styles.primaryButton}
          buttonColor="#8B5A3C"
          icon="refresh"
        >
          Retry Connection
        </Button>

        <Button
          mode="outlined"
          onPress={handleScanAgain}
          style={styles.secondaryButton}
          textColor="#8B5A3C"
          icon="magnify"
        >
          Scan Again
        </Button>
      </View>
    </View>
  );

  const renderConnectedState = () => (
    <View style={styles.centerContent}>
      <BluetoothIcon state="connected" />
      <Text style={styles.titleText}>Device Connected!</Text>
      <Text style={styles.subtitleText}>
        Vitali-T Monitor {connectedDevice?.id}
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleStartMonitoring}
          style={styles.primaryButton}
          buttonColor="#8B5A3C"
        >
          Start Monitoring
        </Button>

        <TouchableOpacity onPress={handleChangeDevice}>
          <Text style={styles.changeDeviceText}>Change Device</Text>
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
    <SafeAreaView style={styles.container}>
      <CustomAppBar
        title="Bluetooth Connection"
        rightAction="info"
        onInfoPress={() => {}}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderContent()}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.helpButton} onPress={handleNeedHelp}>
          <MaterialCommunityIcons
            name="help-circle-outline"
            size={20}
            color="#8B5A3C"
          />
          <Text style={styles.helpButtonText}>Need Help?</Text>
        </TouchableOpacity>
      </View>
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
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  centerContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  statusText: {
    fontSize: 16,
    color: "#666",
    marginTop: 32,
    textAlign: "center",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
    marginTop: 32,
    textAlign: "center",
  },
  subtitleText: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
    lineHeight: 24,
  },
  devicesList: {
    width: "100%",
    marginTop: 32,
  },
  refreshButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  refreshText: {
    fontSize: 16,
    color: "#8B5A3C",
    marginLeft: 8,
    fontWeight: "500",
  },
  helpText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginTop: 40,
    lineHeight: 20,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 40,
    gap: 16,
  },
  primaryButton: {
    borderRadius: 12,
    paddingVertical: 4,
  },
  secondaryButton: {
    borderRadius: 12,
    borderColor: "#8B5A3C",
    paddingVertical: 4,
  },
  changeDeviceText: {
    fontSize: 16,
    color: "#8B5A3C",
    textAlign: "center",
    marginTop: 8,
  },
  footer: {
    paddingBottom: 20,
    alignItems: "center",
  },
  helpButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  helpButtonText: {
    fontSize: 16,
    color: "#8B5A3C",
    marginLeft: 8,
  },
});
