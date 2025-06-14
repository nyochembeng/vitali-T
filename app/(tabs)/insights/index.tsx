import CustomAppBar from "@/components/utils/CustomAppBar";
import { useTheme } from "@/lib/hooks/useTheme";
import { useAuth } from "@/lib/hooks/useAuth";
import {
  NextStep,
  Pattern,
  Prediction,
  Trend,
  WeeklySummary,
} from "@/lib/schemas/insightsSchema";
import { useGetInsightsQuery } from "@/lib/features/insights/insightsService";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, View } from "react-native";
import { Button, Card, Chip, ProgressBar, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const TrendCard: React.FC<Trend> = ({
  title,
  duration,
  lastUpdated,
  icon,
  source,
  category,
  metadata,
}) => {
  const { colors, typo, layout } = useTheme();
  return (
    <Card
      style={{
        width: layout.spacing.xxl * 4.5,
        marginRight: layout.spacing.sm,
        backgroundColor: colors.card,
        borderRadius: layout.borderRadius.medium,
      }}
    >
      <Card.Content style={{ paddingVertical: layout.spacing.sm }}>
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
              fontSize: typo.subtitle3.fontSize,
              color: colors.text,
              fontWeight: "600",
              flex: 1,
              ...typo.subtitle3,
            }}
          >
            {title}
          </Text>
          <MaterialIcons name={icon} size={24} color={colors.primary} />
        </View>
        <Text
          style={{
            fontSize: typo.body2.fontSize,
            color: colors.text,
            marginBottom: layout.spacing.md,
            ...typo.body2,
          }}
        >
          {duration}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons name="schedule" size={14} color={colors.text + "99"} />
          <Text
            style={{
              fontSize: typo.caption.fontSize,
              color: colors.text + "99",
              marginLeft: layout.spacing.xs,
              ...typo.caption,
            }}
          >
            {lastUpdated}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const PatternCard: React.FC<Pattern> = ({
  title,
  description,
  confidence,
  icon,
  source,
  category,
  metadata,
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
              fontSize: typo.subtitle2.fontSize,
              color: colors.text,
              fontWeight: "600",
              flex: 1,
              ...typo.subtitle2,
            }}
          >
            {title}
          </Text>
          <MaterialIcons name={icon} size={20} color={colors.primary} />
        </View>
        <Text
          style={{
            fontSize: typo.body2.fontSize,
            color: colors.text,
            marginBottom: layout.spacing.md,
            lineHeight: typo.body2.lineHeight,
            ...typo.body2,
          }}
        >
          {description}
        </Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", width: "100%" }}
        >
          <View style={{ flex: 1, marginRight: layout.spacing.sm }}>
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
              fontSize: typo.caption.fontSize,
              color: colors.accent,
              fontWeight: "500",
              minWidth: 80,
              ...typo.caption,
            }}
          >
            {confidence}% confidence
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const PredictionCard: React.FC<Prediction> = ({
  title,
  description,
  confidence,
  icon,
  source,
  category,
  metadata,
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
              fontSize: typo.subtitle2.fontSize,
              color: colors.text,
              marginLeft: layout.spacing.sm,
              flex: 1,
              lineHeight: typo.subtitle2.lineHeight,
              ...typo.subtitle2,
            }}
          >
            {title}
          </Text>
        </View>
        {description && (
          <Text
            style={{
              fontSize: typo.body2.fontSize,
              color: colors.text,
              marginLeft: layout.spacing.xl,
              marginBottom: layout.spacing.sm,
              ...typo.body2,
            }}
          >
            {description}
          </Text>
        )}
        <Chip
          mode="outlined"
          style={{
            alignSelf: "flex-start",
            marginLeft: layout.spacing.xl,
            backgroundColor: "transparent",
            borderColor: colors.border,
          }}
          textStyle={{
            fontSize: typo.caption.fontSize,
            color: colors.primary,
            ...typo.caption,
          }}
        >
          {confidence} Confidence
        </Chip>
      </Card.Content>
    </Card>
  );
};

const WeeklySummaryRow: React.FC<WeeklySummary> = ({
  label,
  value,
  source,
  category,
}) => {
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
          fontSize: typo.body2.fontSize,
          color: colors.text,
          ...typo.body2,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontSize: typo.subtitle2.fontSize,
          color: colors.text,
          fontWeight: "600",
          ...typo.subtitle2,
        }}
      >
        {value}
      </Text>
    </View>
  );
};

