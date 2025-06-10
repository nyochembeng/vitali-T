import { VitalSignCard } from "@/components/education/VitalSignCard";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { HeroImage } from "@/components/utils/HeroImage";
import { SearchBar } from "@/components/utils/SearchBar";
import React, { useState, useMemo } from "react";
import { View, StyleSheet, ScrollView, StatusBar } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

interface VitalSign {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
}

const vitalSigns: VitalSign[] = [
  {
    id: "1",
    title: "Fetal Heart Rate (FHR)",
    subtitle: "Baby's heartbeat measurement",
    icon: "favorite",
    color: "#D4A574",
  },
  {
    id: "2",
    title: "Maternal Heart Rate (MHR)",
    subtitle: "Mother's heart rate monitoring",
    icon: "person",
    color: "#C4A484",
  },
  {
    id: "3",
    title: "Blood Pressure (BP)",
    subtitle: "Systolic & diastolic pressure",
    icon: "add-box",
    color: "#B59E94",
  },
  {
    id: "4",
    title: "Oxygen Saturation (SpO₂)",
    subtitle: "Blood oxygen levels",
    icon: "healing",
    color: "#A698A4",
  },
  {
    id: "5",
    title: "Body Temperature",
    subtitle: "Core body temperature",
    icon: "edit",
    color: "#9792B4",
  },
  {
    id: "6",
    title: "Respiratory Rate (RR)",
    subtitle: "Breaths per minute",
    icon: "air",
    color: "#888CC4",
  },
  {
    id: "7",
    title: "Heart Rate Variability (HRV)",
    subtitle: "Heart rhythm patterns",
    icon: "show-chart",
    color: "#7986D4",
  },
  {
    id: "8",
    title: "Shock Index",
    subtitle: "Cardiovascular status indicator",
    icon: "favorite-border",
    color: "#6A80E4",
  },
];

export default function VitalSignsEducationScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVitalSigns = useMemo(() => {
    if (!searchQuery.trim()) return vitalSigns;

    return vitalSigns.filter(
      (vital) =>
        vital.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vital.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleVitalSignPress = (vitalSign: VitalSign) => {
    // Navigate to vital sign detail screen
    console.log("Navigate to:", vitalSign.id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <CustomAppBar title="Vital Signs" rightAction="help" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.title}>
            Understand Your Vitals
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Tap on a card to learn what each vital sign means for you.
          </Text>
        </View>

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search a vital sign..."
        />

        {/* <HeroImage source="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop" /> */}

        <View style={styles.vitalsList}>
          {filteredVitalSigns.map((vitalSign) => (
            <VitalSignCard
              key={vitalSign.id}
              vitalSign={vitalSign}
              onPress={() => handleVitalSignPress(vitalSign)}
            />
          ))}
        </View>

        {filteredVitalSigns.length === 0 && (
          <View style={styles.emptyState}>
            <Text variant="bodyLarge" style={styles.emptyText}>
              {`No vital signs found matching "${searchQuery}"`}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    color: "#6B7280",
    lineHeight: 24,
  },
  vitalsList: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 48,
    paddingHorizontal: 16,
  },
  emptyText: {
    color: "#9CA3AF",
    textAlign: "center",
  },
});
