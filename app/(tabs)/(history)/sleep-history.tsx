import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Text, Card, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import FilterTabs from "@/components/utils/FilterTabs";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useTheme } from "@/lib/hooks/useTheme";

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
  const { colors, typo, layout } = useTheme();

  const filterOptions = ["All Time", "This Week", "This Month", "Last Month"];

  // Updated sample data to reflect current date (June 10, 2025)
  const sleepEntries: SleepEntry[] = [
    {
      id: "1",
      date: "Tue, June 10, 2025",
      duration: "8h 15min",
      bedtime: "10:15 PM – 6:30 AM",
      note: "Slept well",
      quality: "good",
      icon: "🌙",
    },
    {
      id: "2",
      date: "Mon, June 9, 2025",
      duration: "7h 30min",
      bedtime: "10:45 PM – 6:15 AM",
      note: "Night shift call interrupted sleep",
      quality: "poor",
      icon: "☎️",
    },
    {
      id: "3",
      date: "Sun, June 8, 2025",
      duration: "8h 45min",
      bedtime: "9:30 PM – 6:15 AM",
      note: "Restful sleep",
      quality: "good",
      icon: "🌙",
    },
    {
      id: "4",
      date: "Sat, June 7, 2025",
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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <CustomAppBar title="Sleep History" rightAction="notifications" />

      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          paddingHorizontal: layout.spacing.lg,
          paddingBottom: layout.spacing.xxl,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Card
          style={{
            marginVertical: layout.spacing.sm,
            backgroundColor: colors.card,
            elevation: 0,
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
                fontSize: typo.h4.fontSize,
                fontWeight: "300",
                color: colors.primary,
                marginBottom: layout.spacing.xs,
                ...typo.h4,
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: typo.body2.fontSize,
                  marginRight: layout.spacing.xs,
                  ...typo.body2,
                }}
              >
                🌙
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

        {sleepEntries.map((entry) => (
          <TouchableOpacity key={entry.id}>
            <Card
              style={{
                marginVertical: layout.spacing.xs,
                backgroundColor: colors.card,
                elevation: 0,
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
                    {entry.date}
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
                        fontSize: typo.h4.fontSize,
                        fontWeight: "300",
                        color: colors.primary,
                        marginRight: layout.spacing.sm,
                        ...typo.h4,
                      }}
                    >
                      {entry.duration}
                    </Text>
                    <Text
                      style={{
                        fontSize: typo.body2.fontSize,
                        ...typo.body2,
                      }}
                    >
                      {entry.icon}
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
                    {entry.bedtime}
                  </Text>
                  <Text
                    style={{
                      fontSize: typo.body2.fontSize,
                      color: colors.text,
                      ...typo.body2,
                    }}
                  >
                    {entry.note}
                  </Text>
                </View>
                <MaterialIcons
                  name="chevron-right"
                  size={24}
                  color={colors.text}
                />
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View
        style={{
          padding: layout.spacing.sm,
          paddingBottom: layout.spacing.lg,
        }}
      >
        <Button
          mode="contained"
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
          onPress={() => {}}
          icon="plus"
        >
          Log New Sleep
        </Button>
      </View>
    </SafeAreaView>
  );
}
