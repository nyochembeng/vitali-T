import React from "react";
import { View } from "react-native";
import { Surface, Text } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@/lib/hooks/useTheme";

interface Tip {
  id: string;
  category: "development" | "nutrition" | "exercise" | "wellness";
  title: string;
  description: string;
  week: number;
  icon: string;
}

interface TipCardProps {
  tip: Tip;
}

const getCategoryIcon = (category: string): string => {
  switch (category) {
    case "development":
      return "child-care";
    case "nutrition":
      return "restaurant";
    case "exercise":
      return "fitness-center";
    case "wellness":
      return "favorite";
    default:
      return "info";
  }
};

export const TipCard: React.FC<TipCardProps> = ({ tip }) => {
  const { colors, typo, layout } = useTheme();
  const iconName = getCategoryIcon(tip.category);
  const iconColor = colors.primary;

  return (
    <Surface
      style={{
        backgroundColor: colors.card,
        borderRadius: layout.borderRadius.medium,
        padding: layout.spacing.md,
        marginBottom: layout.spacing.sm,
        elevation: layout.elevation,
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
          variant="labelMedium"
          style={{
            color: colors.text,
            fontWeight: "500",
            ...typo.caption,
          }}
        >
          Week {tip.week}
        </Text>
        <MaterialIcons name={iconName as any} size={20} color={iconColor} />
      </View>
      <Text
        variant="titleLarge"
        style={{
          fontWeight: "600",
          color: colors.text,
          marginBottom: layout.spacing.sm,
          ...typo.h5,
        }}
      >
        {tip.title}
      </Text>
      <Text
        variant="bodyMedium"
        style={{
          color: colors.text,
          lineHeight: typo.body1.lineHeight,
          ...typo.body1,
        }}
      >
        {tip.description}
      </Text>
    </Surface>
  );
};
