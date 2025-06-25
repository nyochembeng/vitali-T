import React from "react";
import { View } from "react-native";
import { LineChart } from "react-native-chart-kit";
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

  const chartData = {
    labels: [], // Empty labels for mini chart
    datasets: [
      {
        data: data.length > 0 ? data : [0],
        color: () => color,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: "transparent",
    backgroundGradientFrom: "transparent",
    backgroundGradientTo: "transparent",
    color: () => color,
    strokeWidth: 2,
    propsForDots: {
      r: "0", // Hide dots
    },
    propsForLabels: {
      fontSize: 0, // Hide labels
    },
    propsForVerticalLabels: {
      fontSize: 0, // Hide vertical labels
    },
    propsForHorizontalLabels: {
      fontSize: 0, // Hide horizontal labels
    },
    withHorizontalLines: false,
    withVerticalLines: false,
    withInnerLines: false,
    withOuterLines: false,
    withHorizontalLabels: false,
    withVerticalLabels: false,
  };

  return (
    <View
      style={{
        backgroundColor: colors.card,
        borderRadius: layout.borderRadius.medium,
        padding: layout.spacing.xs,
        width,
        height,
        overflow: "hidden",
      }}
    >
      <LineChart
        data={chartData}
        width={width - layout.spacing.xs * 2}
        height={height - layout.spacing.xs * 2}
        chartConfig={chartConfig}
        bezier
        withDots={false}
        withShadow={false}
        style={{
          marginLeft: -40,
          marginTop: -10,
        }}
      />
    </View>
  );
};

export default MiniChart;
