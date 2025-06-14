import { useTheme } from "@/lib/hooks/useTheme";
import { EmergencySymptom } from "@/lib/schemas/emergencySymptomSchema";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { Surface, Text } from "react-native-paper";

// Map vital sign types to MaterialIcons and human-readable titles
const SYMPTOM_INFO: Record<
  string,
  { icon: keyof typeof MaterialIcons.glyphMap; title: string }
> = {
  bp: { icon: "warning", title: "Sudden High Blood Pressure" },
  fhr: { icon: "child-care", title: "Decreased Fetal Movement" },
  mhr: { icon: "psychology", title: "Severe or Persistent Headaches" },
  rr: { icon: "air", title: "Shortness of Breath" },
  bt: { icon: "thermostat", title: "High Fever" },
  other: { icon: "warning", title: "Other Emergency Symptom" },
};

interface EmergencySymptomCardProps {
  symptom: EmergencySymptom;
}

const getIconColor = (severity: string, colors: any) => {
  switch (severity) {
    case "high":
      return colors.error;
    case "medium":
      return colors.warning;
    default:
      return colors.primary;
  }
};

export const EmergencySymptomCard: React.FC<EmergencySymptomCardProps> = ({
  symptom,
}) => {
  const { colors, typo, layout } = useTheme();
  const iconColor = getIconColor(symptom.severity, colors);
  const { icon, title } = SYMPTOM_INFO[symptom.type] || SYMPTOM_INFO["other"];

  return (
    <Surface
      style={{
        backgroundColor: colors.card,
        borderRadius: layout.borderRadius.medium,
        padding: layout.spacing.md,
        marginBottom: layout.spacing.sm,
        flexDirection: "row",
        alignItems: "flex-start",
        elevation: layout.elevation,
      }}
    >
      <View
        style={{
          width: layout.spacing.xl,
          height: layout.spacing.xl,
          borderRadius: layout.borderRadius.full,
          backgroundColor: colors.surface,
          justifyContent: "center",
          alignItems: "center",
          marginRight: layout.spacing.sm,
        }}
      >
        <MaterialIcons name={icon} size={24} color={iconColor} />
      </View>
      <View style={{ flex: 1 }}>
        <Text
          variant="titleMedium"
          style={{
            fontWeight: "600",
            color: colors.text,
            marginBottom: layout.spacing.xs,
            ...typo.h6,
          }}
        >
          {title}
        </Text>
        <Text
          variant="bodyMedium"
          style={{
            color: "rgba(17, 12, 9, 0.6)",
            lineHeight: typo.body1.lineHeight,
            ...typo.body1,
          }}
        >
          {symptom.description}
        </Text>
      </View>
    </Surface>
  );
};
