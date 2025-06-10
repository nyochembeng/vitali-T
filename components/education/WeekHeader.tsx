import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, ProgressBar } from "react-native-paper";

interface WeekHeaderProps {
  week: number;
  trimester: string;
  progress: number;
}

export const WeekHeader: React.FC<WeekHeaderProps> = ({
  week,
  trimester,
  progress,
}) => {
  return (
    <View style={styles.container}>
      <Text variant="displaySmall" style={styles.weekText}>
        Week {week}
      </Text>
      <ProgressBar
        progress={progress}
        color="#D4A574"
        style={styles.progressBar}
      />
      <Text variant="bodyLarge" style={styles.trimesterText}>
        {trimester}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F0ED",
    padding: 20,
    paddingTop: 32,
  },
  weekText: {
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E5E7EB",
    marginBottom: 8,
  },
  trimesterText: {
    color: "#6B7280",
  },
});
