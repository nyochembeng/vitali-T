import React from "react";
import { View } from "react-native";
import { useTheme } from "@/lib/hooks/useTheme";

interface PageIndicatorProps {
  currentPage: number;
  totalPages: number;
}

const PageIndicator: React.FC<PageIndicatorProps> = ({
  currentPage,
  totalPages,
}) => {
  const { colors, layout } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: layout.spacing.md,
      }}
    >
      {Array.from({ length: totalPages }, (_, index) => (
        <View
          key={index}
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            marginHorizontal: layout.spacing.xs,
            backgroundColor:
              index === currentPage ? colors.primary : colors.border,
          }}
        />
      ))}
    </View>
  );
};

export default PageIndicator;
