import React, { useState, useEffect } from "react";
import { View, ScrollView, Alert, Pressable } from "react-native";
import { Text, Button, TextInput, Card, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useRouter } from "expo-router";
import { useTheme } from "@/lib/hooks/useTheme";

// Types
interface FetalMovementSession {
  kickCount: number;
  sessionDuration: string;
  notes: string;
  startTime: Date | null;
}

// Components
const HeroImage: React.FC = () => {
  const { layout } = useTheme();

  return (
    <View
      style={{
        marginBottom: layout.spacing.lg,
        borderRadius: layout.borderRadius.medium,
        overflow: "hidden",
      }}
    >
      {/* <Image
        source={require('./assets/fetal-movement-hero.jpg')} // Replace with your image
        style={{ width: "100%", height: layout.spacing.xxl * 10 }}
        contentFit="cover"
      /> */}
    </View>
  );
};

const KickCounter: React.FC<{
  count: number;
  onPress: () => void;
  isActive: boolean;
}> = ({ count, onPress, isActive }) => {
  const { colors, typo, layout } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={!isActive}
      style={[
        {
          alignItems: "center",
          marginBottom: layout.spacing.lg,
        },
        !isActive && { opacity: 0.6 },
      ]}
    >
      <View
        style={{
          width: layout.spacing.xl * 5,
          height: layout.spacing.xl * 5,
          borderRadius: layout.borderRadius.full,
          backgroundColor: colors.primaryLight,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: typo.h1.fontSize,
            fontWeight: "700",
            color: colors.text,
            marginBottom: layout.spacing.xs,
            ...typo.h1,
          }}
        >
          {count}
        </Text>
        <Text
          style={{
            fontSize: typo.body2.fontSize,
            color: colors.text,
            fontWeight: "500",
            ...typo.body2,
          }}
        >
          Kicks Counted
        </Text>
      </View>
    </Pressable>
  );
};

const SessionStatus: React.FC<{
  isActive: boolean;
  duration: string;
  onToggle: () => void;
}> = ({ isActive, duration, onToggle }) => {
  const { colors, typo, layout } = useTheme();

  return (
    <View
      style={{
        alignItems: "center",
        marginBottom: layout.spacing.lg,
      }}
    >
      <Button
        mode="contained"
        onPress={onToggle}
        style={{
          backgroundColor: colors.primary,
          borderRadius: layout.borderRadius.large,
          paddingHorizontal: layout.spacing.lg,
          paddingVertical: layout.spacing.xs,
          marginBottom: layout.spacing.sm,
        }}
        labelStyle={{
          fontSize: typo.button.fontSize,
          fontWeight: "600",
          color: colors.textInverse,
          ...typo.button,
        }}
      >
        {isActive ? "Stop Counting" : "Start Counting"}
      </Button>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <IconButton
          icon="clock-outline"
          size={16}
          iconColor={colors.text}
        />
        <Text
          style={{
            fontSize: typo.body2.fontSize,
            color: colors.text,
            marginLeft: layout.spacing.xs,
            ...typo.body2,
          }}
        >
          Session Duration: {duration}
        </Text>
      </View>
    </View>
  );
};

const NotesSection: React.FC<{
  notes: string;
  onChangeNotes: (text: string) => void;
}> = ({ notes, onChangeNotes }) => {
  const { colors, typo, layout } = useTheme();

  return (
    <View
      style={{
        marginBottom: layout.spacing.lg,
      }}
    >
      <Text
        style={{
          fontSize: typo.body1.fontSize,
          fontWeight: "500",
          marginBottom: layout.spacing.sm,
          color: colors.text,
          ...typo.body1,
        }}
      >
        Add any notes (optional)
      </Text>
      <TextInput
        value={notes}
        onChangeText={onChangeNotes}
        placeholder="How are you feeling? Any patterns noticed?"
        multiline
        numberOfLines={4}
        style={{
          backgroundColor: colors.surface,
          minHeight: layout.spacing.xl * 4,
        }}
        mode="outlined"
        outlineColor={colors.border}
        activeOutlineColor={colors.primary}
      />
    </View>
  );
};

