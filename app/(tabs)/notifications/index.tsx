import { NotificationCard } from "@/components/notifications/NotificationCard";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, StatusBar } from "react-native";
import { Text, useTheme, Chip, Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

interface NotificationItem {
  id: string;
  type: "alert" | "tip" | "report" | "reminder";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: "high" | "medium" | "low";
}

export default function NotificationsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  // Sample data - replace with actual data source
  useEffect(() => {
    const sampleNotifications: NotificationItem[] = [
      {
        id: "1",
        type: "alert",
        title: "Unusual Heart Rate Detected",
        message:
          "Your heart rate has been elevated for the past 30 minutes. Consider taking a break.",
        timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
        read: false,
        priority: "high",
      },
      {
        id: "2",
        type: "tip",
        title: "Daily Health Tip",
        message:
          "Stay hydrated! Aim to drink at least 8 glasses of water throughout the day.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        read: false,
        priority: "low",
      },
      {
        id: "3",
        type: "report",
        title: "Weekly Health Report Ready",
        message:
          "Your weekly health summary is now available. View your progress and insights.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        read: true,
        priority: "medium",
      },
      {
        id: "4",
        type: "reminder",
        title: "Log Your Symptoms",
        message:
          "Don't forget to log your daily symptoms to track your health patterns.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        read: true,
        priority: "medium",
      },
      {
        id: "5",
        type: "alert",
        title: "Medication Reminder",
        message: "Time to take your evening medication. Tap to mark as taken.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
        read: true,
        priority: "high",
      },
    ];
    setNotifications(sampleNotifications);
  }, []);

  const filteredNotifications = notifications.filter(
    (notification) => filter === "all" || !notification.read
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationPress = (notification: NotificationItem) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    // Handle navigation based on notification type
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
      />

      <CustomAppBar
        title="Notifications"
        rightAction="more"
        moreMenuItems={[
          {
            title: "Mark all as read",
            icon: "check-all",
            onPress: markAllAsRead,
          },
          {
            title: "Settings",
            icon: "cog",
            onPress: () => {
              router.push("/settings");
            },
          },
          {
            title: "Help",
            icon: "help-circle",
            onPress: () => {
              router.push("/help");
            },
          },
        ]}
      />

      <View style={styles.filterContainer}>
        <Chip
          selected={filter === "all"}
          onPress={() => setFilter("all")}
          style={styles.filterChip}
        >
          All ({notifications.length})
        </Chip>
        <Chip
          selected={filter === "unread"}
          onPress={() => setFilter("unread")}
          style={styles.filterChip}
        >
          Unread ({unreadCount})
        </Chip>
      </View>

      <Divider style={styles.divider} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {filteredNotifications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text
              variant="bodyLarge"
              style={[
                styles.emptyText,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              {filter === "unread"
                ? "No unread notifications"
                : "No notifications yet"}
            </Text>
          </View>
        ) : (
          filteredNotifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onPress={handleNotificationPress}
              onMarkAsRead={markAsRead}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  filterChip: {
    marginRight: 8,
  },
  divider: {
    marginHorizontal: 16,
  },
  scrollView: {
    flex: 1,
    paddingTop: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  emptyText: {
    textAlign: "center",
    opacity: 0.6,
  },
});
