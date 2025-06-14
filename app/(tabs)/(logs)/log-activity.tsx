import CustomAppBar from "@/components/utils/CustomAppBar";
import { useTheme } from "@/lib/hooks/useTheme";
import { useAuth } from "@/lib/hooks/useAuth";
import { Activity, activitySchema } from "@/lib/schemas/activitySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Pressable,
  TextInput as RNTextInput,
  ScrollView,
  View,
} from "react-native";
import {
  Button,
  Card,
  Menu,
  Text,
  TextInput,
  Portal,
  Dialog,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCreateActivityMutation } from "@/lib/features/activity/activityService";
import Toast from "react-native-toast-message";

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

const ActivitySelector: React.FC<{
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled: boolean;
}> = ({ value, onChange, error, disabled }) => {
  const { colors, typo, layout } = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={{ marginBottom: layout.spacing.lg }}>
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: layout.spacing.sm,
        }}
      >
        <RNTextInput
          value={value}
          onChangeText={onChange}
          placeholder="Enter or select activity"
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: error ? colors.error : colors.border,
            borderRadius: layout.borderRadius.small,
            padding: layout.spacing.sm,
            fontSize: typo.body1.fontSize,
            color: colors.text,
            backgroundColor: colors.surface,
          }}
          editable={!disabled}
        />
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Button
              mode="outlined"
              onPress={() => !disabled && setMenuVisible(true)}
              style={{
                borderColor: colors.border,
                borderRadius: layout.borderRadius.small,
              }}
              contentStyle={{ paddingVertical: 4 }}
              labelStyle={{
                fontSize: typo.body1.fontSize,
                color: colors.text,
                ...typo.body1,
              }}
              icon="chevron-down"
              disabled={disabled}
            >
              Select
            </Button>
          }
        >
          {ACTIVITIES.map((activity) => (
            <Menu.Item
              key={activity}
              onPress={() => {
                onChange(activity);
                setMenuVisible(false);
              }}
              title={activity}
              titleStyle={{ ...typo.body1 }}
            />
          ))}
        </Menu>
      </View>
      {error && (
        <Text
          style={{
            color: colors.error,
            fontSize: typo.caption.fontSize,
            marginTop: layout.spacing.xs,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const TimeSelector: React.FC<{
  label: string;
  value: string | null | undefined;
  onChange: (value: string | null | undefined) => void;
  disabled: boolean;
}> = ({ label, value, onChange, disabled }) => {
  const { colors, typo, layout } = useTheme();
  const [showPicker, setShowPicker] = useState(false);

  return (
    <View style={{ flex: 1 }}>
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
        onPress={() => !disabled && setShowPicker(true)}
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: layout.borderRadius.small,
          padding: layout.spacing.sm,
          alignItems: "center",
          opacity: disabled ? 0.6 : 1,
        }}
      >
        <Text
          style={{
            fontSize: typo.body1.fontSize,
            color: colors.text,
            ...typo.body1,
          }}
        >
          {value
            ? new Date(value).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "--:--"}
        </Text>
      </Pressable>
      {showPicker && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowPicker(false);
            onChange(selectedTime ? selectedTime.toISOString() : undefined);
          }}
        />
      )}
    </View>
  );
};

