import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DetailChart from "./DetailChart";

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
  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "#4CAF50";
      case "warning":
        return "#FF9800";
      case "critical":
        return "#F44336";
      default:
        return "#666";
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
        return "#FF9800";
      case "down":
        return "#4CAF50";
      case "stable":
        return "#4CAF50";
      default:
        return "#666";
    }
  };

  return (
    <Card style={styles.card} mode="contained">
      <Card.Content style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{vital.name}</Text>
          <View style={styles.statusContainer}>
            {vital.trend && getTrendIcon(vital.trend) && (
              <MaterialCommunityIcons
                name={getTrendIcon(vital.trend) as any}
                size={16}
                color={getTrendColor(vital.trend)}
                style={styles.trendIcon}
              />
            )}
            {vital.status !== "normal" && (
              <View style={styles.statusIndicator}>
                <View
                  style={[
                    styles.statusDot,
                    { backgroundColor: getStatusColor(vital.status) },
                  ]}
                />
                <Text
                  style={[
                    styles.statusText,
                    { color: getStatusColor(vital.status) },
                  ]}
                >
                  {vital.status.charAt(0).toUpperCase() + vital.status.slice(1)}
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.valueContainer}>
          <Text style={styles.value}>{vital.value}</Text>
          <Text style={styles.unit}>{vital.unit}</Text>
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

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    backgroundColor: "#FFF",
    elevation: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  trendIcon: {
    marginRight: 8,
  },
  statusIndicator: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 16,
  },
  value: {
    fontSize: 32,
    fontWeight: "600",
    color: "#000",
  },
  unit: {
    fontSize: 16,
    color: "#666",
    marginLeft: 8,
  },
});

export default VitalDetailCard;
