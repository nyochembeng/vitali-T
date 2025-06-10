import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Text, Card, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import FilterTabs from "@/components/utils/FilterTabs";
import CustomAppBar from "@/components/utils/CustomAppBar";

interface SleepEntry {
  id: string;
  date: string;
  duration: string;
  bedtime: string;
  note: string;
  quality: "good" | "poor" | "restless";
  icon: string;
}

export default function SleepHistoryScreen() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All Time");
  const [sortBy, setSortBy] = useState<string>("Most Recent");

  const filterOptions = ["All Time", "This Week", "This Month", "Last Month"];

  const sleepEntries: SleepEntry[] = [
    {
      id: "1",
      date: "Thu, Oct 12",
      duration: "8h 15min",
      bedtime: "10:15 PM – 6:30 AM",
      note: "Slept well",
      quality: "good",
      icon: "🌙",
    },
    {
      id: "2",
      date: "Wed, Oct 11",
      duration: "7h 30min",
      bedtime: "10:45 PM – 6:15 AM",
      note: "Night shift call interrupted sleep",
      quality: "poor",
      icon: "☎️",
    },
    {
      id: "3",
      date: "Tue, Oct 10",
      duration: "8h 45min",
      bedtime: "9:30 PM – 6:15 AM",
      note: "Restful sleep",
      quality: "good",
      icon: "🌙",
    },
    {
      id: "4",
      date: "Mon, Oct 9",
      duration: "6h 30min",
      bedtime: "11:00 PM – 5:30 AM",
      note: "Baby woke up frequently",
      quality: "restless",
      icon: "👶",
    },
  ];

  const weeklyAverage = {
    duration: "7h 45min",
    pattern: "Good Sleep Pattern",
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "good":
        return "#4CAF50";
      case "poor":
        return "#F44336";
      case "restless":
        return "#FF9800";
      default:
        return "#666";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <CustomAppBar title="Sleep History" rightAction="notifications" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Weekly Summary Card */}
        <Card style={styles.summaryCard}>
          <Card.Content>
            <Text style={styles.summaryTitle}>{`This Week's Sleep`}</Text>
            <Text style={styles.averageDuration}>{weeklyAverage.duration}</Text>
            <Text style={styles.averageLabel}>average</Text>
            <View style={styles.patternRow}>
              <Text style={styles.patternIcon}>🌙</Text>
              <Text style={styles.patternText}>{weeklyAverage.pattern}</Text>
            </View>
          </Card.Content>
        </Card>

        {/* Filter Tabs */}
        <FilterTabs
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          options={filterOptions}
        />

        {/* Sort Dropdown */}
        <TouchableOpacity style={styles.sortContainer}>
          <Text style={styles.sortLabel}>Sort by: {sortBy}</Text>
          <MaterialIcons name="keyboard-arrow-down" size={20} color="#666" />
        </TouchableOpacity>

        {/* Sleep Entries */}
        {sleepEntries.map((entry) => (
          <TouchableOpacity key={entry.id}>
            <Card style={styles.entryCard}>
              <Card.Content style={styles.entryContent}>
                <View style={styles.entryMain}>
                  <Text style={styles.entryDate}>{entry.date}</Text>
                  <View style={styles.durationRow}>
                    <Text style={styles.entryDuration}>{entry.duration}</Text>
                    <Text style={styles.entryIcon}>{entry.icon}</Text>
                  </View>
                  <Text style={styles.entryBedtime}>{entry.bedtime}</Text>
                  <Text style={styles.entryNote}>{entry.note}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#ccc" />
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Log New Sleep Button */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.logButton}
          labelStyle={styles.logButtonText}
          onPress={() => {}}
        >
          Log New Sleep
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  content: {
    flex: 1,
  },
  summaryCard: {
    margin: 16,
    backgroundColor: "#f8f8f8",
    elevation: 0,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  averageDuration: {
    fontSize: 24,
    fontWeight: "300",
    color: "#8B4513",
    marginBottom: 4,
  },
  averageLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  patternRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  patternIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  patternText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sortLabel: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  entryCard: {
    marginHorizontal: 16,
    marginVertical: 6,
    backgroundColor: "#f8f8f8",
    elevation: 0,
  },
  entryContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  entryMain: {
    flex: 1,
  },
  entryDate: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  durationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  entryDuration: {
    fontSize: 18,
    fontWeight: "300",
    color: "#8B4513",
    marginRight: 8,
  },
  entryIcon: {
    fontSize: 16,
  },
  entryBedtime: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  entryNote: {
    fontSize: 14,
    color: "#666",
  },
  buttonContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  logButton: {
    backgroundColor: "#8B4513",
    borderRadius: 25,
    paddingVertical: 8,
  },
  logButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
