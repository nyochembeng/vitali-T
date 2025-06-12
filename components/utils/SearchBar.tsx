import React from "react";
import { Searchbar } from "react-native-paper";
import { useTheme } from "@/lib/hooks/useTheme";

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
  const { colors, typo, layout } = useTheme();

  return (
    <Searchbar
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      style={{
        backgroundColor: colors.card,
        borderRadius: layout.borderRadius.large,
        elevation: layout.elevation,
        marginHorizontal: layout.spacing.sm,
        marginVertical: layout.spacing.sm,
      }}
      inputStyle={{
        ...typo.body1,
        color: colors.text,
      }}
      iconColor={colors.text + "99"} // 60% opacity
    />
  );
};
