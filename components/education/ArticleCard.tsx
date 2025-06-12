import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Text, Surface } from "react-native-paper";
import { useTheme } from "@/lib/hooks/useTheme";

interface Article {
  id: string;
  title: string;
  description: string;
  readTime: string;
  image?: string;
}

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
        {/* <Image source={{ uri: article.image }} style={styles.image} /> */}
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
