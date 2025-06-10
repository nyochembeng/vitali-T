import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Card, Button, Chip, ProgressBar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import CustomAppBar from "@/components/utils/CustomAppBar";

interface TrendCardProps {
  title: string;
  duration: string;
  lastUpdated: string;
  icon: "trending-up" | "favorite";
}

interface PatternCardProps {
  title: string;
  description: string;
  confidence: number;
  icon: "timeline" | "directions-run";
}

interface PredictionCardProps {
  title: string;
  description: string;
  confidence: "High" | "Medium" | "Low";
  icon: "warning" | "child-care";
}

interface WeeklySummaryItem {
  label: string;
  value: string;
}

interface NextStepItem {
  title: string;
  description: string;
  icon: "water-drop" | "monitor-heart";
}

const TrendCard: React.FC<TrendCardProps> = ({
  title,
  duration,
  lastUpdated,
  icon,
}) => (
  <Card style={styles.trendCard}>
    <Card.Content style={styles.trendContent}>
      <View style={styles.trendHeader}>
        <Text variant="titleMedium" style={styles.trendTitle}>
          {title}
        </Text>
        <MaterialIcons name={icon} size={24} color="#6366F1" />
      </View>
      <Text variant="bodyMedium" style={styles.duration}>
        {duration}
      </Text>
      <View style={styles.lastUpdated}>
        <MaterialIcons name="schedule" size={14} color="#9CA3AF" />
        <Text variant="bodySmall" style={styles.lastUpdatedText}>
          {lastUpdated}
        </Text>
      </View>
    </Card.Content>
  </Card>
);

const PatternCard: React.FC<PatternCardProps> = ({
  title,
  description,
  confidence,
  icon,
}) => (
  <Card style={styles.patternCard}>
    <Card.Content>
      <View style={styles.patternHeader}>
        <Text variant="titleMedium" style={styles.patternTitle}>
          {title}
        </Text>
        <MaterialIcons name={icon} size={20} color="#6366F1" />
      </View>
      <Text variant="bodyMedium" style={styles.patternDescription}>
        {description}
      </Text>
      <View style={styles.confidenceContainer}>
        <ProgressBar
          progress={confidence / 100}
          color="#10B981"
          style={styles.progressBar}
        />
        <Text variant="bodySmall" style={styles.confidenceText}>
          {confidence}% confidence
        </Text>
      </View>
    </Card.Content>
  </Card>
);

const PredictionCard: React.FC<PredictionCardProps> = ({
  title,
  description,
  confidence,
  icon,
}) => (
  <Card style={styles.predictionCard}>
    <Card.Content>
      <View style={styles.predictionHeader}>
        <MaterialIcons name={icon} size={24} color="#6366F1" />
        <Text variant="titleMedium" style={styles.predictionTitle}>
          {title}
        </Text>
      </View>
      <Text variant="bodyMedium" style={styles.predictionDescription}>
        {description}
      </Text>
      <Chip
        mode="outlined"
        style={styles.confidenceChip}
        textStyle={styles.confidenceChipText}
      >
        {confidence} Confidence
      </Chip>
    </Card.Content>
  </Card>
);

const WeeklySummaryRow: React.FC<WeeklySummaryItem> = ({ label, value }) => (
  <View style={styles.summaryRow}>
    <Text variant="bodyMedium" style={styles.summaryLabel}>
      {label}
    </Text>
    <Text variant="titleMedium" style={styles.summaryValue}>
      {value}
    </Text>
  </View>
);

const NextStepCard: React.FC<NextStepItem> = ({ title, description, icon }) => (
  <Card style={styles.nextStepCard}>
    <Card.Content style={styles.nextStepContent}>
      <View style={styles.nextStepIcon}>
        {/* <MaterialCommunityIcons  - This is what was there earlier */}
        <MaterialIcons name={icon} size={20} color="#6366F1" />
      </View>
      <View style={styles.nextStepText}>
        <Text variant="titleSmall" style={styles.nextStepTitle}>
          {title}
        </Text>
        <Text variant="bodySmall" style={styles.nextStepDescription}>
          {description}
        </Text>
      </View>
      <MaterialIcons name="chevron-right" size={20} color="#9CA3AF" />
    </Card.Content>
  </Card>
);

