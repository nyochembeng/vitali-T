import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface SettingsItemType {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  iconColor: string;
  onPress: () => void;
  showChevron?: boolean;
}

interface SettingsItemProps {
  item: SettingsItemType;
}

export const SettingsItem: React.FC<SettingsItemProps> = ({ item }) => {
  const theme = useTheme();

  return (
    <Pressable
      style={[styles.container, { backgroundColor: theme.colors.surface }]}
      onPress={item.onPress}
      android_ripple={{ color: theme.colors.onSurface + "20" }}
    >
      <View style={styles.content}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: item.iconColor + "20" },
          ]}
        >
          <MaterialCommunityIcons
            name={item.icon as any}
            size={20}
            color={item.iconColor}
          />
        </View>

        <View style={styles.textContainer}>
          <Text
            variant="bodyLarge"
            style={[styles.title, { color: theme.colors.onSurface }]}
          >
            {item.title}
          </Text>
          {item.subtitle && (
            <Text
              variant="bodySmall"
              style={[
                styles.subtitle,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              {item.subtitle}
            </Text>
          )}
        </View>

        {item.showChevron !== false && (
          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color={theme.colors.onSurfaceVariant}
          />
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    overflow: "hidden",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "500",
  },
  subtitle: {
    marginTop: 2,
    opacity: 0.7,
  },
});
