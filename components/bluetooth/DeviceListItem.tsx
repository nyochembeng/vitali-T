import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface BluetoothDevice {
  id: string;
  name: string;
  status: "ready" | "connecting" | "connected" | "disconnected";
  rssi?: number;
}

interface DeviceListItemProps {
  device: BluetoothDevice;
  onConnect: (device: BluetoothDevice) => void;
}

const DeviceListItem: React.FC<DeviceListItemProps> = ({
  device,
  onConnect,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.deviceInfo}>
        <MaterialCommunityIcons
          name="bluetooth"
          size={24}
          color="#8B5A3C"
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.deviceName}>{device.name}</Text>
          <Text style={styles.deviceStatus}>Ready to pair</Text>
        </View>
      </View>
      <Button
        mode="contained"
        onPress={() => onConnect(device)}
        buttonColor="#8B5A3C"
        style={styles.connectButton}
        labelStyle={styles.connectButtonText}
      >
        Connect
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  deviceInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 2,
  },
  deviceStatus: {
    fontSize: 14,
    color: "#666",
  },
  connectButton: {
    borderRadius: 8,
    minWidth: 80,
  },
  connectButtonText: {
    fontSize: 14,
  },
});

export default DeviceListItem;
