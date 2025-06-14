import { EmergencySymptomCard } from "@/components/education/EmergencySymptomCard";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useTheme } from "@/lib/hooks/useTheme";
import { useAuth } from "@/lib/hooks/useAuth";
import { useGetEmergencySymptomsQuery } from "@/lib/features/emergency-symptoms/emergencySymptomService";
import React from "react";
import { Linking, ScrollView, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EmergencyGuidelinesScreen() {
  const { colors, typo, layout } = useTheme();
  const { user, isActionQueued } = useAuth();

  const {
    data: symptoms = [],
    isLoading,
    isFetching,
  } = useGetEmergencySymptomsQuery(
    {
      category: undefined,
      type: undefined,
      severity: undefined,
      keywords: undefined,
    },
    { skip: !user?.userId }
  );

  // Sort symptoms by severity (high > medium > low)
  const sortedSymptoms = symptoms.sort((a, b) => {
    const severityOrder = { high: 3, medium: 2, low: 1 };
    return severityOrder[b.severity] - severityOrder[a.severity];
  });

  const handleCallDoctor = () => {
    if (isActionQueued) return;
    Linking.openURL("tel:+237682113688");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomAppBar title="Emergency Guidelines" rightAction="help" />
      <ScrollView
        style={{ flex: 1, paddingHorizontal: layout.spacing.lg }}
        contentContainerStyle={{ paddingBottom: layout.spacing.xxl }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            paddingHorizontal: layout.spacing.sm,
            paddingTop: layout.spacing.sm,
            paddingBottom: layout.spacing.md,
          }}
        >
          <Text
            style={{
              fontWeight: "700",
              color: colors.text,
              textAlign: "center",
              marginBottom: layout.spacing.sm,
              fontSize: typo.h4.fontSize,
              ...typo.h4,
            }}
          >
            When to Seek Help
          </Text>
          <Text
            style={{
              color: colors.text,
              textAlign: "center",
              lineHeight: typo.body1.lineHeight,
              fontSize: typo.body1.fontSize,
              ...typo.body1,
            }}
          >
            If you experience any of the following symptoms, contact your
            healthcare provider immediately.
          </Text>
        </View>
        <View style={{ paddingHorizontal: layout.spacing.sm }}>
          {isLoading || isFetching ? (
            <View
              style={{
                alignItems: "center",
                paddingVertical: layout.spacing.xl,
              }}
            >
              <Text
                style={{
                  fontSize: typo.body2.fontSize,
                  color: colors.text,
                  ...typo.body2,
                }}
              >
                Loading emergency symptoms...
              </Text>
            </View>
          ) : sortedSymptoms.length === 0 ? (
            <View
              style={{
                alignItems: "center",
                paddingVertical: layout.spacing.xl,
                paddingHorizontal: layout.spacing.sm,
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  textAlign: "center",
                  fontSize: typo.body1.fontSize,
                  ...typo.body1,
                }}
              >
                No emergency symptoms available
              </Text>
            </View>
          ) : (
            sortedSymptoms.map((symptom) => (
              <EmergencySymptomCard
                key={symptom.emergencySymptomId}
                symptom={symptom}
              />
            ))
          )}
        </View>
      </ScrollView>
      <View
        style={{ padding: layout.spacing.sm, paddingBottom: layout.spacing.lg }}
      >
        <Button
          mode="contained"
          onPress={handleCallDoctor}
          style={{
            backgroundColor: colors.primary,
            borderRadius: layout.borderRadius.medium,
            paddingVertical: layout.spacing.sm,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            margin: layout.spacing.sm,
          }}
          labelStyle={{
            color: colors.textInverse,
            fontWeight: "600",
            marginLeft: layout.spacing.sm,
            fontSize: typo.button.fontSize,
            ...typo.button,
          }}
          icon="phone"
          disabled={isActionQueued}
        >
          Call Your Doctor
        </Button>
      </View>
    </SafeAreaView>
  );
}
