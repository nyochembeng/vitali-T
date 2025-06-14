import { useTheme } from "@/lib/hooks/useTheme";
import { Video } from "@/lib/schemas/healthEducationSchema";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Surface, Text } from "react-native-paper";

interface VideoCardProps {
  video: Video;
  onPress: () => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onPress }) => {
  const { colors, typo, layout } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ width: 280, marginRight: layout.spacing.sm }}
    >
      <Surface
        style={{
          borderRadius: layout.borderRadius.medium,
          overflow: "hidden",
          elevation: layout.elevation,
        }}
      >
        <View style={{ position: "relative", height: layout.spacing.xl * 5 }}>
          {/* <Image source={{ uri: video.mediaUrl }} style={{ width: '100%', height: '100%' }} /> */}
          <View
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: [
                { translateX: -layout.spacing.lg / 2 },
                { translateY: -layout.spacing.lg / 2 },
              ],
              width: layout.spacing.xl,
              height: layout.spacing.xl,
              borderRadius: layout.borderRadius.medium,
              backgroundColor: "rgba(0,0,0,0.7)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialIcons
              name="play-arrow"
              size={24}
              color={colors.textInverse}
            />
          </View>
        </View>
        <View style={{ padding: layout.spacing.sm }}>
          <Text
            variant="titleMedium"
            style={{
              fontWeight: "600",
              marginBottom: layout.spacing.sm,
              color: colors.text,
              ...typo.h6,
            }}
            numberOfLines={2}
          >
            {video.title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="access-time" size={16} color={colors.text} />
              <Text
                variant="bodySmall"
                style={{
                  marginLeft: layout.spacing.xs,
                  color: colors.text,
                  ...typo.body2,
                }}
              >
                {video.duration}
              </Text>
            </View>
            {video.trimester && (
              <Text
                variant="bodySmall"
                style={{
                  color: colors.primary,
                  fontWeight: "500",
                  ...typo.body2,
                }}
              >
                {video.trimester}
              </Text>
            )}
          </View>
        </View>
      </Surface>
    </TouchableOpacity>
  );
};
