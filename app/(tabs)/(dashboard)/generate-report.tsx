import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
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
      icon: "moon-outline",
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
    // Handle report generation logic
    console.log("Generating report with:", {
      startDate,
      endDate,
      selectedItems: reportItems.filter((item) => item.checked),
      notes,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomAppBar
        title="Generate Health Report"
        titleIcon={{ name: "help-circle-outline", position: "right" }}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Date Range Section */}
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Select Date Range
              </Text>

              <View style={styles.dateRow}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={setStartDate}
                  style={styles.dateInput}
                />
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={setEndDate}
                  style={styles.dateInput}
                />
              </View>
            </Card.Content>
          </Card>

          {/* Include in Report Section */}
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Include in Report
              </Text>

              {reportItems.map((item) => (
                <View key={item.id} style={styles.checkboxRow}>
                  <Checkbox
                    status={item.checked ? "checked" : "unchecked"}
                    onPress={() => toggleReportItem(item.id)}
                    theme={{ colors: { primary: "#B8860B" } }}
                  />
                  <IconButton
                    icon={item.icon}
                    size={20}
                    iconColor="#B8860B"
                    style={styles.itemIcon}
                  />
                  <Text variant="bodyLarge" style={styles.checkboxLabel}>
                    {item.label}
                  </Text>
                </View>
              ))}
            </Card.Content>
          </Card>

          {/* Additional Notes Section */}
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Additional Notes
              </Text>

              <TextInput
                value={notes}
                onChangeText={setNotes}
                placeholder="Add custom notes to be included in the report"
                multiline
                numberOfLines={4}
                style={styles.notesInput}
                mode="outlined"
                outlineColor="#E0E0E0"
                activeOutlineColor="#B8860B"
              />
            </Card.Content>
          </Card>

          {/* Image Section */}
          <View style={styles.imageContainer}>
            {/* <Image
              source={{
                uri: "https://images.unsplash.com/photo-1584362917165-526a968579e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
              }}
              style={styles.image}
              contentFit="cover"
            /> */}
          </View>

          {/* Generate Button */}
          <Button
            mode="contained"
            onPress={handleGenerateReport}
            style={styles.generateButton}
            buttonColor="#B8860B"
            textColor="#FFFFFF"
            contentStyle={styles.generateButtonContent}
          >
            Generate Report
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  flex: {
    flex: 1,
  },
  header: {
    backgroundColor: "#FFFFFF",
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    color: "#1F2937",
    fontWeight: "600",
    marginBottom: 16,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  dateInput: {
    flex: 1,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  itemIcon: {
    margin: 0,
    marginLeft: -8,
    marginRight: 4,
  },
  checkboxLabel: {
    flex: 1,
    color: "#1F2937",
    marginLeft: 8,
  },
  notesInput: {
    backgroundColor: "#FFFFFF",
  },
  imageContainer: {
    marginVertical: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  generateButton: {
    marginVertical: 16,
    marginBottom: 32,
    borderRadius: 8,
  },
  generateButtonContent: {
    paddingVertical: 8,
  },
});
