import React, { useState, useEffect } from "react";
import { View, ScrollView, Alert, Pressable } from "react-native";
import { Text, Button, TextInput, Card, Switch } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Haptics from "expo-haptics";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useRouter } from "expo-router";
import { useTheme } from "@/lib/hooks/useTheme";

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
  const { colors, typo, layout } = useTheme();
  const [showPicker, setShowPicker] = useState(false);

  return (
    <View
      style={{
        alignItems: "center",
        flex: 1,
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
        {label}
      </Text>
      <Pressable
        onPress={() => setShowPicker(true)}
        style={{
          width: layout.spacing.xl * 2.5,
          height: layout.spacing.xl * 2.5,
          borderRadius: layout.borderRadius.full,
          backgroundColor: colors.surface,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: typo.h3.fontSize,
            color: colors.text,
            ...typo.h3,
          }}
        >
          {icon}
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

const DurationCard: React.FC<{ duration: string }> = ({ duration }) => {
  const { colors, typo, layout } = useTheme();

  return (
    <Card
      style={{
        backgroundColor: colors.card,
        elevation: 0,
        marginBottom: layout.spacing.lg,
        borderRadius: layout.borderRadius.medium,
      }}
    >
      <Card.Content
        style={{
          alignItems: "center",
          paddingVertical: layout.spacing.sm,
        }}
      >
        <Text
          style={{
            fontSize: typo.body2.fontSize,
            color: colors.text,
            marginBottom: layout.spacing.xs,
            ...typo.body2,
          }}
        >
          Total Sleep Duration
        </Text>
        <Text
          style={{
            fontSize: typo.h5.fontSize,
            fontWeight: "600",
            color: colors.text,
            ...typo.h5,
          }}
        >
          {duration}
        </Text>
      </Card.Content>
    </Card>
  );
};

const QualitySelector: React.FC<{
  selectedQuality: string;
  onSelect: (quality: string) => void;
}> = ({ selectedQuality, onSelect }) => {
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
        How was your sleep?
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {SLEEP_QUALITY.map((quality) => (
          <Pressable
            key={quality.label}
            onPress={() => {
              onSelect(quality.label);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            style={[
              {
                alignItems: "center",
                padding: layout.spacing.sm,
                minWidth: layout.spacing.xl,
              },
              selectedQuality === quality.label && {
                transform: [{ scale: 1.1 }],
                elevation: layout.elevation,
              },
            ]}
          >
            <Text
              style={{
                fontSize: typo.h4.fontSize,
                marginBottom: layout.spacing.xs,
                ...typo.h4,
              }}
            >
              {quality.emoji}
            </Text>
            <Text
              style={{
                fontSize: typo.caption.fontSize,
                color: colors.text,
                fontWeight: "500",
                ...typo.caption,
              }}
            >
              {quality.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const SleepOptions: React.FC<{
  hadNap: boolean;
  interruptedSleep: boolean;
  onNapChange: (value: boolean) => void;
  onInterruptedChange: (value: boolean) => void;
}> = ({ hadNap, interruptedSleep, onNapChange, onInterruptedChange }) => {
  const { colors, typo, layout } = useTheme();

  return (
    <View
      style={{
        marginBottom: layout.spacing.lg,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: layout.spacing.sm,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      >
        <Text
          style={{
            fontSize: typo.body1.fontSize,
            color: colors.text,
            ...typo.body1,
          }}
        >
          Nap
        </Text>
        <Switch
          value={hadNap}
          onValueChange={onNapChange}
          thumbColor={hadNap ? colors.primary : colors.card}
          trackColor={{ false: colors.border, true: colors.accentLight }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: layout.spacing.sm,
        }}
      >
        <Text
          style={{
            fontSize: typo.body1.fontSize,
            color: colors.text,
            ...typo.body1,
          }}
        >
          Interrupted Sleep
        </Text>
        <Switch
          value={interruptedSleep}
          onValueChange={onInterruptedChange}
          thumbColor={interruptedSleep ? colors.primary : colors.card}
          trackColor={{ false: colors.border, true: colors.accentLight }}
        />
      </View>
    </View>
  );
};

export default function LogSleepScreen() {
  const router = useRouter();
  const { colors, typo, layout, anime, mode } = useTheme();
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <CustomAppBar
        title="Log Sleep"
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: layout.spacing.lg,
            }}
          >
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
              Additional Notes (Optional)
            </Text>
            <TextInput
              value={sleepData.notes}
              onChangeText={(notes) =>
                setSleepData((prev) => ({ ...prev, notes }))
              }
              placeholder="E.g., woke up often, had vivid dreams, felt rested..."
              multiline
              numberOfLines={3}
              style={{
                backgroundColor: colors.surface,
                minHeight: layout.spacing.xl * 3,
              }}
              mode="outlined"
              outlineColor={colors.border}
              activeOutlineColor={colors.primary}
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
            style={{
              backgroundColor: colors.primary,
              borderRadius: layout.borderRadius.medium,
              paddingVertical: layout.spacing.xs,
            }}
            labelStyle={{
              fontSize: typo.button.fontSize,
              fontWeight: "600",
              color: colors.textInverse,
              ...typo.button,
            }}
            icon="content-save"
          >
            Save Sleep Log
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
