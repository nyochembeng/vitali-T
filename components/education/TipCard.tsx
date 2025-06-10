import React from "react";
import { View, StyleSheet } from "react-native";
import { Surface, Text } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

interface Tip {
  id: string;
  category: "development" | "nutrition" | "exercise" | "wellness";
  title: string;
  description: string;
  week: number;
  icon: string;
}

interface TipCardProps {
  tip: Tip;
}

const getCategoryIcon = (category: string): string => {
  switch (category) {
    case "development":
      return "child-care";
    case "nutrition":
      return "restaurant";
    case "exercise":
      return "fitness-center";
    case "wellness":
      return "favorite";
    default:
      return "info";
  }
};

const getCategoryColor = (category: string): string => {
  switch (category) {
    case "development":
      return "#8B5A2B";
    case "nutrition":
      return "#D4A574";
    case "exercise":
      return "#B8860B";
    case "wellness":
      return "#CD853F";
    default:
      return "#6B7280";
  }
};

export const TipCard: React.FC<TipCardProps> = ({ tip }) => {
  const iconName = getCategoryIcon(tip.category);
  const iconColor = getCategoryColor(tip.category);

  return (
    <Surface style={styles.card} elevation={1}>
      <View style={styles.header}>
        <Text variant="labelMedium" style={styles.weekLabel}>
          Week {tip.week}
        </Text>
        <MaterialIcons name={iconName as any} size={20} color={iconColor} />
      </View>
      <Text variant="titleLarge" style={styles.title}>
        {tip.title}
      </Text>
      <Text variant="bodyMedium" style={styles.description}>
        {tip.description}
      </Text>
    </Surface>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  weekLabel: {
    color: "#6B7280",
    fontWeight: "500",
  },
  title: {
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  description: {
    color: "#6B7280",
    lineHeight: 20,
  },
});
