import React from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/lib/hooks/useTheme";

interface BluetoothIconProps {
  state: "scanning" | "connecting" | "no-devices" | "failed" | "connected";
  size?: number;
}

const BluetoothIcon: React.FC<BluetoothIconProps> = ({ state, size = 80 }) => {
  const { colors } = useTheme();

  const getIconName = () => {
    switch (state) {
      case "scanning":
        return "bluetooth";
      case "connecting":
        return "bluetooth";
      case "no-devices":
        return "bluetooth-off";
      case "failed":
        return "bluetooth-off";
      case "connected":
        return "check";
      default:
        return "bluetooth";
    }
  };

  const getIconColor = () => {
    switch (state) {
      case "connected":
        return colors.textInverse;
      default:
        return colors.primary;
    }
  };

  const getBackgroundColor = () => {
    switch (state) {
      case "connected":
        return colors.primary;
      default:
        return "transparent";
    }
  };

  return (
    <View
      style={{
        borderRadius: 1000,
        backgroundColor: colors.surface,
        justifyContent: "center",
        alignItems: "center",
        width: size * 2,
        height: size * 2,
      }}
    >
      <View
        style={{
          borderRadius: 1000,
          backgroundColor: colors.accentLight,
          justifyContent: "center",
          alignItems: "center",
          width: size * 1.5,
          height: size * 1.5,
        }}
      >
        <View
          style={{
            borderRadius: 1000,
            backgroundColor: getBackgroundColor(),
            justifyContent: "center",
            alignItems: "center",
            width: size,
            height: size,
          }}
        >
          <MaterialCommunityIcons
            name={getIconName() as any}
            size={size * 0.4}
            color={getIconColor()}
          />
        </View>
      </View>
    </View>
  );
};

export default BluetoothIcon;
