import { PrivacySectionItem } from "@/components/settings/PrivacySectionItem";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, ScrollView, StatusBar } from "react-native";
import { Text, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/lib/hooks/useTheme";

interface PrivacySection {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export default function PrivacyPolicyScreen() {
  const { colors, typo, layout, mode } = useTheme();
  const router = useRouter();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );

  const privacySections: PrivacySection[] = [
    {
      id: "data-collection",
      title: "Data Collection",
      description:
        "We collect essential data to provide and improve our services",
      icon: "shield-outline",
    },
    {
      id: "usage",
      title: "Usage",
      description: "How your data helps improve monitoring & app features",
      icon: "chart-line",
    },
    {
      id: "sharing",
      title: "Sharing",
      description: "Your data is never sold to advertisers",
      icon: "lock-outline",
    },
    {
      id: "user-rights",
      title: "User Rights",
      description: "Know and control your personal data",
      icon: "account-outline",
    },
  ];

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const handleAccept = () => {
    console.log("Privacy policy accepted");
    router.back();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <StatusBar
        barStyle={mode === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />

      <CustomAppBar title="Privacy Policy" rightAction="help" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: layout.spacing.xl,
          padding: layout.spacing.md,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            paddingHorizontal: layout.spacing.sm,
            paddingTop: layout.spacing.sm,
            paddingBottom: layout.spacing.xs,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              ...typo.h3,
              color: colors.text,
              textAlign: "center",
            }}
          >
            Your data is safe with us.
          </Text>
        </View>

        <View
          style={{
            marginHorizontal: layout.spacing.sm,
            marginBottom: layout.spacing.lg,
            padding: layout.spacing.sm,
            borderRadius: layout.borderRadius.medium,
          }}
        >
          <Text
            style={{
              ...typo.body1,
              color: colors.text,
              lineHeight: typo.body1.lineHeight,
              textAlign: "center",
            }}
          >
            {`At Vitali-T, we prioritize your privacy. This policy outlines how we collect, use, and protect your personal data. You're always in control.`}
          </Text>
        </View>

        <View
          style={{
            paddingHorizontal: layout.spacing.sm,
          }}
        >
          {privacySections.map((section) => (
            <PrivacySectionItem
              key={section.id}
              section={section}
              expanded={expandedSections.has(section.id)}
              onToggle={() => toggleSection(section.id)}
            />
          ))}
        </View>
      </ScrollView>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: layout.spacing.sm,
          paddingBottom: layout.spacing.lg,
          backgroundColor: colors.background,
        }}
      >
        <Button
          mode="contained"
          onPress={handleAccept}
          style={{
            borderRadius: layout.borderRadius.large,
            elevation: layout.elevation,
          }}
          contentStyle={{
            paddingVertical: layout.spacing.xs,
          }}
          labelStyle={{
            ...typo.button,
            fontWeight: "600",
            color: colors.textInverse,
          }}
          buttonColor={colors.primary}
        >
          Accept
        </Button>
      </View>
    </SafeAreaView>
  );
}
