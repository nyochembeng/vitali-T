import CustomAppBar from "@/components/utils/CustomAppBar";
import { useTheme } from "@/lib/hooks/useTheme";
import { useAuth } from "@/lib/hooks/useAuth";
import {
  FetalMovement,
  fetalMovementSchema,
} from "@/lib/schemas/fetalMovementSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, ScrollView, View } from "react-native";
import {
  Button,
  Card,
  IconButton,
  Text,
  TextInput,
  Portal,
  Dialog,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCreateFetalMovementMutation } from "@/lib/features/fetal-movements/fetalMovementsService";
import Toast from "react-native-toast-message";

const HeroImage: React.FC = () => {
  const { layout } = useTheme();

  return (
    <View
      style={{
        marginBottom: layout.spacing.lg,
        borderRadius: layout.borderRadius.medium,
        overflow: "hidden",
      }}
    ></View>
  );
};

const KickCounter: React.FC<{
  count: number;
  onPress: () => void;
  isActive: boolean;
  disabled: boolean;
}> = ({ count, onPress, isActive, disabled }) => {
  const { colors, typo, layout } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={!isActive || disabled}
      style={[
        { alignItems: "center", marginBottom: layout.spacing.lg },
        (!isActive || disabled) && { opacity: 0.6 },
      ]}
    >
      <View
        style={{
          width: layout.spacing.xl * 5,
          height: layout.spacing.xl * 5,
          borderRadius: layout.borderRadius.full,
          backgroundColor: colors.primaryLight,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: typo.h1.fontSize,
            fontWeight: "700",
            color: colors.text,
            marginBottom: layout.spacing.xs,
            ...typo.h1,
          }}
        >
          {count}
        </Text>
        <Text
          style={{
            fontSize: typo.body2.fontSize,
            color: colors.text,
            fontWeight: "500",
            ...typo.body2,
          }}
        >
          Kicks Counted
        </Text>
      </View>
    </Pressable>
  );
};

const SessionStatus: React.FC<{
  isActive: boolean;
  duration: string;
  onToggle: () => void;
  disabled: boolean;
}> = ({ isActive, duration, onToggle, disabled }) => {
  const { colors, typo, layout } = useTheme();

  return (
    <View style={{ alignItems: "center", marginBottom: layout.spacing.lg }}>
      <Button
        mode="contained"
        onPress={onToggle}
        style={{
          backgroundColor: colors.primary,
          borderRadius: layout.borderRadius.large,
          paddingHorizontal: layout.spacing.lg,
          paddingVertical: layout.spacing.xs,
          marginBottom: layout.spacing.sm,
        }}
        labelStyle={{
          fontSize: typo.button.fontSize,
          fontWeight: "600",
          color: colors.textInverse,
          ...typo.button,
        }}
        disabled={disabled}
      >
        {isActive ? "Stop Counting" : "Start Counting"}
      </Button>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <IconButton icon="clock-outline" size={16} iconColor={colors.text} />
        <Text
          style={{
            fontSize: typo.body2.fontSize,
            color: colors.text,
            marginLeft: layout.spacing.xs,
            ...typo.body2,
          }}
        >
          Session Duration: {duration}
        </Text>
      </View>
    </View>
  );
};

