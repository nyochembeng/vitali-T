import React from "react";
import { View } from "react-native";
import { Text, Switch } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/lib/hooks/useTheme";

interface NotificationSettingItemType {
  id: string;
  title: string;
  description: string;
  icon: string;
  enabled: boolean;
}

interface NotificationSettingItemProps {
  setting: NotificationSettingItemType;
  onToggle: (id: string, enabled: boolean) => void;
  disabled?: boolean;
}

export default function NotificationSettingItem({
  setting,
  onToggle,
  disabled = false,
}: NotificationSettingItemProps) {
  const { colors, typo, layout } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: layout.spacing.lg,
        marginVertical: layout.spacing.sm,
        marginHorizontal: layout.spacing.md,
        borderRadius: layout.borderRadius.medium,
        backgroundColor: colors.accent,
      }}
    >
      <View style={{ marginRight: layout.spacing.md }}>
        <MaterialCommunityIcons
          name={setting.icon as any}
          size={24}
          color={colors.primary}
        />
      </View>
      <View style={{ flex: 1, marginRight: layout.spacing.sm }}>
        <Text
          style={{
            ...typo.body1,
            color: colors.text,
            fontWeight: "600",
            marginBottom: layout.spacing.xs,
          }}
        >
          {setting.title}
        </Text>
        <Text
          style={{
            ...typo.body2,
            color: colors.text,
            lineHeight: typo.body2.lineHeight,
            opacity: 0.8,
          }}
        >
          {setting.description}
        </Text>
      </View>
      <Switch
        value={setting.enabled}
        onValueChange={(enabled) => onToggle(setting.id, enabled)}
        thumbColor={setting.enabled ? colors.primary : colors.border}
        trackColor={{ false: colors.border, true: colors.primary + "50" }}
        disabled={disabled}
      />
    </View>
  );
}
