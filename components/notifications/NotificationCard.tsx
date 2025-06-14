import { useTheme } from "@/lib/hooks/useTheme";
import { Notification } from "@/lib/schemas/notificationSchema";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import React from "react";
import { View } from "react-native";
import { Card, Text } from "react-native-paper";

interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead?: (id: string) => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onMarkAsRead,
}) => {
  const { colors, typo, layout } = useTheme();

  const getIcon = () => {
    switch (notification.type) {
      case "alert":
        return {
          icon: notification.category === "Health" ? "alert-circle" : "alert",
        };
      case "tip":
        return { icon: "lightbulb" };
      case "report":
        return { icon: "chart-line" };
      case "reminder":
        return { icon: "bell" };
      default:
        return { icon: "information" };
    }
  };

  const { icon } = getIcon();

  return (
    <Card
      style={{
        marginHorizontal: layout.spacing.sm,
        marginVertical: layout.spacing.xs,
        elevation: layout.elevation,
        backgroundColor: notification.read ? colors.card : colors.surface,
        opacity: notification.read ? 0.7 : 1,
      }}
    >
      <Card.Content style={{ padding: layout.spacing.sm }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: layout.spacing.xs,
          }}
        >
          <View style={{ flexDirection: "row", flex: 1 }}>
            <MaterialCommunityIcons
              name={icon as any}
              size={24}
              color={colors.primary}
              style={{
                marginRight: layout.spacing.sm,
                marginTop: layout.spacing.xs,
              }}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  ...typo.body1,
                  color: colors.text,
                  fontWeight: notification.read ? "400" : "600",
                  marginBottom: layout.spacing.xs,
                }}
              >
                {notification.title}
              </Text>
              <Text
                style={{ ...typo.caption, color: colors.text, opacity: 0.7 }}
              >
                {formatDistanceToNow(new Date(notification.timestamp), {
                  addSuffix: true,
                })}
              </Text>
            </View>
          </View>
        </View>
        <Text
          style={{
            ...typo.body2,
            color: colors.text,
            marginLeft: layout.spacing.xl,
            lineHeight: typo.body2.lineHeight,
            opacity: notification.read ? 0.7 : 1,
          }}
        >
          {notification.message}
        </Text>
      </Card.Content>
    </Card>
  );
};
