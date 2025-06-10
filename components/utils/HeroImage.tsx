import React from "react";
import { StyleSheet, Image } from "react-native";
import { Surface } from "react-native-paper";

interface HeroImageProps {
  source?: string;
}

export const HeroImage: React.FC<HeroImageProps> = ({ source }) => {
  return (
    <Surface style={styles.container} elevation={4}>
      <Image source={{ uri: source }} style={styles.image} />
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
});
