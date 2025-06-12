import PageIndicator from "@/components/utils/PageIndicator";
import { useTheme } from "@/lib/hooks/useTheme";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Dimensions, Image, View } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import { Button, Text } from "react-native-paper";
import { runOnJS } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function OnboardingSlide3() {
  const router = useRouter();
  const { colors, typo, layout, mode } = useTheme();

  const handleGetStarted = () => {
    router.push("/auth/login");
  };

  const handlePrevious = () => {
    router.push("/onboarding-slide2");
  };

  const onSwipeGesture = (event: any) => {
    const { translationX, velocityX } = event.nativeEvent;

    // Minimum swipe distance and velocity thresholds
    const SWIPE_THRESHOLD = 50;
    const VELOCITY_THRESHOLD = 500;

    // Check if swipe is significant enough
    if (
      Math.abs(translationX) > SWIPE_THRESHOLD ||
      Math.abs(velocityX) > VELOCITY_THRESHOLD
    ) {
      if (translationX > 0) {
        // Swiped right - go to previous screen
        runOnJS(handlePrevious)();
      }
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={onSwipeGesture}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: colors.background,
            padding: layout.spacing.lg,
          }}
        >
          <StatusBar style={mode === "dark" ? "light" : "dark"} />

          {/* Hero Image */}
          <View
            style={{
              alignItems: "center",
              marginBottom: layout.spacing.lg,
            }}
          >
            <Image
              source={require("@/assets/images/device-connection.jpg")}
              style={{
                width: width * 0.6,
                height: width * 0.6,
                borderRadius: (width * 0.6) / 2,
              }}
              resizeMode="cover"
            />
          </View>

          {/* Content */}
          <View
            style={{
              alignItems: "center",
              marginBottom: layout.spacing.lg,
              paddingHorizontal: layout.spacing.sm,
            }}
          >
            <Text
              variant="headlineMedium"
              style={[
                {
                  textAlign: "center",
                  marginBottom: layout.spacing.md,
                  lineHeight: typo.h3.lineHeight,
                },
                typo.h3,
              ]}
            >
              Get Started in Minutes
            </Text>
            <Text
              variant="bodyLarge"
              style={[
                {
                  textAlign: "center",
                  lineHeight: typo.body1.lineHeight,
                  color: "rgba(17, 12, 9, 0.6)", // Adjusted for lighter text
                },
                typo.body1,
              ]}
            >
              Connect your Vitali-T device and start tracking for peace of mind.
            </Text>
          </View>

          {/* Page Indicator */}
          <PageIndicator currentPage={2} totalPages={3} />

          {/* Get Started Button */}
          <View
            style={{
              marginTop: "auto",
              marginBottom: layout.spacing.lg,
            }}
          >
            <Button
              mode="contained"
              onPress={handleGetStarted}
              style={{
                backgroundColor: colors.primary,
                borderRadius: layout.borderRadius.large,
                height: 50,
              }}
              contentStyle={{
                height: 50,
              }}
              labelStyle={{
                fontSize: typo.button.fontSize,
                fontWeight: "600",
                color: colors.textInverse,
              }}
            >
              Get Started
            </Button>
          </View>
        </SafeAreaView>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}
