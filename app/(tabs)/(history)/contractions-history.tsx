import ContractionHistoryCard from "@/components/history/ContractionHistoryCard";
import ContractionOverviewCard from "@/components/history/ContractionOverviewCard";
import CustomAppBar from "@/components/utils/CustomAppBar";
import FilterTabs from "@/components/utils/FilterTabs";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

interface ContractionOverview {
  averageInterval: string;
  totalContractions: number;
}

interface ContractionEntry {
  id: string;
  date: string;
  timeRange: string;
  duration: string;
  avgContraction: string;
  interval: string;
  notes: string;
}

export default function ContractionHistoryScreen() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All Time");
  const router = useRouter();

  const filterOptions = ["All Time", "Today", "Yesterday", "Last Week"];

  // Sample data - replace with actual data from your API/state
  const todaysOverview: ContractionOverview = {
    averageInterval: "3.5 min",
    totalContractions: 12,
  };

  const contractionEntries: ContractionEntry[] = [
    {
      id: "1",
      date: "July 15, 2023",
      timeRange: "04:22 PM - 04:50 PM",
      duration: "28 minutes",
      avgContraction: "45 seconds",
      interval: "2 minutes",
      notes: "Mild discomfort",
    },
    {
      id: "2",
      date: "July 15, 2023",
      timeRange: "02:15 PM - 02:45 PM",
      duration: "30 minutes",
      avgContraction: "40 seconds",
      interval: "2.5 minutes",
      notes: "Regular pattern",
    },
    {
      id: "3",
      date: "July 14, 2023",
      timeRange: "08:30 PM - 09:15 PM",
      duration: "45 minutes",
      avgContraction: "50 seconds",
      interval: "1.5 minutes",
      notes: "Strong contractions",
    },
  ];

  const handleLogNewContraction = () => {
    // Navigate to contraction logging screen
    router.push("/log-contractions");
  };

  const renderContractionCard = ({ item }: { item: ContractionEntry }) => (
    <ContractionHistoryCard entry={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomAppBar title="Contractions History" rightAction="notifications" />

      {/* Today's Overview */}
      <ContractionOverviewCard overview={todaysOverview} />

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <FilterTabs
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          options={filterOptions}
        />
      </View>

      {/* Contractions List */}
      <FlatList
        data={contractionEntries}
        renderItem={renderContractionCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

      {/* Log New Contraction Button */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleLogNewContraction}
          style={styles.logButton}
          labelStyle={styles.logButtonText}
          icon="plus"
        >
          Log New Contraction
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#fff",
    elevation: 0,
    shadowOpacity: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  filterContainer: {
    backgroundColor: "#fff",
    paddingBottom: 8,
  },
  listContainer: {
    paddingBottom: 100, // Space for floating button
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#fff",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logButton: {
    backgroundColor: "#8B4513",
    borderRadius: 12,
    paddingVertical: 4,
  },
  logButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