export default function AIInsightsScreen() {
  const trendData = [
    {
      title: "Blood Pressure Stable",
      duration: "14 Days",
      lastUpdated: "Last updated 2 days ago",
      icon: "trending-up" as const,
    },
    {
      title: "Heart Rate Consistent",
      duration: "7 Days",
      lastUpdated: "Last updated 1 day ago",
      icon: "favorite" as const,
    },
  ];

  const patternData = [
    {
      title: "Respiratory Rate",
      description:
        "Mild increase in respiratory rate during sleep in past 5 days.",
      confidence: 85,
      icon: "timeline" as const,
    },
    {
      title: "Activity Patterns",
      description:
        "Increased physical activity levels correlate with improved sleep quality.",
      confidence: 92,
      icon: "directions-run" as const,
    },
  ];

  const predictions = [
    {
      title: "You may experience increased fatigue around Week 28",
      description: "",
      confidence: "High" as const,
      icon: "warning" as const,
    },
    {
      title: "Fetal movements likely to peak in the next 3 days",
      description: "",
      confidence: "Medium" as const,
      icon: "child-care" as const,
    },
  ];

  const weeklySummary = [
    { label: "Average Heart Rate", value: "72 bpm" },
    { label: "Sleep Duration", value: "7.5 hours" },
    { label: "Steps", value: "8,547" },
  ];

  const nextSteps = [
    {
      title: "Track hydration daily to improve prediction accuracy",
      description: "",
      icon: "water-drop" as const,
    },
    {
      title: "Check SpO₂ after mild activity",
      description: "",
      icon: "monitor-heart" as const,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <CustomAppBar
        title="Insights & Predictions"
        rightAction="notifications"
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.title}>
            AI Insights
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            These trends, predictions, and insights are generated based on your
            health history.
          </Text>
        </View>

        {/* Recent Trends */}
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Recent Trends
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.trendsContainer}
          >
            {trendData.map((trend, index) => (
              <TrendCard key={index} {...trend} />
            ))}
          </ScrollView>
        </View>

        {/* Pattern Recognition */}
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Pattern Recognition
          </Text>
          {patternData.map((pattern, index) => (
            <PatternCard key={index} {...pattern} />
          ))}
        </View>

        {/* What to Expect */}
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            What to Expect
          </Text>
          {predictions.map((prediction, index) => (
            <PredictionCard key={index} {...prediction} />
          ))}
        </View>

        {/* This Week's Summary */}
        <View style={styles.section}>
          <Text
            variant="titleLarge"
            style={styles.sectionTitle}
          >{`This Week's Summary`}</Text>
          <Card style={styles.summaryCard}>
            <Card.Content>
              {weeklySummary.map((item, index) => (
                <WeeklySummaryRow key={index} {...item} />
              ))}
              <Button
                mode="outlined"
                style={styles.viewReportButton}
                buttonColor="transparent"
                textColor="#6366F1"
              >
                View Full Weekly Report
              </Button>
            </Card.Content>
          </Card>
        </View>

        {/* Next Best Steps */}
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Next Best Steps
          </Text>
          {nextSteps.map((step, index) => (
            <NextStepCard key={index} {...step} />
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            mode="outlined"
            style={styles.exportButton}
            buttonColor="transparent"
            textColor="#6366F1"
            icon="download"
          >
            Export Insights
          </Button>
          <Button
            mode="contained"
            style={styles.shareButton}
            buttonColor="#6366F1"
            icon="share"
          >
            Share with Doctor
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 20,
  },
  title: {
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
  },
  subtitle: {
    color: "#6B7280",
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
  },
  trendsContainer: {
    paddingRight: 16,
  },
  trendCard: {
    width: 180,
    marginRight: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
  },
  trendContent: {
    paddingVertical: 16,
  },
  trendHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  trendTitle: {
    fontWeight: "600",
    color: "#1F2937",
    flex: 1,
  },
  duration: {
    color: "#6B7280",
    marginBottom: 12,
  },
  lastUpdated: {
    flexDirection: "row",
    alignItems: "center",
  },
  lastUpdatedText: {
    color: "#9CA3AF",
    marginLeft: 4,
  },
  patternCard: {
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
    borderRadius: 12,
  },
  patternHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  patternTitle: {
    fontWeight: "600",
    color: "#1F2937",
    flex: 1,
  },
  patternDescription: {
    color: "#6B7280",
    marginBottom: 16,
    lineHeight: 20,
  },
  confidenceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    marginRight: 12,
  },
  confidenceText: {
    color: "#10B981",
    fontWeight: "500",
  },
  predictionCard: {
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
    borderRadius: 12,
  },
  predictionHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  predictionTitle: {
    fontWeight: "500",
    color: "#1F2937",
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  predictionDescription: {
    color: "#6B7280",
    marginLeft: 36,
    marginBottom: 12,
  },
  confidenceChip: {
    alignSelf: "flex-start",
    marginLeft: 36,
    backgroundColor: "transparent",
    borderColor: "#D1D5DB",
  },
  confidenceChipText: {
    color: "#6B7280",
    fontSize: 12,
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  summaryLabel: {
    color: "#6B7280",
  },
  summaryValue: {
    fontWeight: "600",
    color: "#1F2937",
  },
  viewReportButton: {
    marginTop: 16,
    borderColor: "#6366F1",
  },
  nextStepCard: {
    backgroundColor: "#FFFFFF",
    marginBottom: 8,
    borderRadius: 12,
  },
  nextStepContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  nextStepIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  nextStepText: {
    flex: 1,
  },
  nextStepTitle: {
    fontWeight: "500",
    color: "#1F2937",
    lineHeight: 18,
  },
  nextStepDescription: {
    color: "#6B7280",
    marginTop: 2,
    lineHeight: 16,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 32,
  },
  exportButton: {
    flex: 1,
    borderColor: "#6366F1",
  },
  shareButton: {
    flex: 1,
  },
});