const TipCard: React.FC = () => {
  const { colors, typo, layout } = useTheme();

  return (
    <Card
      style={{
        backgroundColor: colors.card,
        elevation: 0,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: layout.borderRadius.medium,
      }}
    >
      <Card.Content
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          paddingVertical: layout.spacing.sm,
        }}
      >
        <IconButton
          icon="lightbulb-outline"
          size={20}
          iconColor={colors.primary}
        />
        <Text
          style={{
            flex: 1,
            fontSize: typo.body2.fontSize,
            color: colors.text,
            marginLeft: layout.spacing.sm,
            lineHeight: typo.body2.lineHeight,
            ...typo.body2,
          }}
        >
          <Text
            style={{
              fontWeight: "600",
              color: colors.primary,
              ...typo.body2,
            }}
          >
            Tip:
          </Text>{" "}
          Best time to count is when baby is usually active. Try to count for at
          least 2 hours.
        </Text>
      </Card.Content>
    </Card>
  );
};

// Main Screen Component
export default function LogFetalMovementScreen() {
  const router = useRouter();
  const { colors, typo, layout } = useTheme();
  const [session, setSession] = useState<FetalMovementSession>({
    kickCount: 0,
    sessionDuration: "00:00",
    notes: "",
    startTime: null,
  });
  const [isSessionActive, setIsSessionActive] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval: number | undefined;

    if (isSessionActive && session.startTime) {
      interval = setInterval(() => {
        const now = new Date();
        const diff = Math.floor(
          (now.getTime() - session.startTime!.getTime()) / 1000
        );
        const mins = Math.floor(diff / 60);
        const secs = diff % 60;

        setSession((prev) => ({
          ...prev,
          sessionDuration: `${mins.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`,
        }));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isSessionActive, session.startTime]);

  const handleToggleSession = () => {
    if (isSessionActive) {
      // Stop session
      setIsSessionActive(false);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } else {
      // Start session
      setIsSessionActive(true);
      setSession((prev) => ({
        ...prev,
        startTime: new Date(),
        kickCount: 0,
        sessionDuration: "00:00",
      }));
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleKickCount = () => {
    if (!isSessionActive) return;

    setSession((prev) => ({
      ...prev,
      kickCount: prev.kickCount + 1,
    }));

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const handleSaveSession = () => {
    if (session.kickCount === 0) {
      Alert.alert("No Movements", "Please count some movements before saving.");
      return;
    }

    // Save logic here
    Alert.alert("Success", "Fetal movement session saved successfully!");

    // Reset session
    setSession({
      kickCount: 0,
      sessionDuration: "00:00",
      notes: "",
      startTime: null,
    });
    setIsSessionActive(false);

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const updateNotes = (text: string) => {
    setSession((prev) => ({
      ...prev,
      notes: text,
    }));
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <CustomAppBar
        title="Log Fetal Movements"
        rightAction="info"
        onInfoPress={() => {
          router.push("/vital-signs-education");
        }}
      />

      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          padding: layout.spacing.lg,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <HeroImage />

          <KickCounter
            count={session.kickCount}
            onPress={handleKickCount}
            isActive={isSessionActive}
          />

          <SessionStatus
            isActive={isSessionActive}
            duration={session.sessionDuration}
            onToggle={handleToggleSession}
          />

          <NotesSection notes={session.notes} onChangeNotes={updateNotes} />

          <Button
            mode="outlined"
            onPress={handleSaveSession}
            style={{
              borderColor: colors.primary,
              borderRadius: layout.borderRadius.medium,
              paddingVertical: layout.spacing.xs,
              marginBottom: layout.spacing.lg,
            }}
            labelStyle={{
              fontSize: typo.button.fontSize,
              fontWeight: "600",
              color: colors.primary,
              ...typo.button,
            }}
            icon="content-save"
          >
            Save Session
          </Button>

          <TipCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}