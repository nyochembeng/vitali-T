import VitalHistoryCard from "@/components/history/VitalHistoryCard";
import CustomAppBar from "@/components/utils/CustomAppBar";
import FilterTabs from "@/components/utils/FilterTabs";
import React, { useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";

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

export default function VitalsHistoryScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("Today");

  const filterOptions = ["Today", "Last 7 Days", "Last 30 Days", "Custom"];

  // Sample data - replace with actual data from your API/state
  const sampleData: VitalHistoryEntry[] = [
    {
      id: "1",
      date: "May 18, 2024",
      time: "10:32 AM",
      readings: {
        fhr: { label: "FHR", value: "142", unit: "bpm", trend: "up" },
        mhr: { label: "MHR", value: "78", unit: "bpm" },
        bp: { label: "BP", value: "118/75", unit: "mmHg", trend: "down" },
        spo2: { label: "SpO2", value: "98", unit: "%" },
        temp: { label: "Temp", value: "36.8", unit: "°C" },
        rr: { label: "RR", value: "16", unit: "br/min", trend: "up" },
        hrv: { label: "HRV", value: "65", unit: "ms", trend: "down" },
        shockIndex: { label: "ShockIndex", value: "0.82" },
      },
    },
    {
      id: "2",
      date: "May 18, 2024",
      time: "08:15 AM",
      readings: {
        fhr: { label: "FHR", value: "140", unit: "bpm", trend: "down" },
        mhr: { label: "MHR", value: "76", unit: "bpm" },
        bp: { label: "BP", value: "120/78", unit: "mmHg", trend: "up" },
        spo2: { label: "SpO2", value: "99", unit: "%", trend: "up" },
        temp: { label: "Temp", value: "36.7", unit: "°C", trend: "down" },
        rr: { label: "RR", value: "15", unit: "br/min" },
        hrv: { label: "HRV", value: "68", unit: "ms", trend: "up" },
        shockIndex: { label: "ShockIndex", value: "0.81", trend: "down" },
      },
    },
    {
      id: "3",
      date: "May 17, 2024",
      time: "11:45 PM",
      readings: {
        fhr: { label: "FHR", value: "145", unit: "bpm", trend: "up" },
        mhr: { label: "MHR", value: "77", unit: "bpm", trend: "up" },
        bp: { label: "BP", value: "119/76", unit: "mmHg" },
        spo2: { label: "SpO2", value: "98", unit: "%" },
        temp: { label: "Temp", value: "36.9", unit: "°C", trend: "up" },
        rr: { label: "RR", value: "17", unit: "br/min", trend: "up" },
        hrv: { label: "HRV", value: "63", unit: "ms", trend: "down" },
        shockIndex: { label: "ShockIndex", value: "0.83", trend: "up" },
      },
    },
  ];

  const renderVitalCard = ({ item }: { item: VitalHistoryEntry }) => (
    <VitalHistoryCard entry={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <CustomAppBar title="Vitals History" rightAction="notifications" />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search vitals or dates..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
          inputStyle={styles.searchInput}
          iconColor="#999"
        />
      </View>

      {/* Filter Tabs */}
      <FilterTabs
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        options={filterOptions}
      />

      {/* Vitals List */}
      <FlatList
        data={sampleData}
        renderItem={renderVitalCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
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
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fff",
  },
  searchbar: {
    backgroundColor: "#f5f5f5",
    elevation: 0,
    borderRadius: 12,
  },
  searchInput: {
    fontSize: 14,
  },
  listContainer: {
    paddingBottom: 20,
  },
});
