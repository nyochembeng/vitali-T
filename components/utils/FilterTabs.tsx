import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Chip } from "react-native-paper";

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
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {options.map((filter) => (
        <Chip
          key={filter}
          mode={selectedFilter === filter ? "flat" : "outlined"}
          selected={selectedFilter === filter}
          onPress={() => onFilterChange(filter)}
          style={[
            styles.chip,
            selectedFilter === filter && styles.selectedChip,
          ]}
          textStyle={[
            styles.chipText,
            selectedFilter === filter && styles.selectedChipText,
          ]}
        >
          {filter}
        </Chip>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  chip: {
    marginRight: 8,
    backgroundColor: "#f5f5f5",
    borderColor: "#e0e0e0",
  },
  selectedChip: {
    backgroundColor: "#8B4513", // Brown color from your design
    borderColor: "#8B4513",
  },
  chipText: {
    color: "#666",
    fontSize: 14,
  },
  selectedChipText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default FilterTabs;
