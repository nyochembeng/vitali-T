import { useTheme } from "@/lib/hooks/useTheme";
import { Topic } from "@/lib/schemas/healthEducationSchema";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Surface, Text } from "react-native-paper";

// Map topic categories to icons and colors
const TOPIC_INFO: Record<
  string,
  { icon: keyof typeof MaterialIcons.glyphMap; color: string }
> = {
  Nutrition: { icon: "restaurant", color: "#4CAF50" },
  Exercise: { icon: "fitness-center", color: "#2196F3" },
  "Mental Health": { icon: "psychology", color: "#FF9800" },
  "Warning Signs": { icon: "warning", color: "#F44336" },
  Development: { icon: "child-care", color: "#9C27B0" },
  Other: { icon: "info", color: "#607D8B" },
};

interface TopicCardProps {
  topic: Topic;
  onPress: () => void;
}

export const TopicCard: React.FC<TopicCardProps> = ({ topic, onPress }) => {
  const { colors, typo, layout } = useTheme();
  const { icon, color } = TOPIC_INFO[topic.category] || TOPIC_INFO["Other"];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ width: "48%", marginBottom: layout.spacing.sm }}
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
        <MaterialIcons name={icon} size={24} color={color} />
        <Text
          variant="labelMedium"
          style={{
            color,
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
