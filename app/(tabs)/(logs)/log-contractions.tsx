import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { Text, Button, TextInput, Card, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useRouter } from "expo-router";

// Types
interface ContractionData {
  duration: string;
  interval: string;
  totalTime: string;
  notes: string;
}

// Components
const TimerDisplay: React.FC<{ time: string }> = ({ time }) => (
  <View style={styles.timerContainer}>
    <View style={styles.timerCircle}>
      <Text style={styles.timerText}>{time}</Text>
    </View>
  </View>
);

const TimerControls: React.FC<{
  isActive: boolean;
  onStart: () => void;
  onStop: () => void;
}> = ({ isActive, onStart, onStop }) => (
  <View style={styles.controlsContainer}>
    <Button
      mode="contained-tonal"
      onPress={onStart}
      disabled={isActive}
      icon="play"
      style={[styles.controlButton, styles.startButton]}
      labelStyle={styles.controlButtonText}
    >
      Start Timer
    </Button>
    <Button
      mode="contained-tonal"
      onPress={onStop}
      disabled={!isActive}
      icon="stop"
      style={[styles.controlButton, styles.stopButton]}
      labelStyle={styles.controlButtonText}
    >
      Stop Timer
    </Button>
  </View>
);

const TimeInput: React.FC<{
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  description?: string;
}> = ({ label, value, onChangeText, placeholder = "00:00", description }) => (
  <View style={styles.inputSection}>
    <Text style={styles.inputLabel}>{label}</Text>
    <View style={styles.inputContainer}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.timeInput}
        mode="outlined"
        right={<TextInput.Icon icon="clock-outline" />}
      />
    </View>
    {description && <Text style={styles.inputDescription}>{description}</Text>}
  </View>
);

const NotesInput: React.FC<{
  value: string;
  onChangeText: (text: string) => void;
}> = ({ value, onChangeText }) => (
  <View style={styles.inputSection}>
    <Text style={styles.inputLabel}>Additional Notes (Optional)</Text>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder="Describe pain level, intensity, position, or any other observations..."
      multiline
      numberOfLines={4}
      style={styles.notesInput}
      mode="outlined"
    />
  </View>
);

const MedicalAlert: React.FC = () => (
  <Card style={styles.alertCard}>
    <Card.Content style={styles.alertContent}>
      <IconButton icon="information" size={20} iconColor="#666" />
      <Text style={styles.alertText}>
        Seek medical attention if contractions are less than 5 minutes apart
      </Text>
    </Card.Content>
  </Card>
);

// Main Screen Component
export default function LogContractionScreen() {
  const router = useRouter();
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [contractionData, setContractionData] = useState<ContractionData>({
    duration: "",
    interval: "",
    totalTime: "",
    notes: "",
  });

  // Timer logic
  useEffect(() => {
    let interval: number | undefined;

    if (isTimerActive) {
      let seconds = 0;
      interval = setInterval(() => {
        seconds++;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        setCurrentTime(
          `${mins.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`
        );
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTimerActive]);

  const handleStartTimer = () => {
    setIsTimerActive(true);
    setCurrentTime("00:00");
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleStopTimer = () => {
    setIsTimerActive(false);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleSaveContraction = () => {
    // Validate required fields
    if (!contractionData.duration || !contractionData.interval) {
      Alert.alert(
        "Missing Information",
        "Please fill in the duration and interval fields."
      );
      return;
    }

    // Save logic here
    Alert.alert("Success", "Contraction log saved successfully!");

    // Reset form
    setContractionData({
      duration: "",
      interval: "",
      totalTime: "",
      notes: "",
    });
    setCurrentTime("00:00");

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const updateContractionData = (
    field: keyof ContractionData,
    value: string
  ) => {
    setContractionData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomAppBar
        title="Log Uterine Contractions"
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
          <TimerDisplay time={currentTime} />

          <TimerControls
            isActive={isTimerActive}
            onStart={handleStartTimer}
            onStop={handleStopTimer}
          />

          <TimeInput
            label="How long did one contraction last?"
            value={contractionData.duration}
            onChangeText={(text) => updateContractionData("duration", text)}
          />

          <TimeInput
            label="Interval between contractions"
            value={contractionData.interval}
            onChangeText={(text) => updateContractionData("interval", text)}
            description="Time from start of one to start of next"
          />

          <TimeInput
            label="How long have contractions been occurring?"
            value={contractionData.totalTime}
            onChangeText={(text) => updateContractionData("totalTime", text)}
          />

          <NotesInput
            value={contractionData.notes}
            onChangeText={(text) => updateContractionData("notes", text)}
          />

          <MedicalAlert />

          <Button
            mode="contained"
            onPress={handleSaveContraction}
            style={styles.saveButton}
            labelStyle={styles.saveButtonText}
            icon="content-save"
          >
            Save Contraction Log
          </Button>
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
    marginBottom: 30,
    color: "#333",
  },
  timerContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  timerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    gap: 12,
  },
  controlButton: {
    flex: 1,
    borderRadius: 8,
  },
  startButton: {
    backgroundColor: "#f5f5f5",
  },
  stopButton: {
    backgroundColor: "#f5f5f5",
  },
  controlButtonText: {
    color: "#333",
    fontSize: 14,
  },
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#333",
  },
  inputContainer: {
    position: "relative",
  },
  timeInput: {
    backgroundColor: "#fff",
  },
  inputDescription: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  notesInput: {
    backgroundColor: "#fff",
    minHeight: 80,
  },
  alertCard: {
    backgroundColor: "#f8f9fa",
    marginBottom: 30,
    elevation: 0,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  alertContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  alertText: {
    flex: 1,
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  saveButton: {
    backgroundColor: "#8B7355",
    borderRadius: 12,
    paddingVertical: 8,
    marginBottom: 20,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
