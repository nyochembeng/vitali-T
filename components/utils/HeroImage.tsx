import React from "react";
import { Image } from "react-native";
import { Surface } from "react-native-paper";
import { useTheme } from "@/lib/hooks/useTheme";

interface HeroImageProps {
  source?: string;
}

export const HeroImage: React.FC<HeroImageProps> = ({ source }) => {
  const { layout } = useTheme();

  return (
    <Surface
      style={{
        marginHorizontal: layout.spacing.sm,
        marginBottom: layout.spacing.lg,
        borderRadius: layout.borderRadius.large,
        overflow: "hidden",
        elevation: layout.elevation,
      }}
    >
      <Image
        source={{ uri: source }}
        style={{
          width: "100%",
          height: layout.spacing.xl * 6.25, // 200px approximation
          resizeMode: "cover",
        }}
      />
    </Surface>
  );
};