const NextStepCard: React.FC<NextStep> = ({
  title,
  description,
  icon,
  source,
  category,
  metadata,
}) => {
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
              fontSize: typo.body1.fontSize,
              color: colors.text,
              fontWeight: "500",
              lineHeight: typo.body1.lineHeight,
              ...typo.body1,
            }}
          >
            {title}
          </Text>
          {description && (
            <Text
              style={{
                fontSize: typo.caption.fontSize,
                color: colors.text,
                marginTop: layout.spacing.xs,
                lineHeight: typo.caption.lineHeight,
                ...typo.caption,
              }}
            >
              {description}
            </Text>
          )}
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
  const { user, isActionQueued } = useAuth();

  const {
    data: insights = [],
    isLoading,
    isFetching,
  } = useGetInsightsQuery(
    {
      userId: user?.userId as string,
      params: {
        startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // Last 7 days
      },
    },
    { skip: !user?.userId }
  );

  // Get the latest insight (most recent timestamp)
  const latestInsight = insights.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )[0] || {
    trends: [],
    patterns: [],
    predictions: [],
    weeklySummary: [],
    nextSteps: [],
  };

  const handleExportInsights = () => {
    if (isActionQueued) return;
    Toast.show({
      type: "info",
      text1: "Export Insights",
      text2: "Export functionality not implemented yet.",
    });
  };

  const handleShareWithDoctor = () => {
    if (isActionQueued) return;
    Toast.show({
      type: "info",
      text1: "Share with Doctor",
      text2: "Sharing functionality not implemented yet.",
    });
  };

  const handleViewFullReport = () => {
    if (isActionQueued) return;
    Toast.show({
      type: "info",
      text1: "View Full Report",
      text2: "Full report functionality not implemented yet.",
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
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
        <View style={{ paddingVertical: layout.spacing.md }}>
          <Text
            style={{
              fontSize: typo.h3.fontSize,
              color: colors.text,
              textAlign: "center",
              marginBottom: layout.spacing.xs,
              fontWeight: "700",
              ...typo.h3,
            }}
          >
            AI Insights
          </Text>
          <Text
            style={{
              fontSize: typo.body2.fontSize,
              color: colors.text,
              textAlign: "center",
              lineHeight: typo.body2.lineHeight,
              ...typo.body2,
            }}
          >
            These trends, predictions, and insights are generated based on your
            health history.
          </Text>
        </View>
        {isLoading || isFetching ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingTop: layout.spacing.xl * 2,
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
              Loading insights...
            </Text>
          </View>
        ) : latestInsight.trends?.length === 0 &&
          latestInsight.patterns?.length === 0 &&
          latestInsight.predictions?.length === 0 &&
          latestInsight.weeklySummary?.length === 0 &&
          latestInsight.nextSteps?.length === 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingTop: layout.spacing.xl * 2,
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
              No insights available
            </Text>
          </View>
        ) : (
          <>
            <View style={{ marginBottom: layout.spacing.lg }}>
              <Text
                style={{
                  fontSize: typo.subtitle1.fontSize,
                  color: colors.text,
                  fontWeight: "600",
                  marginBottom: layout.spacing.sm,
                  ...typo.subtitle1,
                }}
              >
                Recent Trends
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: layout.spacing.sm }}
              >
                {latestInsight.trends?.map((trend, index) => (
                  <TrendCard key={index} {...trend} />
                ))}
              </ScrollView>
            </View>
            <View style={{ marginBottom: layout.spacing.lg }}>
              <Text
                style={{
                  fontSize: typo.subtitle1.fontSize,
                  color: colors.text,
                  fontWeight: "600",
                  marginBottom: layout.spacing.sm,
                  ...typo.subtitle1,
                }}
              >
                Pattern Recognition
              </Text>
              {latestInsight.patterns?.map((pattern, index) => (
                <PatternCard key={index} {...pattern} />
              ))}
            </View>
            <View style={{ marginBottom: layout.spacing.lg }}>
              <Text
                style={{
                  fontSize: typo.subtitle1.fontSize,
                  color: colors.text,
                  fontWeight: "600",
                  marginBottom: layout.spacing.sm,
                  ...typo.subtitle1,
                }}
              >
                What to Expect
              </Text>
              {latestInsight.predictions?.map((prediction, index) => (
                <PredictionCard key={index} {...prediction} />
              ))}
            </View>
            <View style={{ marginBottom: layout.spacing.lg }}>
              <Text
                style={{
                  fontSize: typo.subtitle1.fontSize,
                  color: colors.text,
                  fontWeight: "600",
                  marginBottom: layout.spacing.sm,
                  ...typo.subtitle1,
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
                  {latestInsight.weeklySummary?.map((item, index) => (
                    <WeeklySummaryRow key={index} {...item} />
                  ))}
                  <Button
                    mode="outlined"
                    style={{
                      marginTop: layout.spacing.sm,
                      borderColor: colors.primary,
                    }}
                    textColor={colors.primary}
                    onPress={handleViewFullReport}
                    disabled={isActionQueued}
                  >
                    View Full Weekly Report
                  </Button>
                </Card.Content>
              </Card>
            </View>
            <View style={{ marginBottom: layout.spacing.lg }}>
              <Text
                style={{
                  fontSize: typo.subtitle1.fontSize,
                  color: colors.text,
                  fontWeight: "600",
                  marginBottom: layout.spacing.sm,
                  ...typo.subtitle1,
                }}
              >
                Next Best Steps
              </Text>
              {latestInsight.nextSteps?.map((step, index) => (
                <NextStepCard key={index} {...step} />
              ))}
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: layout.spacing.sm,
                marginBottom: layout.spacing.lg,
              }}
            >
              <Button
                mode="outlined"
                style={{ flex: 1, borderColor: colors.primary }}
                textColor={colors.primary}
                icon="download"
                onPress={handleExportInsights}
                disabled={isActionQueued}
              >
                Export Insights
              </Button>
              <Button
                mode="contained"
                style={{ flex: 1 }}
                buttonColor={colors.primary}
                icon="share"
                onPress={handleShareWithDoctor}
                disabled={isActionQueued}
              >
                Share with Doctor
              </Button>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
