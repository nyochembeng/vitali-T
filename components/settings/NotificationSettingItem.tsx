import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Switch, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  icon: string;
  enabled: boolean;
}

interface NotificationSettingItemProps {
  setting: NotificationSetting;
  onToggle: (id: string, enabled: boolean) => void;
}

export const NotificationSettingItem: React.FC<
  NotificationSettingItemProps
> = ({ setting, onToggle }) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.surfaceVariant },
      ]}
    >
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name={setting.icon as any}
          size={24}
          color="#4A90E2"
        />
      </View>

      <View style={styles.contentContainer}>
        <Text
          variant="bodyLarge"
          style={[styles.title, { color: theme.colors.onSurface }]}
        >
          {setting.title}
        </Text>
        <Text
          variant="bodyMedium"
          style={[styles.description, { color: theme.colors.onSurfaceVariant }]}
        >
          {setting.description}
        </Text>
      </View>

      <Switch
        value={setting.enabled}
        onValueChange={(enabled) => onToggle(setting.id, enabled)}
        thumbColor={setting.enabled ? "#4A90E2" : "#E0E0E0"}
        trackColor={{ false: "#E0E0E0", true: "#4A90E2" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 24,
    borderRadius: 16,
  },
  iconContainer: {
    marginRight: 16,
  },
  contentContainer: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    lineHeight: 20,
    opacity: 0.8,
  },
});
