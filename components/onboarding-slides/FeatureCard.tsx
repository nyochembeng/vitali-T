import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, IconButton } from "react-native-paper";

interface FeatureCardProps {
  icon: string;
  title: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title }) => {
  return (
    <View style={styles.container}>
      <IconButton
        icon={icon}
        size={32}
        iconColor="#666666"
        style={styles.iconButton}
      />
      <Text variant="bodyMedium" style={styles.title}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    maxWidth: 100,
  },
  iconButton: {
    backgroundColor: "transparent",
    margin: 0,
    marginBottom: 8,
  },
  title: {
    color: "#666666",
    textAlign: "center",
    fontSize: 12,
    lineHeight: 16,
  },
});

export default FeatureCard;
