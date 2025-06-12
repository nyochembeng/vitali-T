import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Button, Switch, RadioButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/lib/hooks/useTheme";

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
  const { colors, typo, layout } = useTheme();

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
      style={{
        flex: 1,
        backgroundColor: isSelected ? colors.primary : colors.primaryLight,
        paddingVertical: layout.spacing.sm,
        paddingHorizontal: layout.spacing.md,
        borderRadius: layout.borderRadius.medium,
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: typo.body3.fontSize,
          fontWeight: isSelected ? "600" : "500",
          color: isSelected ? colors.textInverse : "rgba(17, 12, 9, 0.6)",
          ...typo.body3,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: layout.spacing.lg,
          paddingTop: layout.spacing.md,
          paddingBottom: layout.spacing.md,
        }}
      >
        {/* Header */}
        <Text
          style={{
            fontSize: typo.h5.fontSize,
            fontWeight: "700",
            color: colors.text,
            textAlign: "center",
            marginBottom: layout.spacing.xl,
            ...typo.h3,
          }}
        >
          Monitoring Preferences
        </Text>

        {/* Alert Sensitivity */}
        <View
          style={{
            marginBottom: layout.spacing.xl,
          }}
        >
          <Text
            style={{
              fontSize: typo.body2.fontSize,
              fontWeight: "500",
              color: colors.text,
              marginBottom: layout.spacing.sm,
              ...typo.body2,
            }}
          >
            Alert Sensitivity
          </Text>
          <View
            style={{
              flexDirection: "row",
              gap: layout.spacing.lg,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => setAlertSensitivity("standard")}
            >
              <RadioButton
                value="standard"
                status={
                  alertSensitivity === "standard" ? "checked" : "unchecked"
                }
                onPress={() => setAlertSensitivity("standard")}
                color={colors.primary}
              />
              <Text
                style={{
                  fontSize: typo.body1.fontSize,
                  color: colors.text,
                  marginLeft: layout.spacing.sm,
                  ...typo.body1,
                }}
              >
                Standard
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => setAlertSensitivity("sensitive")}
            >
              <RadioButton
                value="sensitive"
                status={
                  alertSensitivity === "sensitive" ? "checked" : "unchecked"
                }
                onPress={() => setAlertSensitivity("sensitive")}
                color={colors.primary}
              />
              <Text
                style={{
                  fontSize: typo.body1.fontSize,
                  color: colors.text,
                  marginLeft: layout.spacing.sm,
                  ...typo.body1,
                }}
              >
                Sensitive
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Notification Frequency */}
        <View
          style={{
            marginBottom: layout.spacing.xl,
          }}
        >
          <Text
            style={{
              fontSize: typo.body2.fontSize,
              fontWeight: "500",
              color: colors.text,
              marginBottom: layout.spacing.sm,
              ...typo.body2,
            }}
          >
            Notification Frequency
          </Text>
          <View
            style={{
              flexDirection: "row",
              gap: layout.spacing.sm,
            }}
          >
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
        <View
          style={{
            marginBottom: layout.spacing.xl,
          }}
        >
          {/* Reminder Notifications */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: layout.spacing.sm,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}
          >
            <View
              style={{
                flex: 1,
                marginRight: layout.spacing.sm,
              }}
            >
              <Text
                style={{
                  fontSize: typo.body2.fontSize,
                  fontWeight: "500",
                  color: colors.text,
                  marginBottom: layout.spacing.xs,
                  ...typo.body2,
                }}
              >
                Reminder Notifications
              </Text>
              <Text
                style={{
                  fontSize: typo.body3.fontSize,
                  color: "rgba(17, 12, 9, 0.6)",
                  lineHeight: typo.body1.lineHeight,
                  ...typo.body3,
                }}
              >
                Enable notifications for daily reminders
              </Text>
            </View>
            <Switch
              value={reminderNotifications}
              onValueChange={setReminderNotifications}
              color={colors.primary}
            />
          </View>

          {/* Health Education Updates */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: layout.spacing.sm,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}
          >
            <View
              style={{
                flex: 1,
                marginRight: layout.spacing.sm,
              }}
            >
              <Text
                style={{
                  fontSize: typo.body2.fontSize,
                  fontWeight: "500",
                  color: colors.text,
                  marginBottom: layout.spacing.xs,
                  ...typo.body2,
                }}
              >
                Health Education Updates
              </Text>
              <Text
                style={{
                  fontSize: typo.body3.fontSize,
                  color: "rgba(17, 12, 9, 0.6)",
                  lineHeight: typo.body1.lineHeight,
                  ...typo.body3,
                }}
              >
                Receive regular health tips and articles
              </Text>
            </View>
            <Switch
              value={healthEducationUpdates}
              onValueChange={setHealthEducationUpdates}
              color={colors.primary}
            />
          </View>

          {/* Insights from Data Trends */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: layout.spacing.sm,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}
          >
            <View
              style={{
                flex: 1,
                marginRight: layout.spacing.sm,
              }}
            >
              <Text
                style={{
                  fontSize: typo.body2.fontSize,
                  fontWeight: "500",
                  color: colors.text,
                  marginBottom: layout.spacing.xs,
                  ...typo.body2,
                }}
              >
                Insights from Data Trends
              </Text>
              <Text
                style={{
                  fontSize: typo.body3.fontSize,
                  color: "rgba(17, 12, 9, 0.6)",
                  lineHeight: typo.body1.lineHeight,
                  ...typo.body3,
                }}
              >
                Get personalized health trend insights based on your monitoring
                data
              </Text>
            </View>
            <Switch
              value={insightsFromDataTrends}
              onValueChange={setInsightsFromDataTrends}
              color={colors.primary}
            />
          </View>
        </View>

        {/* Save Button */}
        <Button
          mode="contained"
          onPress={handleSaveAndContinue}
          style={{
            borderRadius: layout.borderRadius.medium,
            paddingVertical: layout.spacing.sm,
            marginTop: layout.spacing.sm,
            marginBottom: layout.spacing.lg,
          }}
          labelStyle={{
            fontSize: typo.button.fontSize,
            fontWeight: "600",
            color: colors.textInverse,
            ...typo.button,
          }}
          buttonColor={colors.primary}
        >
          Save and Continue
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
