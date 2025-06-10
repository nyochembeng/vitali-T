import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface BluetoothIconProps {
  state: "scanning" | "no-devices" | "failed" | "connected";
  size?: number;
}

const BluetoothIcon: React.FC<BluetoothIconProps> = ({ state, size = 80 }) => {
  const getIconName = () => {
    switch (state) {
      case "scanning":
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
        return "#FFF";
      default:
        return "#8B5A3C";
    }
  };

  const getBackgroundColor = () => {
    switch (state) {
      case "connected":
        return "#8B5A3C";
      default:
        return "transparent";
    }
  };

  return (
    <View style={[styles.outerCircle, { width: size * 2, height: size * 2 }]}>
      <View
        style={[styles.middleCircle, { width: size * 1.5, height: size * 1.5 }]}
      >
        <View
          style={[
            styles.innerCircle,
            {
              width: size,
              height: size,
              backgroundColor: getBackgroundColor(),
            },
          ]}
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

const styles = StyleSheet.create({
  outerCircle: {
    borderRadius: 1000,
    backgroundColor: "#F5F2F0",
    justifyContent: "center",
    alignItems: "center",
  },
  middleCircle: {
    borderRadius: 1000,
    backgroundColor: "#E8E0DB",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    borderRadius: 1000,
    backgroundColor: "#8B5A3C",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BluetoothIcon;
