import React from "react";
import { View } from "react-native";
import { Text, ProgressBar } from "react-native-paper";
import { useTheme } from "@/lib/hooks/useTheme";

interface WeekHeaderProps {
  week: number;
  trimester: string;
  progress: number;
}

export const WeekHeader: React.FC<WeekHeaderProps> = ({
  week,
  trimester,
  progress,
}) => {
  const { colors, typo, layout } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.accentLight,
        padding: layout.spacing.md,
        paddingTop: layout.spacing.md,
        borderRadius: layout.borderRadius.medium,
        marginBottom: layout.spacing.md,
      }}
    >
      <Text
        variant="displaySmall"
        style={{
          fontWeight: "700",
          color: colors.text,
          marginBottom: layout.spacing.sm,
          ...typo.h3,
        }}
      >
        Week {week}
      </Text>
      <ProgressBar
        progress={progress}
        color={colors.primary}
        style={{
          height: layout.spacing.sm,
          borderRadius: layout.borderRadius.small,
          backgroundColor: colors.background,
          marginBottom: layout.spacing.sm,
        }}
      />
      <Text
        variant="bodyLarge"
        style={{
          color: colors.text,
          ...typo.body1,
        }}
      >
        {trimester}
      </Text>
    </View>
  );
};
