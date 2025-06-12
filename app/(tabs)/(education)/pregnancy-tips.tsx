import { TipCard } from "@/components/education/TipCard";
import { WeekHeader } from "@/components/education/WeekHeader";
import CustomAppBar from "@/components/utils/CustomAppBar";
import FilterTabs from "@/components/utils/FilterTabs";
import React, { useState, useMemo } from "react";
import { View, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/lib/hooks/useTheme";

interface Tip {
  id: string;
  category: "development" | "nutrition" | "exercise" | "wellness";
  title: string;
  description: string;
  week: number;
  icon: string;
}

const mockTips: Tip[] = [
  {
    id: "1",
    category: "development",
    title: "Baby's Development",
    description:
      "Your baby is now the size of an ear of corn. The inner ear is now developed enough for your baby to start hearing sounds.",
    week: 24,
    icon: "child-care",
  },
  {
    id: "2",
    category: "nutrition",
    title: "Nutrition Tips",
    description:
      "Include more iron-rich foods in your diet to support your baby's growth. Foods like spinach, lentils, and lean meats are excellent choices.",
    week: 24,
    icon: "restaurant",
  },
  {
    id: "3",
    category: "exercise",
    title: "Exercise Guide",
    description:
      "Try gentle prenatal yoga to help with flexibility and relaxation. Remember to stay hydrated and listen to your body.",
    week: 24,
    icon: "fitness-center",
  },
  {
    id: "4",
    category: "wellness",
    title: "Wellness Focus",
    description:
      "Take time for yourself. Practice deep breathing or meditation to help manage pregnancy-related stress and anxiety.",
    week: 24,
    icon: "favorite",
  },
];

export default function PregnancyTipsScreen() {
  const [activeCategory, setActiveCategory] = useState<string>("All Tips");
  const { colors, layout } = useTheme();

  const categories = [
    "All Tips",
    "Development",
    "Nutrition",
    "Exercise",
    "Wellness",
  ];

  const filteredTips = useMemo(() => {
    if (activeCategory === "All Tips") return mockTips;
    return mockTips.filter(
      (tip) => tip.category === activeCategory.toLowerCase()
    );
  }, [activeCategory]);

  const handleLoadMore = () => {
    console.log("Load more tips");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <CustomAppBar title="Pregnancy Tips" rightAction="notifications" />

      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: layout.spacing.lg,
          paddingTop: layout.spacing.sm,
        }}
        contentContainerStyle={{
          paddingBottom: layout.spacing.xxl,
        }}
        showsVerticalScrollIndicator={false}
      >
        <WeekHeader week={24} trimester="Second Trimester" progress={0.6} />

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
          {filteredTips.map((tip) => (
            <TipCard key={tip.id} tip={tip} />
          ))}
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
            }}
            icon="plus"
          >
            Load More
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
