import { Link, Stack, useRouter } from "expo-router";
import { View, Pressable, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/lib/hooks/useTheme";

export default function NotFound() {
  const { colors, typo, layout } = useTheme();
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Page Not Found",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: layout.spacing.md,
          backgroundColor: colors.background,
        }}
      >
        {/* Animated Icon Container */}
        <View
          style={{
            width: layout.spacing.xl * 5, // 160px approximation
            height: layout.spacing.xl * 5,
            borderRadius: layout.borderRadius.xl * 2.5, // 80px approximation
            justifyContent: "center",
            alignItems: "center",
            marginBottom: layout.spacing.lg,
            backgroundColor: colors.primary + "10",
            borderColor: colors.primary + "20",
            borderWidth: 2,
          }}
        >
          <MaterialCommunityIcons
            name="map-marker-question-outline"
            size={80}
            color={colors.primary}
          />
        </View>

        {/* Error Code */}
        <Text
          style={{
            color: colors.primary,
            ...typo.h1,
            marginBottom: layout.spacing.sm,
            letterSpacing: -1,
          }}
        >
          404
        </Text>

        {/* Main Title */}
        <Text
          style={{
            color: colors.text,
            ...typo.h2,
            marginBottom: layout.spacing.sm,
            textAlign: "center",
          }}
        >
          Oops! Page Not Found
        </Text>

        {/* Subtitle */}
        <Text
          style={{
            color: colors.text,
            opacity: 0.7,
            ...typo.body1,
            textAlign: "center",
            lineHeight: typo.body1.lineHeight,
            marginBottom: layout.spacing.xl,
            paddingHorizontal: layout.spacing.sm,
          }}
        >
          {`The page you're looking for doesn't exist or has been moved.`}
        </Text>

        {/* Action Buttons */}
        <View
          style={{
            width: "100%",
            gap: layout.spacing.sm,
            marginBottom: layout.spacing.lg,
          }}
        >
          {/* Primary Button - Go Home */}
          <Link href="/" asChild>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: layout.spacing.md,
                paddingHorizontal: layout.spacing.md,
                elevation: layout.elevation,
                shadowColor: colors.border,
                shadowOffset: { width: 0, height: layout.spacing.xs },
                shadowOpacity: 0.1,
                shadowRadius: layout.spacing.sm,
                backgroundColor: colors.primary,
                borderRadius: layout.borderRadius.large,
              }}
              android_ripple={{ color: colors.background + "20" }}
            >
              <MaterialCommunityIcons
                name="home"
                size={20}
                color={colors.background}
                style={{ marginRight: layout.spacing.sm }}
              />
              <Text
                style={{
                  color: colors.background,
                  ...typo.button,
                }}
              >
                Go to Home
              </Text>
            </Pressable>
          </Link>

          {/* Secondary Button - Go Back */}
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: layout.spacing.md,
              paddingHorizontal: layout.spacing.md,
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: colors.card,
              borderRadius: layout.borderRadius.large,
            }}
            onPress={handleGoBack}
            android_ripple={{ color: colors.primary + "10" }}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={20}
              color={colors.text}
              style={{ marginRight: layout.spacing.sm }}
            />
            <Text
              style={{
                color: colors.text,
                ...typo.button,
              }}
            >
              Go Back
            </Text>
          </Pressable>
        </View>

        {/* Help Text */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: layout.spacing.sm,
            paddingHorizontal: layout.spacing.sm,
          }}
        >
          <MaterialCommunityIcons
            name="information-outline"
            size={16}
            color={colors.text}
            style={{ opacity: 0.5 }}
          />
          <Text
            style={{
              color: colors.text,
              opacity: 0.5,
              ...typo.caption,
              textAlign: "center",
              flex: 1,
            }}
          >
            If you believe this is an error, please contact support
          </Text>
        </View>
      </View>
    </>
  );
}
