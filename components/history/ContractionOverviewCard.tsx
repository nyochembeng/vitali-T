import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

interface ContractionOverview {
  averageInterval: string;
  totalContractions: number;
}

interface ContractionOverviewCardProps {
  overview: ContractionOverview;
}

const ContractionOverviewCard: React.FC<ContractionOverviewCardProps> = ({
  overview,
}) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.title}>{`Today's Overview`}</Text>

        <View style={styles.overviewContainer}>
          <View style={styles.overviewItem}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="timeline" size={20} color="#8B4513" />
            </View>
            <Text style={styles.label}>Average Interval</Text>
            <Text style={styles.value}>{overview.averageInterval}</Text>
          </View>

          <View style={styles.overviewItem}>
            <Text style={styles.label}>Total Contractions</Text>
            <Text style={styles.value}>{overview.totalContractions}</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: "#F5F3F0",
    elevation: 0,
    borderRadius: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  overviewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  overviewItem: {
    flex: 1,
  },
  iconContainer: {
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: "600",
    color: "#8B4513",
  },
});

export default ContractionOverviewCard;
