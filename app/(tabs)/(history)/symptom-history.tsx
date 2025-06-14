import CustomAppBar from "@/components/utils/CustomAppBar";
import FilterTabs from "@/components/utils/FilterTabs";
import { useTheme } from "@/lib/hooks/useTheme";
import { useAuth } from "@/lib/hooks/useAuth";
import { Symptom } from "@/lib/schemas/symptomSchema";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Button, Card, Chip, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetSymptomsQuery } from "@/lib/features/symptoms/symptomsService";

const SYMPTOM_ICONS: Record<string, keyof typeof MaterialIcons.glyphMap> = {
  Nausea: "sick",
  Vomiting: "sick",
  Headache: "psychology",
  "Back Pain": "healing",
  Heartburn: "local-fire-department",
  Constipation: "block",
  Fatigue: "battery-alert",
  Dizziness: "3d-rotation",
  Swelling: "waves",
  "Mood Changes": "mood",
  "Sleep Issues": "bedtime",
  "Breast Tenderness": "favorite",
  Other: "help-outline",
};

export default function SymptomsHistoryScreen() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const { colors, typo, layout } = useTheme();
  const router = useRouter();
  const { user, isActionQueued } = useAuth();
  const {
    data: symptoms = [],
    isLoading,
    isFetching,
  } = useGetSymptomsQuery(user?.userId as string, {
    skip: !user?.userId,
  });

  const filterOptions = ["All", "Last Week", "Last Month", "By Type"];

  const groupByDate = (symptoms: Symptom[]) => {
    const groups: { [key: string]: Symptom[] } = {};
    symptoms.forEach((symptom) => {
      const date = new Date(symptom.timestamp).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      if (!groups[date]) groups[date] = [];
      groups[date].push(symptom);
    });
    return Object.entries(groups).map(([date, symptoms]) => ({
      date,
      symptoms,
    }));
  };

  const filteredSymptoms = symptoms.filter((symptom) => {
    const symptomDate = new Date(symptom.timestamp);
    const today = new Date();
    const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfLastMonth = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      1
    );
    const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

    switch (selectedFilter) {
      case "Last Week":
        return symptomDate >= oneWeekAgo && symptomDate <= today;
      case "Last Month":
        return symptomDate >= startOfLastMonth && symptomDate <= endOfLastMonth;
      case "By Type":
        return symptom.symptom === "Nausea";
      default:
        return true;
    }
  });

  const symptomGroups = groupByDate(filteredSymptoms);

  const getSeverityLabel = (severity: string) => {
    const severityNum = parseInt(severity);
    if (severityNum <= 1) return "Low";
    if (severityNum <= 3) return "Medium";
    return "High";
  };

  const getSeverityColor = (severity: string) => {
    switch (getSeverityLabel(severity)) {
      case "Low":
        return colors.success;
      case "Medium":
        return colors.warning;
      case "High":
        return colors.error;
      default:
        return colors.text;
    }
  };

  const getSeverityBackgroundColor = (severity: string) => {
    switch (getSeverityLabel(severity)) {
      case "Low":
        return colors.successLight;
      case "Medium":
        return colors.warningLight;
      case "High":
        return colors.errorLight;
      default:
        return colors.surface;
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const handleLogNewSymptom = () => {
    if (isActionQueued) return;
    router.push("/log-symptoms");
  };

  const handleSymptomPress = (symptom: Symptom) => {};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomAppBar title="Symptoms History" rightAction="notifications" />
      <FilterTabs
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        options={filterOptions}
      />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: layout.spacing.lg }}
        showsVerticalScrollIndicator={false}
      >
        {isLoading || isFetching ? (
          <View
            style={{
              alignItems: "center",
              marginVertical: layout.spacing.lg,
            }}
          >
            <Text
              style={{
                fontSize: typo.body2.fontSize,
                color: colors.text,
                ...typo.body2,
              }}
            >
              Loading symptoms history...
            </Text>
          </View>
        ) : symptomGroups.length === 0 ? (
          <View
            style={{
              alignItems: "center",
              marginVertical: layout.spacing.lg,
            }}
          >
            <Text
              style={{
                fontSize: typo.body2.fontSize,
                color: colors.text,
                ...typo.body2,
              }}
            >
              No symptoms history available
            </Text>
          </View>
        ) : (
          symptomGroups.map((group, groupIndex) => (
            <View key={groupIndex} style={{ marginBottom: layout.spacing.xl }}>
              <Text
                style={{
                  fontSize: typo.h6.fontSize,
                  fontWeight: "600",
                  color: colors.text,
                  marginBottom: layout.spacing.sm,
                  ...typo.h6,
                }}
              >
                {group.date}
              </Text>
              {group.symptoms.map((symptom) => (
                <TouchableOpacity
                  key={symptom.symptomId}
                  onPress={() => handleSymptomPress(symptom)}
                  disabled={isActionQueued}
                >
                  <Card
                    style={{
                      marginBottom: layout.spacing.sm,
                      backgroundColor: colors.card,
                      elevation: 0,
                      opacity: isActionQueued ? 0.6 : 1,
                    }}
                  >
                    <Card.Content
                      style={{ flexDirection: "row", alignItems: "flex-start" }}
                    >
                      <View
                        style={{
                          width: layout.spacing.xl * 1.5,
                          height: layout.spacing.xl * 1.5,
                          borderRadius: layout.borderRadius.medium,
                          backgroundColor: colors.surface,
                          justifyContent: "center",
                          alignItems: "center",
                          marginRight: layout.spacing.sm,
                        }}
                      >
                        <MaterialIcons
                          name={
                            SYMPTOM_ICONS[symptom.symptom] || "help-outline"
                          }
                          size={24}
                          color={colors.primary}
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: layout.spacing.sm,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: typo.h6.fontSize,
                              fontWeight: "600",
                              color: colors.text,
                              ...typo.h6,
                            }}
                          >
                            {symptom.symptom}
                          </Text>
                          <Chip
                            style={{
                              height: layout.spacing.xl,
                              backgroundColor: getSeverityBackgroundColor(
                                symptom.severity
                              ),
                            }}
                            textStyle={{
                              fontSize: typo.caption.fontSize,
                              fontWeight: "500",
                              color: getSeverityColor(symptom.severity),
                              ...typo.caption,
                            }}
                          >
                            {getSeverityLabel(symptom.severity)}
                          </Chip>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: layout.spacing.sm,
                          }}
                        >
                          <MaterialIcons
                            name="access-time"
                            size={16}
                            color={colors.text}
                          />
                          <Text
                            style={{
                              fontSize: typo.body2.fontSize,
                              color: colors.text,
                              marginLeft: layout.spacing.xs,
                              ...typo.body2,
                            }}
                          >
                            {formatTime(symptom.timestamp)}
                          </Text>
                        </View>
                        {symptom.notes && (
                          <Text
                            style={{
                              fontSize: typo.body2.fontSize,
                              color: colors.text,
                              lineHeight: typo.body2.lineHeight,
                              ...typo.body2,
                            }}
                          >
                            {symptom.notes}
                          </Text>
                        )}
                      </View>
                      <MaterialIcons
                        name="chevron-right"
                        size={24}
                        color={colors.text}
                      />
                    </Card.Content>
                  </Card>
                </TouchableOpacity>
              ))}
            </View>
          ))
        )}
        <View style={{ padding: layout.spacing.sm }}>
          <Button
            mode="contained"
            onPress={handleLogNewSymptom}
            style={{
              backgroundColor: colors.primary,
              borderRadius: layout.borderRadius.medium,
              paddingVertical: layout.spacing.xs,
            }}
            labelStyle={{
              fontSize: typo.button.fontSize,
              fontWeight: "600",
              color: colors.textInverse,
              ...typo.button,
            }}
            icon="plus"
            disabled={isActionQueued}
            loading={isLoading}
          >
            Log New Symptom
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
