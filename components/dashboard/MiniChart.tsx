import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@/lib/hooks/useTheme";

interface MiniChartProps {
  data: number[];
  color: string;
  width?: number;
  height?: number;
}

const MiniChart: React.FC<MiniChartProps> = ({
  data,
  color,
  width = 120,
  height = 30,
}) => {
  const { colors, layout } = useTheme();

  const generatePath = () => {
    if (data.length < 2) return "";

    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    let path = "";
    data.forEach((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;

      if (index === 0) {
        path += `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    });

    return path;
  };

  return (
    <View
      style={{
        backgroundColor: colors.card,
        borderRadius: layout.borderRadius.medium,
        padding: layout.spacing.xs,
        width,
        height,
      }}
    >
      <Svg width={width} height={height}>
        <Path
          d={generatePath()}
          stroke={color}
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

export default MiniChart;
