import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert, Pressable } from "react-native";
import { Text, Button, TextInput, Card, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useRouter } from "expo-router";

// Types
interface FetalMovementSession {
  kickCount: number;
  sessionDuration: string;
  notes: string;
  startTime: Date | null;
}

// Components
const HeroImage: React.FC = () => (
  <View style={styles.heroContainer}>
    {/* <Image
      source={require('./assets/fetal-movement-hero.jpg')} // You'll need to add this image
      style={styles.heroImage}
      contentFit="cover"
    /> */}
  </View>
);

const KickCounter: React.FC<{
  count: number;
  onPress: () => void;
  isActive: boolean;
}> = ({ count, onPress, isActive }) => (
  <Pressable
    onPress={onPress}
    disabled={!isActive}
    style={[styles.counterContainer, !isActive && styles.counterDisabled]}
  >
    <View style={styles.counterCircle}>
      <Text style={styles.counterNumber}>{count}</Text>
      <Text style={styles.counterLabel}>Kicks Counted</Text>
    </View>
  </Pressable>
);

const SessionStatus: React.FC<{
  isActive: boolean;
  duration: string;
  onToggle: () => void;
}> = ({ isActive, duration, onToggle }) => (
  <View style={styles.sessionContainer}>
    <Button
      mode="contained"
      onPress={onToggle}
      style={styles.sessionButton}
      labelStyle={styles.sessionButtonText}
    >
      {isActive ? "Stop Counting" : "Start Counting"}
    </Button>

    <View style={styles.durationContainer}>
      <IconButton icon="clock-outline" size={16} iconColor="#666" />
      <Text style={styles.durationText}>Session Duration: {duration}</Text>
    </View>
  </View>
);

const NotesSection: React.FC<{
  notes: string;
  onChangeNotes: (text: string) => void;
}> = ({ notes, onChangeNotes }) => (
  <View style={styles.notesSection}>
    <Text style={styles.notesLabel}>Add any notes (optional)</Text>
    <TextInput
      value={notes}
      onChangeText={onChangeNotes}
      placeholder="How are you feeling? Any patterns noticed?"
      multiline
      numberOfLines={4}
      style={styles.notesInput}
      mode="outlined"
    />
  </View>
);

const TipCard: React.FC = () => (
  <Card style={styles.tipCard}>
    <Card.Content style={styles.tipContent}>
      <IconButton icon="lightbulb-outline" size={20} iconColor="#8B7355" />
      <Text style={styles.tipText}>
        <Text style={styles.tipBold}>Tip:</Text> Best time to count is when baby
        is usually active. Try to count for at least 2 hours.
      </Text>
    </Card.Content>
  </Card>
);

// Main Screen Component
export default function LogFetalMovementScreen() {
  const router = useRouter();
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
    <SafeAreaView style={styles.container}>
      <CustomAppBar
        title="Log Activity"
        rightAction="info"
        onInfoPress={() => {
          router.push("/vital-signs-education");
        }}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
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
            style={styles.saveButton}
            labelStyle={styles.saveButtonText}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 24,
    color: "#333",
  },
  heroContainer: {
    marginBottom: 30,
    borderRadius: 16,
    overflow: "hidden",
  },
  heroImage: {
    width: "100%",
    height: 200,
    borderRadius: 16,
  },
  counterContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  counterCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  counterDisabled: {
    opacity: 0.6,
  },
  counterNumber: {
    fontSize: 48,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  counterLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  sessionContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  sessionButton: {
    backgroundColor: "#8B7355",
    borderRadius: 25,
    paddingHorizontal: 40,
    paddingVertical: 8,
    marginBottom: 16,
  },
  sessionButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  durationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  durationText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  notesSection: {
    marginBottom: 24,
  },
  notesLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#333",
  },
  notesInput: {
    backgroundColor: "#fff",
    minHeight: 80,
  },
  saveButton: {
    borderColor: "#8B7355",
    borderRadius: 25,
    paddingVertical: 8,
    marginBottom: 24,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8B7355",
  },
  tipCard: {
    backgroundColor: "#f8f9fa",
    elevation: 0,
    borderWidth: 1,
    borderColor: "#e9ecef",
    borderRadius: 12,
  },
  tipContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
    lineHeight: 20,
  },
  tipBold: {
    fontWeight: "600",
    color: "#8B7355",
  },
});
