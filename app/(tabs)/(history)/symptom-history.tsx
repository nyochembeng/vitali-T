import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Text, Card, Button, Chip } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import FilterTabs from "@/components/utils/FilterTabs";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useTheme } from "@/lib/hooks/useTheme";

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
  const { colors, typo, layout } = useTheme();

  const filterOptions = ["All", "Last Week", "Last Month", "By Type"];

  // Updated sample data to reflect current date (June 10, 2025)
  const symptomGroups: DayGroup[] = [
    {
      date: "June 10, 2025",
      symptoms: [
        {
          id: "1",
          type: "Nausea",
          time: "09:30 AM",
          description: "Morning sickness with mild discomfort",
          severity: "Low",
          icon: "sick",
        },
        {
          id: "2",
          type: "Headache",
          time: "02:15 PM",
          description: "Slight tension headache",
          severity: "Low",
          icon: "psychology",
        },
      ],
    },
    {
      date: "June 9, 2025",
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
          time: "04:20 PM",
          description: "Feeling unusually tired",
          severity: "Medium",
          icon: "battery-alert",
        },
        {
          id: "5",
          type: "Fever",
          time: "07:30 PM",
          description: "Slight fever with chills",
          severity: "High",
          icon: "device-thermostat",
        },
      ],
    },
  ];

  const getSeverityColor = (severity: string, colors: any) => {
    switch (severity) {
      case "Low":
        return colors.success;
      case "Medium":
        return colors.warning;
      case "High":
        return colors.error;
      default:
        return colors.text;
    }
  };

  const getSeverityBackgroundColor = (severity: string, colors: any) => {
    switch (severity) {
      case "Low":
        return colors.successLight;
      case "Medium":
        return colors.warningLight;
      case "High":
        return colors.errorLight;
      default:
        return colors.surface;
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <CustomAppBar title="Symptoms History" rightAction="notifications" />

      <FilterTabs
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        options={filterOptions}
      />

      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          paddingHorizontal: layout.spacing.lg,
        }}
        showsVerticalScrollIndicator={false}
      >
        {symptomGroups.map((group, groupIndex) => (
          <View key={groupIndex} style={{ marginBottom: layout.spacing.xl }}>
            <Text
              style={{
                fontSize: typo.h6.fontSize,
                fontWeight: "600",
                color: colors.text,
                marginBottom: layout.spacing.sm,
                ...typo.h6,
              }}
            >
              {group.date}
            </Text>

            {group.symptoms.map((symptom) => (
              <TouchableOpacity key={symptom.id}>
                <Card
                  style={{
                    marginBottom: layout.spacing.sm,
                    backgroundColor: colors.card,
                    elevation: 0,
                  }}
                >
                  <Card.Content
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-start",
                    }}
                  >
                    <View
                      style={{
                        width: layout.spacing.xl * 1.5,
                        height: layout.spacing.xl * 1.5,
                        borderRadius: layout.borderRadius.medium,
                        backgroundColor: colors.surface,
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: layout.spacing.sm,
                      }}
                    >
                      <MaterialIcons
                        name={symptom.icon}
                        size={24}
                        color={colors.primary}
                      />
                    </View>

                    <View style={{ flex: 1 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: layout.spacing.sm,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: typo.h6.fontSize,
                            fontWeight: "600",
                            color: colors.text,
                            ...typo.h6,
                          }}
                        >
                          {symptom.type}
                        </Text>
                        <Chip
                          style={{
                            height: layout.spacing.xl,
                            backgroundColor: getSeverityBackgroundColor(
                              symptom.severity,
                              colors
                            ),
                          }}
                          textStyle={{
                            fontSize: typo.caption.fontSize,
                            fontWeight: "500",
                            color: getSeverityColor(symptom.severity, colors),
                            ...typo.caption,
                          }}
                        >
                          {symptom.severity}
                        </Chip>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: layout.spacing.sm,
                        }}
                      >
                        <MaterialIcons
                          name="access-time"
                          size={16}
                          color={colors.text}
                        />
                        <Text
                          style={{
                            fontSize: typo.body2.fontSize,
                            color: colors.text,
                            marginLeft: layout.spacing.xs,
                            ...typo.body2,
                          }}
                        >
                          {symptom.time}
                        </Text>
                      </View>

                      <Text
                        style={{
                          fontSize: typo.body2.fontSize,
                          color: colors.text,
                          lineHeight: typo.body2.lineHeight,
                          ...typo.body2,
                        }}
                      >
                        {symptom.description}
                      </Text>
                    </View>

                    <MaterialIcons
                      name="chevron-right"
                      size={24}
                      color={colors.text}
                    />
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <View
          style={{
            padding: layout.spacing.sm,
          }}
        >
          <Button
            mode="contained"
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
            onPress={() => {}}
            icon="plus"
          >
            Log New Symptom
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
