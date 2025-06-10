import { PrivacySectionItem } from "@/components/settings/PrivacySectionItem";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, ScrollView, StyleSheet, StatusBar } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

interface PrivacySection {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export default function PrivacyPolicyScreen() {
  const theme = useTheme();
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
    // Handle acceptance logic here, e.g., save preference, navigate, etc.
    console.log("Privacy policy accepted");
    // Navigate back to the settings screen
    router.back();
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
      />

      <CustomAppBar title="Privacy Policy" rightAction="help" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text
            variant="bodyMedium"
            style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
          >
            Your data is safe with us.
          </Text>
        </View>

        <View
          style={[
            styles.introCard,
            { backgroundColor: theme.colors.surfaceVariant },
          ]}
        >
          <Text
            variant="bodyMedium"
            style={[styles.introText, { color: theme.colors.onSurfaceVariant }]}
          >
            {`At Vitali-T, we prioritize your privacy. This policy outlines how we collect, use, and 
            protect your personal data. You're always in control.`}
          </Text>
        </View>

        <View style={styles.sectionsContainer}>
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
        style={[styles.footer, { backgroundColor: theme.colors.background }]}
      >
        <Button
          mode="contained"
          onPress={handleAccept}
          style={[styles.acceptButton, { backgroundColor: "#B8860B" }]}
          contentStyle={styles.acceptButtonContent}
          labelStyle={styles.acceptButtonLabel}
        >
          Accept
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    alignItems: "center",
  },
  title: {
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    opacity: 0.7,
  },
  introCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 20,
    borderRadius: 16,
  },
  introText: {
    lineHeight: 22,
    textAlign: "left",
  },
  sectionsContainer: {
    paddingHorizontal: 24,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: 34,
  },
  acceptButton: {
    borderRadius: 25,
    elevation: 2,
  },
  acceptButtonContent: {
    paddingVertical: 8,
  },
  acceptButtonLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});
