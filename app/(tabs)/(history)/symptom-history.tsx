import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Text, Card, Button, Chip } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import FilterTabs from "@/components/utils/FilterTabs";
import CustomAppBar from "@/components/utils/CustomAppBar";

interface SymptomEntry {
  id: string;
  type: string;
  time: string;
  description: string;
  severity: "Low" | "Medium" | "High";
  icon: keyof typeof MaterialIcons.glyphMap;
}

interface DayGroup {
  date: string;
  symptoms: SymptomEntry[];
}

export default function SymptomsHistoryScreen() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const filterOptions = ["All", "Last Week", "Last Month", "By Type"];

  const symptomGroups: DayGroup[] = [
    {
      date: "May 17, 2025",
      symptoms: [
        {
          id: "1",
          type: "Nausea",
          time: "9:30 AM",
          description: "Morning sickness with mild discomfort",
          severity: "Low",
          icon: "sick",
        },
        {
          id: "2",
          type: "Headache",
          time: "2:15 PM",
          description: "Slight tension headache",
          severity: "Low",
          icon: "psychology",
        },
      ],
    },
    {
      date: "May 16, 2025",
      symptoms: [
        {
          id: "3",
          type: "Dizziness",
          time: "11:45 AM",
          description: "Experienced vertigo while standing",
          severity: "High",
          icon: "3d-rotation",
        },
        {
          id: "4",
          type: "Fatigue",
          time: "4:20 PM",
          description: "Feeling unusually tired",
          severity: "Medium",
          icon: "battery-alert",
        },
        {
          id: "5",
          type: "Fever",
          time: "7:30 PM",
          description: "Slight fever with chills",
          severity: "High",
          icon: "device-thermostat",
        },
      ],
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Low":
        return "#4CAF50";
      case "Medium":
        return "#FF9800";
      case "High":
        return "#F44336";
      default:
        return "#666";
    }
  };

  const getSeverityBackgroundColor = (severity: string) => {
    switch (severity) {
      case "Low":
        return "#E8F5E8";
      case "Medium":
        return "#FFF3E0";
      case "High":
        return "#FFEBEE";
      default:
        return "#f5f5f5";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <CustomAppBar title="Symptoms History" rightAction="notifications" />

      {/* Filter Tabs */}
      <FilterTabs
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        options={filterOptions}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {symptomGroups.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.dayGroup}>
            <Text style={styles.dateHeader}>{group.date}</Text>

            {group.symptoms.map((symptom) => (
              <TouchableOpacity key={symptom.id}>
                <Card style={styles.symptomCard}>
                  <Card.Content style={styles.symptomContent}>
                    <View style={styles.symptomIcon}>
                      <MaterialIcons
                        name={symptom.icon}
                        size={24}
                        color="#8B4513"
                      />
                    </View>

                    <View style={styles.symptomDetails}>
                      <View style={styles.symptomHeader}>
                        <Text style={styles.symptomType}>{symptom.type}</Text>
                        <Chip
                          style={[
                            styles.severityChip,
                            {
                              backgroundColor: getSeverityBackgroundColor(
                                symptom.severity
                              ),
                            },
                          ]}
                          textStyle={[
                            styles.severityText,
                            { color: getSeverityColor(symptom.severity) },
                          ]}
                        >
                          {symptom.severity}
                        </Chip>
                      </View>

                      <View style={styles.timeRow}>
                        <MaterialIcons
                          name="access-time"
                          size={16}
                          color="#666"
                        />
                        <Text style={styles.symptomTime}>{symptom.time}</Text>
                      </View>

                      <Text style={styles.symptomDescription}>
                        {symptom.description}
                      </Text>
                    </View>

                    <MaterialIcons
                      name="chevron-right"
                      size={24}
                      color="#ccc"
                    />
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* Log New Symptom Button */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.logButton}
          labelStyle={styles.logButtonText}
          onPress={() => {}}
          icon="plus"
        >
          Log New Symptom
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  dayGroup: {
    marginBottom: 24,
  },
  dateHeader: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  symptomCard: {
    marginBottom: 12,
    backgroundColor: "#f8f8f8",
    elevation: 0,
  },
  symptomContent: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  symptomIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  symptomDetails: {
    flex: 1,
  },
  symptomHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  symptomType: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  severityChip: {
    height: 24,
  },
  severityText: {
    fontSize: 12,
    fontWeight: "500",
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  symptomTime: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  symptomDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  buttonContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  logButton: {
    backgroundColor: "#8B4513",
    borderRadius: 25,
    paddingVertical: 8,
  },
  logButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
