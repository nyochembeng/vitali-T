import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text, Surface } from "react-native-paper";

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
  return (
    <TouchableOpacity onPress={onPress}>
      <Surface style={styles.container} elevation={1}>
        {/* <Image source={{ uri: article.image }} style={styles.image} /> */}
        <View style={styles.content}>
          <Text variant="titleMedium" style={styles.title} numberOfLines={2}>
            {article.title}
          </Text>
          <Text
            variant="bodyMedium"
            style={styles.description}
            numberOfLines={2}
          >
            {article.description}
          </Text>
          <Text variant="bodySmall" style={styles.readTime}>
            {article.readTime}
          </Text>
        </View>
      </Surface>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "cover",
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    color: "#666",
    marginBottom: 8,
    lineHeight: 20,
  },
  readTime: {
    color: "#999",
  },
});
