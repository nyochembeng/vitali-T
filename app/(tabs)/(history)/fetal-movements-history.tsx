import React, { useState } from "react";
import { View, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { Button } from "react-native-paper";
import FetalMovementCard from "@/components/history/FetalMovementCard";
import { useRouter } from "expo-router";
import CustomAppBar from "@/components/utils/CustomAppBar";

interface FetalMovementEntry {
  id: string;
  date: string;
  time: string;
  kickCount: number;
  notes: string;
}

export default function FetalMovementsScreen() {
  const route = useRouter();

  // Sample data - replace with actual data from your API/state
  const [movementEntries] = useState<FetalMovementEntry[]>([
    {
      id: "1",
      date: "Feb 15, 2024",
      time: "2:30 PM",
      kickCount: 12,
      notes:
        "Baby was very active today, especially after lunch. Noticed more movement in the afternoon.",
    },
    {
      id: "2",
      date: "Feb 14, 2024",
      time: "4:45 PM",
      kickCount: 8,
      notes: "Regular activity pattern. Felt some rolls and kicks.",
    },
    {
      id: "3",
      date: "Feb 13, 2024",
      time: "3:20 PM",
      kickCount: 15,
      notes: "Very energetic session! Baby seemed extra active today.",
    },
    {
      id: "4",
      date: "Feb 12, 2024",
      time: "2:15 PM",
      kickCount: 10,
      notes: "Normal activity level. Felt some gentle movements.",
    },
  ]);

  const handleStartNewSession = () => {
    // Navigate to movement tracking session screen
    route.push("/log-fetal-movements");
  };

  const renderMovementCard = ({ item }: { item: FetalMovementEntry }) => (
    <FetalMovementCard entry={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <CustomAppBar
        title="Fetal Movements History"
        rightAction="notifications"
        titleIcon={{ name: "child-care", position: "left" }}
      />

      {/* Movements List */}
      <FlatList
        data={movementEntries}
        renderItem={renderMovementCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

      {/* Start New Session Button */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleStartNewSession}
          style={styles.startButton}
          labelStyle={styles.startButtonText}
          icon="plus"
        >
          Start New Movement Session
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 16,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginLeft: 12,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  startButton: {
    backgroundColor: "#8B4513",
    borderRadius: 12,
    paddingVertical: 4,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  listContainer: {
    paddingBottom: 20,
  },
});
