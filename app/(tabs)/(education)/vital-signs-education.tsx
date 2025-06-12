import { VitalSignCard } from "@/components/education/VitalSignCard";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { HeroImage } from "@/components/utils/HeroImage";
import { SearchBar } from "@/components/utils/SearchBar";
import React, { useState, useMemo } from "react";
import { View, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/lib/hooks/useTheme";

interface VitalSign {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

const vitalSigns: VitalSign[] = [
  {
    id: "1",
    title: "Fetal Heart Rate (FHR)",
    subtitle: "Baby's heartbeat measurement",
    icon: "favorite",
  },
  {
    id: "2",
    title: "Maternal Heart Rate (MHR)",
    subtitle: "Mother's heart rate monitoring",
    icon: "person",
  },
  {
    id: "3",
    title: "Blood Pressure (BP)",
    subtitle: "Systolic & diastolic pressure",
    icon: "add-box",
  },
  {
    id: "4",
    title: "Oxygen Saturation (SpO₂)",
    subtitle: "Blood oxygen levels",
    icon: "healing",
  },
  {
    id: "5",
    title: "Body Temperature",
    subtitle: "Core body temperature",
    icon: "edit",
  },
  {
    id: "6",
    title: "Respiratory Rate (RR)",
    subtitle: "Breaths per minute",
    icon: "air",
  },
  {
    id: "7",
    title: "Heart Rate Variability (HRV)",
    subtitle: "Heart rhythm patterns",
    icon: "show-chart",
  },
  {
    id: "8",
    title: "Shock Index",
    subtitle: "Cardiovascular status indicator",
    icon: "favorite-border",
  },
];

export default function VitalSignsEducationScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const { colors, typo, layout } = useTheme();

  const filteredVitalSigns = useMemo(() => {
    if (!searchQuery.trim()) return vitalSigns;

    return vitalSigns.filter(
      (vital) =>
        vital.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vital.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleVitalSignPress = (vitalSign: VitalSign) => {
    console.log("Navigate to:", vitalSign.id);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <CustomAppBar title="Vital Signs" rightAction="help" />

      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: layout.spacing.lg,
        }}
        contentContainerStyle={{
          paddingBottom: layout.spacing.xxl,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            paddingHorizontal: layout.spacing.sm,
            paddingTop: layout.spacing.sm,
            paddingBottom: layout.spacing.xs,
          }}
        >
          <Text
            variant="headlineMedium"
            style={{
              fontWeight: "700",
              color: colors.text,
              textAlign: "center",
              marginBottom: layout.spacing.sm,
              ...typo.h4,
            }}
          >
            Understand Your Vitals
          </Text>
          <Text
            variant="bodyLarge"
            style={{
              color: colors.text,
              textAlign: "center",
              lineHeight: typo.body1.lineHeight,
              ...typo.body1,
            }}
          >
            Tap on a card to learn what each vital sign means for you.
          </Text>
        </View>

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search a vital sign..."
        />

        {/* <HeroImage source="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop" /> */}

        <View
          style={{
            paddingHorizontal: layout.spacing.sm,
            paddingBottom: layout.spacing.lg,
          }}
        >
          {filteredVitalSigns.map((vitalSign) => (
            <VitalSignCard
              key={vitalSign.id}
              vitalSign={vitalSign}
              onPress={() => handleVitalSignPress(vitalSign)}
            />
          ))}
        </View>

        {filteredVitalSigns.length === 0 && (
          <View
            style={{
              alignItems: "center",
              paddingVertical: layout.spacing.xl,
              paddingHorizontal: layout.spacing.sm,
            }}
          >
            <Text
              variant="bodyLarge"
              style={{
                color: colors.text,
                textAlign: "center",
                ...typo.body1,
              }}
            >
              {`No vital signs found matching "${searchQuery}"`}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
