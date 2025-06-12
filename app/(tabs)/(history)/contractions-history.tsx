import ContractionHistoryCard from "@/components/history/ContractionHistoryCard";
import ContractionOverviewCard from "@/components/history/ContractionOverviewCard";
import CustomAppBar from "@/components/utils/CustomAppBar";
import FilterTabs from "@/components/utils/FilterTabs";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { Button } from "react-native-paper";
import { useTheme } from "@/lib/hooks/useTheme";

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
  const { colors, typo, layout } = useTheme();

  const filterOptions = ["All Time", "Today", "Yesterday", "Last Week"];

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
    router.push("/log-contractions");
  };

  const renderContractionCard = ({ item }: { item: ContractionEntry }) => (
    <ContractionHistoryCard entry={item} />
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <CustomAppBar title="Contractions History" rightAction="notifications" />

      <View style={{ paddingHorizontal: layout.spacing.md }}>
        <ContractionOverviewCard overview={todaysOverview} />

        <View
          style={{
            backgroundColor: colors.card,
            paddingBottom: layout.spacing.xs,
          }}
        >
          <FilterTabs
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
            options={filterOptions}
          />
        </View>

        <FlatList
          data={contractionEntries}
          renderItem={renderContractionCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: layout.spacing.xxl, // Space for floating button
            paddingHorizontal: layout.spacing.xs, // Space for floating button
          }}
        />

        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            paddingHorizontal: layout.spacing.sm,
            paddingVertical: layout.spacing.sm,
            backgroundColor: colors.card,
            elevation: layout.elevation,
            shadowColor: colors.text,
            shadowOffset: layout.shadow.light.shadowOffset,
            shadowOpacity: layout.shadow.light.shadowOpacity,
            shadowRadius: layout.shadow.light.shadowRadius,
          }}
        >
          <Button
            mode="contained"
            onPress={handleLogNewContraction}
            style={{
              backgroundColor: colors.primary,
              borderRadius: layout.borderRadius.medium,
              paddingVertical: layout.spacing.xs,
            }}
            labelStyle={{
              fontSize: typo.button.fontSize,
              fontWeight: "600",
              color: colors.textInverse,
              ...typo.button,
            }}
            icon="plus"
          >
            Log New Contraction
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
