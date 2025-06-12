import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@/lib/hooks/useTheme";

interface VitalSign {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

interface VitalSignCardProps {
  vitalSign: VitalSign;
  onPress: () => void;
}

export const VitalSignCard: React.FC<VitalSignCardProps> = ({
  vitalSign,
  onPress,
}) => {
  const { colors, typo, layout } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginBottom: layout.spacing.sm,
      }}
    >
      <Surface
        style={{
          borderRadius: layout.borderRadius.medium,
          padding: layout.spacing.sm,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colors.card,
          elevation: layout.elevation,
        }}
      >
        <View
          style={{
            width: layout.spacing.xl * 1.5,
            height: layout.spacing.xl * 1.5,
            borderRadius: layout.borderRadius.full,
            backgroundColor: colors.surface,
            justifyContent: "center",
            alignItems: "center",
            marginRight: layout.spacing.sm,
          }}
        >
          <MaterialIcons
            name={vitalSign.icon as any}
            size={24}
            color={colors.primary}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text
            variant="titleMedium"
            style={{
              color: colors.text,
              fontWeight: "600",
              marginBottom: layout.spacing.xs,
              ...typo.h6,
            }}
          >
            {vitalSign.title}
          </Text>
          <Text
            variant="bodyMedium"
            style={{
              color: "rgba(17, 12, 9, 0.6)",
              ...typo.body1,
            }}
          >
            {vitalSign.subtitle}
          </Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color={colors.border} />
      </Surface>
    </TouchableOpacity>
  );
};
