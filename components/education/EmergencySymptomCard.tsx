import React from "react";
import { View, StyleSheet } from "react-native";
import { Surface, Text } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

interface EmergencySymptom {
  id: string;
  title: string;
  description: string;
  icon: string;
  severity: "high" | "medium" | "low";
}

interface EmergencySymptomCardProps {
  symptom: EmergencySymptom;
}

const getIconColor = (severity: string) => {
  switch (severity) {
    case "high":
      return "#EF4444";
    case "medium":
      return "#F59E0B";
    default:
      return "#8B5A2B";
  }
};

export const EmergencySymptomCard: React.FC<EmergencySymptomCardProps> = ({
  symptom,
}) => {
  const iconColor = getIconColor(symptom.severity);

  return (
    <Surface style={styles.card} elevation={1}>
      <View style={styles.iconContainer}>
        <MaterialIcons name={symptom.icon as any} size={24} color={iconColor} />
      </View>
      <View style={styles.content}>
        <Text variant="titleMedium" style={styles.title}>
          {symptom.title}
        </Text>
        <Text variant="bodyMedium" style={styles.description}>
          {symptom.description}
        </Text>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FEF3F2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  description: {
    color: "#6B7280",
    lineHeight: 20,
  },
});
