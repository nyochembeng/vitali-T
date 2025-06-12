import React from "react";
import { View } from "react-native";
import { Text, IconButton } from "react-native-paper";
import { useTheme } from "@/lib/hooks/useTheme";

interface FeatureCardProps {
  icon: string;
  title: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title }) => {
  const { colors, typo, layout } = useTheme();

  return (
    <View
      style={{
        alignItems: "center",
        flex: 1,
        maxWidth: 100,
      }}
    >
      <IconButton
        icon={icon}
        size={32}
        iconColor={colors.primary}
        style={{
          backgroundColor: colors.surface,
          margin: 0,
          marginBottom: layout.spacing.sm,
        }}
      />
      <Text
        variant="bodyMedium"
        style={{
          color: colors.text,
          textAlign: "center",
          ...typo.body3,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default FeatureCard;
