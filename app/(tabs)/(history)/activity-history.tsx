import CustomAppBar from "@/components/utils/CustomAppBar";
import FilterTabs from "@/components/utils/FilterTabs";
import { useTheme } from "@/lib/hooks/useTheme";
import { useAuth } from "@/lib/hooks/useAuth";
import { Activity } from "@/lib/schemas/activitySchema";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetActivitiesQuery } from "@/lib/features/activity/activityService";

export default function ActivityHistoryScreen() {
  const router = useRouter();
  const { colors, typo, layout } = useTheme();
  const { user, isActionQueued } = useAuth();
  const [selectedFilter, setSelectedFilter] =
    useState<string>("All Activities");
  const {
    data: activities = [],
    isLoading,
    isFetching,
  } = useGetActivitiesQuery(user?.userId as string, {
    skip: !user?.userId,
  });

  const filterOptions = [
    "All Activities",
    "Walking",
    "Yoga",
    "Stretching",
    "Swimming",
  ];

  const weeklyGoal = {
    current: activities.filter((activity) => {
      const activityDate = new Date(activity.timestamp);
      const today = new Date();
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      return activityDate >= weekAgo && activityDate <= today;
    }).length,
    target: 7,
  };

  const filteredActivities =
    selectedFilter === "All Activities"
      ? activities
      : activities.filter((activity) => activity.type === selectedFilter);

  const getIconForActivity = (
    type: string
  ): keyof typeof MaterialIcons.glyphMap => {
    switch (type) {
      case "Walking":
      case "Walk":
        return "directions-walk";
      case "Yoga":
        return "self-improvement";
      case "Stretching":
        return "fitness-center";
      case "Swimming":
        return "pool";
      default:
        return "directions-run";
    }
  };

  const formatDateTime = (startTime?: string, endTime?: string) => {
    if (!startTime) return "Date not available";
    const start = new Date(startTime);
    const end = endTime ? new Date(endTime) : null;
    const today = new Date();
    const isToday = start.toDateString() === today.toDateString();
    const isYesterday =
      start.toDateString() ===
      new Date(today.setDate(today.getDate() - 1)).toDateString();

    const datePrefix = isToday
      ? "Today"
      : isYesterday
        ? "Yesterday"
        : start.toLocaleDateString();
    const startStr = start.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
    const endStr = end
      ? end.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
      : "";

    return `${datePrefix}, ${startStr}${endStr ? ` - ${endStr}` : ""}`;
  };

  const handleActivityPress = (activity: Activity) => {};

  const handleLogNewActivity = () => {
    if (isActionQueued) return;
    router.push("/log-activity");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomAppBar title="Activity History" rightAction="notifications" />
      <FilterTabs
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        options={filterOptions}
      />
      <ScrollView
        style={{ flex: 1, paddingHorizontal: layout.spacing.lg }}
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
          <Card.Content style={{ flexDirection: "row", alignItems: "center" }}>
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
              Loading activities history...
            </Text>
          </View>
        ) : filteredActivities.length === 0 ? (
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
              No activities history available
            </Text>
          </View>
        ) : (
          filteredActivities.map((activity) => (
            <TouchableOpacity
              key={activity.activityId}
              onPress={() => handleActivityPress(activity)}
              disabled={isActionQueued}
            >
              <Card
                style={{
                  marginBottom: layout.spacing.sm,
                  backgroundColor: colors.card,
                  elevation: 0,
                  opacity: isActionQueued ? 0.6 : 1,
                }}
              >
                <Card.Content
                  style={{ flexDirection: "row", alignItems: "flex-start" }}
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
                      name={getIconForActivity(activity.type)}
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
                      {activity.type}
                    </Text>
                    <Text
                      style={{
                        fontSize: typo.body2.fontSize,
                        color: colors.text,
                        marginBottom: layout.spacing.sm,
                        ...typo.body2,
                      }}
                    >
                      {formatDateTime(activity.startTime, activity.endTime)}
                    </Text>
                    {activity.duration && (
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
                    )}
                    <Text
                      style={{
                        fontSize: typo.body2.fontSize,
                        color: "rgba(17, 12, 9, 0.6)",
                        lineHeight: typo.body2.lineHeight,
                        marginBottom: layout.spacing.sm,
                        ...typo.body2,
                      }}
                    >
                      {activity.notes || "No additional notes provided."}
                    </Text>
                    {activity.feeling && (
                      <Text
                        style={{
                          fontSize: typo.body2.fontSize,
                          color: colors.text,
                          marginBottom: layout.spacing.sm,
                          ...typo.body2,
                        }}
                      >
                        Feeling: {activity.feeling}
                      </Text>
                    )}
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
                  </View>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
      <View
        style={{ padding: layout.spacing.sm, paddingBottom: layout.spacing.lg }}
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
          onPress={handleLogNewActivity}
          icon="plus"
          disabled={isActionQueued}
          loading={isLoading}
        >
          Log New Activity
        </Button>
      </View>
    </SafeAreaView>
  );
}
