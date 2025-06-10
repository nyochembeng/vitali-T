import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert, Pressable } from "react-native";
import { Text, Button, TextInput, Card, Switch } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Haptics from "expo-haptics";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useRouter } from "expo-router";

// Types
interface SleepData {
  sleepStart: Date | null;
  wakeTime: Date | null;
  totalDuration: string;
  quality: string;
  notes: string;
  hadNap: boolean;
  interruptedSleep: boolean;
}

const SLEEP_QUALITY = [
  { label: "Very Poor", emoji: "😴" },
  { label: "Poor", emoji: "😔" },
  { label: "Okay", emoji: "😐" },
  { label: "Good", emoji: "🙂" },
  { label: "Excellent", emoji: "😊" },
];

// Components
const TimeSelector: React.FC<{
  label: string;
  time: Date | null;
  onTimeChange: (time: Date) => void;
  icon: string;
}> = ({ label, time, onTimeChange, icon }) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <View style={styles.timeSection}>
      <Text style={styles.timeLabel}>{label}</Text>
      <Pressable onPress={() => setShowPicker(true)} style={styles.timeButton}>
        <Text style={styles.timeIcon}>{icon}</Text>
      </Pressable>
      {showPicker && (
        <DateTimePicker
          value={time || new Date()}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowPicker(false);
            if (selectedTime) onTimeChange(selectedTime);
          }}
        />
      )}
    </View>
  );
};

const DurationCard: React.FC<{ duration: string }> = ({ duration }) => (
  <Card style={styles.durationCard}>
    <Card.Content style={styles.durationContent}>
      <Text style={styles.durationLabel}>Total Sleep Duration</Text>
      <Text style={styles.durationValue}>{duration}</Text>
    </Card.Content>
  </Card>
);

