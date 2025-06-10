import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert, Pressable } from "react-native";
import { Text, Button, TextInput, Menu, Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Haptics from "expo-haptics";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useRouter } from "expo-router";

// Types
interface ActivityData {
  type: string;
  startTime: Date | null;
  endTime: Date | null;
  duration: string;
  notes: string;
  feeling: string;
}

// Activity types and feelings
const ACTIVITIES = [
  "Walk",
  "Exercise",
  "Sleep",
  "Meditate",
  "Rest",
  "Eat",
  "Yoga",
  "Swimming",
  "Stretching",
  "Breathing Exercises",
  "Other",
];

const FEELINGS = [
  { label: "Tired", emoji: "😴" },
  { label: "Low", emoji: "😔" },
  { label: "Neutral", emoji: "😐" },
  { label: "Good", emoji: "🙂" },
  { label: "Energetic", emoji: "😊" },
];

const QUICK_ACTIVITIES = [
  { label: "Walk", icon: "🚶‍♀️" },
  { label: "Sleep", icon: "😴" },
  { label: "Exercise", icon: "🏋️‍♀️" },
  { label: "Meditate", icon: "🧘‍♀️" },
  { label: "Rest", icon: "👥" },
  { label: "Eat", icon: "🍽️" },
];

// Components
const ActivitySelector: React.FC<{
  selectedActivity: string;
  onSelect: (activity: string) => void;
}> = ({ selectedActivity, onSelect }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>Activity Type</Text>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Button
            mode="outlined"
            onPress={() => setMenuVisible(true)}
            style={styles.dropdownButton}
            contentStyle={styles.dropdownContent}
            icon="chevron-down"
          >
            {selectedActivity || "Select your activity"}
          </Button>
        }
      >
        {ACTIVITIES.map((activity) => (
          <Menu.Item
            key={activity}
            onPress={() => {
              onSelect(activity);
              setMenuVisible(false);
            }}
            title={activity}
          />
        ))}
      </Menu>
    </View>
  );
};

const TimeSelector: React.FC<{
  label: string;
  time: Date | null;
  onTimeChange: (time: Date) => void;
}> = ({ label, time, onTimeChange }) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <View style={styles.timeSection}>
      <Text style={styles.sectionLabel}>{label}</Text>
      <Pressable onPress={() => setShowPicker(true)} style={styles.timeButton}>
        <Text style={styles.timeText}>
          {time
            ? time.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "--:--"}
        </Text>
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

const DurationDisplay: React.FC<{ duration: string }> = ({ duration }) => (
  <View style={styles.section}>
    <Text style={styles.sectionLabel}>Duration</Text>
    <Card style={styles.durationCard}>
      <Card.Content style={styles.durationContent}>
        <Text style={styles.durationText}>{duration}</Text>
      </Card.Content>
    </Card>
  </View>
);

