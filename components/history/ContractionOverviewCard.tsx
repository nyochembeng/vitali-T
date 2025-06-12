import React from "react";
import { View } from "react-native";
import { Text, Card } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@/lib/hooks/useTheme";

interface ContractionOverview {
  averageInterval: string;
  totalContractions: number;
}

interface ContractionOverviewCardProps {
  overview: ContractionOverview;
}

const ContractionOverviewCard: React.FC<ContractionOverviewCardProps> = ({
  overview,
}) => {
  const { colors, typo, layout } = useTheme();

  return (
    <Card
      style={{
        marginHorizontal: layout.spacing.sm,
        marginVertical: layout.spacing.xs,
        backgroundColor: colors.surface,
        elevation: 0,
        borderRadius: layout.borderRadius.medium,
        padding: layout.spacing.md,
      }}
    >
      <Card.Content>
        <View
          style={{
            marginBottom: layout.spacing.xs,
            flexDirection: "row",
            gap: 8,
          }}
        >
          <Text
            style={{
              fontSize: typo.h6.fontSize,
              fontWeight: "600",
              color: colors.text,
              marginBottom: layout.spacing.sm,
              ...typo.h6,
            }}
          >
            {`Today's Overview`}
          </Text>
          <MaterialIcons name="timeline" size={20} color={colors.primary} />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: typo.caption.fontSize,
                color: colors.text,
                marginBottom: layout.spacing.xs,
                ...typo.caption,
              }}
            >
              Average Interval
            </Text>
            <Text
              style={{
                fontSize: typo.h5.fontSize,
                fontWeight: "600",
                color: colors.primary,
                ...typo.h5,
              }}
            >
              {overview.averageInterval}
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: typo.caption.fontSize,
                color: colors.text,
                marginBottom: layout.spacing.xs,
                ...typo.caption,
              }}
            >
              Total Contractions
            </Text>
            <Text
              style={{
                fontSize: typo.h5.fontSize,
                fontWeight: "600",
                color: colors.primary,
                ...typo.h5,
              }}
            >
              {overview.totalContractions}
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default ContractionOverviewCard;
