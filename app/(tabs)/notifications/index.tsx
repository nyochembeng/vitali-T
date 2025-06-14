import { NotificationCard } from "@/components/notifications/NotificationCard";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useTheme } from "@/lib/hooks/useTheme";
import { useAuth } from "@/lib/hooks/useAuth";
import {
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
} from "@/lib/features/notifications/notificationsService";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StatusBar, View } from "react-native";
import { Chip, Divider, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function NotificationsScreen() {
  const { colors, typo, layout, mode } = useTheme();
  const { user, isActionQueued } = useAuth();
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const {
    data: notifications = [],
    isLoading,
    isFetching,
  } = useGetNotificationsQuery(
    {
      userId: user?.userId as string,
      params: { read: filter === "unread" ? false : undefined },
    },
    { skip: !user?.userId }
  );

  const [markNotificationAsRead] = useMarkNotificationAsReadMutation();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = async (id: string) => {
    if (isActionQueued) return;
    try {
      await markNotificationAsRead({ userId: user!.userId, id }).unwrap();
    } catch (error) {
      // Error toast is handled in the service
    }
  };

  const handleMarkAllAsRead = async () => {
    if (isActionQueued) return;
    try {
      // Mark each unread notification individually
      const unreadNotifications = notifications.filter((n) => !n.read);
      await Promise.all(
        unreadNotifications.map((n) =>
          markNotificationAsRead({ userId: user!.userId, id: n.id }).unwrap()
        )
      );
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "All notifications marked as read.",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to mark all notifications as read.",
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar
        barStyle={mode === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />
      <CustomAppBar
        title="Notifications"
        rightAction="more"
        moreMenuItems={[
          {
            title: "Mark all as read",
            icon: "check-all",
            onPress: handleMarkAllAsRead,
            disabled: isActionQueued || unreadCount === 0,
          },
          {
            title: "Settings",
            icon: "cog",
            onPress: () => router.push("/settings"),
          },
          {
            title: "Help",
            icon: "help-circle",
            onPress: () => router.push("/help"),
          },
        ]}
      />
      <View
        style={{
          flexDirection: "row",
          padding: layout.spacing.lg,
          gap: layout.spacing.sm,
        }}
      >
        <Chip
          selected={filter === "all"}
          onPress={() => setFilter("all")}
          style={{ marginRight: layout.spacing.sm }}
          disabled={isActionQueued}
        >
          <Text
            style={{
              fontSize: typo.button.fontSize,
              color: filter === "all" ? colors.textInverse : colors.text,
              ...typo.button,
            }}
          >
            All ({notifications.length})
          </Text>
        </Chip>
        <Chip
          selected={filter === "unread"}
          onPress={() => setFilter("unread")}
          style={{ marginRight: layout.spacing.sm }}
          disabled={isActionQueued}
        >
          <Text
            style={{
              fontSize: typo.button.fontSize,
              color: filter === "unread" ? colors.textInverse : colors.text,
              ...typo.button,
            }}
          >
            Unread ({unreadCount})
          </Text>
        </Chip>
      </View>
      <Divider
        style={{
          marginHorizontal: layout.spacing.sm,
          backgroundColor: colors.border,
        }}
      />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: layout.spacing.sm,
          paddingBottom: layout.spacing.xl,
        }}
        showsVerticalScrollIndicator={false}
      >
        {isLoading || isFetching ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingTop: layout.spacing.xl * 2.5,
            }}
          >
            <Text
              style={{
                fontSize: typo.body1.fontSize,
                color: colors.text,
                textAlign: "center",
                ...typo.body1,
              }}
            >
              Loading notifications...
            </Text>
          </View>
        ) : notifications.length === 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingTop: layout.spacing.xl * 2.5,
            }}
          >
            <Text
              style={{
                fontSize: typo.body1.fontSize,
                color: colors.text,
                textAlign: "center",
                opacity: 0.6,
                ...typo.body1,
              }}
            >
              {filter === "unread"
                ? "No unread notifications"
                : "No notifications yet"}
            </Text>
          </View>
        ) : (
          notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onMarkAsRead={handleMarkAsRead}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
