import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

interface ContractionEntry {
  id: string;
  date: string;
  timeRange: string;
  duration: string;
  avgContraction: string;
  interval: string;
  notes: string;
}

interface ContractionHistoryCardProps {
  entry: ContractionEntry;
}

const ContractionHistoryCard: React.FC<ContractionHistoryCardProps> = ({
  entry,
}) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        {/* Header with date and time */}
        <View style={styles.header}>
          <View style={styles.dateContainer}>
            <MaterialIcons name="calendar-today" size={16} color="#8B4513" />
            <Text style={styles.date}>{entry.date}</Text>
          </View>
          <View style={styles.timeContainer}>
            <MaterialIcons name="access-time" size={16} color="#8B4513" />
            <Text style={styles.time}>{entry.timeRange}</Text>
          </View>
        </View>

        {/* Contraction Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Duration</Text>
            <Text style={styles.detailValue}>{entry.duration}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Avg. Contraction</Text>
            <Text style={styles.detailValue}>{entry.avgContraction}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Interval</Text>
            <Text style={styles.detailValue}>{entry.interval}</Text>
          </View>
        </View>

        {/* Notes */}
        <View style={styles.notesContainer}>
          <Text style={styles.notesLabel}>Notes: </Text>
          <Text style={styles.notes}>{entry.notes}</Text>
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
    elevation: 1,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    fontSize: 14,
    color: "#333",
    marginLeft: 6,
    fontWeight: "500",
  },
  time: {
    fontSize: 14,
    color: "#333",
    marginLeft: 6,
    fontWeight: "500",
  },
  detailsContainer: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  detailLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 14,
    color: "#8B4513",
    fontWeight: "600",
  },
  notesContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  notesLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  notes: {
    fontSize: 14,
    color: "#666",
    flex: 1,
    marginLeft: 4,
  },
});

export default ContractionHistoryCard;
