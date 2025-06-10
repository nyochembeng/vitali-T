import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

interface VitalSign {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
}

interface VitalSignCardProps {
  vitalSign: VitalSign;
  onPress: () => void;
}

export const VitalSignCard: React.FC<VitalSignCardProps> = ({
  vitalSign,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Surface
        style={[styles.card, { backgroundColor: vitalSign.color }]}
        elevation={2}
      >
        <View style={styles.iconContainer}>
          <MaterialIcons name={vitalSign.icon as any} size={24} color="white" />
        </View>
        <View style={styles.content}>
          <Text variant="titleMedium" style={styles.title}>
            {vitalSign.title}
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            {vitalSign.subtitle}
          </Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="white" />
      </Surface>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    color: "white",
    fontWeight: "600",
    marginBottom: 4,
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
  },
});
