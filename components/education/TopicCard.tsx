import React from "react";
import { TouchableOpacity } from "react-native";
import { Surface, Text } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@/lib/hooks/useTheme";

interface Topic {
  id: string;
  title: string;
  icon: string;
  color: string;
}

interface TopicCardProps {
  topic: Topic;
  onPress: () => void;
}

export const TopicCard: React.FC<TopicCardProps> = ({ topic, onPress }) => {
  const { colors, typo, layout } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: "48%",
        marginBottom: layout.spacing.sm,
      }}
    >
      <Surface
        style={{
          padding: layout.spacing.sm,
          borderRadius: layout.borderRadius.medium,
          alignItems: "center",
          justifyContent: "center",
          minHeight: layout.spacing.xl * 2,
          backgroundColor: colors.card,
          elevation: layout.elevation,
        }}
      >
        <MaterialIcons name={topic.icon as any} size={24} color={topic.color} />
        <Text
          variant="labelMedium"
          style={{
            color: topic.color,
            fontWeight: "600",
            marginTop: layout.spacing.xs,
            textAlign: "center",
            ...typo.caption,
          }}
        >
          {topic.title}
        </Text>
      </Surface>
    </TouchableOpacity>
  );
};
