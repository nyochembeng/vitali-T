import { SettingsSection } from "@/components/settings/SettingsSection";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, StatusBar } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

interface SettingsItemType {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  iconColor: string;
  onPress: () => void;
  showChevron?: boolean;
}

interface SettingsSectionType {
  id: string;
  title?: string;
  items: SettingsItemType[];
}

export default function SettingsScreen() {
  const theme = useTheme();
  const router = useRouter();

  const sections: SettingsSectionType[] = [
    {
      id: "app-settings",
      title: "App Settings",
      items: [
        {
          id: "notifications",
          title: "Notification Settings",
          subtitle: "Manage your alerts and reminders",
          icon: "bell-outline",
          iconColor: "#4A90E2",
          onPress: () => router.push("/notifications"),
        },
        {
          id: "theme",
          title: "Theme Settings",
          subtitle: "Customize app appearance",
          icon: "palette-outline",
          iconColor: "#9B59B6",
          onPress: () => router.push("/theme-settings"),
        },
        {
          id: "privacy",
          title: "Privacy Policy",
          subtitle: "Your data protection details",
          icon: "shield-check-outline",
          iconColor: "#27AE60",
          onPress: () => router.push("/privacy-policy"),
        },
      ],
    },
    {
      id: "health-tools",
      title: "Health Tools",
      items: [
        {
          id: "generate-report",
          title: "Generate Report",
          subtitle: "Create summary from your stats",
          icon: "file-chart-outline",
          iconColor: "#3498DB",
          onPress: () => router.push("/generate-report"),
        },
        {
          id: "emergency",
          title: "Emergency Guidelines",
          subtitle: "Quick access to emergency info",
          icon: "medical-bag",
          iconColor: "#E74C3C",
          onPress: () => router.push("/emergency-guidelines"),
        },
        {
          id: "pregnancy-tips",
          title: "Pregnancy Tips",
          subtitle: "Helpful pregnancy guidance",
          icon: "baby-face-outline",
          iconColor: "#FF69B4",
          onPress: () => router.push("/pregnancy-tips"),
        },
        {
          id: "vital-education",
          title: "Vital Sign Education",
          subtitle: "Learn about health metrics",
          icon: "heart-pulse",
          iconColor: "#FF6B6B",
          onPress: () => router.push("/vital-signs-education"),
        },
      ],
    },
    {
      id: "support",
      title: "Support",
      items: [
        {
          id: "contact-support",
          title: "Contact Support",
          subtitle: "Get help and assistance",
          icon: "help-circle-outline",
          iconColor: "#F39C12",
          onPress: () => router.push("/help"),
        },
      ],
    },
    {
      id: "account",
      items: [
        {
          id: "logout",
          title: "Logout",
          icon: "logout",
          iconColor: "#E74C3C",
          onPress: () => router.push("/auth/logout-confirmation"),
          showChevron: false,
        },
      ],
    },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
      />

      <CustomAppBar title="Settings" rightAction="notifications" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {sections.map((section) => (
          <SettingsSection key={section.id} section={section} />
        ))}
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
  scrollView: {
    flex: 1,
    paddingTop: 16,
  },
});
