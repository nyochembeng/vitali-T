import React, { useState, useEffect } from "react";
import { View, ScrollView, Alert } from "react-native";
import { Text, Button, TextInput, Card, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useRouter } from "expo-router";
import { useTheme } from "@/lib/hooks/useTheme";

// Types
interface ContractionData {
  duration: string;
  interval: string;
  totalTime: string;
  notes: string;
}

// Components
const TimerDisplay: React.FC<{ time: string }> = ({ time }) => {
  const { colors, typo, layout } = useTheme();

  return (
    <View
      style={{
        alignItems: "center",
        marginBottom: layout.spacing.lg,
      }}
    >
      <View
        style={{
          width: layout.spacing.xl * 3.5,
          height: layout.spacing.xl * 3.5,
          borderRadius: layout.borderRadius.full,
          backgroundColor: colors.surface,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: typo.h3.fontSize,
            fontWeight: "600",
            color: colors.text,
            ...typo.h3,
          }}
        >
          {time}
        </Text>
      </View>
    </View>
  );
};

const TimerControls: React.FC<{
  isActive: boolean;
  onStart: () => void;
  onStop: () => void;
}> = ({ isActive, onStart, onStop }) => {
  const { colors, typo, layout } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: layout.spacing.lg,
        gap: layout.spacing.sm,
      }}
    >
      <Button
        mode="contained-tonal"
        onPress={onStart}
        disabled={isActive}
        icon="play"
        style={{
          flex: 1,
          borderRadius: layout.borderRadius.medium,
        }}
        labelStyle={{
          fontSize: typo.body1.fontSize,
          color: colors.text,
          ...typo.body1,
        }}
        buttonColor={colors.primaryLight}
      >
        Start Timer
      </Button>
      <Button
        mode="contained-tonal"
        onPress={onStop}
        disabled={!isActive}
        icon="stop"
        style={{
          flex: 1,
          borderRadius: layout.borderRadius.medium,
        }}
        labelStyle={{
          fontSize: typo.body1.fontSize,
          color: colors.text,
          ...typo.body1,
        }}
        buttonColor={colors.primaryLight}
      >
        Stop Timer
      </Button>
    </View>
  );
};

const TimeInput: React.FC<{
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  description?: string;
}> = ({ label, value, onChangeText, placeholder = "00:00", description }) => {
  const { colors, typo, layout } = useTheme();

  return (
    <View
      style={{
        marginBottom: layout.spacing.sm,
      }}
    >
      <Text
        style={{
          fontSize: typo.body1.fontSize,
          fontWeight: "500",
          marginBottom: layout.spacing.xs,
          color: colors.text,
          ...typo.body1,
        }}
      >
        {label}
      </Text>
      <View
        style={{
          position: "relative",
        }}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          style={{
            backgroundColor: colors.surface,
            borderRadius: layout.borderRadius.medium,
          }}
          mode="outlined"
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
          right={<TextInput.Icon icon="clock-outline" color={colors.text} />}
        />
      </View>
      {description && (
        <Text
          style={{
            fontSize: typo.caption.fontSize,
            color: colors.text,
            marginTop: layout.spacing.xs,
            ...typo.caption,
          }}
        >
          {description}
        </Text>
      )}
    </View>
  );
};

const NotesInput: React.FC<{
  value: string;
  onChangeText: (text: string) => void;
}> = ({ value, onChangeText }) => {
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
          marginBottom: layout.spacing.xs,
          color: colors.text,
          ...typo.body1,
        }}
      >
        Additional Notes (Optional)
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Describe pain level, intensity, position, or any other observations..."
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

const MedicalAlert: React.FC = () => {
  const { colors, typo, layout } = useTheme();

  return (
    <Card
      style={{
        backgroundColor: colors.card,
        marginBottom: layout.spacing.lg,
        elevation: 0,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <Card.Content
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: layout.spacing.sm,
        }}
      >
        <IconButton icon="information" size={20} iconColor={colors.accent} />
        <Text
          style={{
            flex: 1,
            fontSize: typo.body2.fontSize,
            color: colors.text,
            marginLeft: layout.spacing.sm,
            ...typo.body2,
          }}
        >
          Seek medical attention if contractions are less than 5 minutes apart
        </Text>
      </Card.Content>
    </Card>
  );
};

// Main Screen Component
export default function LogContractionScreen() {
  const router = useRouter();
  const { colors, typo, layout } = useTheme();
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <CustomAppBar
        title="Log Uterine Contractions"
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
            Save Contraction Log
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
