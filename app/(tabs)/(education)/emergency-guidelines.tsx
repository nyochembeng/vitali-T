import { EmergencySymptomCard } from "@/components/education/EmergencySymptomCard";
import CustomAppBar from "@/components/utils/CustomAppBar";
import React from "react";
import { View, StyleSheet, ScrollView, StatusBar, Linking } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

interface EmergencySymptom {
  id: string;
  title: string;
  description: string;
  icon: string;
  severity: "high" | "medium" | "low";
}

const emergencySymptoms: EmergencySymptom[] = [
  {
    id: "1",
    title: "Sudden High Blood Pressure",
    description: "Swelling, vision changes, or severe headaches",
    icon: "warning",
    severity: "high",
  },
  {
    id: "2",
    title: "Decreased Fetal Movement",
    description: "Less movement or kicks than usual",
    icon: "child-care",
    severity: "high",
  },
  {
    id: "3",
    title: "Severe or Persistent Headaches",
    description: "Especially if accompanied by vision changes",
    icon: "psychology",
    severity: "medium",
  },
  {
    id: "4",
    title: "Heavy Bleeding or Fluid Loss",
    description: "Any unusual discharge or bleeding",
    icon: "opacity",
    severity: "high",
  },
  {
    id: "5",
    title: "Severe Abdominal Pain",
    description: "Sharp or persistent cramping",
    icon: "fitness-center",
    severity: "medium",
  },
  {
    id: "6",
    title: "Shortness of Breath",
    description: "Difficulty breathing or chest pain",
    icon: "air",
    severity: "medium",
  },
  {
    id: "7",
    title: "Seizures or Fainting",
    description: "Loss of consciousness or convulsions",
    icon: "flash-on",
    severity: "high",
  },
  {
    id: "8",
    title: "Signs of Preterm Labor",
    description: "Regular contractions before 37 weeks",
    icon: "schedule",
    severity: "high",
  },
  {
    id: "9",
    title: "High Fever",
    description: "Temperature of 100.4°F (38°C) or higher",
    icon: "thermostat",
    severity: "medium",
  },
];

export default function EmergencyGuidelinesScreen() {
  const handleCallDoctor = () => {
    // In a real app, you might want to:
    // 1. Show emergency contacts
    // 2. Call a specific number
    // 3. Navigate to emergency contacts screen
    Linking.openURL("tel:911");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      <CustomAppBar title="Emergency Guidelines" rightAction="help" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.title}>
            When to Seek Help
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            If you experience any of the following symptoms, contact your
            healthcare provider immediately.
          </Text>
        </View>

        <View style={styles.symptomsList}>
          {emergencySymptoms.map((symptom) => (
            <EmergencySymptomCard key={symptom.id} symptom={symptom} />
          ))}
        </View>
      </ScrollView>

      {/* Call Doctor Button */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleCallDoctor}
          style={styles.callButton}
          labelStyle={styles.callButtonText}
          icon="phone"
        >
          Call Your Doctor
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  content: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  title: {
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    color: "#6B7280",
    lineHeight: 24,
  },
  symptomsList: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  buttonContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  callButton: {
    backgroundColor: "#8B5A2B",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 16,
  },
  callButtonText: {
    color: "white",
    fontWeight: "600",
    marginLeft: 8,
  },
});
