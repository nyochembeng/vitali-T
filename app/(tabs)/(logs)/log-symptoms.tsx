import React, { useState } from "react";
import { View, ScrollView, Alert } from "react-native";
import { Text, Button, TextInput, Menu } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import Slider from "@react-native-community/slider";
import * as Haptics from "expo-haptics";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useRouter } from "expo-router";
import { useTheme } from "@/lib/hooks/useTheme";

// Types
interface SymptomData {
  symptom: string;
  severity: number;
  notes: string;
}

// Sample symptoms list
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

// Severity emojis
const SEVERITY_EMOJIS = ["😊", "🙂", "😐", "😟", "😣"];

// Components
const HeroImage: React.FC = () => {
  const { layout } = useTheme();
  return (
    <View
      style={{
        marginBottom: layout.spacing.lg,
        borderRadius: layout.borderRadius.medium,
        overflow: "hidden",
      }}
    >
      {/* <Image
        source={require("./assets/symptom-hero.jpg")} // Replace with your image
        style={{ width: "100%", height: layout.spacing.xxl * 9 }}
        contentFit="cover"
      /> */}
    </View>
  );
};

const SymptomSelector: React.FC<{
  selectedSymptom: string;
  onSelect: (symptom: string) => void;
}> = ({ selectedSymptom, onSelect }) => {
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
    </View>
  );
};

const SeveritySlider: React.FC<{
  severity: number;
  onSeverityChange: (value: number) => void;
}> = ({ severity, onSeverityChange }) => {
  const { colors, typo, layout } = useTheme();

  const handleValueChange = (value: number) => {
    onSeverityChange(Math.round(value));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

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
              {
                fontSize: typo.h4.fontSize,
                opacity: 0.4,
                ...typo.h4,
              },
              severity === index && {
                opacity: 1,
                transform: [{ scale: 1.2 }],
              },
            ]}
          >
            {emoji}
          </Text>
        ))}
      </View>

      <View
        style={{
          paddingHorizontal: layout.spacing.sm,
        }}
      >
        <Slider
          style={{ width: "100%", height: layout.spacing.xl }}
          minimumValue={0}
          maximumValue={4}
          value={severity}
          onValueChange={handleValueChange}
          step={1}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.border}
          thumbTintColor={colors.primary}
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
}> = ({ notes, onNotesChange }) => {
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
        outlineColor={colors.border}
        activeOutlineColor={colors.primary}
      />
    </View>
  );
};

// Main Screen Component
export default function LogSymptomScreen() {
  const router = useRouter();
  const { colors, typo, layout } = useTheme();
  const [symptomData, setSymptomData] = useState<SymptomData>({
    symptom: "",
    severity: 2,
    notes: "",
  });

  const handleSymptomSelect = (symptom: string) => {
    setSymptomData((prev) => ({
      ...prev,
      symptom,
    }));
  };

  const handleSeverityChange = (severity: number) => {
    setSymptomData((prev) => ({
      ...prev,
      severity,
    }));
  };

  const handleNotesChange = (notes: string) => {
    setSymptomData((prev) => ({
      ...prev,
      notes,
    }));
  };

  const handleSaveSymptom = () => {
    if (!symptomData.symptom) {
      Alert.alert("Missing Information", "Please select a symptom.");
      return;
    }

    // Save logic here
    Alert.alert("Success", "Symptom log saved successfully!");
    console.log("Symptom Data:", symptomData);

    // Reset form
    setSymptomData({
      symptom: "",
      severity: 2,
      notes: "",
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
        title="Log Symptoms"
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
          padding: layout.spacing.sm,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <HeroImage />

          <SymptomSelector
            selectedSymptom={symptomData.symptom}
            onSelect={handleSymptomSelect}
          />

          <SeveritySlider
            severity={symptomData.severity}
            onSeverityChange={handleSeverityChange}
          />

          <NotesInput
            notes={symptomData.notes}
            onNotesChange={handleNotesChange}
          />

          <Button
            mode="contained"
            onPress={handleSaveSymptom}
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
            Save Symptom Log
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
