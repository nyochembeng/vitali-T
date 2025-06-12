import React from "react";
import { View } from "react-native";
import { Card, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MiniChart from "./MiniChart";
import { useTheme } from "@/lib/hooks/useTheme";

interface VitalMetric {
  id: string;
  title: string;
  value: string | number;
  unit: string;
  icon: string;
  chartData?: number[];
  color?: string;
}

interface VitalCardProps {
  metric: VitalMetric;
}

const VitalCard: React.FC<VitalCardProps> = ({ metric }) => {
  const { colors, typo, layout } = useTheme();

  return (
    <Card
      style={{
        flex: 1,
        margin: layout.spacing.sm,
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
            alignItems: "center",
            marginBottom: layout.spacing.xs,
          }}
        >
          <MaterialCommunityIcons
            name={metric.icon as any}
            size={20}
            color={colors.primary}
          />
          <Text
            variant="bodyMedium"
            style={{
              marginLeft: layout.spacing.sm,
              color: colors.text,
              ...typo.body2,
            }}
          >
            {metric.title}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "baseline",
            marginBottom: layout.spacing.sm,
          }}
        >
          <Text
            variant="headlineMedium"
            style={{
              fontWeight: "600",
              color: colors.text,
              ...typo.h5,
            }}
          >
            {metric.value}
          </Text>
          <Text
            variant="bodySmall"
            style={{
              marginLeft: layout.spacing.xs,
              color: colors.text,
              ...typo.body3,
            }}
          >
            {metric.unit}
          </Text>
        </View>

        {metric.chartData && (
          <MiniChart
            data={metric.chartData}
            color={metric.color || colors.primary}
          />
        )}
      </Card.Content>
    </Card>
  );
};

export default VitalCard;
