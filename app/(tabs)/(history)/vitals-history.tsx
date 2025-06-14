import VitalHistoryCard from "@/components/history/VitalHistoryCard";
import CustomAppBar from "@/components/utils/CustomAppBar";
import FilterTabs from "@/components/utils/FilterTabs";
import { useTheme } from "@/lib/hooks/useTheme";
import { useAuth } from "@/lib/hooks/useAuth";
import { Vital } from "@/lib/schemas/vitalSchema";
import React, { useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { Searchbar, Text } from "react-native-paper";
import { useGetVitalsQuery } from "@/lib/features/vitals/vitalsService";

export default function VitalsHistoryScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("Today");
  const { colors, typo, layout } = useTheme();
  const { user, isActionQueued } = useAuth();
  const {
    data: vitals = [],
    isLoading,
    isFetching,
  } = useGetVitalsQuery(user?.userId as string, {
    skip: !user?.userId,
  });

  const filterOptions = ["Today", "Last 7 Days", "Last 30 Days", "Custom"];

  // Group vitals by timestamp (session)
  const groupVitalsBySession = (vitals: Vital[]) => {
    const sessions: { [key: string]: Vital[] } = {};
    vitals.forEach((vital) => {
      if (!sessions[vital.timestamp]) sessions[vital.timestamp] = [];
      sessions[vital.timestamp].push(vital);
    });
    return Object.values(sessions);
  };

  // Filter vitals based on selected filter and search query
  const filteredVitals = vitals.filter((vital) => {
    const vitalDate = new Date(vital.timestamp);
    const today = new Date();
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Apply date filter
    let passesFilter = true;
    switch (selectedFilter) {
      case "Today":
        passesFilter = vitalDate >= startOfToday && vitalDate <= today;
        break;
      case "Last 7 Days":
        passesFilter = vitalDate >= oneWeekAgo && vitalDate <= today;
        break;
      case "Last 30 Days":
        passesFilter = vitalDate >= oneMonthAgo && vitalDate <= today;
        break;
      case "Custom":
        passesFilter = true; // Implement custom date range logic
        break;
      default:
        passesFilter = true;
    }

    // Apply search query
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      vital.type.toLowerCase().includes(searchLower) ||
      vital.value.toString().toLowerCase().includes(searchLower) ||
      new Date(vital.timestamp)
        .toLocaleDateString("en-US")
        .toLowerCase()
        .includes(searchLower);

    return passesFilter && (searchQuery ? matchesSearch : true);
  });

  const vitalSessions = groupVitalsBySession(filteredVitals);

  const renderVitalCard = ({ item }: { item: Vital[] }) => (
    <VitalHistoryCard vitals={item} />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
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
          inputStyle={{ fontSize: typo.body2.fontSize, ...typo.body2 }}
          iconColor={colors.text}
          editable={!isActionQueued}
        />
        <FilterTabs
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          options={filterOptions}
        />
        {isLoading || isFetching ? (
          <View
            style={{
              alignItems: "center",
              marginVertical: layout.spacing.lg,
            }}
          >
            <Text
              style={{
                fontSize: typo.body2.fontSize,
                color: colors.text,
                ...typo.body2,
              }}
            >
              Loading vitals history...
            </Text>
          </View>
        ) : vitalSessions.length === 0 ? (
          <View
            style={{
              alignItems: "center",
              marginVertical: layout.spacing.lg,
            }}
          >
            <Text
              style={{
                fontSize: typo.body2.fontSize,
                color: colors.text,
                ...typo.body2,
              }}
            >
              No vitals history available
            </Text>
          </View>
        ) : (
          <FlatList
            data={vitalSessions}
            renderItem={renderVitalCard}
            keyExtractor={(item) => item[0].vitalId} // Use first vital's ID
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: layout.spacing.xl }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
