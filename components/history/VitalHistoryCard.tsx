import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

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
  const getTrendIcon = (trend?: "up" | "down" | "neutral") => {
    if (!trend || trend === "neutral") return null;

    return (
      <MaterialIcons
        name={trend === "up" ? "trending-up" : "trending-down"}
        size={16}
        color={trend === "up" ? "#4CAF50" : "#F44336"}
        style={styles.trendIcon}
      />
    );
  };

  const getValueColor = (
    isNormal?: boolean,
    trend?: "up" | "down" | "neutral"
  ) => {
    if (isNormal === false) return "#F44336";
    if (trend === "up") return "#4CAF50";
    if (trend === "down") return "#F44336";
    return "#333";
  };

  const renderVitalRow = (
    leftReading: VitalReading,
    rightReading: VitalReading,
    leftLabel: string,
    rightLabel: string
  ) => (
    <View style={styles.vitalRow}>
      <View style={styles.vitalItem}>
        <Text style={styles.vitalLabel}>{leftLabel}</Text>
        <View style={styles.vitalValueContainer}>
          {getTrendIcon(leftReading.trend)}
          <Text
            style={[
              styles.vitalValue,
              { color: getValueColor(leftReading.isNormal, leftReading.trend) },
            ]}
          >
            {leftReading.value}
          </Text>
        </View>
      </View>

      <View style={styles.vitalItem}>
        <Text style={styles.vitalLabel}>{rightLabel}</Text>
        <View style={styles.vitalValueContainer}>
          {getTrendIcon(rightReading.trend)}
          <Text
            style={[
              styles.vitalValue,
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
    <Card style={styles.card}>
      <Card.Content>
        {/* Date and Time Header */}
        <View style={styles.header}>
          <MaterialIcons name="schedule" size={16} color="#666" />
          <Text style={styles.dateTime}>
            {entry.date} - {entry.time}
          </Text>
        </View>

        {/* Vital Signs */}
        <View style={styles.vitalsContainer}>
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

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: "#fff",
    elevation: 2,
    borderRadius: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  dateTime: {
    fontSize: 14,
    color: "#333",
    marginLeft: 8,
    fontWeight: "500",
  },
  vitalsContainer: {
    gap: 12,
  },
  vitalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  vitalItem: {
    flex: 1,
    marginHorizontal: 8,
  },
  vitalLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
    fontWeight: "500",
  },
  vitalValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  vitalValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  trendIcon: {
    marginRight: 4,
  },
});

export default VitalHistoryCard;
