import FetalMovementCard from "@/components/history/FetalMovementCard";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useTheme } from "@/lib/hooks/useTheme";
import { useAuth } from "@/lib/hooks/useAuth";
import { FetalMovement } from "@/lib/schemas/fetalMovementSchema";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, SafeAreaView, View, TouchableOpacity } from "react-native";
import { Button, Text } from "react-native-paper";
import { useGetFetalMovementsQuery } from "@/lib/features/fetal-movements/fetalMovementsService";

export default function FetalMovementsHistoryScreen() {
  const router = useRouter();
  const { colors, typo, layout } = useTheme();
  const { user, isActionQueued } = useAuth();
  const {
    data: movementEntries = [],
    isLoading,
    isFetching,
  } = useGetFetalMovementsQuery(user?.userId as string, {
    skip: !user?.userId,
  });

  const handleStartNewSession = () => {
    if (isActionQueued) return;
    router.push("/log-fetal-movements");
  };

  const handleMovementPress = (movement: FetalMovement) => {};

  const renderMovementCard = ({ item }: { item: FetalMovement }) => (
    <TouchableOpacity
      onPress={() => handleMovementPress(item)}
      disabled={isActionQueued}
    >
      <FetalMovementCard entry={item} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomAppBar
        title="Fetal Movements History"
        rightAction="notifications"
      />
      <View style={{ flex: 1, paddingHorizontal: layout.spacing.sm }}>
        {isLoading || isFetching ? (
          <View
            style={{
              alignItems: "center",
              marginVertical: layout.spacing.lg,
            }}
          >
            <Text
              style={{
                fontSize: typo.body2.fontSize,
                color: colors.text,
                ...typo.body2,
              }}
            >
              Loading fetal movements history...
            </Text>
          </View>
        ) : movementEntries.length === 0 ? (
          <View
            style={{
              alignItems: "center",
              marginVertical: layout.spacing.lg,
            }}
          >
            <Text
              style={{
                fontSize: typo.body2.fontSize,
                color: colors.text,
                ...typo.body2,
              }}
            >
              No fetal movements history available
            </Text>
          </View>
        ) : (
          <FlatList
            data={movementEntries}
            renderItem={renderMovementCard}
            keyExtractor={(item) => item.sessionId}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: layout.spacing.xl }}
          />
        )}
        <View
          style={{
            paddingHorizontal: layout.spacing.sm,
            paddingVertical: layout.spacing.sm,
            backgroundColor: colors.card,
            elevation: layout.elevation,
            shadowColor: colors.text,
            shadowOffset: layout.shadow.light.shadowOffset,
            shadowOpacity: layout.shadow.light.shadowOpacity,
            shadowRadius: layout.shadow.light.shadowRadius,
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
            disabled={isActionQueued}
            loading={isLoading}
          >
            Start New Movement Session
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
