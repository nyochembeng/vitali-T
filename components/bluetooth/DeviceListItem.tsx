import React from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/lib/hooks/useTheme";

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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          flex: 1,
        }}
      >
        <MaterialCommunityIcons
          name="bluetooth"
          size={24}
          color={colors.primary}
          style={{
            marginRight: layout.spacing.sm,
          }}
        />
        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              fontSize: typo.body1.fontSize,
              fontWeight: "600",
              color: colors.text,
              marginBottom: layout.spacing.xs,
              ...typo.body1,
            }}
          >
            {device.name}
          </Text>
          <Text
            style={{
              fontSize: typo.body2.fontSize,
              color: colors.text,
              ...typo.body2,
            }}
          >
            {getStatusText()}
          </Text>
        </View>
      </View>
      <Button
        mode="contained"
        onPress={() => onConnect(device)}
        buttonColor={colors.primary}
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
        Connect
      </Button>
    </View>
  );
};

export default DeviceListItem;
