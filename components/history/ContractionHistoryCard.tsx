import React from "react";
import { View } from "react-native";
import { Text, Card } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@/lib/hooks/useTheme";

interface ContractionEntry {
  id: string;
  date: string;
  timeRange: string;
  duration: string;
  avgContraction: string;
  interval: string;
  notes: string;
}

interface ContractionHistoryCardProps {
  entry: ContractionEntry;
}

const ContractionHistoryCard: React.FC<ContractionHistoryCardProps> = ({
  entry,
}) => {
  const { colors, typo, layout } = useTheme();

  return (
    <Card
      style={{
        marginHorizontal: layout.spacing.sm,
        marginVertical: layout.spacing.xs,
        backgroundColor: colors.card,
        elevation: layout.elevation,
        borderRadius: layout.borderRadius.medium,
        shadowColor: colors.text,
        shadowOffset: layout.shadow.light.shadowOffset,
        shadowOpacity: layout.shadow.light.shadowOpacity,
        shadowRadius: layout.shadow.light.shadowRadius,
      }}
    >
      <Card.Content>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: layout.spacing.sm,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons
              name="calendar-today"
              size={16}
              color={colors.primary}
            />
            <Text
              style={{
                fontSize: typo.body2.fontSize,
                color: colors.text,
                marginLeft: layout.spacing.xs,
                fontWeight: "500",
                ...typo.body2,
              }}
            >
              {entry.date}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons
              name="access-time"
              size={16}
              color={colors.primary}
            />
            <Text
              style={{
                fontSize: typo.body2.fontSize,
                color: colors.text,
                marginLeft: layout.spacing.xs,
                fontWeight: "500",
                ...typo.body2,
              }}
            >
              {entry.timeRange}
            </Text>
          </View>
        </View>

        <View
          style={{
            marginBottom: layout.spacing.sm,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: layout.spacing.xs,
            }}
          >
            <Text
              style={{
                fontSize: typo.body2.fontSize,
                color: colors.text,
                fontWeight: "500",
                ...typo.body2,
              }}
            >
              Duration
            </Text>
            <Text
              style={{
                fontSize: typo.body2.fontSize,
                color: colors.primary,
                fontWeight: "600",
                ...typo.body2,
              }}
            >
              {entry.duration}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: layout.spacing.xs,
            }}
          >
            <Text
              style={{
                fontSize: typo.body2.fontSize,
                color: colors.text,
                fontWeight: "500",
                ...typo.body2,
              }}
            >
              Avg. Contraction
            </Text>
            <Text
              style={{
                fontSize: typo.body2.fontSize,
                color: colors.primary,
                fontWeight: "600",
                ...typo.body2,
              }}
            >
              {entry.avgContraction}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: layout.spacing.xs,
            }}
          >
            <Text
              style={{
                fontSize: typo.body2.fontSize,
                color: colors.text,
                fontWeight: "500",
                ...typo.body2,
              }}
            >
              Interval
            </Text>
            <Text
              style={{
                fontSize: typo.body2.fontSize,
                color: colors.primary,
                fontWeight: "600",
                ...typo.body2,
              }}
            >
              {entry.interval}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{
              fontSize: typo.body2.fontSize,
              color: colors.text,
              fontWeight: "500",
              ...typo.body2,
            }}
          >
            Notes:{" "}
          </Text>
          <Text
            style={{
              fontSize: typo.body2.fontSize,
              color: colors.text,
              flex: 1,
              marginLeft: layout.spacing.xs,
              ...typo.body2,
            }}
          >
            {entry.notes}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export default ContractionHistoryCard;
