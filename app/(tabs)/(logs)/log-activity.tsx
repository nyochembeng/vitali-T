import React, { useState, useEffect } from "react";
import { View, ScrollView, Alert, Pressable } from "react-native";
import { Text, Button, TextInput, Menu, Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Haptics from "expo-haptics";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useRouter } from "expo-router";
import { useTheme } from "@/lib/hooks/useTheme";

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
  const { colors, typo, layout } = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);

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
        Activity Type
      </Text>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Button
            mode="outlined"
            onPress={() => setMenuVisible(true)}
            style={{
              borderColor: colors.border,
              borderRadius: layout.borderRadius.small,
            }}
            contentStyle={{
              justifyContent: "space-between",
              paddingVertical: layout.spacing.xs,
            }}
            labelStyle={{
              fontSize: typo.body1.fontSize,
              color: colors.text,
              ...typo.body1,
            }}
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
            titleStyle={{ ...typo.body1 }}
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
  const { colors, typo, layout } = useTheme();
  const [showPicker, setShowPicker] = useState(false);

  return (
    <View
      style={{
        flex: 1,
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
      <Pressable
        onPress={() => setShowPicker(true)}
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: layout.borderRadius.small,
          padding: layout.spacing.sm,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: typo.body1.fontSize,
            color: colors.text,
            ...typo.body1,
          }}
        >
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

const DurationDisplay: React.FC<{ duration: string }> = ({ duration }) => {
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
        Duration
      </Text>
      <Card
        style={{
          backgroundColor: colors.card,
          elevation: 0,
        }}
      >
        <Card.Content
          style={{
            paddingVertical: layout.spacing.sm,
          }}
        >
          <Text
            style={{
              fontSize: typo.body1.fontSize,
              fontWeight: "500",
              color: colors.text,
              ...typo.body1,
            }}
          >
            {duration}
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
};

const FeelingSelector: React.FC<{
  selectedFeeling: string;
  onSelect: (feeling: string) => void;
}> = ({ selectedFeeling, onSelect }) => {
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
        How did you feel?
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {FEELINGS.map((feeling) => (
          <Pressable
            key={feeling.label}
            onPress={() => {
              onSelect(feeling.label);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            style={[
              {
                alignItems: "center",
                padding: layout.spacing.sm,
                borderRadius: layout.borderRadius.small,
              },
              selectedFeeling === feeling.label && {
                backgroundColor: colors.surface,
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
              {feeling.emoji}
            </Text>
            <Text
              style={{
                fontSize: typo.caption.fontSize,
                color: colors.text,
                ...typo.caption,
              }}
            >
              {feeling.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const QuickSelect: React.FC<{
  onQuickSelect: (activity: string) => void;
}> = ({ onQuickSelect }) => {
  const { colors, typo, layout } = useTheme();

  return (
    <View>
      <Text
        style={{
          fontSize: typo.body1.fontSize,
          fontWeight: "500",
          marginBottom: layout.spacing.xs,
          color: colors.text,
          ...typo.body1,
        }}
      >
        Quick Select
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {QUICK_ACTIVITIES.map((activity) => (
          <Pressable
            key={activity.label}
            onPress={() => onQuickSelect(activity.label)}
            style={{
              width: "30%",
              alignItems: "center",
              padding: layout.spacing.sm,
              backgroundColor: colors.card,
              borderRadius: layout.borderRadius.small,
              marginBottom: layout.spacing.sm,
            }}
          >
            <Text
              style={{
                fontSize: typo.h5.fontSize,
                marginBottom: layout.spacing.xs,
                ...typo.h5,
              }}
            >
              {activity.icon}
            </Text>
            <Text
              style={{
                fontSize: typo.caption.fontSize,
                color: colors.text,
                ...typo.caption,
              }}
            >
              {activity.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default function LogActivityScreen() {
  const router = useRouter();
  const { colors, typo, layout } = useTheme();
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <CustomAppBar
        title="Log Activity"
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
              marginBottom: layout.spacing.lg,
              borderRadius: layout.borderRadius.medium,
              overflow: "hidden",
            }}
          >
            {/* <Image
              source={require("./assets/activity-hero.jpg")}
              style={{ width: "100%", height: layout.spacing.xxl * 9 }}
              contentFit="cover"
            /> */}
          </View>

          <ActivitySelector
            selectedActivity={activityData.type}
            onSelect={(type) => setActivityData((prev) => ({ ...prev, type }))}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: layout.spacing.sm,
              marginBottom: layout.spacing.lg,
            }}
          >
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
              Additional Notes
            </Text>
            <TextInput
              value={activityData.notes}
              onChangeText={(notes) =>
                setActivityData((prev) => ({ ...prev, notes }))
              }
              placeholder="Add any observations or context (e.g., how you felt)..."
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

          <FeelingSelector
            selectedFeeling={activityData.feeling}
            onSelect={(feeling) =>
              setActivityData((prev) => ({ ...prev, feeling }))
            }
          />

          <Button
            mode="contained"
            onPress={handleSave}
            style={{
              backgroundColor: colors.primary,
              borderRadius: layout.borderRadius.medium,
              paddingVertical: layout.spacing.xs,
              marginBottom: layout.spacing.lg,
            }}
            labelStyle={{
              fontSize: typo.button.fontSize,
              fontWeight: "600",
              color: colors.textInverse,
              ...typo.button,
            }}
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
