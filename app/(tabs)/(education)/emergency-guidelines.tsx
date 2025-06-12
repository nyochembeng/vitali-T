import { EmergencySymptomCard } from "@/components/education/EmergencySymptomCard";
import CustomAppBar from "@/components/utils/CustomAppBar";
import React from "react";
import { View, ScrollView, Linking } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/lib/hooks/useTheme";

interface EmergencySymptom {
  id: string;
  title: string;
  description: string;
  icon: string;
  severity: "high" | "medium" | "low";
}

const emergencySymptoms: EmergencySymptom[] = [
  {
    id: "1",
    title: "Sudden High Blood Pressure",
    description: "Swelling, vision changes, or severe headaches",
    icon: "warning",
    severity: "high",
  },
  {
    id: "2",
    title: "Decreased Fetal Movement",
    description: "Less movement or kicks than usual",
    icon: "child-care",
    severity: "high",
  },
  {
    id: "3",
    title: "Severe or Persistent Headaches",
    description: "Especially if accompanied by vision changes",
    icon: "psychology",
    severity: "medium",
  },
  {
    id: "4",
    title: "Heavy Bleeding or Fluid Loss",
    description: "Any unusual discharge or bleeding",
    icon: "opacity",
    severity: "high",
  },
  {
    id: "5",
    title: "Severe Abdominal Pain",
    description: "Sharp or persistent cramping",
    icon: "fitness-center",
    severity: "medium",
  },
  {
    id: "6",
    title: "Shortness of Breath",
    description: "Difficulty breathing or chest pain",
    icon: "air",
    severity: "medium",
  },
  {
    id: "7",
    title: "Seizures or Fainting",
    description: "Loss of consciousness or convulsions",
    icon: "flash-on",
    severity: "high",
  },
  {
    id: "8",
    title: "Signs of Preterm Labor",
    description: "Regular contractions before 37 weeks",
    icon: "schedule",
    severity: "high",
  },
  {
    id: "9",
    title: "High Fever",
    description: "Temperature of 100.4°F (38°C) or higher",
    icon: "thermostat",
    severity: "medium",
  },
];

export default function EmergencyGuidelinesScreen() {
  const { colors, typo, layout } = useTheme();

  const handleCallDoctor = () => {
    Linking.openURL("tel:911");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <CustomAppBar title="Emergency Guidelines" rightAction="help" />

      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: layout.spacing.lg,
        }}
        contentContainerStyle={{
          paddingBottom: layout.spacing.xxl,
        }}
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
            variant="headlineMedium"
            style={{
              fontWeight: "700",
              color: colors.text,
              textAlign: "center",
              marginBottom: layout.spacing.sm,
              ...typo.h4,
            }}
          >
            When to Seek Help
          </Text>
          <Text
            variant="bodyLarge"
            style={{
              color: colors.text,
              textAlign: "center",
              lineHeight: typo.body1.lineHeight,
              ...typo.body1,
            }}
          >
            If you experience any of the following symptoms, contact your
            healthcare provider immediately.
          </Text>
        </View>

        <View
          style={{
            paddingHorizontal: layout.spacing.sm,
          }}
        >
          {emergencySymptoms.map((symptom) => (
            <EmergencySymptomCard key={symptom.id} symptom={symptom} />
          ))}
        </View>
      </ScrollView>

      <View
        style={{
          padding: layout.spacing.sm,
          paddingBottom: layout.spacing.lg,
        }}
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
            ...typo.button,
          }}
          // icon="phone"
        >
          Call Your Doctor
        </Button>
      </View>
    </SafeAreaView>
  );
}
