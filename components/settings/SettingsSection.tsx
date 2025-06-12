import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { SettingsItem } from "./SettingsItem";
import { useTheme } from "@/lib/hooks/useTheme";

interface SettingsItemType {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  iconColor: string;
  onPress: () => void;
  showChevron?: boolean;
}

interface SettingsSectionType {
  id: string;
  title?: string;
  items: SettingsItemType[];
}

interface SettingsSectionProps {
  section: SettingsSectionType;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  section,
}) => {
  const { colors, typo, layout } = useTheme();

  return (
    <View
      style={{
        marginBottom: layout.spacing.lg,
        padding: layout.spacing.md,
      }}
    >
      {section.title && (
        <Text
          style={{
            ...typo.h5,
            color: colors.text,
            marginHorizontal: layout.spacing.md,
            marginBottom: layout.spacing.sm,
          }}
        >
          {section.title}
        </Text>
      )}
      {section.items.map((item) => (
        <SettingsItem key={item.id} item={item} />
      ))}
    </View>
  );
};
