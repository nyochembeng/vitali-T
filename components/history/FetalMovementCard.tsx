import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

interface FetalMovementEntry {
  id: string;
  date: string;
  time: string;
  kickCount: number;
  notes: string;
}

interface FetalMovementCardProps {
  entry: FetalMovementEntry;
}

const FetalMovementCard: React.FC<FetalMovementCardProps> = ({ entry }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <View style={styles.dateTimeContainer}>
            <View style={styles.dateContainer}>
              <MaterialIcons name="calendar-today" size={16} color="#8B4513" />
              <Text style={styles.date}>{entry.date}</Text>
            </View>
            <View style={styles.timeContainer}>
              <MaterialIcons name="access-time" size={16} color="#8B4513" />
              <Text style={styles.time}>{entry.time}</Text>
            </View>
          </View>
        </View>

        <View style={styles.kickCountContainer}>
          <Text style={styles.kickCount}>{entry.kickCount}</Text>
          <Text style={styles.kickLabel}>kicks</Text>
        </View>

        <Text style={styles.notes}>{entry.notes}</Text>
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
    marginBottom: 16,
  },
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  kickCountContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 12,
  },
  kickCount: {
    fontSize: 32,
    fontWeight: "700",
    color: "#8B4513",
    marginRight: 4,
  },
  kickLabel: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  notes: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});

export default FetalMovementCard;
