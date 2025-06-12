import React from "react";
import { View, ScrollView } from "react-native";
import { Text, Card, Button, Chip, ProgressBar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useTheme } from "@/lib/hooks/useTheme";

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
}) => {
  const { colors, typo, layout } = useTheme();
  return (
    <Card
      style={{
        width: layout.spacing.xxl * 4.5, // 180px approximation
        marginRight: layout.spacing.sm,
        backgroundColor: colors.card,
        borderRadius: layout.borderRadius.medium,
      }}
    >
      <Card.Content
        style={{
          paddingVertical: layout.spacing.sm,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: layout.spacing.xs,
          }}
        >
          <Text
            style={{
              ...typo.subtitle3,
              color: colors.text,
              fontWeight: "600",
              flex: 1,
            }}
          >
            {title}
          </Text>
          <MaterialIcons name={icon} size={24} color={colors.primary} />
        </View>
        <Text
          style={{
            ...typo.body2,
            color: colors.text,
            marginBottom: layout.spacing.md,
          }}
        >
          {duration}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="schedule" size={14} color={colors.text + "99"} />
          <Text
            style={{
              ...typo.caption,
              color: colors.text + "99",
              marginLeft: layout.spacing.xs,
            }}
          >
            {lastUpdated}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const PatternCard: React.FC<PatternCardProps> = ({
  title,
  description,
  confidence,
  icon,
}) => {
  const { colors, typo, layout } = useTheme();
  return (
    <Card
      style={{
        backgroundColor: colors.card,
        marginBottom: layout.spacing.sm,
        borderRadius: layout.borderRadius.medium,
      }}
    >
      <Card.Content>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: layout.spacing.xs,
          }}
        >
          <Text
            style={{
              ...typo.subtitle2,
              color: colors.text,
              fontWeight: "600",
              flex: 1,
            }}
          >
            {title}
          </Text>
          <MaterialIcons name={icon} size={20} color={colors.primary} />
        </View>
        <Text
          style={{
            ...typo.body2,
            color: colors.text,
            marginBottom: layout.spacing.md,
            lineHeight: typo.body2.lineHeight,
          }}
        >
          {description}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%", // Ensure container takes full width
          }}
        >
          <View
            style={{
              flex: 1,
              marginRight: layout.spacing.sm,
            }}
          >
            <ProgressBar
              progress={confidence / 100}
              color={colors.accent}
              style={{
                height: layout.spacing.sm,
                borderRadius: layout.borderRadius.small,
                backgroundColor: colors.primaryLight,
              }}
            />
          </View>
          <Text
            style={{
              ...typo.caption,
              color: colors.accent,
              fontWeight: "500",
              minWidth: 80, // Prevent text from wrapping and affecting layout
            }}
          >
            {confidence}% confidence
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const PredictionCard: React.FC<PredictionCardProps> = ({
  title,
  description,
  confidence,
  icon,
}) => {
  const { colors, typo, layout } = useTheme();
  return (
    <Card
      style={{
        backgroundColor: colors.card,
        marginBottom: layout.spacing.sm,
        borderRadius: layout.borderRadius.medium,
      }}
    >
      <Card.Content>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            marginBottom: layout.spacing.xs,
          }}
        >
          <MaterialIcons name={icon} size={24} color={colors.primary} />
          <Text
            style={{
              ...typo.subtitle2,
              color: colors.text,
              marginLeft: layout.spacing.sm,
              flex: 1,
              lineHeight: typo.subtitle2.lineHeight,
            }}
          >
            {title}
          </Text>
        </View>
        <Text
          style={{
            ...typo.body2,
            color: colors.text,
            marginLeft: layout.spacing.xl,
            marginBottom: layout.spacing.sm,
          }}
        >
          {description}
        </Text>
        <Chip
          mode="outlined"
          style={{
            alignSelf: "flex-start",
            marginLeft: layout.spacing.xl,
            backgroundColor: "transparent",
            borderColor: colors.border,
          }}
          textStyle={{
            ...typo.caption,
            color: colors.primary,
          }}
        >
          {confidence} Confidence
        </Chip>
      </Card.Content>
    </Card>
  );
};

const WeeklySummaryRow: React.FC<WeeklySummaryItem> = ({ label, value }) => {
  const { colors, typo, layout } = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: layout.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}
    >
      <Text
        style={{
          ...typo.body2,
          color: colors.text,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          ...typo.subtitle2,
          color: colors.text,
          fontWeight: "600",
        }}
      >
        {value}
      </Text>
    </View>
  );
};

