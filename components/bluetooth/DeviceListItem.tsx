import { useTheme } from "@/lib/hooks/useTheme";
import { Device } from "@/lib/schemas/deviceSchema";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

interface DeviceListItemProps {
  device: Device;
  onConnect: (device: Device) => void;
}

const DeviceListItem: React.FC<DeviceListItemProps> = ({
  device,
  onConnect,
}) => {
  const { colors, typo, layout } = useTheme();

  const getStatusText = () => {
    switch (device.status) {
      case "ready":
        return "Ready to pair";
      case "connecting":
        return "Connecting...";
      case "connected":
        return "Connected";
      case "disconnected":
        return "Disconnected";
      default:
        return "Unknown";
    }
  };

  return (
    <View
      style={{
        backgroundColor: colors.card,
        borderRadius: layout.borderRadius.medium,
        padding: layout.spacing.sm,
        marginVertical: layout.spacing.sm,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        elevation: layout.elevation,
        shadowColor: colors.text,
        shadowOffset: layout.shadow.light.shadowOffset,
        shadowOpacity: layout.shadow.light.shadowOpacity,
        shadowRadius: layout.shadow.light.shadowRadius,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        <MaterialCommunityIcons
          name="bluetooth"
          size={24}
          color={colors.primary}
          style={{ marginRight: layout.spacing.sm }}
        />
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: typo.body1.fontSize,
              fontWeight: "600",
              color: colors.text,
              marginBottom: layout.spacing.xs,
              ...typo.body1,
            }}
          >
            {device.model || `Device ${device.deviceId}`}
          </Text>
          <Text
            style={{
              fontSize: typo.body2.fontSize,
              color: colors.text,
              ...typo.body2,
            }}
          >
            {getStatusText()}
            {device.rssi !== null && device.rssi !== undefined
              ? ` | RSSI: ${device.rssi} dBm`
              : ""}
          </Text>
          <Text
            style={{
              fontSize: typo.body3.fontSize,
              color: device.pairedTo ? colors.primary : colors.text,
              ...typo.body3,
            }}
          >
            {device.pairedTo
              ? `Paired to User ${device.pairedTo}`
              : "Not paired"}
          </Text>
        </View>
      </View>
      <Button
        mode="contained"
        onPress={() => onConnect(device)}
        buttonColor={colors.primary}
        disabled={
          device.status === "connecting" || device.status === "connected"
        }
        style={{
          borderRadius: layout.borderRadius.medium,
          minWidth: layout.spacing.xl * 2,
          paddingVertical: layout.spacing.xs,
        }}
        labelStyle={{
          fontSize: typo.button.fontSize,
          ...typo.button,
        }}
      >
        {device.status === "connected" ? "Connected" : "Connect"}
      </Button>
    </View>
  );
};

export default DeviceListItem;
