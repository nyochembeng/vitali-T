import React from "react";
import { View, StyleSheet, Image, ImageSourcePropType } from "react-native";
import { Text } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

interface SetupStepProps {
  stepNumber: number;
  title: string;
  description?: string;
  instructions?: string[];
  image?: ImageSourcePropType;
}

const SetupStep: React.FC<SetupStepProps> = ({
  stepNumber,
  title,
  description,
  instructions,
  image,
}) => {
  return (
    <View style={styles.container}>
      {/* Step Header */}
      <View style={styles.header}>
        <View style={styles.stepNumber}>
          <Text variant="titleMedium" style={styles.stepNumberText}>
            {stepNumber}
          </Text>
        </View>
        <Text variant="titleMedium" style={styles.title}>
          {title}
        </Text>
      </View>

      {/* Description */}
      {description && (
        <Text variant="bodyMedium" style={styles.description}>
          {description}
        </Text>
      )}

      {/* Instructions List */}
      {instructions && (
        <View style={styles.instructionsContainer}>
          {instructions.map((instruction, index) => (
            <View key={index} style={styles.instructionItem}>
              <MaterialIcons
                name="radio-button-unchecked"
                size={16}
                color="#A67B5B"
                style={styles.bulletIcon}
              />
              <Text variant="bodyMedium" style={styles.instructionText}>
                {instruction}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Image */}
      {/* <Image source={image} style={styles.image} resizeMode="cover" /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#A67B5B",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  stepNumberText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  title: {
    color: "#2C2C2C",
    fontWeight: "600",
    flex: 1,
  },
  description: {
    color: "#666666",
    lineHeight: 20,
    marginBottom: 16,
    marginLeft: 40,
  },
  instructionsContainer: {
    marginLeft: 40,
    marginBottom: 16,
  },
  instructionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  bulletIcon: {
    marginTop: 2,
    marginRight: 8,
  },
  instructionText: {
    color: "#666666",
    lineHeight: 20,
    flex: 1,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 12,
    marginLeft: 40,
    marginRight: 40,
    // width: '85%',
  },
});

export default SetupStep;