const NotesSection: React.FC<{
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled: boolean;
}> = ({ value, onChange, error, disabled }) => {
  const { colors, typo, layout } = useTheme();

  return (
    <View style={{ marginBottom: layout.spacing.lg }}>
      <Text
        style={{
          fontSize: typo.body1.fontSize,
          fontWeight: "500",
          color: colors.text,
          marginBottom: layout.spacing.sm,
        }}
      >
        Add any notes (optional)
      </Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="How are you feeling? Any patterns noticed?"
        multiline
        numberOfLines={4}
        style={{
          backgroundColor: colors.surface,
          minHeight: layout.spacing.xl * 4,
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
            marginTop: layout.spacing.sm,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const TipCard: React.FC = () => {
  const { colors, typo, layout } = useTheme();

  return (
    <Card
      style={{
        backgroundColor: colors.card,
        elevation: 0,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: layout.borderRadius.medium,
      }}
    >
      <Card.Content
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          paddingVertical: layout.spacing.sm,
        }}
      >
        <IconButton
          icon="lightbulb-outline"
          size={20}
          iconColor={colors.primary}
        />
        <Text
          style={{
            flex: 1,
            fontSize: typo.body2.fontSize,
            color: colors.text,
            marginLeft: layout.spacing.sm,
            lineHeight: typo.body2.lineHeight,
            ...typo.body2,
          }}
        >
          <Text
            style={{ fontWeight: "600", color: colors.primary, ...typo.body2 }}
          >
            Tip:
          </Text>{" "}
          Best time to count is when baby is usually active. Try to count for at
          least 2 hours.
        </Text>
      </Card.Content>
    </Card>
  );
};

export default function LogFetalMovementScreen() {
  const router = useRouter();
  const { colors, typo, layout } = useTheme();
  const { user, isActionQueued } = useAuth();
  const [createFetalMovement, { isLoading }] = useCreateFetalMovementMutation();
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FetalMovement>({
    resolver: zodResolver(fetalMovementSchema),
    defaultValues: {
      sessionId: "",
      userId: user?.userId || "",
      deviceId: "VT-001",
      kickCount: 0,
      sessionDuration: "00:00",
      notes: "",
      startTime: undefined,
      timestamp: new Date().toISOString(),
    },
  });

  useEffect(() => {
    let interval: number | undefined;

    if (isSessionActive) {
      interval = setInterval(() => {
        const startTime = control._formValues.startTime;
        if (startTime) {
          const now = new Date();
          const diff = Math.floor(
            (now.getTime() - new Date(startTime).getTime()) / 1000
          );
          const mins = Math.floor(diff / 60);
          const secs = diff % 60;
          setValue(
            "sessionDuration",
            `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
          );
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSessionActive, setValue, control._formValues.startTime]);

  const handleToggleSession = () => {
    if (isActionQueued) return;
    if (isSessionActive) {
      setIsSessionActive(false);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } else {
      setIsSessionActive(true);
      setValue("startTime", new Date().toISOString());
      setValue("kickCount", 0);
      setValue("sessionDuration", "00:00");
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleKickCount = () => {
    if (!isSessionActive || isActionQueued) return;
    setValue("kickCount", control._formValues.kickCount + 1);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const onSubmit = async (data: FetalMovement) => {
    if (isActionQueued) return;
    try {
      if (data.kickCount === 0) {
        Toast.show({
          type: "error",
          text1: "No Movements",
          text2: "Please count some movements before saving.",
        });
        return;
      }

      const validatedData = fetalMovementSchema.parse({
        ...data,
        userId: user?.userId,
        timestamp: new Date().toISOString(),
      });

      await createFetalMovement({
        userId: validatedData.userId,
        deviceId: validatedData.deviceId,
        kickCount: validatedData.kickCount,
        sessionDuration: validatedData.sessionDuration,
        notes: validatedData.notes,
        startTime: validatedData.startTime,
        timestamp: validatedData.timestamp,
      }).unwrap();

      reset({
        sessionId: "",
        userId: user?.userId || "",
        deviceId: "VT-001",
        kickCount: 0,
        sessionDuration: "00:00",
        notes: "",
        startTime: undefined,
        timestamp: new Date().toISOString(),
      });
      setIsSessionActive(false);

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setShowSuccessDialog(true);
    } catch (error: any) {
      if (error.message === "ACTION_QUEUED") {
        reset({
          sessionId: "",
          userId: user?.userId || "",
          deviceId: "VT-001",
          kickCount: 0,
          sessionDuration: "00:00",
          notes: "",
          startTime: undefined,
          timestamp: new Date().toISOString(),
        });
        setIsSessionActive(false);
        setShowSuccessDialog(true);
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to save fetal movement session.",
        });
      }
    }
  };

  const handleDialogDismiss = () => {
    setShowSuccessDialog(false);
    router.push("/fetal-movements-history");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomAppBar
        title="Log Fetal Movements"
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
          <HeroImage />
          <Controller
            control={control}
            name="kickCount"
            render={({ field: { value } }) => (
              <KickCounter
                count={value}
                onPress={handleKickCount}
                isActive={isSessionActive}
                disabled={isActionQueued}
              />
            )}
          />
          <Controller
            control={control}
            name="sessionDuration"
            render={({ field: { value } }) => (
              <SessionStatus
                isActive={isSessionActive}
                duration={value}
                onToggle={handleToggleSession}
                disabled={isActionQueued}
              />
            )}
          />
          <Controller
            control={control}
            name="notes"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <NotesSection
                value={value || ""}
                onChange={onChange}
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
            Save Session
          </Button>
          <TipCard />
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
                ? "Your fetal movement session has been queued and will be saved when you're back online."
                : "Your fetal movement session has been saved successfully!"}
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
