import SetupStep from "@/components/setup/SetupStep";
import { useTheme } from "@/lib/hooks/useTheme";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import PagerView from "react-native-pager-view";
import { Button, Checkbox, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function GettingStartedScreen() {
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [currentSuccessPage, setCurrentSuccessPage] = useState(0);
  const router = useRouter();
  const { colors, typo, layout, mode } = useTheme();
  const pagerRef = useRef<PagerView>(null);

  const handleComplete = () => {
    if (dontShowAgain) {
      // Save preference to not show this screen again
      console.log("User opted to not show this screen again");
    }
    router.push("/dashboard");
  };

  const setupSteps = [
    {
      stepNumber: 1,
      title: "Open Your Dashboard",
      description:
        'After creating your account, you\'ll land on your dashboard. Tap the "Start Recording" button to begin.',
      image: require("@/assets/images/dashboard-setup.png"),
    },
    {
      stepNumber: 2,
      title: "Connect to Your Device",
      instructions: [
        "Turn on Bluetooth on your mobile phone",
        "Power on the Vitali-T device",
        "Search for and select the device in the app",
      ],
      image: require("@/assets/images/device-connection.jpg"),
    },
    {
      stepNumber: 3,
      title: "Monitor Maternal Heart Rate",
      instructions: [
        "Attach the ECG sensor cathodes on your chest as shown",
        "Once connected, MHR data streams live to your phone",
      ],
      image: require("@/assets/images/ecg-sensor.jpg"),
    },
  ];

  const successCards = [
    {
      icon: "check",
      title: "You're All Set!",
      description:
        "You're ready to start tracking your vitals regularly. Visit the dashboard anytime to begin new recordings.",
      image: require("@/assets/images/success-woman.jpg"),
    },
    {
      icon: "favorite",
      title: "Monitor Your Health",
      description:
        "Track your vital signs consistently for better health insights. Your data helps you and your healthcare provider make informed decisions.",
      image: require("@/assets/images/success-woman-2.jpg"),
    },
    {
      icon: "timeline",
      title: "View Your Progress",
      description:
        "Access detailed reports and trends of your vital signs. Share your health data with your doctor for comprehensive care.",
      image: require("@/assets/images/success-woman-3.jpg"),
    },
  ];

  // Auto-swipe functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSuccessPage((prev) => {
        const nextPage = (prev + 1) % successCards.length;
        pagerRef.current?.setPage(nextPage);
        return nextPage;
      });
    }, 5000); // Auto-swipe every 5 seconds

    return () => clearInterval(interval);
  }, [successCards.length]);

  const handlePageSelected = (e: any) => {
    setCurrentSuccessPage(e.nativeEvent.position);
  };

  const renderSuccessCard = (card: (typeof successCards)[0], index: number) => (
    <View
      key={index}
      style={{
        alignItems: "center",
        backgroundColor: colors.card,
        borderRadius: layout.borderRadius.large,
        padding: layout.spacing.lg,
        marginHorizontal: layout.spacing.sm,
        shadowColor: colors.text,
        shadowOffset: layout.shadow.light.shadowOffset,
        shadowOpacity: layout.shadow.light.shadowOpacity,
        shadowRadius: layout.shadow.light.shadowRadius,
        elevation: layout.elevation,
      }}
    >
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: layout.borderRadius.full,
          backgroundColor: colors.accent,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: layout.spacing.sm,
        }}
      >
        <MaterialIcons
          name={card.icon as any}
          size={32}
          color={colors.textInverse}
        />
      </View>

      <Text
        variant="titleLarge"
        style={{
          color: colors.text,
          fontWeight: "700",
          marginBottom: layout.spacing.sm,
          textAlign: "center",
          ...typo.h3,
        }}
      >
        {card.title}
      </Text>

      <Text
        variant="bodyMedium"
        style={{
          color: colors.text,
          opacity: 0.7,
          textAlign: "center",
          lineHeight: typo.body1.lineHeight,
          marginBottom: layout.spacing.sm,
          ...typo.body1,
        }}
      >
        {card.description}
      </Text>

      <View
        style={{
          width: width * 0.6,
          height: 120,
          borderRadius: layout.borderRadius.medium,
          overflow: "hidden",
          backgroundColor: colors.border,
          shadowColor: colors.text,
          shadowOffset: layout.shadow.light.shadowOffset,
          shadowOpacity: layout.shadow.light.shadowOpacity,
          shadowRadius: layout.shadow.light.shadowRadius,
          elevation: 2,
        }}
      >
        <Image
          source={card.image}
          style={{
            width: "100%",
            height: "100%",
          }}
          contentFit="cover"
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <StatusBar style={mode === "dark" ? "light" : "dark"} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: layout.spacing.lg,
          paddingBottom: layout.spacing.md,
        }}
      >
        {/* Header */}
        <View
          style={{
            marginTop: layout.spacing.sm,
            marginBottom: layout.spacing.xl,
          }}
        >
          <Text
            variant="headlineSmall"
            style={{
              fontWeight: "700",
              color: colors.text,
              textAlign: "center",
              marginBottom: layout.spacing.sm,
              ...typo.h4,
            }}
          >
            Getting Started with Vitali-T
          </Text>
          <Text
            variant="bodyMedium"
            style={{
              color: colors.text,
              opacity: 0.7,
              textAlign: "center",
              lineHeight: typo.body1.lineHeight,
              ...typo.body1,
            }}
          >
            {`Welcome! Let's walk you through how to record and monitor your vital signs using Vitali-T.`}
          </Text>
        </View>

        {/* Setup Steps */}
        {setupSteps.map((step, index) => (
          <SetupStep
            key={index}
            stepNumber={step.stepNumber}
            title={step.title}
            description={step.description}
            instructions={step.instructions}
            image={step.image}
          />
        ))}

        {/* Advanced Monitoring Section */}
        <View
          style={{
            marginTop: layout.spacing.xl,
            marginBottom: layout.spacing.xl,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: layout.spacing.sm,
            }}
          >
            <MaterialIcons name="devices" size={24} color={colors.primary} />
            <Text
              variant="titleMedium"
              style={{
                color: colors.text,
                fontWeight: "600",
                marginLeft: layout.spacing.sm,
                ...typo.h6,
              }}
            >
              Advanced Monitoring
            </Text>
          </View>

          <View
            style={{
              borderRadius: layout.borderRadius.medium,
              overflow: "hidden",
              backgroundColor: colors.border,
              shadowColor: colors.text,
              shadowOffset: layout.shadow.light.shadowOffset,
              shadowOpacity: layout.shadow.light.shadowOpacity,
              shadowRadius: layout.shadow.light.shadowRadius,
              elevation: layout.elevation,
              marginBottom: layout.spacing.sm,
            }}
          >
            <Image
              source={require("@/assets/images/pregnancy.jpg")}
              style={{
                width: "100%",
                height: 120,
              }}
              contentFit="cover"
            />
          </View>

          <Text
            variant="bodyMedium"
            style={{
              color: colors.text,
              opacity: 0.7,
              textAlign: "center",
              lineHeight: typo.body1.lineHeight,
              ...typo.body1,
            }}
          >
            Each vital sign has unique setup steps. View full tutorials for FHR,
            BP, SpO₂, and more.
          </Text>
        </View>

        {/* Success Section - Swipable Cards */}
        <View
          style={{
            marginTop: layout.spacing.sm,
            marginBottom: layout.spacing.lg,
          }}
        >
          <PagerView
            ref={pagerRef}
            style={{
              height: 320,
            }}
            initialPage={0}
            onPageSelected={handlePageSelected}
          >
            {successCards.map((card, index) => (
              <View key={index}>{renderSuccessCard(card, index)}</View>
            ))}
          </PagerView>

          {/* Success Cards Page Indicator */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: layout.spacing.md,
            }}
          >
            {successCards.map((_, index) => (
              <View
                key={index}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor:
                    currentSuccessPage === index
                      ? colors.primary
                      : colors.border,
                  marginHorizontal: 4,
                }}
              />
            ))}
          </View>
        </View>

        {/* Don't Show Again Checkbox */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginVertical: layout.spacing.sm,
          }}
        >
          <Checkbox
            status={dontShowAgain ? "checked" : "unchecked"}
            onPress={() => setDontShowAgain(!dontShowAgain)}
            color={colors.primary}
          />
          <Text
            variant="bodyMedium"
            style={{
              color: colors.text,
              opacity: 0.7,
              marginLeft: layout.spacing.sm,
              ...typo.body1,
            }}
          >
            {`Don't show this again`}
          </Text>
        </View>

        {/* Complete Button */}
        <View
          style={{
            marginTop: layout.spacing.sm,
          }}
        >
          <Button
            mode="contained"
            onPress={handleComplete}
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
              ...typo.button,
            }}
          >
            Got It - Take me to Dashboard
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
