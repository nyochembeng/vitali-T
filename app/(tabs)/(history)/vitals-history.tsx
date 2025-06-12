import VitalHistoryCard from "@/components/history/VitalHistoryCard";
import CustomAppBar from "@/components/utils/CustomAppBar";
import FilterTabs from "@/components/utils/FilterTabs";
import React, { useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { useTheme } from "@/lib/hooks/useTheme";

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
  const { colors, typo, layout } = useTheme();

  const filterOptions = ["Today", "Last 7 Days", "Last 30 Days", "Custom"];

  // Updated sample data to reflect current date (June 10, 2025)
  const sampleData: VitalHistoryEntry[] = [
    {
      id: "1",
      date: "June 10, 2025",
      time: "04:00 PM",
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
      date: "June 10, 2025",
      time: "02:15 PM",
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
      date: "June 9, 2025",
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <CustomAppBar title="Vitals History" rightAction="notifications" />

      <View
        style={{
          flex: 1,
          paddingHorizontal: layout.spacing.sm,
          paddingVertical: layout.spacing.xs,
        }}
      >
        <Searchbar
          placeholder="Search vitals or dates..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{
            backgroundColor: colors.surface,
            elevation: 0,
            borderRadius: layout.borderRadius.medium,
            borderColor: colors.border,
            borderWidth: 1,
          }}
          inputStyle={{
            fontSize: typo.body2.fontSize,
            ...typo.body2,
          }}
          iconColor={colors.text}
        />

        <FilterTabs
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          options={filterOptions}
        />

        <FlatList
          data={sampleData}
          renderItem={renderVitalCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: layout.spacing.xl,
          }}
        />
      </View>
    </SafeAreaView>
  );
}