const QualitySelector: React.FC<{
  selectedQuality: string;
  onSelect: (quality: string) => void;
}> = ({ selectedQuality, onSelect }) => (
  <View style={styles.section}>
    <Text style={styles.sectionLabel}>How was your sleep?</Text>
    <View style={styles.qualityContainer}>
      {SLEEP_QUALITY.map((quality) => (
        <Pressable
          key={quality.label}
          onPress={() => {
            onSelect(quality.label);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
          style={[
            styles.qualityButton,
            selectedQuality === quality.label && styles.selectedQuality,
          ]}
        >
          <Text style={styles.qualityEmoji}>{quality.emoji}</Text>
          <Text style={styles.qualityLabel}>{quality.label}</Text>
        </Pressable>
      ))}
    </View>
  </View>
);

const SleepOptions: React.FC<{
  hadNap: boolean;
  interruptedSleep: boolean;
  onNapChange: (value: boolean) => void;
  onInterruptedChange: (value: boolean) => void;
}> = ({ hadNap, interruptedSleep, onNapChange, onInterruptedChange }) => (
  <View style={styles.section}>
    <View style={styles.optionRow}>
      <Text style={styles.optionLabel}>Nap</Text>
      <Switch
        value={hadNap}
        onValueChange={onNapChange}
        thumbColor={hadNap ? "#8B7355" : "#f4f3f4"}
        trackColor={{ false: "#767577", true: "#D2B48C" }}
      />
    </View>
    <View style={styles.optionRow}>
      <Text style={styles.optionLabel}>Interrupted Sleep</Text>
      <Switch
        value={interruptedSleep}
        onValueChange={onInterruptedChange}
        thumbColor={interruptedSleep ? "#8B7355" : "#f4f3f4"}
        trackColor={{ false: "#767577", true: "#D2B48C" }}
      />
    </View>
  </View>
);

export default function LogSleepScreen() {
  const router = useRouter();
  const [sleepData, setSleepData] = useState<SleepData>({
    sleepStart: null,
    wakeTime: null,
    totalDuration: "8 hours 30 minutes",
    quality: "",
    notes: "",
    hadNap: false,
    interruptedSleep: false,
  });

  // Calculate duration when times change
  useEffect(() => {
    if (sleepData.sleepStart && sleepData.wakeTime) {
      let diff = sleepData.wakeTime.getTime() - sleepData.sleepStart.getTime();

      // Handle overnight sleep (wake time is next day)
      if (diff < 0) {
        diff += 24 * 60 * 60 * 1000; // Add 24 hours
      }

      const totalMinutes = Math.floor(diff / 60000);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      setSleepData((prev) => ({
        ...prev,
        totalDuration: `${hours} hours ${minutes} minutes`,
      }));
    }
  }, [sleepData.sleepStart, sleepData.wakeTime]);

  const handleSave = () => {
    if (!sleepData.sleepStart || !sleepData.wakeTime) {
      Alert.alert(
        "Missing Information",
        "Please set both sleep start and wake times."
      );
      return;
    }

    Alert.alert("Success", "Sleep log saved successfully!");

    // Reset form
    setSleepData({
      sleepStart: null,
      wakeTime: null,
      totalDuration: "8 hours 30 minutes",
      quality: "",
      notes: "",
      hadNap: false,
      interruptedSleep: false,
    });

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomAppBar
        title="Log Sleep"
        titleIcon={{ name: "moon-waning-crescent", position: "right" }}
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
          <View style={styles.timeRow}>
            <TimeSelector
              label="Sleep Start"
              time={sleepData.sleepStart}
              onTimeChange={(sleepStart) =>
                setSleepData((prev) => ({ ...prev, sleepStart }))
              }
              icon="🌙"
            />
            <TimeSelector
              label="Wake Time"
              time={sleepData.wakeTime}
              onTimeChange={(wakeTime) =>
                setSleepData((prev) => ({ ...prev, wakeTime }))
              }
              icon="☀️"
            />
          </View>

          <DurationCard duration={sleepData.totalDuration} />

          <QualitySelector
            selectedQuality={sleepData.quality}
            onSelect={(quality) =>
              setSleepData((prev) => ({ ...prev, quality }))
            }
          />

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Additional Notes (Optional)</Text>
            <TextInput
              value={sleepData.notes}
              onChangeText={(notes) =>
                setSleepData((prev) => ({ ...prev, notes }))
              }
              placeholder="E.g., woke up often, had vivid dreams, felt rested..."
              multiline
              numberOfLines={3}
              style={styles.notesInput}
              mode="outlined"
            />
          </View>

          <SleepOptions
            hadNap={sleepData.hadNap}
            interruptedSleep={sleepData.interruptedSleep}
            onNapChange={(hadNap) =>
              setSleepData((prev) => ({ ...prev, hadNap }))
            }
            onInterruptedChange={(interruptedSleep) =>
              setSleepData((prev) => ({ ...prev, interruptedSleep }))
            }
          />

          <Button
            mode="contained"
            onPress={handleSave}
            style={styles.saveButton}
            labelStyle={styles.saveButtonText}
            icon="content-save"
          >
            Save Sleep Log
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 8,
  },
  headerIcon: {
    fontSize: 20,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },
  timeSection: {
    alignItems: "center",
    flex: 1,
  },
  timeLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 12,
  },
  timeButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  timeIcon: {
    fontSize: 32,
  },
  durationCard: {
    backgroundColor: "#f8f9fa",
    elevation: 0,
    marginBottom: 24,
    borderRadius: 12,
  },
  durationContent: {
    alignItems: "center",
    paddingVertical: 16,
  },
  durationLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  durationValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 12,
    color: "#333",
  },
  qualityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  qualityButton: {
    alignItems: "center",
    padding: 12,
    borderRadius: 20,
    minWidth: 60,
  },
  selectedQuality: {
    transform: [{ scale: 1.1 }],
    elevation: 2,
  },
  qualityEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  qualityLabel: {
    fontSize: 10,
    color: "#333",
    fontWeight: "500",
  },
  notesInput: {
    backgroundColor: "#fff",
    minHeight: 60,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  optionLabel: {
    fontSize: 16,
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#8B7355",
    borderRadius: 12,
    paddingVertical: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
