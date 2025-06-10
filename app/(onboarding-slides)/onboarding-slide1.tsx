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
import FeatureCard from "@/components/onboarding-slides/FeatureCard";
import PageIndicator from "@/components/utils/PageIndicator";

const { width } = Dimensions.get("window");

export default function OnboardingSlide1() {
  const router = useRouter();

  const features = [
    {
      icon: "heart-outline",
      title: "Heart Rate Monitoring",
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
        <SafeAreaView style={styles.container}>
          <StatusBar style="dark" />

          {/* Header */}
          <View style={styles.header}>
            <Text variant="headlineMedium" style={styles.title}>
              Welcome to Vitali-T
            </Text>
            <Text variant="bodyLarge" style={styles.subtitle}>
              Peace of Mind, Every Beat of the Way.
            </Text>
          </View>

          {/* Hero Image */}
          <View style={styles.imageContainer}>
            {/* <Image
              source={require("../assets/images/pregnant-woman.jpg")} // Replace with your image
              style={styles.heroImage}
              resizeMode="cover"
            /> */}
          </View>

          {/* Features */}
          <View style={styles.featuresContainer}>
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
  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  title: {
    fontWeight: "600",
    color: "#2C2C2C",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    color: "#666666",
    textAlign: "center",
    lineHeight: 24,
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
  featuresContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 40,
    paddingHorizontal: 10,
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
