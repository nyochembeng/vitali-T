import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Text, Card, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import FilterTabs from "@/components/utils/FilterTabs";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useTheme } from "@/lib/hooks/useTheme";

interface ActivityItem {
  id: string;
  type: string;
  title: string;
  date: string;
  duration: string;
  description: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}

export default function ActivityHistoryScreen() {
  const [selectedFilter, setSelectedFilter] =
    useState<string>("All Activities");
  const { colors, typo, layout } = useTheme();

  const filterOptions = ["All Activities", "Walking", "Yoga"];

  const activities: ActivityItem[] = [
    {
      id: "1",
      type: "Walking",
      title: "Walking",
      date: "Today, 9:30 AM - 10:00 AM",
      duration: "30 min",
      description:
        "Felt energetic today! Completed my target steps and maintained a steady",
      icon: "directions-walk",
    },
    {
      id: "2",
      type: "Yoga",
      title: "Yoga",
      date: "Yesterday, 8:00 AM - 8:45 AM",
      duration: "45 min",
      description:
        "Focused on prenatal poses and breathing exercises. Feeling more relaxed and",
      icon: "self-improvement",
    },
    {
      id: "3",
      type: "Stretching",
      title: "Stretching",
      date: "Yesterday, 6:00 PM - 6:15 PM",
      duration: "15 min",
      description:
        "Quick session to relieve back tension. Used the wall for support during poses.",
      icon: "fitness-center",
    },
    {
      id: "4",
      type: "Swimming",
      title: "Swimming",
      date: "2 days ago, 7:00 AM - 7:30 AM",
      duration: "30 min",
      description:
        "Low-impact workout in the pool. Maintained a steady pace throughout.",
      icon: "pool",
    },
  ];

  const weeklyGoal = {
    current: 5,
    target: 7,
  };

  const filteredActivities =
    selectedFilter === "All Activities"
      ? activities
      : activities.filter((activity) => activity.type === selectedFilter);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <CustomAppBar title="Activity History" rightAction="notifications" />

      <FilterTabs
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        options={filterOptions}
      />

      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: layout.spacing.lg,
        }}
        contentContainerStyle={{
          paddingHorizontal: layout.spacing.sm,
          paddingBottom: layout.spacing.xxl,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Card
          style={{
            marginBottom: layout.spacing.sm,
            backgroundColor: colors.card,
            elevation: 0,
          }}
        >
          <Card.Content
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: layout.spacing.xl * 1.5,
                height: layout.spacing.xl * 1.5,
                borderRadius: layout.borderRadius.medium,
                backgroundColor: colors.surface,
                justifyContent: "center",
                alignItems: "center",
                marginRight: layout.spacing.sm,
              }}
            >
              <Text
                style={{
                  fontSize: typo.body1.fontSize,
                  fontWeight: "600",
                  color: colors.text,
                  ...typo.body1,
                }}
              >
                {weeklyGoal.current}/{weeklyGoal.target}
              </Text>
            </View>
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
                Weekly Activity Goal
              </Text>
              <Text
                style={{
                  fontSize: typo.body2.fontSize,
                  color: colors.text,
                  ...typo.body2,
                }}
              >
                {weeklyGoal.current} days of active movement logged
              </Text>
            </View>
          </Card.Content>
        </Card>

        {filteredActivities.map((activity) => (
          <Card
            key={activity.id}
            style={{
              marginBottom: layout.spacing.sm,
              backgroundColor: colors.card,
              elevation: 0,
            }}
          >
            <Card.Content
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
              }}
            >
              <View
                style={{
                  width: layout.spacing.xl * 1.5,
                  height: layout.spacing.xl * 1.5,
                  borderRadius: layout.borderRadius.medium,
                  backgroundColor: colors.surface,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: layout.spacing.sm,
                }}
              >
                <MaterialIcons
                  name={activity.icon}
                  size={24}
                  color={colors.primary}
                />
              </View>
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
                  {activity.title}
                </Text>
                <Text
                  style={{
                    fontSize: typo.body2.fontSize,
                    color: colors.text,
                    marginBottom: layout.spacing.sm,
                    ...typo.body2,
                  }}
                >
                  {activity.date}
                </Text>
                <View
                  style={{
                    alignSelf: "flex-start",
                    backgroundColor: colors.surface,
                    paddingHorizontal: layout.spacing.xs,
                    paddingVertical: layout.spacing.xs,
                    borderRadius: layout.borderRadius.medium,
                    marginBottom: layout.spacing.sm,
                  }}
                >
                  <Text
                    style={{
                      fontSize: typo.caption.fontSize,
                      color: colors.primary,
                      fontWeight: "500",
                      ...typo.caption,
                    }}
                  >
                    {activity.duration}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: typo.body2.fontSize,
                    color: "rgba(17, 12, 9, 0.6)",
                    lineHeight: typo.body2.lineHeight,
                    marginBottom: layout.spacing.sm,
                    ...typo.body2,
                  }}
                >
                  {activity.description}
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: typo.body2.fontSize,
                      color: colors.primary,
                      fontWeight: "500",
                      ...typo.body2,
                    }}
                  >
                    View more
                  </Text>
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>
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
          Log New Activity
        </Button>
      </View>
    </SafeAreaView>
  );
}
