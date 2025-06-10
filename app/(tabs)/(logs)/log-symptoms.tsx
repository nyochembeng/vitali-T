import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { Text, Button, TextInput, Menu } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import Slider from "@react-native-community/slider";
import * as Haptics from "expo-haptics";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useRouter } from "expo-router";

// Types
interface SymptomData {
  symptom: string;
  severity: number;
  notes: string;
}

// Sample symptoms list
const SYMPTOMS = [
  "Nausea",
  "Vomiting",
  "Headache",
  "Back Pain",
  "Heartburn",
  "Constipation",
  "Fatigue",
  "Dizziness",
  "Swelling",
  "Mood Changes",
  "Sleep Issues",
  "Breast Tenderness",
  "Other",
];

// Severity emojis
const SEVERITY_EMOJIS = ["😊", "🙂", "😐", "😟", "😣"];

// Components
const HeroImage: React.FC = () => (
  <View style={styles.heroContainer}>
    {/* <Image
      source={require("./assets/symptom-hero.jpg")} // Replace with your image
      style={styles.heroImage}
      contentFit="cover"
    /> */}
  </View>
);

const SymptomSelector: React.FC<{
  selectedSymptom: string;
  onSelect: (symptom: string) => void;
}> = ({ selectedSymptom, onSelect }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.selectorSection}>
      <Text style={styles.sectionLabel}>
        What symptom are you experiencing?
      </Text>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Button
            mode="outlined"
            onPress={() => setMenuVisible(true)}
            style={styles.dropdownButton}
            contentStyle={styles.dropdownContent}
            labelStyle={styles.dropdownLabel}
            icon="chevron-down"
          >
            {selectedSymptom || "Select symptom"}
          </Button>
        }
      >
        {SYMPTOMS.map((symptom) => (
          <Menu.Item
            key={symptom}
            onPress={() => {
              onSelect(symptom);
              setMenuVisible(false);
            }}
            title={symptom}
          />
        ))}
      </Menu>
    </View>
  );
};

const SeveritySlider: React.FC<{
  severity: number;
  onSeverityChange: (value: number) => void;
}> = ({ severity, onSeverityChange }) => {
  const handleValueChange = (value: number) => {
    onSeverityChange(Math.round(value));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <View style={styles.severitySection}>
      <Text style={styles.sectionLabel}>How severe is it?</Text>

      <View style={styles.emojiContainer}>
        {SEVERITY_EMOJIS.map((emoji, index) => (
          <Text
            key={index}
            style={[styles.emoji, severity === index && styles.selectedEmoji]}
          >
            {emoji}
          </Text>
        ))}
      </View>

      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={4}
          value={severity}
          onValueChange={handleValueChange}
          step={1}
          minimumTrackTintColor="#8B7355"
          maximumTrackTintColor="#E0E0E0"
          thumbTintColor="#8B7355"
          //   thumbStyle={styles.sliderThumb}
        />
        <View style={styles.sliderLabels}>
          <Text style={styles.sliderLabel}>Mild</Text>
          <Text style={styles.sliderLabel}>Severe</Text>
        </View>
      </View>
    </View>
  );
};

const NotesInput: React.FC<{
  notes: string;
  onNotesChange: (text: string) => void;
}> = ({ notes, onNotesChange }) => (
  <View style={styles.notesSection}>
    <Text style={styles.sectionLabel}>Additional Notes (Optional)</Text>
    <TextInput
      value={notes}
      onChangeText={onNotesChange}
      placeholder="Add any details you'd like to share..."
      multiline
      numberOfLines={4}
      style={styles.notesInput}
      mode="outlined"
    />
  </View>
);

// Main Screen Component
export default function LogSymptomScreen() {
  const router = useRouter();
  const [symptomData, setSymptomData] = useState<SymptomData>({
    symptom: "",
    severity: 2,
    notes: "",
  });

  const handleSymptomSelect = (symptom: string) => {
    setSymptomData((prev) => ({
      ...prev,
      symptom,
    }));
  };

  const handleSeverityChange = (severity: number) => {
    setSymptomData((prev) => ({
      ...prev,
      severity,
    }));
  };

  const handleNotesChange = (notes: string) => {
    setSymptomData((prev) => ({
      ...prev,
      notes,
    }));
  };

  const handleSaveSymptom = () => {
    if (!symptomData.symptom) {
      Alert.alert("Missing Information", "Please select a symptom.");
      return;
    }

    // Save logic here
    Alert.alert("Success", "Symptom log saved successfully!");
    console.log("Symptom Data:", symptomData);

    // Reset form
    setSymptomData({
      symptom: "",
      severity: 2,
      notes: "",
    });

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomAppBar
        title="Log Symptoms"
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

          <SymptomSelector
            selectedSymptom={symptomData.symptom}
            onSelect={handleSymptomSelect}
          />

          <SeveritySlider
            severity={symptomData.severity}
            onSeverityChange={handleSeverityChange}
          />

          <NotesInput
            notes={symptomData.notes}
            onNotesChange={handleNotesChange}
          />

          <Button
            mode="contained"
            onPress={handleSaveSymptom}
            style={styles.saveButton}
            labelStyle={styles.saveButtonText}
            icon="content-save"
          >
            Save Symptom Log
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
  selectorSection: {
    marginBottom: 30,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 12,
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
  dropdownLabel: {
    fontSize: 16,
    color: "#666",
  },
  severitySection: {
    marginBottom: 30,
  },
  emojiContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  emoji: {
    fontSize: 24,
    opacity: 0.4,
  },
  selectedEmoji: {
    opacity: 1,
    transform: [{ scale: 1.2 }],
  },
  sliderContainer: {
    paddingHorizontal: 10,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  sliderThumb: {
    backgroundColor: "#8B7355",
    width: 20,
    height: 20,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  sliderLabel: {
    fontSize: 14,
    color: "#666",
  },
  notesSection: {
    marginBottom: 30,
  },
  notesInput: {
    backgroundColor: "#fff",
    minHeight: 80,
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
