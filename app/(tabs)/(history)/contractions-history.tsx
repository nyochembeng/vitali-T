import ContractionHistoryCard from "@/components/history/ContractionHistoryCard";
import CustomAppBar from "@/components/utils/CustomAppBar";
import FilterTabs from "@/components/utils/FilterTabs";
import { useTheme } from "@/lib/hooks/useTheme";
import { useAuth } from "@/lib/hooks/useAuth";
import { Contraction } from "@/lib/schemas/contractionSchema";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useGetContractionsQuery } from "@/lib/features/contractions/contractionsService";

export default function ContractionHistoryScreen() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All Time");
  const router = useRouter();
  const { colors, typo, layout } = useTheme();
  const { user, isActionQueued } = useAuth();
  const {
    data: contractions = [],
    isLoading,
    isFetching,
  } = useGetContractionsQuery(user?.userId as string, {
    skip: !user?.userId,
  });

  const filterOptions = ["All Time", "Today", "Yesterday", "Last Week"];

  const today = new Date();
  const todaysContractions = contractions.filter((contraction) => {
    const contractionDate = new Date(contraction.timestamp);
    return contractionDate.toDateString() === today.toDateString();
  });

  const todaysOverview = {
    averageInterval: todaysContractions.length
      ? (() => {
          const totalSeconds = todaysContractions.reduce((sum, c) => {
            const [minutes, seconds] = c.interval.split(":").map(Number);
            return sum + minutes * 60 + seconds;
          }, 0);
          const avgSeconds = totalSeconds / todaysContractions.length;
          const minutes = Math.floor(avgSeconds / 60);
          const seconds = Math.round(avgSeconds % 60);
          return `${minutes}:${seconds.toString().padStart(2, "0")} min`;
        })()
      : "0:00 min",
    totalContractions: todaysContractions.length,
  };

  const filteredContractions = contractions.filter((contraction) => {
    const contractionDate = new Date(contraction.timestamp);
    const today = new Date();
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    switch (selectedFilter) {
      case "Today":
        return contractionDate.toDateString() === today.toDateString();
      case "Yesterday":
        return contractionDate.toDateString() === yesterday.toDateString();
      case "Last Week":
        return contractionDate >= lastWeek && contractionDate <= today;
      default:
        return true;
    }
  });

  const handleLogNewContraction = () => {
    if (isActionQueued) return;
    router.push("/log-contractions");
  };

  const renderContractionCard = ({ item }: { item: Contraction }) => (
    <ContractionHistoryCard entry={item} />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomAppBar title="Contractions History" rightAction="notifications" />
      <View style={{ paddingHorizontal: layout.spacing.sm }}>
        <View style={{ marginBottom: layout.spacing.sm }}>
          <Text
            style={{
              fontSize: typo.h6.fontSize,
              fontWeight: "600",
              color: colors.text,
              marginBottom: layout.spacing.xs,
              ...typo.h6,
            }}
          >
            {`Today's Overview`}
          </Text>
          <View
            style={{
              backgroundColor: colors.card,
              padding: layout.spacing.lg,
              borderRadius: layout.borderRadius.medium,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: typo.body2.fontSize,
                  color: colors.text,
                  ...typo.body2,
                }}
              >
                Average Interval
              </Text>
              <Text
                style={{
                  fontSize: typo.body1.fontSize,
                  fontWeight: "600",
                  color: colors.primary,
                  ...typo.body1,
                }}
              >
                {todaysOverview.averageInterval}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: typo.body2.fontSize,
                  color: colors.text,
                  ...typo.body2,
                }}
              >
                Total Contractions
              </Text>
              <Text
                style={{
                  fontSize: typo.body1.fontSize,
                  fontWeight: "600",
                  color: colors.primary,
                  ...typo.body1,
                }}
              >
                {todaysOverview.totalContractions}
              </Text>
            </View>
          </View>
        </View>
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
              Loading contractions history...
            </Text>
          </View>
        ) : filteredContractions.length === 0 ? (
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
              No contractions history available
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredContractions}
            renderItem={renderContractionCard}
            keyExtractor={(item) => item.contractionId}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: layout.spacing.xxl,
              paddingHorizontal: layout.spacing.sm,
            }}
          />
        )}
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
            disabled={isActionQueued}
            loading={isLoading}
          >
            Log New Contraction
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