const NextStepCard: React.FC<NextStepItem> = ({ title, description, icon }) => {
  const { colors, typo, layout } = useTheme();
  return (
    <Card
      style={{
        backgroundColor: colors.card,
        marginBottom: layout.spacing.sm,
        borderRadius: layout.borderRadius.medium,
        padding: layout.spacing.md,
      }}
    >
      <Card.Content
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: layout.spacing.xs,
        }}
      >
        <View
          style={{
            width: layout.spacing.md,
            height: layout.spacing.md,
            borderRadius: layout.borderRadius.xl,
            backgroundColor: colors.primaryLight,
            justifyContent: "center",
            alignItems: "center",
            marginRight: layout.spacing.sm,
          }}
        >
          <MaterialIcons name={icon} size={20} color={colors.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              ...typo.body1,
              color: colors.text,
              fontWeight: "500",
              lineHeight: typo.body1.lineHeight,
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              ...typo.caption,
              color: colors.text,
              marginTop: layout.spacing.xs,
              lineHeight: typo.caption.lineHeight,
            }}
          >
            {description}
          </Text>
        </View>
        <MaterialIcons
          name="chevron-right"
          size={20}
          color={colors.text + "99"}
        />
      </Card.Content>
    </Card>
  );
};

export default function AIInsightsScreen() {
  const { colors, typo, layout } = useTheme();
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <CustomAppBar
        title="Insights & Predictions"
        rightAction="notifications"
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: layout.spacing.lg,
          paddingTop: layout.spacing.md,
          paddingBottom: layout.spacing.xl,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View
          style={{
            paddingVertical: layout.spacing.md,
          }}
        >
          <Text
            style={{
              ...typo.h3,
              color: colors.text,
              textAlign: "center",
              marginBottom: layout.spacing.xs,
              fontWeight: "700",
            }}
          >
            AI Insights
          </Text>
          <Text
            style={{
              ...typo.body2,
              color: colors.text,
              textAlign: "center",
              lineHeight: typo.body2.lineHeight,
            }}
          >
            These trends, predictions, and insights are generated based on your
            health history.
          </Text>
        </View>

        {/* Recent Trends */}
        <View
          style={{
            marginBottom: layout.spacing.lg,
          }}
        >
          <Text
            style={{
              ...typo.subtitle1,
              color: colors.text,
              fontWeight: "600",
              marginBottom: layout.spacing.sm,
            }}
          >
            Recent Trends
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: layout.spacing.sm }}
          >
            {trendData.map((trend, index) => (
              <TrendCard key={index} {...trend} />
            ))}
          </ScrollView>
        </View>

        {/* Pattern Recognition */}
        <View
          style={{
            marginBottom: layout.spacing.lg,
          }}
        >
          <Text
            style={{
              ...typo.subtitle1,
              color: colors.text,
              fontWeight: "600",
              marginBottom: layout.spacing.sm,
            }}
          >
            Pattern Recognition
          </Text>
          {patternData.map((pattern, index) => (
            <PatternCard key={index} {...pattern} />
          ))}
        </View>

        {/* What to Expect */}
        <View
          style={{
            marginBottom: layout.spacing.lg,
          }}
        >
          <Text
            style={{
              ...typo.subtitle1,
              color: colors.text,
              fontWeight: "600",
              marginBottom: layout.spacing.sm,
            }}
          >
            What to Expect
          </Text>
          {predictions.map((prediction, index) => (
            <PredictionCard key={index} {...prediction} />
          ))}
        </View>

        {/* This Week's Summary */}
        <View
          style={{
            marginBottom: layout.spacing.lg,
          }}
        >
          <Text
            style={{
              ...typo.subtitle1,
              color: colors.text,
              fontWeight: "600",
              marginBottom: layout.spacing.sm,
            }}
          >
            {`This Week's Summary`}
          </Text>
          <Card
            style={{
              backgroundColor: colors.card,
              borderRadius: layout.borderRadius.medium,
            }}
          >
            <Card.Content>
              {weeklySummary.map((item, index) => (
                <WeeklySummaryRow key={index} {...item} />
              ))}
              <Button
                mode="outlined"
                style={{
                  marginTop: layout.spacing.sm,
                  borderColor: colors.primary,
                }}
                textColor={colors.primary}
              >
                View Full Weekly Report
              </Button>
            </Card.Content>
          </Card>
        </View>

        {/* Next Best Steps */}
        <View
          style={{
            marginBottom: layout.spacing.lg,
          }}
        >
          <Text
            style={{
              ...typo.subtitle1,
              color: colors.text,
              fontWeight: "600",
              marginBottom: layout.spacing.sm,
            }}
          >
            Next Best Steps
          </Text>
          {nextSteps.map((step, index) => (
            <NextStepCard key={index} {...step} />
          ))}
        </View>

        {/* Action Buttons */}
        <View
          style={{
            flexDirection: "row",
            gap: layout.spacing.sm,
            marginBottom: layout.spacing.lg,
          }}
        >
          <Button
            mode="outlined"
            style={{
              flex: 1,
              borderColor: colors.primary,
            }}
            textColor={colors.primary}
            icon="download"
          >
            Export Insights
          </Button>
          <Button
            mode="contained"
            style={{ flex: 1 }}
            buttonColor={colors.primary}
            icon="share"
          >
            Share with Doctor
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
