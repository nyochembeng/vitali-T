import React from "react";
import { StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = "Search a vital sign...",
}) => {
  return (
    <Searchbar
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      style={styles.searchbar}
      inputStyle={styles.searchInput}
      iconColor="#9CA3AF"
    />
  );
};

const styles = StyleSheet.create({
  searchbar: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    elevation: 0,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  searchInput: {
    color: "#374151",
  },
});
