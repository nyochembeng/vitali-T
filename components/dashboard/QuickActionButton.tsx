import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface QuickAction {
  id: string;
  title: string;
  icon: string;
  onPress: () => void;
}

interface QuickActionButtonProps {
  action: QuickAction;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({ action }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={action.onPress}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name={action.icon as any}
          size={24}
          color="#8B5A3C"
        />
      </View>
      <Text variant="bodySmall" style={styles.title}>
        {action.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    textAlign: "center",
    color: "#666",
    fontSize: 12,
  },
});

export default QuickActionButton;
