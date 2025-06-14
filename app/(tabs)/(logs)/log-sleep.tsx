import CustomAppBar from "@/components/utils/CustomAppBar";
import { useTheme } from "@/lib/hooks/useTheme";
import { useAuth } from "@/lib/hooks/useAuth";
import { Sleep, sleepSchema } from "@/lib/schemas/sleepSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, ScrollView, View } from "react-native";
import {
  Button,
  Card,
  Switch,
  Text,
  TextInput,
  Portal,
  Dialog,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCreateSleepMutation } from "@/lib/features/sleep/sleepService";
import Toast from "react-native-toast-message";

const SLEEP_QUALITY = [
  { label: "Very Poor", emoji: "😴" },
  { label: "Poor", emoji: "😔" },
  { label: "Okay", emoji: "🦶" },
  { label: "Good", emoji: "🙂" },
  { label: "Excellent", emoji: "😊" },
];

const TimeSelector: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon: string;
  disabled: boolean;
}> = ({ label, value, onChange, icon, disabled }) => {
  const { colors, typo, layout } = useTheme();
  const [showPicker, setShowPicker] = React.useState(false);

  const parsedTime = value ? new Date(value) : new Date();

  return (
    <View style={{ alignItems: "center", flex: 1 }}>
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
        onPress={() => !disabled && setShowPicker(true)}
        style={{
          width: layout.spacing.xl * 2.5,
          height: layout.spacing.xl * 2.5,
          borderRadius: layout.borderRadius.full,
          backgroundColor: colors.surface,
          justifyContent: "center",
          alignItems: "center",
          opacity: disabled ? 0.6 : 1,
        }}
        disabled={disabled}
      >
        <Text
          style={{ fontSize: typo.h3.fontSize, color: colors.text, ...typo.h3 }}
        >
          {icon}
        </Text>
      </Pressable>
      {showPicker && (
        <DateTimePicker
          value={parsedTime}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowPicker(false);
            if (selectedTime) {
              onChange(selectedTime.toISOString());
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
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
        style={{ alignItems: "center", paddingVertical: layout.spacing.sm }}
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
  disabled: boolean;
}> = ({ selectedQuality, onSelect, disabled }) => {
  const { colors, typo, layout } = useTheme();

  return (
    <View style={{ marginBottom: layout.spacing.lg }}>
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
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {SLEEP_QUALITY.map((quality) => (
          <Pressable
            key={quality.label}
            onPress={() => {
              if (!disabled) {
                onSelect(quality.label);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }
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
              disabled && { opacity: 0.6 },
            ]}
            disabled={disabled}
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
  disabled: boolean;
}> = ({
  hadNap,
  interruptedSleep,
  onNapChange,
  onInterruptedChange,
  disabled,
}) => {
  const { colors, typo, layout } = useTheme();

  return (
    <View style={{ marginBottom: layout.spacing.lg }}>
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
          onValueChange={(value) => {
            if (!disabled) {
              onNapChange(value);
            }
          }}
          thumbColor={hadNap ? colors.primary : colors.card}
          trackColor={{ false: colors.border, true: colors.accentLight }}
          disabled={disabled}
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
          value={hadNap}
          onValueChange={(value) => {
            if (!disabled) {
              onNapChange(value);
            }
          }}
          thumbColor={hadNap ? colors.primary : colors.card}
          trackColor={{ false: colors.border, true: colors.accentLight }}
          disabled={disabled}
        />
      </View>
    </View>
  );
};

export default function LogSleepScreen() {
  const router = useRouter();
  const { colors, typo, layout } = useTheme();
  const { user, isActionQueued } = useAuth();
  const [createSleep, { isLoading }] = useCreateSleepMutation();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<Sleep>({
    resolver: zodResolver(sleepSchema),
    defaultValues: {
      sleepId: "",
      userId: user?.userId || "",
      deviceId: "VT-001",
      sleepStart: "",
      wakeTime: "",
      totalDuration: "",
      quality: undefined,
      notes: "",
      hadNap: false,
      interruptedSleep: false,
      timestamp: new Date().toISOString(),
    },
  });

  const sleepStart = watch("sleepStart");
  const wakeTime = watch("wakeTime");

  useEffect(() => {
    if (sleepStart && wakeTime) {
      const start = new Date(sleepStart);
      const end = new Date(wakeTime);
      let diff = end.getTime() - start.getTime();

      if (diff < 0) {
        diff += 24 * 60 * 60 * 1000;
      }

      const totalMinutes = Math.floor(diff / 60000);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      setValue("totalDuration", `${hours} hours ${minutes} minutes`);
    }
  }, [sleepStart, wakeTime, setValue]);

  const onSubmit = async (data: Sleep) => {
    if (isActionQueued) return;
    try {
      const validatedData = sleepSchema.parse({
        ...data,
        userId: user?.userId,
        timestamp: new Date().toISOString(),
      });

      await createSleep({
        userId: validatedData.userId,
        deviceId: validatedData.deviceId,
        sleepStart: validatedData.sleepStart,
        wakeTime: validatedData.wakeTime,
        totalDuration: validatedData.totalDuration,
        quality: validatedData.quality,
        notes: validatedData.notes,
        hadNap: validatedData.hadNap,
        interruptedSleep: validatedData.interruptedSleep,
        timestamp: validatedData.timestamp,
      }).unwrap();

      reset({
        sleepId: "",
        userId: user?.userId || "",
        deviceId: "VT-001",
        sleepStart: "",
        wakeTime: "",
        totalDuration: "",
        quality: undefined,
        notes: "",
        hadNap: false,
        interruptedSleep: false,
        timestamp: new Date().toISOString(),
      });

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setShowSuccessDialog(true);
    } catch (error: any) {
      if (error.message === "ACTION_QUEUED") {
        reset({
          sleepId: "",
          userId: user?.userId || "",
          deviceId: "VT-001",
          sleepStart: "",
          wakeTime: "",
          totalDuration: "",
          quality: undefined,
          notes: "",
          hadNap: false,
          interruptedSleep: false,
          timestamp: new Date().toISOString(),
        });
        setShowSuccessDialog(true);
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to save sleep log.",
        });
      }
    }
  };

  const handleDialogDismiss = () => {
    setShowSuccessDialog(false);
    router.push("/sleep-history");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomAppBar
        title="Log Sleep"
        rightAction="info"
        onInfoPress={() =>
          !isActionQueued && router.push("/vital-signs-education")
        }
      />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: layout.spacing.sm }}
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
            <Controller
              control={control}
              name="sleepStart"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <View>
                  <TimeSelector
                    label="Sleep Start"
                    value={value}
                    onChange={onChange}
                    icon="🌙"
                    disabled={isActionQueued}
                  />
                  {error && (
                    <Text
                      style={{
                        fontSize: typo.caption.fontSize,
                        color: colors.error,
                        marginTop: layout.spacing.xs,
                        textAlign: "center",
                      }}
                    >
                      {error.message}
                    </Text>
                  )}
                </View>
              )}
            />
            <Controller
              control={control}
              name="wakeTime"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <View>
                  <TimeSelector
                    label="Wake Time"
                    value={value}
                    onChange={onChange}
                    icon="☀️"
                    disabled={isActionQueued}
                  />
                  {error && (
                    <Text
                      style={{
                        fontSize: typo.caption.fontSize,
                        color: colors.error,
                        marginTop: layout.spacing.xs,
                        textAlign: "center",
                      }}
                    >
                      {error.message}
                    </Text>
                  )}
                </View>
              )}
            />
          </View>

          <Controller
            control={control}
            name="totalDuration"
            render={({ field: { value } }) => (
              <DurationCard duration={value || "0 hours 0 minutes"} />
            )}
          />

          <Controller
            control={control}
            name="quality"
            render={({ field: { value, onChange } }) => (
              <QualitySelector
                selectedQuality={value || ""}
                onSelect={onChange}
                disabled={isActionQueued}
              />
            )}
          />

          <Controller
            control={control}
            name="notes"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <View style={{ marginBottom: layout.spacing.lg }}>
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
                  value={value || ""}
                  onChangeText={onChange}
                  placeholder="E.g., woke up often, had vivid dreams, felt rested..."
                  multiline
                  numberOfLines={3}
                  style={{
                    backgroundColor: colors.surface,
                    minHeight: layout.spacing.xl * 3,
                  }}
                  mode="outlined"
                  outlineColor={error ? colors.error : colors.border}
                  activeOutlineColor={colors.primary}
                  error={!!error}
                  disabled={isActionQueued}
                />
                {error && (
                  <Text
                    style={{
                      fontSize: typo.caption.fontSize,
                      color: colors.error,
                      marginTop: layout.spacing.xs,
                    }}
                  >
                    {error.message}
                  </Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="hadNap"
            render={({ field: { value, onChange } }) => (
              <Controller
                control={control}
                name="interruptedSleep"
                render={({
                  field: {
                    value: interruptedSleep,
                    onChange: onInterruptedChange,
                  },
                }) => (
                  <SleepOptions
                    hadNap={value}
                    interruptedSleep={interruptedSleep}
                    onNapChange={onChange}
                    onInterruptedChange={onInterruptedChange}
                    disabled={isActionQueued}
                  />
                )}
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
            Save Sleep Log
          </Button>
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
                ? "Your sleep log has been queued and will be saved when you're back online."
                : "Your sleep log has been saved successfully!"}
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
