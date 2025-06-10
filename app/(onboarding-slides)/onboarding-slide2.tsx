import React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import { Text, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import PageIndicator from "@/components/utils/PageIndicator";

const { width } = Dimensions.get("window");

export default function OnboardingSlide2() {
  const router = useRouter();

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
              {`Monitor Your Baby's Vital Signs`}
            </Text>
            <Text variant="bodyLarge" style={styles.description}>
              Track fetal heart rate, maternal heart rate, blood pressure, and
              oxygen levels with ease.
            </Text>
          </View>

          {/* Page Indicator */}
          <PageIndicator currentPage={1} totalPages={3} />

          {/* Next Button */}
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleNext}
              style={styles.nextButton}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
            >
              Next
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
    marginTop: 60,
    marginBottom: 60,
  },
  heroImage: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: (width * 0.7) / 2,
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
  nextButton: {
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
