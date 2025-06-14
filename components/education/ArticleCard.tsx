import { useTheme } from "@/lib/hooks/useTheme";
import { Article } from "@/lib/schemas/healthEducationSchema";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Surface, Text } from "react-native-paper";

interface ArticleCardProps {
  article: Article;
  onPress: () => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onPress,
}) => {
  const { colors, typo, layout } = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <Surface
        style={{
          flexDirection: "row",
          marginBottom: layout.spacing.sm,
          borderRadius: layout.borderRadius.medium,
          overflow: "hidden",
          elevation: layout.elevation,
        }}
      >
        {/* <Image source={{ uri: article.mediaUrl }} style={{ width: 100, height: 100 }} /> */}
        <View
          style={{
            flex: 1,
            padding: layout.spacing.sm,
            justifyContent: "space-between",
          }}
        >
          <Text
            variant="titleMedium"
            style={{
              fontWeight: "600",
              marginBottom: layout.spacing.xs,
              color: colors.text,
              ...typo.h6,
            }}
            numberOfLines={2}
          >
            {article.title}
          </Text>
          <Text
            variant="bodyMedium"
            style={{
              color: "rgba(17, 12, 9, 0.6)",
              marginBottom: layout.spacing.sm,
              lineHeight: typo.body1.lineHeight,
              ...typo.body1,
            }}
            numberOfLines={2}
          >
            {article.description}
          </Text>
          <Text
            variant="bodySmall"
            style={{
              color: colors.text,
              ...typo.body3,
            }}
          >
            {article.readTime}
          </Text>
        </View>
      </Surface>
    </TouchableOpacity>
  );
};
