import React from "react";
import { View } from "react-native";
import { List, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/lib/hooks/useTheme";

interface PrivacySection {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface PrivacySectionItemProps {
  section: PrivacySection;
  expanded?: boolean;
  onToggle?: () => void;
}

export const PrivacySectionItem: React.FC<PrivacySectionItemProps> = ({
  section,
  expanded = false,
  onToggle,
}) => {
  const { colors, typo, layout } = useTheme();

  return (
    <View
      style={{
        marginVertical: layout.spacing.sm,
        borderRadius: layout.borderRadius.large,
        overflow: "hidden",
        backgroundColor: colors.card,
        padding: layout.spacing.md,
      }}
    >
      <List.Accordion
        title={section.title}
        description={section.description}
        expanded={expanded}
        onPress={onToggle}
        left={(props) => (
          <MaterialCommunityIcons
            name={section.icon as any}
            size={24}
            color={colors.primary}
            style={{ marginRight: layout.spacing.sm }}
          />
        )}
        right={(props) => (
          <MaterialCommunityIcons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={24}
            color={colors.primary}
          />
        )}
        titleStyle={{
          ...typo.subtitle2,
          color: colors.text,
        }}
        descriptionStyle={{
          ...typo.body2,
          color: colors.text,
        }}
        style={{
          backgroundColor: "transparent",
          paddingHorizontal: layout.spacing.sm,
          paddingVertical: layout.spacing.xs,
        }}
      >
        <Text
          style={{
            ...typo.body2,
            padding: layout.spacing.sm,
            color: colors.text,
          }}
        >
          {section.description}
        </Text>
      </List.Accordion>
    </View>
  );
};
