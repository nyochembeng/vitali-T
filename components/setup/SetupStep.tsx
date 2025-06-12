import React from "react";
import { ImageSourcePropType, View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@/lib/hooks/useTheme";

interface SetupStepProps {
  stepNumber: number;
  title: string;
  description?: string;
  instructions?: string[];
  image?: ImageSourcePropType;
}

const SetupStep: React.FC<SetupStepProps> = ({
  stepNumber,
  title,
  description,
  instructions,
  image,
}) => {
  const { colors, typo, layout } = useTheme();

  return (
    <View
      style={{
        marginBottom: layout.spacing.xl,
      }}
    >
      {/* Step Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: layout.spacing.sm,
        }}
      >
        <View
          style={{
            width: 28,
            height: 28,
            borderRadius: 14,
            backgroundColor: colors.primary,
            justifyContent: "center",
            alignItems: "center",
            marginRight: layout.spacing.sm,
          }}
        >
          <Text
            variant="titleMedium"
            style={{
              color: colors.textInverse,
              fontWeight: "700",
              fontSize: typo.body1.fontSize,
              ...typo.body1,
            }}
          >
            {stepNumber}
          </Text>
        </View>
        <Text
          variant="titleMedium"
          style={{
            color: colors.text,
            fontWeight: "600",
            flex: 1,
            ...typo.h6,
          }}
        >
          {title}
        </Text>
      </View>

      {/* Description */}
      {description && (
        <Text
          variant="bodyMedium"
          style={{
            color: "rgba(17, 12, 9, 0.6)",
            lineHeight: typo.body1.lineHeight,
            marginBottom: layout.spacing.sm,
            marginLeft: layout.spacing.lg,
            ...typo.body1,
          }}
        >
          {description}
        </Text>
      )}

      {/* Instructions List */}
      {instructions && (
        <View
          style={{
            marginLeft: layout.spacing.lg,
            marginBottom: layout.spacing.sm,
          }}
        >
          {instructions.map((instruction, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                marginBottom: layout.spacing.sm,
              }}
            >
              <MaterialIcons
                name="radio-button-unchecked"
                size={16}
                color={colors.primary}
                style={{
                  marginTop: layout.spacing.xs,
                  marginRight: layout.spacing.sm,
                }}
              />
              <Text
                variant="bodyMedium"
                style={{
                  color: "rgba(17, 12, 9, 0.6)",
                  lineHeight: typo.body1.lineHeight,
                  flex: 1,
                  ...typo.body1,
                }}
              >
                {instruction}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Image */}
      {/* <Image source={image} style={styles.image} resizeMode="cover" /> */}
    </View>
  );
};

export default SetupStep;
