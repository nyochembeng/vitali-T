import React from "react";
import { View, Pressable } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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

interface SettingsItemProps {
  item: SettingsItemType;
}

export const SettingsItem: React.FC<SettingsItemProps> = ({ item }) => {
  const { colors, typo, layout } = useTheme();

  return (
    <Pressable
      style={{
        marginHorizontal: layout.spacing.lg,
        marginVertical: layout.spacing.xs,
        borderRadius: layout.borderRadius.small,
        overflow: "hidden",
        backgroundColor: colors.card,
        padding: layout.spacing.md,
      }}
      onPress={item.onPress}
      android_ripple={{ color: colors.primary + "20" }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: layout.spacing.sm,
        }}
      >
        <View
          style={{
            width: layout.spacing.xl,
            height: layout.spacing.xl,
            borderRadius: layout.borderRadius.xl,
            justifyContent: "center",
            alignItems: "center",
            marginRight: layout.spacing.sm,
            backgroundColor: item.iconColor + "20",
          }}
        >
          <MaterialCommunityIcons
            name={item.icon as any}
            size={20}
            color={item.iconColor}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{ ...typo.body1, color: colors.text, fontWeight: "500" }}
          >
            {item.title}
          </Text>
          {item.subtitle && (
            <Text
              style={{
                ...typo.body2,
                color: colors.text,
                marginTop: layout.spacing.xs,
                opacity: 0.7,
              }}
            >
              {item.subtitle}
            </Text>
          )}
        </View>
        {item.showChevron !== false && (
          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color={colors.text}
          />
        )}
      </View>
    </Pressable>
  );
};
