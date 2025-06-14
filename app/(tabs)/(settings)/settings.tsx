import { SettingsSection } from "@/components/settings/SettingsSection";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/lib/hooks/useTheme";

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
  const { colors, layout, mode } = useTheme();
  const router = useRouter();
  const iconColor = colors.accent;

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
          iconColor: iconColor,
          onPress: () => router.push("/notifications-settings"),
        },
        {
          id: "theme",
          title: "Theme Settings",
          subtitle: "Customize app appearance",
          icon: "palette-outline",
          iconColor: iconColor,
          onPress: () => router.push("/theme-settings"),
        },
        {
          id: "privacy",
          title: "Privacy Policy",
          subtitle: "Your data protection details",
          icon: "shield-check-outline",
          iconColor: iconColor,
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
          iconColor: iconColor,
          onPress: () => router.push("/generate-report"),
        },
        {
          id: "emergency",
          title: "Emergency Guidelines",
          subtitle: "Quick access to emergency info",
          icon: "medical-bag",
          iconColor: iconColor,
          onPress: () => router.push("/emergency-guidelines"),
        },
        {
          id: "pregnancy-tips",
          title: "Pregnancy Tips",
          subtitle: "Helpful pregnancy guidance",
          icon: "baby-face-outline",
          iconColor: iconColor,
          onPress: () => router.push("/pregnancy-tips"),
        },
        {
          id: "vital-education",
          title: "Vital Sign Education",
          subtitle: "Learn about health metrics",
          icon: "heart-pulse",
          iconColor: iconColor,
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
          iconColor: iconColor,
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
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar
        barStyle={mode === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />
      <CustomAppBar title="Settings" rightAction="notifications" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: layout.spacing.sm,
          paddingBottom: layout.spacing.xl,
        }}
        showsVerticalScrollIndicator={false}
      >
        {sections.map((section) => (
          <SettingsSection section={section} key={section.id} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
