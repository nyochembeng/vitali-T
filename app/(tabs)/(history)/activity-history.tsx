import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Text, Card, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import FilterTabs from "@/components/utils/FilterTabs";
import CustomAppBar from "@/components/utils/CustomAppBar";

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
    <SafeAreaView style={styles.container}>
      <CustomAppBar title="Activity History" rightAction="notifications" />

      {/* Filter Tabs */}
      <FilterTabs
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        options={filterOptions}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Weekly Goal Card */}
        <Card style={styles.goalCard}>
          <Card.Content style={styles.goalContent}>
            <View style={styles.goalIndicator}>
              <Text style={styles.goalFraction}>
                {weeklyGoal.current}/{weeklyGoal.target}
              </Text>
            </View>
            <View style={styles.goalText}>
              <Text style={styles.goalTitle}>Weekly Activity Goal</Text>
              <Text style={styles.goalSubtitle}>
                {weeklyGoal.current} days of active movement logged
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Activity List */}
        {filteredActivities.map((activity) => (
          <Card key={activity.id} style={styles.activityCard}>
            <Card.Content style={styles.activityContent}>
              <View style={styles.activityIcon}>
                <MaterialIcons name={activity.icon} size={24} color="#8B4513" />
              </View>
              <View style={styles.activityDetails}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityDate}>{activity.date}</Text>
                <View style={styles.durationBadge}>
                  <Text style={styles.durationText}>{activity.duration}</Text>
                </View>
                <Text style={styles.activityDescription}>
                  {activity.description}
                </Text>
                <TouchableOpacity>
                  <Text style={styles.viewMore}>View more</Text>
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      {/* Log New Activity Button */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.logButton}
          labelStyle={styles.logButtonText}
          onPress={() => {}}
          icon="plus"
        >
          Log New Activity
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  goalCard: {
    marginBottom: 16,
    backgroundColor: "#f8f8f8",
    elevation: 0,
  },
  goalContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  goalIndicator: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  goalFraction: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8B4513",
  },
  goalText: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  goalSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  activityCard: {
    marginBottom: 12,
    backgroundColor: "#f8f8f8",
    elevation: 0,
  },
  activityContent: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  activityIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  activityDetails: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  activityDate: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  durationBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#e8e8e8",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  durationText: {
    fontSize: 12,
    color: "#8B4513",
    fontWeight: "500",
  },
  activityDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 8,
  },
  viewMore: {
    fontSize: 14,
    color: "#8B4513",
    fontWeight: "500",
  },
  buttonContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  logButton: {
    backgroundColor: "#8B4513",
    borderRadius: 25,
    paddingVertical: 8,
  },
  logButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
