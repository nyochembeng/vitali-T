import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text, Surface } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

interface Video {
  id: string;
  title: string;
  duration: string;
  trimester?: string;
  thumbnail?: string;
}

interface VideoCardProps {
  video: Video;
  onPress: () => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Surface style={styles.surface} elevation={2}>
        <View style={styles.thumbnailContainer}>
          {/* <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} /> */}
          <View style={styles.playButton}>
            <MaterialIcons name="play-arrow" size={24} color="white" />
          </View>
        </View>
        <View style={styles.content}>
          <Text variant="titleMedium" style={styles.title} numberOfLines={2}>
            {video.title}
          </Text>
          <View style={styles.metadata}>
            <View style={styles.metadataItem}>
              <MaterialIcons name="access-time" size={16} color="#666" />
              <Text variant="bodySmall" style={styles.metadataText}>
                {video.duration}
              </Text>
            </View>
            {video.trimester && (
              <Text variant="bodySmall" style={styles.trimester}>
                {video.trimester}
              </Text>
            )}
          </View>
        </View>
      </Surface>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 280,
    marginRight: 16,
  },
  surface: {
    borderRadius: 12,
    overflow: "hidden",
  },
  thumbnailContainer: {
    position: "relative",
    height: 160,
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  playButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -20 }, { translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 12,
  },
  title: {
    fontWeight: "600",
    marginBottom: 8,
  },
  metadata: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metadataItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  metadataText: {
    marginLeft: 4,
    color: "#666",
  },
  trimester: {
    color: "#8B5CF6",
    fontWeight: "500",
  },
});
