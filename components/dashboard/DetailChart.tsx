import React from "react";
import { View } from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
import { useTheme } from "@/lib/hooks/useTheme";

interface DetailChartProps {
  data: number[];
  color: string;
  height?: number;
  width?: number;
}

const DetailChart: React.FC<DetailChartProps> = ({
  data,
  color,
  height = 60,
  width = 300,
}) => {
  const { colors, layout } = useTheme();

  const generatePath = () => {
    if (data.length < 2) return { linePath: "", fillPath: "" };

    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    let path = "";
    let fillPath = "";

    data.forEach((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * (height - 10) - 5;

      if (index === 0) {
        path += `M ${x} ${y}`;
        fillPath += `M ${x} ${height} L ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
        fillPath += ` L ${x} ${y}`;
      }
    });

    fillPath += ` L ${width} ${height} Z`;

    return { linePath: path, fillPath };
  };

  const { linePath, fillPath } = generatePath();

  return (
    <View
      style={{
        backgroundColor: colors.card,
        borderRadius: layout.borderRadius.medium,
        overflow: "hidden",
        height,
      }}
    >
      <Svg width="100%" height={height}>
        <Defs>
          <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <Stop offset="100%" stopColor={color} stopOpacity="0.05" />
          </LinearGradient>
        </Defs>
        <Path d={fillPath} fill="url(#gradient)" />
        <Path
          d={linePath}
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

export default DetailChart;
