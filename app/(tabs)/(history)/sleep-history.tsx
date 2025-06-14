import CustomAppBar from "@/components/utils/CustomAppBar";
import FilterTabs from "@/components/utils/FilterTabs";
import { useTheme } from "@/lib/hooks/useTheme";
import { useAuth } from "@/lib/hooks/useAuth";
import { Sleep } from "@/lib/schemas/sleepSchema";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetSleepsQuery } from "@/lib/features/sleep/sleepService";

const QUALITY_EMOJIS: Record<string, string> = {
  "Very Poor": "😴",
  Poor: "😔",
  Okay: "🦶",
  Good: "🙂",
  Excellent: "😊",
};

export default function SleepHistoryScreen() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All Time");
  const [sortBy, setSortBy] = useState<string>("Most Recent");
  const { colors, typo, layout } = useTheme();
  const { user, isActionQueued } = useAuth();
  const router = useRouter();
  const {
    data: sleepEntries = [],
    isLoading,
    isFetching,
  } = useGetSleepsQuery(user?.userId as string, {
    skip: !user?.userId,
  });

  const filterOptions = ["All Time", "This Week", "This Month", "Last Month"];

  const filteredSleepEntries = sleepEntries.filter((entry) => {
    const entryDate = new Date(entry.timestamp);
    const today = new Date();
    const startOfWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - today.getDay()
    );
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfLastMonth = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      1
    );
    const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

    switch (selectedFilter) {
      case "This Week":
        return entryDate >= startOfWeek && entryDate <= today;
      case "This Month":
        return entryDate >= startOfMonth && entryDate <= today;
      case "Last Month":
        return entryDate >= startOfLastMonth && entryDate <= endOfLastMonth;
      default:
        return true;
    }
  });

  const thisWeekEntries = filteredSleepEntries.filter((entry) => {
    const entryDate = new Date(entry.timestamp);
    const startOfWeek = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - new Date().getDay()
    );
    return entryDate >= startOfWeek;
  });

  const weeklyAverage = {
    duration: thisWeekEntries.length
      ? (() => {
          const totalMinutes = thisWeekEntries.reduce((sum, entry) => {
            const match = entry.totalDuration.match(
              /(\d+)\s*hours\s*(\d*)\s*minutes*/
            );
            if (match) {
              const hours = parseInt(match[1], 10);
              const minutes = parseInt(match[2] || "0", 10);
              return sum + hours * 60 + minutes;
            }
            return sum;
          }, 0);
          const avgMinutes = Math.round(totalMinutes / thisWeekEntries.length);
          const hours = Math.floor(avgMinutes / 60);
          const minutes = avgMinutes % 60;
          return `${hours}h ${minutes}min`;
        })()
      : "0h 0min",
    pattern: thisWeekEntries.length
      ? thisWeekEntries.some((entry) => entry.interruptedSleep)
        ? "Interrupted Sleep Pattern"
        : "Good Sleep Pattern"
      : "No Data",
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatBedtime = (sleepStart: string, wakeTime: string) => {
    const start = new Date(sleepStart);
    const end = new Date(wakeTime);
    return `${start.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })} – ${end.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`;
  };

  const handleLogNewSleep = () => {
    if (isActionQueued) return;
    router.push("/log-sleep");
  };

  const handleSleepEntryPress = (entry: Sleep) => {};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomAppBar title="Sleep History" rightAction="notifications" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: layout.spacing.sm,
          paddingBottom: layout.spacing.lg,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Card
          style={{
            marginVertical: layout.spacing.sm,
            backgroundColor: colors.card,
            elevation: 2,
          }}
        >
          <Card.Content>
            <Text
              style={{
                fontSize: typo.h6.fontSize,
                fontWeight: "600",
                color: colors.text,
                marginBottom: layout.spacing.sm,
                ...typo.h6,
              }}
            >
              {`This Week's Sleep`}
            </Text>
            <Text
              style={{
                fontSize: typo.h6.fontSize,
                fontWeight: "300",
                color: colors.primary,
                marginBottom: layout.spacing.xs,
              }}
            >
              {weeklyAverage.duration}
            </Text>
            <Text
              style={{
                fontSize: typo.body2.fontSize,
                color: colors.text,
                marginBottom: layout.spacing.sm,
                ...typo.body2,
              }}
            >
              average
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: typo.body2.fontSize,
                  marginRight: layout.spacing.xs,
                  ...typo.body2,
                }}
              >
                {weeklyAverage.pattern === "Good Sleep Pattern" ? "🌙" : "😔"}
              </Text>
              <Text
                style={{
                  fontSize: typo.body1.fontSize,
                  color: colors.text,
                  fontWeight: "500",
                  ...typo.body1,
                }}
              >
                {weeklyAverage.pattern}
              </Text>
            </View>
          </Card.Content>
        </Card>

        <FilterTabs
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          options={filterOptions}
        />

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: layout.spacing.sm,
          }}
          onPress={() =>
            setSortBy(sortBy === "Most Recent" ? "Oldest" : "Most Recent")
          }
          disabled={isActionQueued}
        >
          <Text
            style={{
              fontSize: typo.body1.fontSize,
              color: colors.text,
              fontWeight: "500",
              ...typo.body1,
            }}
          >
            Sort by: {sortBy}
          </Text>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={20}
            color={colors.text}
          />
        </TouchableOpacity>

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
              Loading sleep history...
            </Text>
          </View>
        ) : filteredSleepEntries.length === 0 ? (
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
              No sleep history available
            </Text>
          </View>
        ) : (
          filteredSleepEntries
            .sort((a, b) =>
              sortBy === "Most Recent"
                ? new Date(b.timestamp).getTime() -
                  new Date(a.timestamp).getTime()
                : new Date(a.timestamp).getTime() -
                  new Date(b.timestamp).getTime()
            )
            .map((entry) => (
              <TouchableOpacity
                key={entry.sleepId}
                onPress={() => handleSleepEntryPress(entry)}
                disabled={isActionQueued}
              >
                <Card
                  style={{
                    marginVertical: layout.spacing.xs,
                    backgroundColor: colors.card,
                    elevation: 0,
                    opacity: isActionQueued ? 0.6 : 1,
                  }}
                >
                  <Card.Content
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: typo.h6.fontSize,
                          fontWeight: "600",
                          color: colors.text,
                          marginBottom: layout.spacing.xs,
                          ...typo.h6,
                        }}
                      >
                        {formatDate(entry.timestamp)}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: layout.spacing.xs,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: typo.body2.fontSize,
                            fontWeight: "300",
                            color: colors.primary,
                            marginRight: layout.spacing.sm,
                          }}
                        >
                          {entry.totalDuration}
                        </Text>
                        <Text
                          style={{
                            fontSize: typo.body2.fontSize,
                            ...typo.body2,
                          }}
                        >
                          {QUALITY_EMOJIS[entry.quality || "Okay"]}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: typo.body2.fontSize,
                          color: colors.text,
                          marginBottom: layout.spacing.xs,
                          ...typo.body2,
                        }}
                      >
                        {formatBedtime(entry.sleepStart, entry.wakeTime)}
                      </Text>
                      {entry.notes && (
                        <Text
                          style={{
                            fontSize: typo.body2.fontSize,
                            color: colors.text,
                            ...typo.body2,
                          }}
                        >
                          {entry.notes}
                        </Text>
                      )}
                    </View>
                    <MaterialIcons
                      name="chevron-right"
                      size={24}
                      color={colors.text}
                    />
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            ))
        )}
      </ScrollView>

      <View
        style={{
          padding: layout.spacing.sm,
          paddingBottom: layout.spacing.lg,
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
          onPress={handleLogNewSleep}
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
          icon="dense"
          disabled={isActionQueued}
          loading={isLoading}
        >
          Log New Sleep
        </Button>
      </View>
    </SafeAreaView>
  );
}