const FeelingSelector: React.FC<{
  selectedFeeling: string;
  onSelect: (feeling: string) => void;
}> = ({ selectedFeeling, onSelect }) => (
  <View style={styles.section}>
    <Text style={styles.sectionLabel}>How did you feel?</Text>
    <View style={styles.feelingContainer}>
      {FEELINGS.map((feeling) => (
        <Pressable
          key={feeling.label}
          onPress={() => {
            onSelect(feeling.label);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
          style={[
            styles.feelingButton,
            selectedFeeling === feeling.label && styles.selectedFeeling,
          ]}
        >
          <Text style={styles.feelingEmoji}>{feeling.emoji}</Text>
          <Text style={styles.feelingLabel}>{feeling.label}</Text>
        </Pressable>
      ))}
    </View>
  </View>
);

const QuickSelect: React.FC<{
  onQuickSelect: (activity: string) => void;
}> = ({ onQuickSelect }) => (
  <View style={styles.section}>
    <Text style={styles.sectionLabel}>Quick Select</Text>
    <View style={styles.quickSelectGrid}>
      {QUICK_ACTIVITIES.map((activity) => (
        <Pressable
          key={activity.label}
          onPress={() => onQuickSelect(activity.label)}
          style={styles.quickSelectButton}
        >
          <Text style={styles.quickSelectIcon}>{activity.icon}</Text>
          <Text style={styles.quickSelectLabel}>{activity.label}</Text>
        </Pressable>
      ))}
    </View>
  </View>
);

export default function LogActivityScreen() {
  const router = useRouter();
  const [activityData, setActivityData] = useState<ActivityData>({
    type: "",
    startTime: null,
    endTime: null,
    duration: "0 minutes",
    notes: "",
    feeling: "",
  });

  // Calculate duration when times change
  useEffect(() => {
    if (activityData.startTime && activityData.endTime) {
      const diff =
        activityData.endTime.getTime() - activityData.startTime.getTime();
      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(minutes / 60);

      if (hours > 0) {
        setActivityData((prev) => ({
          ...prev,
          duration: `${hours} hours ${minutes % 60} minutes`,
        }));
      } else {
        setActivityData((prev) => ({
          ...prev,
          duration: `${minutes} minutes`,
        }));
      }
    }
  }, [activityData.startTime, activityData.endTime]);

  const handleSave = () => {
    if (!activityData.type) {
      Alert.alert("Missing Information", "Please select an activity type.");
      return;
    }

    Alert.alert("Success", "Activity log saved successfully!");

    // Reset form
    setActivityData({
      type: "",
      startTime: null,
      endTime: null,
      duration: "0 minutes",
      notes: "",
      feeling: "",
    });

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const handleQuickSelect = (activity: string) => {
    setActivityData((prev) => ({
      ...prev,
      type: activity,
      startTime: new Date(),
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
          <View style={styles.heroContainer}>
            {/* <Image
              source={require("./assets/activity-hero.jpg")}
              style={styles.heroImage}
              contentFit="cover"
            /> */}
          </View>

          <ActivitySelector
            selectedActivity={activityData.type}
            onSelect={(type) => setActivityData((prev) => ({ ...prev, type }))}
          />

          <View style={styles.timeRow}>
            <TimeSelector
              label="Start Time"
              time={activityData.startTime}
              onTimeChange={(startTime) =>
                setActivityData((prev) => ({ ...prev, startTime }))
              }
            />
            <TimeSelector
              label="End Time"
              time={activityData.endTime}
              onTimeChange={(endTime) =>
                setActivityData((prev) => ({ ...prev, endTime }))
              }
            />
          </View>

          <DurationDisplay duration={activityData.duration} />

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Additional Notes</Text>
            <TextInput
              value={activityData.notes}
              onChangeText={(notes) =>
                setActivityData((prev) => ({ ...prev, notes }))
              }
              placeholder="Add any observations or context (e.g., how you felt)..."
              multiline
              numberOfLines={3}
              style={styles.notesInput}
              mode="outlined"
            />
          </View>

          <FeelingSelector
            selectedFeeling={activityData.feeling}
            onSelect={(feeling) =>
              setActivityData((prev) => ({ ...prev, feeling }))
            }
          />

          <Button
            mode="contained"
            onPress={handleSave}
            style={styles.saveButton}
            labelStyle={styles.saveButtonText}
            icon="content-save"
          >
            Save Activity Log
          </Button>

          <QuickSelect onQuickSelect={handleQuickSelect} />
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
    height: 180,
    borderRadius: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#333",
  },
  dropdownButton: {
    borderColor: "#E0E0E0",
    borderRadius: 8,
  },
  dropdownContent: {
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  timeSection: {
    flex: 1,
  },
  timeButton: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  timeText: {
    fontSize: 16,
    color: "#333",
  },
  durationCard: {
    backgroundColor: "#f8f9fa",
    elevation: 0,
  },
  durationContent: {
    paddingVertical: 12,
  },
  durationText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  notesInput: {
    backgroundColor: "#fff",
    minHeight: 60,
  },
  feelingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  feelingButton: {
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
  },
  selectedFeeling: {
    backgroundColor: "#f0f0f0",
  },
  feelingEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  feelingLabel: {
    fontSize: 12,
    color: "#666",
  },
  saveButton: {
    backgroundColor: "#8B7355",
    borderRadius: 12,
    paddingVertical: 8,
    marginBottom: 30,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  quickSelectGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  quickSelectButton: {
    width: "30%",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    marginBottom: 8,
  },
  quickSelectIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  quickSelectLabel: {
    fontSize: 12,
    color: "#666",
  },
});
