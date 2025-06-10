import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Text, Card, useTheme, Badge } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";

interface NotificationItem {
  id: string;
  type: "alert" | "tip" | "report" | "reminder";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: "high" | "medium" | "low";
}

interface NotificationCardProps {
  notification: NotificationItem;
  onPress?: (notification: NotificationItem) => void;
  onMarkAsRead?: (id: string) => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onPress,
  onMarkAsRead,
}) => {
  const theme = useTheme();

  const getIconAndColor = () => {
    switch (notification.type) {
      case "alert":
        return { icon: "alert-circle", color: "#FF6B6B" };
      case "tip":
        return { icon: "lightbulb", color: "#4ECDC4" };
      case "report":
        return { icon: "chart-line", color: "#45B7D1" };
      case "reminder":
        return { icon: "bell", color: "#96CEB4" };
      default:
        return { icon: "information", color: "#95A5A6" };
    }
  };

  const { icon, color } = getIconAndColor();

  return (
    <Pressable onPress={() => onPress?.(notification)}>
      <Card
        style={[
          styles.card,
          {
            backgroundColor: notification.read
              ? theme.colors.surface
              : theme.colors.surfaceVariant,
            opacity: notification.read ? 0.7 : 1,
          },
        ]}
      >
        <Card.Content style={styles.content}>
          <View style={styles.header}>
            <View style={styles.iconTitleContainer}>
              <MaterialCommunityIcons
                name={icon as any}
                size={24}
                color={color}
                style={styles.icon}
              />
              <View style={styles.titleContainer}>
                <Text
                  variant="bodyLarge"
                  style={[
                    styles.title,
                    {
                      color: theme.colors.onSurface,
                      fontWeight: notification.read ? "400" : "600",
                    },
                  ]}
                >
                  {notification.title}
                </Text>
                <Text
                  variant="bodySmall"
                  style={[
                    styles.timestamp,
                    { color: theme.colors.onSurfaceVariant },
                  ]}
                >
                  {formatDistanceToNow(notification.timestamp, {
                    addSuffix: true,
                  })}
                </Text>
              </View>
            </View>
            {!notification.read && (
              <Badge style={[styles.unreadBadge, { backgroundColor: color }]} />
            )}
          </View>

          <Text
            variant="bodyMedium"
            style={[
              styles.message,
              {
                color: theme.colors.onSurfaceVariant,
                opacity: notification.read ? 0.7 : 1,
              },
            ]}
          >
            {notification.message}
          </Text>
        </Card.Content>
      </Card>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 6,
    elevation: 2,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  iconTitleContainer: {
    flexDirection: "row",
    flex: 1,
  },
  icon: {
    marginRight: 12,
    marginTop: 2,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    marginBottom: 2,
  },
  timestamp: {
    opacity: 0.7,
  },
  message: {
    marginLeft: 36,
    lineHeight: 20,
  },
  unreadBadge: {
    width: 8,
    height: 8,
    marginTop: 6,
  },
});
