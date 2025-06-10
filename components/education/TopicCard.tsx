import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Surface, Text } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

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
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Surface
        style={[styles.surface, { backgroundColor: topic.color }]}
        elevation={2}
      >
        <MaterialIcons name={topic.icon as any} size={24} color="white" />
        <Text variant="labelMedium" style={styles.title}>
          {topic.title}
        </Text>
      </Surface>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "48%",
    marginBottom: 12,
  },
  surface: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 80,
  },
  title: {
    color: "white",
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center",
  },
});
