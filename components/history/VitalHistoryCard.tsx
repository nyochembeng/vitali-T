import { useTheme } from "@/lib/hooks/useTheme";
import { Vital } from "@/lib/schemas/vitalSchema";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { Card, Text } from "react-native-paper";

interface VitalHistoryCardProps {
  vitals: Vital[]; // Array of vitals for a single session
}

const VitalHistoryCard: React.FC<VitalHistoryCardProps> = ({ vitals }) => {
  const { colors, typo, layout } = useTheme();

  // Get the timestamp from the first vital (assuming all vitals in the session share the same timestamp)
  const timestamp = vitals[0]?.timestamp || new Date().toISOString();
  const date = new Date(timestamp).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const time = new Date(timestamp).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  // Map vitals by type for easy access
  const vitalsMap = vitals.reduce(
    (acc, vital) => ({
      ...acc,
      [vital.type]: vital,
    }),
    {} as Record<string, Vital>
  );

  const getTrendIcon = (trend?: "up" | "down" | "stable") => {
    if (!trend || trend === "stable") return null;

    return (
      <MaterialIcons
        name={trend === "up" ? "trending-up" : "trending-down"}
        size={16}
        color={trend === "up" ? colors.success : colors.error}
        style={{ marginRight: layout.spacing.xs }}
      />
    );
  };

  const getValueColor = (
    status?: "normal" | "warning" | "critical",
    trend?: "up" | "down" | "stable"
  ) => {
    if (status === "critical" || status === "warning") return colors.error;
    if (trend === "up") return colors.success;
    if (trend === "down") return colors.error;
    return colors.text;
  };

  const renderVitalRow = (
    leftVital: Vital | undefined,
    rightVital: Vital | undefined,
    leftLabel: string,
    rightLabel: string
  ) => (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <View style={{ flex: 1, marginHorizontal: layout.spacing.xs }}>
        <Text
          style={{
            fontSize: typo.caption.fontSize,
            color: colors.text,
            marginBottom: layout.spacing.xs,
            fontWeight: "500",
            ...typo.caption,
          }}
        >
          {leftLabel}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {leftVital && getTrendIcon(leftVital.trend)}
          <Text
            style={[
              {
                fontSize: typo.body1.fontSize,
                fontWeight: "600",
                ...typo.body1,
              },
              { color: getValueColor(leftVital?.status, leftVital?.trend) },
            ]}
          >
            {leftVital ? `${leftVital.value} ${leftVital.unit}` : "N/A"}
          </Text>
        </View>
      </View>
      <View style={{ flex: 1, marginHorizontal: layout.spacing.xs }}>
        <Text
          style={{
            fontSize: typo.caption.fontSize,
            color: colors.text,
            marginBottom: layout.spacing.xs,
            fontWeight: "500",
            ...typo.caption,
          }}
        >
          {rightLabel}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {rightVital && getTrendIcon(rightVital.trend)}
          <Text
            style={[
              {
                fontSize: typo.body1.fontSize,
                fontWeight: "600",
                ...typo.body1,
              },
              { color: getValueColor(rightVital?.status, rightVital?.trend) },
            ]}
          >
            {rightVital ? `${rightVital.value} ${rightVital.unit}` : "N/A"}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <Card
      style={{
        marginHorizontal: layout.spacing.sm,
        marginVertical: layout.spacing.xs,
        backgroundColor: colors.card,
        elevation: layout.elevation,
        borderRadius: layout.borderRadius.medium,
      }}
    >
      <Card.Content>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: layout.spacing.sm,
          }}
        >
          <MaterialIcons name="schedule" size={16} color={colors.text} />
          <Text
            style={{
              fontSize: typo.body2.fontSize,
              color: colors.text,
              marginLeft: layout.spacing.xs,
              fontWeight: "500",
              ...typo.body2,
            }}
          >
            {date} - {time}
          </Text>
        </View>
        <View style={{ gap: layout.spacing.sm }}>
          {renderVitalRow(vitalsMap.fhr, vitalsMap.mhr, "FHR", "MHR")}
          {renderVitalRow(vitalsMap.bp, vitalsMap.spo2, "BP", "SpO2")}
          {renderVitalRow(vitalsMap.bt, vitalsMap.rr, "Temp", "RR")}
          {renderVitalRow(vitalsMap.hrv, vitalsMap.si, "HRV", "ShockIndex")}
        </View>
      </Card.Content>
    </Card>
  );
};

export default VitalHistoryCard;
