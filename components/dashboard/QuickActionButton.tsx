import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/lib/hooks/useTheme";

interface QuickAction {
  id: string;
  title: string;
  icon: string;
  onPress: () => void;
}

interface QuickActionButtonProps {
  action: QuickAction;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({ action }) => {
  const { colors, typo, layout } = useTheme();

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        alignItems: "center",
        paddingVertical: layout.spacing.sm,
      }}
      onPress={action.onPress}
    >
      <View
        style={{
          width: layout.spacing.xl * 1.5,
          height: layout.spacing.xl * 1.5,
          borderRadius: layout.borderRadius.full,
          backgroundColor: colors.background,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: layout.spacing.sm,
        }}
      >
        <MaterialCommunityIcons
          name={action.icon as any}
          size={24}
          color={colors.primary}
        />
      </View>
      <Text
        variant="bodySmall"
        style={{
          textAlign: "center",
          color: colors.text,
          ...typo.body3,
        }}
      >
        {action.title}
      </Text>
    </TouchableOpacity>
  );
};

export default QuickActionButton;
