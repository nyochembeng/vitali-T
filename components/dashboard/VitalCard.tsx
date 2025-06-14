import { useTheme } from "@/lib/hooks/useTheme";
import { Vital } from "@/lib/schemas/vitalSchema";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { Card, Text } from "react-native-paper";
import MiniChart from "./MiniChart";

interface VitalCardProps {
  metric: Vital;
}

const VitalCard: React.FC<VitalCardProps> = ({ metric }) => {
  const { colors, typo, layout } = useTheme();

  // Map vital type to display names
  const getVitalName = (type: Vital["type"]) => {
    switch (type) {
      case "fhr":
        return "Fetal Heart Rate";
      case "mhr":
        return "Maternal Heart Rate";
      case "bp":
        return "Blood Pressure";
      case "spo2":
        return "Oxygen Saturation";
      case "bt":
        return "Body Temperature";
      case "rr":
        return "Respiratory Rate";
      case "hrv":
        return "Heart Rate Variability";
      case "si":
        return "Shock Index";
      default:
        return type;
    }
  };

  // Map vital type to icons
  const getVitalIcon = (type: Vital["type"]) => {
    switch (type) {
      case "fhr":
        return "heart";
      case "mhr":
        return "heart-pulse";
      case "bp":
        return "water";
      case "spo2":
        return "lungs";
      case "bt":
        return "thermometer";
      case "rr":
        return "lungs";
      case "hrv":
        return "chart-line-variant";
      case "si":
        return "chart-timeline";
      default:
        return "heart";
    }
  };

  return (
    <Card
      style={{
        flex: 1,
        margin: layout.spacing.sm,
        backgroundColor: colors.card,
        elevation: 2,
      }}
      mode="contained"
    >
      <Card.Content style={{ padding: layout.spacing.sm }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: layout.spacing.xs,
          }}
        >
          <MaterialCommunityIcons
            name={getVitalIcon(metric.type)}
            size={20}
            color={colors.primary}
          />
          <Text
            style={{
              marginLeft: layout.spacing.sm,
              color: colors.text,
              ...typo.body2,
            }}
          >
            {getVitalName(metric.type)}
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
            style={{
              fontWeight: "600",
              color: colors.text,
              ...typo.h5,
            }}
          >
            {metric.value}
          </Text>
          <Text
            style={{
              marginLeft: layout.spacing.xs,
              color: colors.text,
              ...typo.body3,
            }}
          >
            {metric.unit}
          </Text>
        </View>

        {metric.hasChart && metric.chartData && (
          <MiniChart data={metric.chartData} color={colors.primary} />
        )}
      </Card.Content>
    </Card>
  );
};

export default VitalCard;