const DurationDisplay: React.FC<{ duration: string }> = ({ duration }) => {
  const { colors, typo, layout } = useTheme();

  return (
    <View style={{ marginBottom: layout.spacing.lg }}>
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
      <Card style={{ backgroundColor: colors.card, elevation: 0 }}>
        <Card.Content style={{ paddingVertical: layout.spacing.sm }}>
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
  value: Activity["feeling"];
  onChange: (value: Activity["feeling"]) => void;
  disabled: boolean;
}> = ({ value, onChange, disabled }) => {
  const { colors, typo, layout } = useTheme();

  return (
    <View style={{ marginBottom: layout.spacing.lg }}>
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
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {FEELINGS.map((feeling) => (
          <Pressable
            key={feeling.label}
            onPress={() => {
              if (!disabled) {
                onChange(feeling.label as Activity["feeling"]);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }
            }}
            style={[
              {
                alignItems: "center",
                padding: layout.spacing.sm,
                borderRadius: layout.borderRadius.small,
              },
              value === feeling.label && { backgroundColor: colors.surface },
              disabled && { opacity: 0.6 },
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
  disabled: boolean;
}> = ({ onQuickSelect, disabled }) => {
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
            onPress={() => !disabled && onQuickSelect(activity.label)}
            style={{
              width: "30%",
              alignItems: "center",
              padding: layout.spacing.sm,
              backgroundColor: colors.card,
              borderRadius: layout.borderRadius.small,
              marginBottom: layout.spacing.sm,
              opacity: disabled ? 0.6 : 1,
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
  const { user, isActionQueued } = useAuth();
  const [createActivity, { isLoading }] = useCreateActivityMutation();
  const [duration, setDuration] = useState("0 minutes");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<Activity>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      activityId: "",
      userId: user?.userId || "",
      deviceId: "VT-001",
      type: "",
      startTime: undefined,
      endTime: undefined,
      duration: "0 minutes",
      notes: "",
      feeling: undefined,
      timestamp: new Date().toISOString(),
    },
  });

  useEffect(() => {
    const startTime = control._formValues.startTime;
    const endTime = control._formValues.endTime;
    if (startTime && endTime) {
      const start = new Date(startTime);
      const end = new Date(endTime);
      const diff = end.getTime() - start.getTime();
      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(minutes / 60);
      const newDuration =
        hours > 0
          ? `${hours} hours ${minutes % 60} minutes`
          : `${minutes} minutes`;
      setDuration(newDuration);
      setValue("duration", newDuration);
    }
  }, [control._formValues.startTime, control._formValues.endTime, setValue]);

  const onSubmit = async (data: Activity) => {
    if (isActionQueued) return;
    try {
      const validatedData = activitySchema.parse({
        ...data,
        userId: user?.userId,
        timestamp: new Date().toISOString(),
      });

      await createActivity({
        userId: validatedData.userId,
        deviceId: validatedData.deviceId,
        type: validatedData.type,
        startTime: validatedData.startTime,
        endTime: validatedData.endTime,
        duration: validatedData.duration,
        notes: validatedData.notes,
        feeling: validatedData.feeling,
        timestamp: validatedData.timestamp,
      }).unwrap();

      reset({
        activityId: "",
        userId: user?.userId || "",
        deviceId: "VT-001",
        type: "",
        startTime: undefined,
        endTime: undefined,
        duration: "0 minutes",
        notes: "",
        feeling: undefined,
        timestamp: new Date().toISOString(),
      });
      setDuration("0 minutes");

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setShowSuccessDialog(true);
    } catch (error: any) {
      if (error.message === "ACTION_QUEUED") {
        reset({
          activityId: "",
          userId: user?.userId || "",
          deviceId: "VT-001",
          type: "",
          startTime: undefined,
          endTime: undefined,
          duration: "0 minutes",
          notes: "",
          feeling: undefined,
          timestamp: new Date().toISOString(),
        });
        setDuration("0 minutes");
        setShowSuccessDialog(true);
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to save activity log.",
        });
      }
    }
  };

  const handleQuickSelect = (activity: string) => {
    if (isActionQueued) return;
    setValue("type", activity);
    setValue("startTime", new Date().toISOString());
  };

  const handleDialogDismiss = () => {
    setShowSuccessDialog(false);
    router.push("/activity-history");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomAppBar
        title="Log Activity"
        rightAction="info"
        onInfoPress={() =>
          !isActionQueued && router.push("/vital-signs-education")
        }
      />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: layout.spacing.lg }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <View
            style={{
              marginBottom: layout.spacing.lg,
              borderRadius: layout.borderRadius.medium,
              overflow: "hidden",
            }}
          ></View>
          <Controller
            control={control}
            name="type"
            render={({ field: { value, onChange } }) => (
              <ActivitySelector
                value={value}
                onChange={onChange}
                error={errors.type?.message}
                disabled={isActionQueued}
              />
            )}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: layout.spacing.sm,
              marginBottom: layout.spacing.lg,
            }}
          >
            <Controller
              control={control}
              name="startTime"
              render={({ field: { value, onChange } }) => (
                <TimeSelector
                  label="Start Time"
                  value={value}
                  onChange={onChange}
                  disabled={isActionQueued}
                />
              )}
            />
            <Controller
              control={control}
              name="endTime"
              render={({ field: { value, onChange } }) => (
                <TimeSelector
                  label="End Time"
                  value={value}
                  onChange={onChange}
                  disabled={isActionQueued}
                />
              )}
            />
          </View>
          <DurationDisplay duration={duration} />
          <Controller
            control={control}
            name="notes"
            render={({ field: { value, onChange } }) => (
              <View style={{ marginBottom: layout.spacing.lg }}>
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
                  value={value}
                  onChangeText={onChange}
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
                  error={!!errors.notes}
                  disabled={isActionQueued}
                />
                {errors.notes && (
                  <Text
                    style={{
                      color: colors.error,
                      fontSize: typo.caption.fontSize,
                      marginTop: layout.spacing.xs,
                    }}
                  >
                    {errors.notes.message}
                  </Text>
                )}
              </View>
            )}
          />
          <Controller
            control={control}
            name="feeling"
            render={({ field: { value, onChange } }) => (
              <FeelingSelector
                value={value}
                onChange={onChange}
                disabled={isActionQueued}
              />
            )}
          />
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
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
            disabled={isActionQueued || isLoading}
            loading={isLoading}
          >
            Save Activity Log
          </Button>
          <QuickSelect
            onQuickSelect={handleQuickSelect}
            disabled={isActionQueued}
          />
        </View>
      </ScrollView>
      <Portal>
        <Dialog
          visible={showSuccessDialog}
          onDismiss={handleDialogDismiss}
          style={{ backgroundColor: colors.card }}
        >
          <Dialog.Title
            style={{
              fontSize: typo.h4.fontSize,
              fontWeight: "600",
              color: colors.text,
              ...typo.h4,
            }}
          >
            Success
          </Dialog.Title>
          <Dialog.Content>
            <Text
              style={{
                fontSize: typo.body1.fontSize,
                color: colors.text,
                lineHeight: typo.body1.lineHeight,
                ...typo.body1,
              }}
            >
              {isActionQueued
                ? "Your activity log has been queued and will be saved when you're back online."
                : "Your activity log has been saved successfully!"}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={handleDialogDismiss}
              textColor={colors.primary}
              disabled={isActionQueued}
            >
              OK
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
}
