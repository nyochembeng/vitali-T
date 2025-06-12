import React, { useState } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import {
  Text,
  Card,
  Button,
  TextInput,
  Checkbox,
  IconButton,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import DatePicker from "@/components/utils/DatePicker";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useTheme } from "@/lib/hooks/useTheme";

interface ReportItem {
  id: string;
  label: string;
  icon: string;
  checked: boolean;
}

export default function GenerateReportScreen() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [notes, setNotes] = useState("");
  const { colors, typo, layout } = useTheme();

  const [reportItems, setReportItems] = useState<ReportItem[]>([
    { id: "vitals", label: "Vitals", icon: "heart-outline", checked: true },
    { id: "symptoms", label: "Symptoms", icon: "snowflake", checked: true },
    {
      id: "fetal",
      label: "Fetal Movements",
      icon: "water-outline",
      checked: true,
    },
    { id: "sleep", label: "Sleep", icon: "bed-outline", checked: true },
    { id: "activity", label: "Activity", icon: "walk", checked: true },
    {
      id: "contractions",
      label: "Uterine Contractions",
      icon: "pulse",
      checked: true,
    },
  ]);

  const toggleReportItem = (id: string) => {
    setReportItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleGenerateReport = () => {
    // Handle report generation logic with animation
    console.log("Generating report with:", {
      startDate,
      endDate,
      selectedItems: reportItems.filter((item) => item.checked),
      notes,
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <CustomAppBar title="Generate Health Report" rightAction="help" />

      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={{
            flex: 1,
            paddingHorizontal: layout.spacing.lg,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Date Range Section */}
          <Card
            style={{
              backgroundColor: colors.card,
              marginVertical: layout.spacing.sm,
              borderRadius: layout.borderRadius.medium,
              elevation: layout.elevation,
              shadowColor: colors.text,
              shadowOffset: layout.shadow.light.shadowOffset,
              shadowOpacity: layout.shadow.light.shadowOpacity,
              shadowRadius: layout.shadow.light.shadowRadius,
            }}
          >
            <Card.Content>
              <Text
                variant="titleMedium"
                style={{
                  color: colors.text,
                  fontWeight: "600",
                  marginBottom: layout.spacing.sm,
                  ...typo.subtitle2,
                }}
              >
                Select Date Range
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: layout.spacing.sm,
                }}
              >
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={setStartDate}
                  style={{
                    flex: 1,
                  }}
                />
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={setEndDate}
                  style={{
                    flex: 1,
                  }}
                />
              </View>
            </Card.Content>
          </Card>

          {/* Include in Report Section */}
          <Card
            style={{
              backgroundColor: colors.card,
              marginVertical: layout.spacing.sm,
              borderRadius: layout.borderRadius.medium,
              elevation: layout.elevation,
              shadowColor: colors.text,
              shadowOffset: layout.shadow.light.shadowOffset,
              shadowOpacity: layout.shadow.light.shadowOpacity,
              shadowRadius: layout.shadow.light.shadowRadius,
            }}
          >
            <Card.Content>
              <Text
                variant="titleMedium"
                style={{
                  color: colors.text,
                  fontWeight: "600",
                  marginBottom: layout.spacing.sm,
                  ...typo.subtitle2,
                }}
              >
                Include in Report
              </Text>

              {reportItems.map((item) => (
                <View
                  key={item.id}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: layout.spacing.xs,
                  }}
                >
                  <Checkbox
                    status={item.checked ? "checked" : "unchecked"}
                    onPress={() => toggleReportItem(item.id)}
                    color={colors.primary}
                  />
                  <IconButton
                    icon={item.icon}
                    size={20}
                    iconColor={colors.primary}
                    style={{
                      margin: 0,
                      marginLeft: -layout.spacing.sm,
                      marginRight: layout.spacing.xs,
                    }}
                  />
                  <Text
                    variant="bodyLarge"
                    style={{
                      flex: 1,
                      color: colors.text,
                      marginLeft: layout.spacing.sm,
                      ...typo.body1,
                    }}
                  >
                    {item.label}
                  </Text>
                </View>
              ))}
            </Card.Content>
          </Card>

          {/* Additional Notes Section */}
          <Card
            style={{
              backgroundColor: colors.card,
              marginVertical: layout.spacing.sm,
              borderRadius: layout.borderRadius.medium,
              elevation: layout.elevation,
              shadowColor: colors.text,
              shadowOffset: layout.shadow.light.shadowOffset,
              shadowOpacity: layout.shadow.light.shadowOpacity,
              shadowRadius: layout.shadow.light.shadowRadius,
            }}
          >
            <Card.Content>
              <Text
                variant="titleMedium"
                style={{
                  color: colors.text,
                  fontWeight: "600",
                  marginBottom: layout.spacing.sm,
                  ...typo.subtitle2,
                }}
              >
                Additional Notes
              </Text>

              <TextInput
                value={notes}
                onChangeText={setNotes}
                placeholder="Add custom notes to be included in the report"
                placeholderTextColor={colors.text}
                multiline
                numberOfLines={4}
                style={{
                  backgroundColor: colors.card,
                  ...typo.input,
                }}
                mode="outlined"
                outlineColor={colors.border}
                activeOutlineColor={colors.primary}
              />
            </Card.Content>
          </Card>

          {/* Image Section */}
          <View
            style={{
              marginVertical: layout.spacing.sm,
              borderRadius: layout.borderRadius.medium,
              overflow: "hidden",
            }}
          >
            {/* <Image
              source={{
                uri: "https://images.unsplash.com/photo-1584362917165-526a968579e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
              }}
              style={{
                width: "100%",
                height: 200,
                borderRadius: layout.borderRadius.medium,
              }}
              contentFit="cover"
            /> */}
          </View>

          {/* Generate Button */}
          <Button
            mode="contained"
            onPress={handleGenerateReport}
            style={{
              marginVertical: layout.spacing.sm,
              marginBottom: layout.spacing.lg,
              borderRadius: layout.borderRadius.medium,
            }}
            buttonColor={colors.primary}
            textColor={colors.textInverse}
            contentStyle={{
              paddingVertical: layout.spacing.sm,
            }}
          >
            Generate Report
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
