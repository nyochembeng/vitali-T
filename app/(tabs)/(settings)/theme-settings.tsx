import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Button, RadioButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import CustomAppBar from "@/components/utils/CustomAppBar";

export default function ThemeSettingsScreen() {
  const [selectedTheme, setSelectedTheme] = useState<"light" | "dark">("light");

  const handleSave = () => {
    // Logic to save the selected theme
    console.log(`Selected theme: ${selectedTheme}`);
    // Here you would typically save the theme to a global state or AsyncStorage
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomAppBar title="Theme Settings" rightAction="notifications" />

      <View style={styles.content}>
        {/* Theme Selection */}
        <View style={styles.themeSection}>
          <Text style={styles.sectionTitle}>Choose App Theme</Text>

          {/* Light Mode Option */}
          <TouchableOpacity
            style={[
              styles.themeOption,
              styles.lightThemeOption,
              selectedTheme === "light" && styles.selectedOption,
            ]}
            onPress={() => setSelectedTheme("light")}
          >
            <View style={styles.themeIconContainer}>
              <MaterialIcons name="wb-sunny" size={24} color="#A0826A" />
            </View>
            <Text style={[styles.themeText, styles.lightThemeText]}>
              Light Mode
            </Text>
            <RadioButton
              value="light"
              status={selectedTheme === "light" ? "checked" : "unchecked"}
              onPress={() => setSelectedTheme("light")}
              color="#A0826A"
            />
          </TouchableOpacity>

          {/* Dark Mode Option */}
          <TouchableOpacity
            style={[
              styles.themeOption,
              styles.darkThemeOption,
              selectedTheme === "dark" && styles.selectedDarkOption,
            ]}
            onPress={() => setSelectedTheme("dark")}
          >
            <View style={styles.themeIconContainer}>
              <MaterialIcons name="nights-stay" size={24} color="#D4C4B0" />
            </View>
            <Text style={[styles.themeText, styles.darkThemeText]}>
              Dark Mode
            </Text>
            <RadioButton
              value="dark"
              status={selectedTheme === "dark" ? "checked" : "unchecked"}
              onPress={() => setSelectedTheme("dark")}
              color="#D4C4B0"
            />
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleSave}
            style={styles.saveButton}
            labelStyle={styles.saveButtonText}
          >
            Save Settings
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  placeholder: {
    width: 48,
  },
  themeSection: {
    marginTop: 32,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  themeOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "transparent",
  },
  lightThemeOption: {
    backgroundColor: "#FFF8F0",
  },
  darkThemeOption: {
    backgroundColor: "#4A3B32",
  },
  selectedOption: {
    borderColor: "#A0826A",
  },
  selectedDarkOption: {
    borderColor: "#D4C4B0",
  },
  themeIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  themeText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
  lightThemeText: {
    color: "#333",
  },
  darkThemeText: {
    color: "#F5F0EC",
  },
  buttonContainer: {
    marginTop: 40,
  },
  saveButton: {
    backgroundColor: "#A0826A",
    borderRadius: 12,
    paddingVertical: 4,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
  },
});
