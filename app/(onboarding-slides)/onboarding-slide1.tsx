import FeatureCard from "@/components/onboarding-slides/FeatureCard";
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

export default function OnboardingSlide1() {
  const router = useRouter();
  const { colors, typo, layout, mode } = useTheme();

  const features = [
    {
      icon: "heart-outline",
      title: "Maternal & Fetal Vitals",
    },
    {
      icon: "calendar-outline",
      title: "Pregnancy Timeline",
    },
    {
      icon: "medical-bag",
      title: "Medical Support",
    },
  ];

  const handleNext = () => {
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
      if (translationX < 0) {
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

          {/* Header */}
          <View
            style={{
              alignItems: "center",
              marginTop: layout.spacing.sm,
              marginBottom: layout.spacing.lg,
            }}
          >
            <Text
              variant="headlineMedium"
              style={[
                {
                  textAlign: "center",
                  marginBottom: layout.spacing.sm,
                },
                typo.h2,
              ]}
            >
              Welcome to Vitali-T
            </Text>
            <Text
              variant="bodyLarge"
              style={[
                {
                  textAlign: "center",
                  lineHeight: typo.body1.lineHeight,
                  color: "rgba(17, 12, 9, 0.6)",
                },
                typo.body1,
              ]}
            >
              Peace of Mind, Every Beat of the Way
            </Text>
          </View>

          {/* Hero Image */}
          <View
            style={{
              alignItems: "center",
              marginBottom: layout.spacing.lg,
            }}
          >
            <Image
              source={require("@/assets/images/pregnant-woman.jpg")}
              style={{
                width: width * 0.6,
                height: width * 0.6,
                borderRadius: (width * 0.6) / 2,
              }}
              resizeMode="cover"
            />
          </View>

          {/* Features */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: layout.spacing.lg,
              paddingHorizontal: layout.spacing.sm,
            }}
          >
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
              />
            ))}
          </View>

          {/* Page Indicator */}
          <PageIndicator currentPage={0} totalPages={3} />

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
