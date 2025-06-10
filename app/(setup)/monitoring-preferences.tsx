import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button, Switch, RadioButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

interface MonitoringPreferences {
  alertSensitivity: "standard" | "sensitive";
  notificationFrequency: "daily" | "weekly" | "monthly";
  reminderNotifications: boolean;
  healthEducationUpdates: boolean;
  insightsFromDataTrends: boolean;
}

export default function MonitoringPreferencesScreen() {
  const [alertSensitivity, setAlertSensitivity] = useState<
    "standard" | "sensitive"
  >("standard");
  const [notificationFrequency, setNotificationFrequency] = useState<
    "daily" | "weekly" | "monthly"
  >("daily");
  const [reminderNotifications, setReminderNotifications] = useState(true);
  const [healthEducationUpdates, setHealthEducationUpdates] = useState(true);
  const [insightsFromDataTrends, setInsightsFromDataTrends] = useState(true);
  const router = useRouter();

  const handleSaveAndContinue = () => {
    const preferences: MonitoringPreferences = {
      alertSensitivity,
      notificationFrequency,
      reminderNotifications,
      healthEducationUpdates,
      insightsFromDataTrends,
    };
    // Here you would typically save the preferences to your backend or local storage
    console.log("Saved Preferences:", preferences);
    router.push("/getting-started");
  };

  const NotificationFrequencyButton: React.FC<{
    label: string;
    value: "daily" | "weekly" | "monthly";
    isSelected: boolean;
    onPress: () => void;
  }> = ({ label, value, isSelected, onPress }) => (
    <TouchableOpacity
      style={[
        styles.frequencyButton,
        isSelected && styles.frequencyButtonSelected,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.frequencyButtonText,
          isSelected && styles.frequencyButtonTextSelected,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <Text style={styles.title}>Monitoring Preferences</Text>

        {/* Alert Sensitivity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alert Sensitivity</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setAlertSensitivity("standard")}
            >
              <RadioButton
                value="standard"
                status={
                  alertSensitivity === "standard" ? "checked" : "unchecked"
                }
                onPress={() => setAlertSensitivity("standard")}
                color="#A67C5A"
              />
              <Text style={styles.radioLabel}>Standard</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setAlertSensitivity("sensitive")}
            >
              <RadioButton
                value="sensitive"
                status={
                  alertSensitivity === "sensitive" ? "checked" : "unchecked"
                }
                onPress={() => setAlertSensitivity("sensitive")}
                color="#A67C5A"
              />
              <Text style={styles.radioLabel}>Sensitive</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Notification Frequency */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Frequency</Text>
          <View style={styles.frequencyContainer}>
            <NotificationFrequencyButton
              label="Daily"
              value="daily"
              isSelected={notificationFrequency === "daily"}
              onPress={() => setNotificationFrequency("daily")}
            />
            <NotificationFrequencyButton
              label="Weekly"
              value="weekly"
              isSelected={notificationFrequency === "weekly"}
              onPress={() => setNotificationFrequency("weekly")}
            />
            <NotificationFrequencyButton
              label="Monthly"
              value="monthly"
              isSelected={notificationFrequency === "monthly"}
              onPress={() => setNotificationFrequency("monthly")}
            />
          </View>
        </View>

        {/* Toggle Options */}
        <View style={styles.section}>
          {/* Reminder Notifications */}
          <View style={styles.toggleOption}>
            <View style={styles.toggleContent}>
              <Text style={styles.toggleTitle}>Reminder Notifications</Text>
              <Text style={styles.toggleDescription}>
                Enable notifications for daily reminders
              </Text>
            </View>
            <Switch
              value={reminderNotifications}
              onValueChange={setReminderNotifications}
              color="#A67C5A"
            />
          </View>

          {/* Health Education Updates */}
          <View style={styles.toggleOption}>
            <View style={styles.toggleContent}>
              <Text style={styles.toggleTitle}>Health Education Updates</Text>
              <Text style={styles.toggleDescription}>
                Receive regular health tips and articles
              </Text>
            </View>
            <Switch
              value={healthEducationUpdates}
              onValueChange={setHealthEducationUpdates}
              color="#A67C5A"
            />
          </View>

          {/* Insights from Data Trends */}
          <View style={styles.toggleOption}>
            <View style={styles.toggleContent}>
              <Text style={styles.toggleTitle}>Insights from Data Trends</Text>
              <Text style={styles.toggleDescription}>
                Get personalized health trend insights based on your monitoring
                data
              </Text>
            </View>
            <Switch
              value={insightsFromDataTrends}
              onValueChange={setInsightsFromDataTrends}
              color="#A67C5A"
            />
          </View>
        </View>

        {/* Save Button */}
        <Button
          mode="contained"
          onPress={handleSaveAndContinue}
          style={styles.saveButton}
          labelStyle={styles.saveButtonText}
          buttonColor="#A67C5A"
        >
          Save and Continue
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1A1A1A",
    marginBottom: 16,
  },
  radioGroup: {
    flexDirection: "row",
    gap: 24,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioLabel: {
    fontSize: 16,
    color: "#1A1A1A",
    marginLeft: 8,
  },
  frequencyContainer: {
    flexDirection: "row",
    gap: 8,
  },
  frequencyButton: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  frequencyButtonSelected: {
    backgroundColor: "#A67C5A",
  },
  frequencyButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666666",
  },
  frequencyButtonTextSelected: {
    color: "#FFFFFF",
  },
  toggleOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  toggleContent: {
    flex: 1,
    marginRight: 12,
  },
  toggleTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  toggleDescription: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },
  saveButton: {
    borderRadius: 12,
    paddingVertical: 8,
    marginTop: 16,
    marginBottom: 24,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
