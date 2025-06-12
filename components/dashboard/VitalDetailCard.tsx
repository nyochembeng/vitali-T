import React from "react";
import { View } from "react-native";
import { Card, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DetailChart from "./DetailChart";
import { useTheme } from "@/lib/hooks/useTheme";

interface VitalReading {
  id: string;
  name: string;
  value: string | number;
  unit: string;
  status: "normal" | "warning" | "critical";
  chartData?: number[];
  trend?: "up" | "down" | "stable";
  chartColor: string;
  hasChart?: boolean;
}

interface VitalDetailCardProps {
  vital: VitalReading;
}

const VitalDetailCard: React.FC<VitalDetailCardProps> = ({ vital }) => {
  const { colors, typo, layout } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return colors.success;
      case "warning":
        return colors.warning;
      case "critical":
        return colors.error;
      default:
        return colors.text;
    }
  };

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case "up":
        return "trending-up";
      case "down":
        return "trending-down";
      case "stable":
        return "trending-neutral";
      default:
        return null;
    }
  };

  const getTrendColor = (trend?: string) => {
    switch (trend) {
      case "up":
        return colors.warning;
      case "down":
        return colors.success;
      case "stable":
        return colors.success;
      default:
        return colors.text;
    }
  };

  return (
    <Card
      style={{
        marginVertical: layout.spacing.sm,
        backgroundColor: colors.card,
        elevation: layout.elevation,
      }}
      mode="contained"
    >
      <Card.Content
        style={{
          padding: layout.spacing.sm,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: layout.spacing.sm,
          }}
        >
          <Text
            style={{
              fontSize: typo.body1.fontSize,
              color: colors.text,
              flex: 1,
              ...typo.body1,
            }}
          >
            {vital.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {vital.trend && getTrendIcon(vital.trend) && (
              <MaterialCommunityIcons
                name={getTrendIcon(vital.trend) as any}
                size={16}
                color={getTrendColor(vital.trend)}
                style={{
                  marginRight: layout.spacing.sm,
                }}
              />
            )}
            {vital.status !== "normal" && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginRight: layout.spacing.xs,
                    backgroundColor: getStatusColor(vital.status),
                  }}
                />
                <Text
                  style={{
                    fontSize: typo.body3.fontSize,
                    fontWeight: "500",
                    color: getStatusColor(vital.status),
                    ...typo.body3,
                  }}
                >
                  {vital.status.charAt(0).toUpperCase() + vital.status.slice(1)}
                </Text>
              </View>
            )}
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
              fontSize: typo.h3.fontSize,
              fontWeight: "600",
              color: colors.text,
              ...typo.h3,
            }}
          >
            {vital.value}
          </Text>
          <Text
            style={{
              fontSize: typo.body1.fontSize,
              color: colors.text,
              marginLeft: layout.spacing.sm,
              ...typo.body1,
            }}
          >
            {vital.unit}
          </Text>
        </View>

        {vital.hasChart && vital.chartData && (
          <DetailChart
            data={vital.chartData}
            color={vital.chartColor}
            height={60}
          />
        )}
      </Card.Content>
    </Card>
  );
};

export default VitalDetailCard;
