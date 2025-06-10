import React from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import { Text, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import PageIndicator from "@/components/utils/PageIndicator";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function OnboardingSlide3() {
  const router = useRouter();

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
        <SafeAreaView style={styles.container}>
          <StatusBar style="dark" />

          {/* Hero Image */}
          <View style={styles.imageContainer}>
            {/* <Image
              source={require("../assets/images/pregnant-woman-2.jpg")} // Replace with your image
              style={styles.heroImage}
              resizeMode="cover"
            /> */}
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text variant="headlineMedium" style={styles.title}>
              Get Started in Minutes
            </Text>
            <Text variant="bodyLarge" style={styles.description}>
              Connect your Vitali-T device and start tracking for peace of mind.
            </Text>
          </View>

          {/* Page Indicator */}
          <PageIndicator currentPage={2} totalPages={3} />

          {/* Get Started Button */}
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleGetStarted}
              style={styles.getStartedButton}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
            >
              Get Started
            </Button>
          </View>
        </SafeAreaView>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 24,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  heroImage: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: (width * 0.6) / 2,
  },
  content: {
    alignItems: "center",
    marginBottom: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: "700",
    color: "#2C2C2C",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 36,
  },
  description: {
    color: "#666666",
    textAlign: "center",
    lineHeight: 24,
  },
  buttonContainer: {
    marginTop: "auto",
    marginBottom: 30,
  },
  getStartedButton: {
    backgroundColor: "#A67B5B",
    borderRadius: 25,
    height: 50,
  },
  buttonContent: {
    height: 50,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
