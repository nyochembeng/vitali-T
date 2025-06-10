import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MiniChart from "./MiniChart";

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
  return (
    <Card style={styles.card} mode="contained">
      <Card.Content style={styles.content}>
        <View style={styles.header}>
          <MaterialCommunityIcons
            name={metric.icon as any}
            size={20}
            color="#8B5A3C"
          />
          <Text variant="bodyMedium" style={styles.title}>
            {metric.title}
          </Text>
        </View>

        <View style={styles.valueContainer}>
          <Text variant="headlineMedium" style={styles.value}>
            {metric.value}
          </Text>
          <Text variant="bodySmall" style={styles.unit}>
            {metric.unit}
          </Text>
        </View>

        {metric.chartData && (
          <MiniChart
            data={metric.chartData}
            color={metric.color || "#8B5A3C"}
          />
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    backgroundColor: "#FFF",
    elevation: 1,
  },
  content: {
    padding: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    marginLeft: 8,
    color: "#666",
    fontSize: 12,
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 12,
  },
  value: {
    fontWeight: "600",
    color: "#000",
  },
  unit: {
    marginLeft: 4,
    color: "#999",
    fontSize: 12,
  },
});

export default VitalCard;
