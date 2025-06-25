import React from "react";
import { View } from "react-native";
import { LineChart } from "react-native-chart-kit";
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

  const chartData = {
    labels: [], // Empty labels for detail chart
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
    backgroundGradientFrom: colors.card,
    backgroundGradientTo: colors.card,
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: () => color,
    strokeWidth: 2,
    fillShadowGradientFrom: color,
    fillShadowGradientFromOpacity: 0.3,
    fillShadowGradientTo: color,
    fillShadowGradientToOpacity: 0.05,
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
        overflow: "hidden",
        height,
        width,
      }}
    >
      <LineChart
        data={chartData}
        width={width}
        height={height}
        chartConfig={chartConfig}
        bezier
        withDots={false}
        withShadow={true}
        style={{
          marginLeft: -40,
          marginTop: -10,
        }}
      />
    </View>
  );
};

export default DetailChart;
