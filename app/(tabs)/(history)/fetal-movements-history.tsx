import React, { useState } from "react";
import { View, FlatList, SafeAreaView } from "react-native";
import { Button } from "react-native-paper";
import FetalMovementCard from "@/components/history/FetalMovementCard";
import { useRouter } from "expo-router";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useTheme } from "@/lib/hooks/useTheme";

interface FetalMovementEntry {
  id: string;
  date: string;
  time: string;
  kickCount: number;
  notes: string;
}

export default function FetalMovementsScreen() {
  const router = useRouter();
  const { colors, typo, layout } = useTheme();

  // Updated sample data to reflect current date (June 10, 2025)
  const [movementEntries] = useState<FetalMovementEntry[]>([
    {
      id: "1",
      date: "Tue, June 10, 2025",
      time: "02:30 PM",
      kickCount: 12,
      notes:
        "Baby was very active today, especially after lunch. Noticed more movement in the afternoon.",
    },
    {
      id: "2",
      date: "Mon, June 9, 2025",
      time: "04:45 PM",
      kickCount: 8,
      notes: "Regular activity pattern. Felt some rolls and kicks.",
    },
    {
      id: "3",
      date: "Sun, June 8, 2025",
      time: "03:20 PM",
      kickCount: 15,
      notes: "Very energetic session! Baby seemed extra active today.",
    },
    {
      id: "4",
      date: "Sat, June 7, 2025",
      time: "02:15 PM",
      kickCount: 10,
      notes: "Normal activity level. Felt some gentle movements.",
    },
  ]);

  const handleStartNewSession = () => {
    router.push("/log-fetal-movements");
  };

  const renderMovementCard = ({ item }: { item: FetalMovementEntry }) => (
    <FetalMovementCard entry={item} />
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <CustomAppBar
        title="Fetal Movements History"
        rightAction="notifications"
      />
      <View
        style={{
          flex: 1,
          paddingHorizontal: layout.spacing.lg,
        }}
      >
        <FlatList
          data={movementEntries}
          renderItem={renderMovementCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: layout.spacing.xl,
          }}
        />

        <View
          style={{
            paddingHorizontal: layout.spacing.sm,
            paddingVertical: layout.spacing.sm,
          }}
        >
          <Button
            mode="contained"
            onPress={handleStartNewSession}
            style={{
              backgroundColor: colors.primary,
              borderRadius: layout.borderRadius.medium,
              paddingVertical: layout.spacing.xs,
            }}
            labelStyle={{
              fontSize: typo.button.fontSize,
              fontWeight: "600",
              color: colors.textInverse,
              ...typo.button,
            }}
            icon="plus"
          >
            Start New Movement Session
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
