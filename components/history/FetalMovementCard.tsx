import { useTheme } from "@/lib/hooks/useTheme";
import { FetalMovement } from "@/lib/schemas/fetalMovementSchema";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { Card, Text } from "react-native-paper";

interface FetalMovementCardProps {
  entry: FetalMovement;
}

const FetalMovementCard: React.FC<FetalMovementCardProps> = ({ entry }) => {
  const { colors, typo, layout } = useTheme();

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    const isYesterday =
      date.toDateString() ===
      new Date(today.setDate(today.getDate() - 1)).toDateString();
    return isToday
      ? "Today"
      : isYesterday
        ? "Yesterday"
        : date.toLocaleDateString();
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  };

  return (
    <Card
      style={{
        marginHorizontal: layout.spacing.sm,
        marginVertical: layout.spacing.xs,
        backgroundColor: colors.card,
        elevation: layout.elevation,
        borderRadius: layout.borderRadius.medium,
        shadowColor: colors.text,
        shadowOffset: layout.shadow.light.shadowOffset,
        shadowOpacity: layout.shadow.light.shadowOpacity,
        shadowRadius: layout.shadow.light.shadowRadius,
        padding: layout.spacing.md,
      }}
    >
      <Card.Content>
        <View style={{ marginBottom: layout.spacing.sm }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons
                name="calendar-today"
                size={16}
                color={colors.primary}
              />
              <Text
                style={{
                  fontSize: typo.body2.fontSize,
                  color: colors.text,
                  marginLeft: layout.spacing.xs,
                  fontWeight: "500",
                  ...typo.body2,
                }}
              >
                {formatDate(entry.timestamp)}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons
                name="access-time"
                size={16}
                color={colors.primary}
              />
              <Text
                style={{
                  fontSize: typo.body2.fontSize,
                  color: colors.text,
                  marginLeft: layout.spacing.xs,
                  fontWeight: "500",
                  ...typo.body2,
                }}
              >
                {formatTime(entry.timestamp)}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "baseline",
            marginBottom: layout.spacing.sm,
          }}
        >
          <Text
            style={{
              fontSize: typo.h2.fontSize,
              fontWeight: "700",
              color: colors.primary,
              marginRight: layout.spacing.xs,
              ...typo.h2,
            }}
          >
            {entry.kickCount}
          </Text>
          <Text
            style={{
              fontSize: typo.body1.fontSize,
              color: colors.text,
              fontWeight: "500",
              ...typo.body1,
            }}
          >
            kicks
          </Text>
        </View>

        {entry.notes && (
          <Text
            style={{
              fontSize: typo.body2.fontSize,
              color: colors.text,
              lineHeight: typo.body2.lineHeight,
              ...typo.body2,
            }}
          >
            {entry.notes}
          </Text>
        )}
      </Card.Content>
    </Card>
  );
};

export default FetalMovementCard;
