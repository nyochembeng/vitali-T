import { TipCard } from "@/components/education/TipCard";
import { WeekHeader } from "@/components/education/WeekHeader";
import CustomAppBar from "@/components/utils/CustomAppBar";
import FilterTabs from "@/components/utils/FilterTabs";
import { useTheme } from "@/lib/hooks/useTheme";
import { useAuth } from "@/lib/hooks/useAuth";
import { useGetPregnancyTipsQuery } from "@/lib/features/pregnancy-tips/pregnancyTipService";
import { useGetProfileQuery } from "@/lib/features/profile/profileService";
import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { Button, Text, Portal, Dialog, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function PregnancyTipsScreen() {
  const [activeCategory, setActiveCategory] = useState<string>("All Tips");
  const [currentWeek, setCurrentWeek] = useState<number>(1); // Default to week 1 until profile loads
  const [showWeekDialog, setShowWeekDialog] = useState(false);
  const [weekInput, setWeekInput] = useState<string>("1");
  const { colors, layout, typo } = useTheme();
  const { user, isActionQueued } = useAuth();

  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useGetProfileQuery(user?.userId as string, { skip: !user?.userId });

  // Calculate current week based on conception date
  useEffect(() => {
    if (profile?.conceivedDate && !isProfileError) {
      const conceptionDate = new Date(profile.conceivedDate);
      const currentDate = new Date();
      if (!isNaN(conceptionDate.getTime())) {
        const diffTime = currentDate.getTime() - conceptionDate.getTime();
        const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7)) + 1; // Week 1 starts at conception
        const cappedWeek = Math.min(Math.max(diffWeeks, 1), 40); // Ensure week is 1–40
        setCurrentWeek(cappedWeek);
        setWeekInput(cappedWeek.toString());
      }
    }
  }, [profile, isProfileError]);

  const categories = [
    "All Tips",
    "Development",
    "Nutrition",
    "Exercise",
    "Wellness",
  ];

  const trimester =
    currentWeek <= 12 ? "First" : currentWeek <= 27 ? "Second" : "Third";
  const progress = currentWeek / 40; // Simple progress calculation (week/40)

  const {
    data: tips = [],
    isLoading: isTipsLoading,
    isFetching: isTipsFetching,
  } = useGetPregnancyTipsQuery(
    {
      category:
        activeCategory === "All Tips"
          ? undefined
          : activeCategory.toLowerCase(),
      week: currentWeek,
      trimester: undefined,
      keywords: undefined,
    },
    { skip: !user?.userId }
  );

  const sortedTips = tips.sort((a, b) => (b.priority || 1) - (a.priority || 1));

  const handleWeekChange = () => {
    if (isActionQueued) return;
    setShowWeekDialog(true);
  };

  const handleWeekSubmit = () => {
    if (isActionQueued) return;
    const weekNum = parseInt(weekInput, 10);
    if (isNaN(weekNum) || weekNum < 1 || weekNum > 40) {
      Toast.show({
        type: "error",
        text1: "Invalid Week",
        text2: "Please enter a week between 1 and 40.",
      });
      return;
    }
    setCurrentWeek(weekNum);
    setShowWeekDialog(false);
    setWeekInput(weekNum.toString());
  };

  const handleWeekCancel = () => {
    if (isActionQueued) return;
    setWeekInput(currentWeek.toString());
    setShowWeekDialog(false);
  };

  const handleLoadMore = () => {
    if (isActionQueued) return;
    Toast.show({
      type: "info",
      text1: "Load More",
      text2: "No additional tips available at this time.",
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomAppBar title="Pregnancy Tips" rightAction="notifications" />
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: layout.spacing.lg,
          paddingTop: layout.spacing.sm,
        }}
        contentContainerStyle={{ paddingBottom: layout.spacing.xxl }}
        showsVerticalScrollIndicator={false}
      >
        {isProfileLoading ? (
          <View
            style={{
              alignItems: "center",
              paddingVertical: layout.spacing.xl,
            }}
          >
            <Text
              style={{
                fontSize: typo.body2.fontSize,
                color: colors.text,
                ...typo.body2,
              }}
            >
              Loading profile...
            </Text>
          </View>
        ) : isProfileError || !profile?.conceivedDate ? (
          <View
            style={{
              alignItems: "center",
              paddingVertical: layout.spacing.xl,
              paddingHorizontal: layout.spacing.sm,
            }}
          >
            <Text
              style={{
                color: colors.text,
                textAlign: "center",
                fontSize: typo.body1.fontSize,
                ...typo.body1,
              }}
            >
              Unable to load pregnancy week. Please set your conception date in
              your profile or select a week manually.
            </Text>
            <Button
              mode="contained"
              onPress={handleWeekChange}
              style={{
                marginTop: layout.spacing.sm,
                backgroundColor: colors.primary,
                borderRadius: layout.borderRadius.medium,
              }}
              labelStyle={{
                fontSize: typo.body3.fontSize,
                fontWeight: "600",
                color: colors.textInverse,
                ...typo.body3,
              }}
              disabled={isActionQueued}
            >
              Select Week
            </Button>
          </View>
        ) : (
          <WeekHeader
            week={currentWeek}
            trimester={`${trimester} Trimester`}
            progress={progress}
          />
        )}
        <FilterTabs
          selectedFilter={activeCategory}
          onFilterChange={setActiveCategory}
          options={categories}
        />
        <View
          style={{
            paddingHorizontal: layout.spacing.sm,
            paddingBottom: layout.spacing.sm,
          }}
        >
          {isTipsLoading || isTipsFetching ? (
            <View
              style={{
                alignItems: "center",
                paddingVertical: layout.spacing.xl,
              }}
            >
              <Text
                style={{
                  fontSize: typo.body2.fontSize,
                  color: colors.text,
                  ...typo.body2,
                }}
              >
                Loading pregnancy tips...
              </Text>
            </View>
          ) : sortedTips.length === 0 ? (
            <View
              style={{
                alignItems: "center",
                paddingVertical: layout.spacing.xl,
                paddingHorizontal: layout.spacing.sm,
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  textAlign: "center",
                  fontSize: typo.body1.fontSize,
                  ...typo.body1,
                }}
              >
                No tips available for week {currentWeek}
              </Text>
            </View>
          ) : (
            sortedTips.map((tip) => <TipCard key={tip.tipId} tip={tip} />)
          )}
        </View>
        <View
          style={{
            padding: layout.spacing.sm,
            paddingBottom: layout.spacing.lg,
          }}
        >
          <Button
            mode="contained"
            onPress={handleLoadMore}
            style={{
              margin: layout.spacing.sm,
              backgroundColor: colors.primary,
              borderRadius: layout.borderRadius.medium,
            }}
            labelStyle={{
              fontSize: typo.body3.fontSize,
              fontWeight: "600",
              color: colors.textInverse,
              ...typo.body3,
            }}
            icon="plus"
            disabled={isActionQueued || isTipsLoading || isTipsFetching}
          >
            Load More
          </Button>
        </View>
      </ScrollView>

      <Portal>
        <Dialog
          visible={showWeekDialog}
          onDismiss={handleWeekCancel}
          style={{ backgroundColor: colors.card }}
        >
          <Dialog.Title
            style={{
              fontSize: typo.h5.fontSize,
              fontWeight: "600",
              color: colors.text,
              ...typo.h5,
            }}
          >
            Select Pregnancy Week
          </Dialog.Title>
          <Dialog.Content>
            <Text
              style={{
                fontSize: typo.body1.fontSize,
                color: colors.text,
                marginBottom: layout.spacing.sm,
                ...typo.body1,
              }}
            >
              Enter the current week of your pregnancy (1–40).
            </Text>
            <TextInput
              value={weekInput}
              onChangeText={setWeekInput}
              placeholder="Enter week (1–40)"
              keyboardType="numeric"
              style={{
                backgroundColor: colors.surface,
                borderRadius: layout.borderRadius.medium,
                padding: layout.spacing.sm,
                fontSize: typo.input.fontSize,
                ...typo.input,
              }}
              placeholderTextColor="rgba(17, 12, 9, 0.6)"
              disabled={isActionQueued}
            />
          </Dialog.Content>
          <Dialog.Actions style={{ paddingTop: layout.spacing.sm }}>
            <Button
              onPress={handleWeekCancel}
              textColor={colors.text}
              disabled={isActionQueued}
            >
              Cancel
            </Button>
            <Button
              onPress={handleWeekSubmit}
              buttonColor={colors.primary}
              mode="contained"
              style={{ borderRadius: layout.borderRadius.small }}
              disabled={isActionQueued}
            >
              Submit
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
}
