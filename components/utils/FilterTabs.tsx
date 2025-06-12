import React from "react";
import { ScrollView } from "react-native";
import { Chip } from "react-native-paper";
import { useTheme } from "@/lib/hooks/useTheme";

interface FilterTabsProps<T extends string> {
  selectedFilter: T;
  onFilterChange: (filter: T) => void;
  options: T[];
}

const FilterTabs = <T extends string>({
  selectedFilter,
  onFilterChange,
  options,
}: FilterTabsProps<T>) => {
  const { colors, typo, layout } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: layout.spacing.sm,
        paddingVertical: layout.spacing.xs,
        gap: layout.spacing.sm,
      }}
    >
      {options.map((filter) => (
        <Chip
          key={filter}
          mode={selectedFilter === filter ? "flat" : "outlined"}
          selected={selectedFilter === filter}
          onPress={() => onFilterChange(filter)}
          style={{
            marginRight: layout.spacing.sm,
            backgroundColor:
              selectedFilter === filter ? colors.primary : colors.surface,
            borderColor:
              selectedFilter === filter ? colors.primary : colors.border,
          }}
          textStyle={{
            ...typo.body2,
            color: selectedFilter === filter ? colors.textInverse : colors.text,
            fontWeight: selectedFilter === filter ? "600" : "400",
          }}
        >
          {filter}
        </Chip>
      ))}
    </ScrollView>
  );
};

export default FilterTabs;
