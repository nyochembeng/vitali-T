import React from "react";
import { View } from "react-native";
import { Text, Card } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@/lib/hooks/useTheme";

interface VitalReading {
  label: string;
  value: string;
  unit?: string;
  trend?: "up" | "down" | "neutral";
  isNormal?: boolean;
}

interface VitalHistoryEntry {
  id: string;
  date: string;
  time: string;
  readings: {
    fhr: VitalReading;
    mhr: VitalReading;
    bp: VitalReading;
    spo2: VitalReading;
    temp: VitalReading;
    rr: VitalReading;
    hrv: VitalReading;
    shockIndex: VitalReading;
  };
}

interface VitalHistoryCardProps {
  entry: VitalHistoryEntry;
}

const VitalHistoryCard: React.FC<VitalHistoryCardProps> = ({ entry }) => {
  const { colors, typo, layout } = useTheme();

  const getTrendIcon = (trend?: "up" | "down" | "neutral") => {
    if (!trend || trend === "neutral") return null;

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
    isNormal?: boolean,
    trend?: "up" | "down" | "neutral"
  ) => {
    if (isNormal === false) return colors.error;
    if (trend === "up") return colors.success;
    if (trend === "down") return colors.error;
    return colors.text;
  };

  const renderVitalRow = (
    leftReading: VitalReading,
    rightReading: VitalReading,
    leftLabel: string,
    rightLabel: string
  ) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {getTrendIcon(leftReading.trend)}
          <Text
            style={[
              {
                fontSize: typo.body1.fontSize,
                fontWeight: "600",
                ...typo.body1,
              },
              { color: getValueColor(leftReading.isNormal, leftReading.trend) },
            ]}
          >
            {leftReading.value}
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {getTrendIcon(rightReading.trend)}
          <Text
            style={[
              {
                fontSize: typo.body1.fontSize,
                fontWeight: "600",
                ...typo.body1,
              },
              {
                color: getValueColor(rightReading.isNormal, rightReading.trend),
              },
            ]}
          >
            {rightReading.value}
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
            {entry.date} - {entry.time}
          </Text>
        </View>

        <View
          style={{
            gap: layout.spacing.sm,
          }}
        >
          {renderVitalRow(entry.readings.fhr, entry.readings.mhr, "FHR", "MHR")}
          {renderVitalRow(entry.readings.bp, entry.readings.spo2, "BP", "SpO2")}
          {renderVitalRow(entry.readings.temp, entry.readings.rr, "Temp", "RR")}
          {renderVitalRow(
            entry.readings.hrv,
            entry.readings.shockIndex,
            "HRV",
            "ShockIndex"
          )}
        </View>
      </Card.Content>
    </Card>
  );
};

export default VitalHistoryCard;
