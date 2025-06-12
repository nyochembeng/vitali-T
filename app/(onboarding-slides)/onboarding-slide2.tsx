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

export default function OnboardingSlide2() {
  const router = useRouter();
  const { colors, typo, layout, mode } = useTheme();

  const handleNext = () => {
    router.push("/onboarding-slide3");
  };

  const handlePrevious = () => {
    router.push("/onboarding-slide1");
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
      } else {
        // Swiped left - go to next screen
        runOnJS(handleNext)();
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
              marginTop: layout.spacing.xl,
              marginBottom: layout.spacing.xl,
            }}
          >
            <Image
              source={require("@/assets/images/pregnant-woman-2.jpg")}
              style={{
                width: width * 0.7,
                height: width * 0.7,
                borderRadius: (width * 0.7) / 2,
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
              {`Monitor Your Baby's Vital Signs`}
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
              Track fetal heart rate, maternal heart rate, blood pressure, and
              oxygen levels with ease.
            </Text>
          </View>

          {/* Page Indicator */}
          <PageIndicator currentPage={1} totalPages={3} />

          {/* Next Button */}
          <View
            style={{
              marginTop: "auto",
              marginBottom: layout.spacing.lg,
            }}
          >
            <Button
              mode="contained"
              onPress={handleNext}
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
              Next
            </Button>
          </View>
        </SafeAreaView>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}
