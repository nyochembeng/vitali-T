import CustomAppBar from "@/components/utils/CustomAppBar";
import { useTheme } from "@/lib/hooks/useTheme";
import { useAuth } from "@/lib/hooks/useAuth";
import { Symptom, symptomSchema } from "@/lib/schemas/symptomSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Slider from "@react-native-community/slider";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import {
  Button,
  Menu,
  Text,
  TextInput,
  Portal,
  Dialog,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCreateSymptomMutation } from "@/lib/features/symptoms/symptomsService";
import Toast from "react-native-toast-message";

const SYMPTOMS = [
  "Nausea",
  "Vomiting",
  "Headache",
  "Back Pain",
  "Heartburn",
  "Constipation",
  "Fatigue",
  "Dizziness",
  "Swelling",
  "Mood Changes",
  "Sleep Issues",
  "Breast Tenderness",
  "Other",
];

const SEVERITY_EMOJIS = ["😊", "🙂", "😐", "😟", "😣"];

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

const SymptomSelector: React.FC<{
  selectedSymptom: string;
  onSelect: (symptom: string) => void;
  error?: string;
}> = ({ selectedSymptom, onSelect, error }) => {
  const { colors, typo, layout } = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);

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
        What symptom are you experiencing?
      </Text>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Button
            mode="outlined"
            onPress={() => setMenuVisible(true)}
            style={{
              borderColor: error ? colors.error : colors.border,
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
            {selectedSymptom || "Select symptom"}
          </Button>
        }
      >
        {SYMPTOMS.map((symptom) => (
          <Menu.Item
            key={symptom}
            onPress={() => {
              onSelect(symptom);
              setMenuVisible(false);
            }}
            title={symptom}
            titleStyle={{ ...typo.body1 }}
          />
        ))}
      </Menu>
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

const SeveritySlider: React.FC<{
  severity: string;
  onSeverityChange: (value: string) => void;
  disabled: boolean;
}> = ({ severity, onSeverityChange, disabled }) => {
  const { colors, typo, layout } = useTheme();

  const handleValueChange = (value: number) => {
    if (disabled) return;
    onSeverityChange(value.toString());
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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
        How severe is it?
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: layout.spacing.sm,
          paddingHorizontal: layout.spacing.sm,
        }}
      >
        {SEVERITY_EMOJIS.map((emoji, index) => (
          <Text
            key={index}
            style={[
              { fontSize: typo.h4.fontSize, opacity: 0.4, ...typo.h4 },
              parseInt(severity) === index && {
                opacity: 1,
                transform: [{ scale: 1.2 }],
              },
            ]}
          >
            {emoji}
          </Text>
        ))}
      </View>
      <View style={{ paddingHorizontal: layout.spacing.sm }}>
        <Slider
          style={{ width: "100%", height: layout.spacing.xl }}
          minimumValue={0}
          maximumValue={4}
          value={parseInt(severity)}
          onValueChange={handleValueChange}
          step={1}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.border}
          thumbTintColor={colors.primary}
          disabled={disabled}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: layout.spacing.xs,
          }}
        >
          <Text
            style={{
              fontSize: typo.body2.fontSize,
              color: colors.text,
              ...typo.body2,
            }}
          >
            Mild
          </Text>
          <Text
            style={{
              fontSize: typo.body2.fontSize,
              color: colors.text,
              ...typo.body2,
            }}
          >
            Severe
          </Text>
        </View>
      </View>
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
        placeholder="Add any details you'd like to share..."
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

export default function LogSymptomScreen() {
  const router = useRouter();
  const { colors, typo, layout } = useTheme();
  const { user, isActionQueued } = useAuth();
  const [createSymptom, { isLoading }] = useCreateSymptomMutation();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Symptom>({
    resolver: zodResolver(symptomSchema),
    defaultValues: {
      symptomId: "",
      userId: user?.userId || "",
      deviceId: "VT-001",
      symptom: "",
      severity: "2",
      notes: "",
      timestamp: new Date().toISOString(),
    },
  });

  const onSubmit = async (data: Symptom) => {
    if (isActionQueued) return;
    try {
      const validatedData = symptomSchema.parse({
        ...data,
        userId: user?.userId,
        timestamp: new Date().toISOString(),
      });

      await createSymptom({
        userId: validatedData.userId,
        deviceId: validatedData.deviceId,
        symptom: validatedData.symptom,
        severity: validatedData.severity,
        notes: validatedData.notes,
        timestamp: validatedData.timestamp,
      }).unwrap();

      reset({
        symptomId: "",
        userId: user?.userId || "",
        deviceId: "VT-001",
        symptom: "",
        severity: "2",
        notes: "",
        timestamp: new Date().toISOString(),
      });

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setShowSuccessDialog(true);
    } catch (error: any) {
      if (error.message === "ACTION_QUEUED") {
        reset({
          symptomId: "",
          userId: user?.userId || "",
          deviceId: "VT-001",
          symptom: "",
          severity: "2",
          notes: "",
          timestamp: new Date().toISOString(),
        });
        setShowSuccessDialog(true);
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to save symptom log.",
        });
      }
    }
  };

  const handleDialogDismiss = () => {
    setShowSuccessDialog(false);
    router.push("/symptom-history");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomAppBar
        title="Log Symptoms"
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
            name="symptom"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <SymptomSelector
                selectedSymptom={value}
                onSelect={onChange}
                error={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="severity"
            render={({ field: { value, onChange } }) => (
              <SeveritySlider
                severity={value}
                onSeverityChange={onChange}
                disabled={isActionQueued}
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
            Save Symptom Log
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
                ? "Your symptom log has been queued and will be saved when you're back online."
                : "Your symptom log has been saved successfully!"}
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
