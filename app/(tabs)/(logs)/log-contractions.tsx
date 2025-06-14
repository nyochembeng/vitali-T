import CustomAppBar from "@/components/utils/CustomAppBar";
import { useTheme } from "@/lib/hooks/useTheme";
import { useAuth } from "@/lib/hooks/useAuth";
import {
  Contraction,
  contractionSchema,
} from "@/lib/schemas/contractionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { Button, Text, TextInput, Portal, Dialog } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCreateContractionMutation } from "@/lib/features/contractions/contractionsService";
import Toast from "react-native-toast-message";

const ContractionTimer: React.FC<{
  onDurationChange: (duration: string) => void;
  onIntervalChange: (interval: string) => void;
  disabled: boolean;
}> = ({ onDurationChange, onIntervalChange, disabled }) => {
  const { colors, typo, layout } = useTheme();
  const [isTiming, setIsTiming] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [lastEndTime, setLastEndTime] = useState<number | null>(null);
  const [duration, setDuration] = useState("00:00");
  const [interval, setInterval] = useState("00:00");

  useEffect(() => {
    let timer: any = null;
    if (isTiming && startTime) {
      timer = global.setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        setDuration(
          `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
        onDurationChange(
          `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isTiming, startTime, onDurationChange]);

  const handleToggle = () => {
    if (disabled) return;
    if (!isTiming) {
      setIsTiming(true);
      setStartTime(Date.now());
      if (lastEndTime) {
        const intervalSeconds = Math.floor((Date.now() - lastEndTime) / 1000);
        const minutes = Math.floor(intervalSeconds / 60);
        const seconds = intervalSeconds % 60;
        setInterval(
          `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
        onIntervalChange(
          `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
      } else {
        setInterval("00:00");
        onIntervalChange("00:00");
      }
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } else {
      setIsTiming(false);
      setLastEndTime(Date.now());
      setStartTime(null);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

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
        Contraction Timer
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: layout.spacing.sm,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: typo.body2.fontSize,
              color: colors.text,
              ...typo.body2,
            }}
          >
            Duration
          </Text>
          <Text
            style={{
              fontSize: typo.h4.fontSize,
              fontWeight: "600",
              color: colors.primary,
              ...typo.h4,
            }}
          >
            {duration}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: typo.body2.fontSize,
              color: colors.text,
              ...typo.body2,
            }}
          >
            Interval
          </Text>
          <Text
            style={{
              fontSize: typo.h4.fontSize,
              fontWeight: "600",
              color: colors.primary,
              ...typo.h4,
            }}
          >
            {interval}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={handleToggle}
        style={{
          backgroundColor: isTiming ? colors.error : colors.success,
          borderRadius: layout.borderRadius.medium,
          padding: layout.spacing.lg,
          alignItems: "center",
          opacity: disabled ? 0.6 : 1,
        }}
        disabled={disabled}
      >
        <Text
          style={{
            fontSize: typo.button.fontSize,
            fontWeight: "600",
            color: colors.textInverse,
            ...typo.button,
          }}
        >
          {isTiming ? "Stop Contraction" : "Start Contraction"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const NotesInput: React.FC<{
  notes: string;
  onNotesChange: (text: string) => void;
  error?: string;
  disabled: boolean;
}> = ({ notes, onNotesChange, error, disabled }) => {
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
        Additional Notes (Optional)
      </Text>
      <TextInput
        value={notes}
        onChangeText={onNotesChange}
        placeholder="Add any details about the contraction..."
        multiline
        numberOfLines={4}
        style={{
          backgroundColor: colors.surface,
          minHeight: layout.spacing.xl * 5,
        }}
        mode="outlined"
        outlineColor={error ? colors.error : colors.border}
        activeOutlineColor={colors.primary}
        error={!!error}
        disabled={disabled}
      />
      {error && (
        <Text
          style={{
            fontSize: typo.caption.fontSize,
            color: colors.error,
            marginTop: layout.spacing.xs,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

export default function LogContractionScreen() {
  const router = useRouter();
  const { colors, typo, layout } = useTheme();
  const { user, isActionQueued } = useAuth();
  const [createContraction, { isLoading }] = useCreateContractionMutation();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Contraction>({
    resolver: zodResolver(contractionSchema),
    defaultValues: {
      contractionId: "",
      userId: user?.userId || "",
      deviceId: "VT-001",
      duration: "00:00",
      interval: "00:00",
      totalTime: undefined,
      notes: "",
      timestamp: new Date().toISOString(),
    },
  });

  const onSubmit = async (data: Contraction) => {
    if (isActionQueued) return;
    try {
      const validatedData = contractionSchema.parse({
        ...data,
        userId: user?.userId,
        timestamp: new Date().toISOString(),
      });

      await createContraction({
        userId: validatedData.userId,
        deviceId: validatedData.deviceId,
        duration: validatedData.duration,
        interval: validatedData.interval,
        totalTime: validatedData.totalTime,
        notes: validatedData.notes,
        timestamp: validatedData.timestamp,
      }).unwrap();

      reset({
        contractionId: "",
        userId: user?.userId || "",
        deviceId: "VT-001",
        duration: "00:00",
        interval: "00:00",
        totalTime: undefined,
        notes: "",
        timestamp: new Date().toISOString(),
      });

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setShowSuccessDialog(true);
    } catch (error: any) {
      if (error.message === "ACTION_QUEUED") {
        reset({
          contractionId: "",
          userId: user?.userId || "",
          deviceId: "VT-001",
          duration: "00:00",
          interval: "00:00",
          totalTime: undefined,
          notes: "",
          timestamp: new Date().toISOString(),
        });
        setShowSuccessDialog(true);
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to save contraction log.",
        });
      }
    }
  };

  const handleDialogDismiss = () => {
    setShowSuccessDialog(false);
    router.push("/contractions-history");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomAppBar
        title="Log Contraction"
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
          <Controller
            control={control}
            name="duration"
            render={({ field: { value, onChange } }) => (
              <Controller
                control={control}
                name="interval"
                render={({
                  field: { value: intervalValue, onChange: onIntervalChange },
                }) => (
                  <ContractionTimer
                    onDurationChange={onChange}
                    onIntervalChange={onIntervalChange}
                    disabled={isActionQueued}
                  />
                )}
              />
            )}
          />
          <Controller
            control={control}
            name="notes"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <NotesInput
                notes={value || ""}
                onNotesChange={onChange}
                error={error?.message}
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
            Save Contraction Log
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
                ? "Your contraction log has been queued and will be saved when you're back online."
                : "Your contraction log has been saved successfully!"}
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
