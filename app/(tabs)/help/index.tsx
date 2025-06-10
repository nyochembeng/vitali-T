import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Text, TextInput, Button, Card, Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";
import { MaterialIcons } from "@expo/vector-icons";
import CustomAppBar from "@/components/utils/CustomAppBar";

interface SupportFormData {
  category: string;
  subject: string;
  description: string;
  screenshot?: DocumentPicker.DocumentPickerAsset;
  contact?: string;
}

export default function ContactSupportScreen() {
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [screenshot, setScreenshot] =
    useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [loading, setLoading] = useState(false);

  const categories = [
    "Technical Issue",
    "Account Problem",
    "Feature Request",
    "Data Sync",
    "Billing",
    "Other",
  ];

  const handleScreenshotUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        setScreenshot(result.assets[0]);
      }
    } catch (error) {
      console.error("Error picking screenshot:", error);
    }
  };

  const handleSubmit = async () => {
    if (!category || !subject || !description) return;

    setLoading(true);

    const formData: SupportFormData = {
      category,
      subject,
      description,
      screenshot: screenshot || undefined,
      contact: contact || undefined,
    };

    try {
      // Make API call to submit support request
      // Example: await api.submitSupportRequest(formData);
      console.log("Submitting support request:", formData);
      // Reset form on success
      setCategory("");
      setSubject("");
      setDescription("");
      setContact("");
      setScreenshot(null);
    } catch (error) {
      console.error("Error submitting support request:", error);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = category && subject && description;

  return (
    <SafeAreaView style={styles.container}>
      <CustomAppBar title="Contact Support" rightAction="notifications" />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Need help? Let us know how we can assist you.
          </Text>

          <View style={styles.form}>
            {/* Issue Category Dropdown */}
            <View style={styles.field}>
              <Text variant="labelLarge" style={styles.label}>
                Issue Category
              </Text>
              <Card style={styles.dropdownCard}>
                <Card.Content style={styles.dropdownContent}>
                  <Text style={styles.dropdownText}>
                    {category || "Select category"}
                  </Text>
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    size={24}
                    color="#666"
                  />
                </Card.Content>
              </Card>
            </View>

            {/* Subject */}
            <View style={styles.field}>
              <Text variant="labelLarge" style={styles.label}>
                Subject
              </Text>
              <TextInput
                mode="outlined"
                placeholder="Briefly describe your issue"
                value={subject}
                onChangeText={setSubject}
                style={styles.input}
                outlineStyle={styles.inputOutline}
              />
            </View>

            {/* Description */}
            <View style={styles.field}>
              <Text variant="labelLarge" style={styles.label}>
                Describe the Issue
              </Text>
              <TextInput
                mode="outlined"
                placeholder="Please include any relevant details, steps to reproduce, or screenshots."
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={6}
                style={[styles.input, styles.textArea]}
                outlineStyle={styles.inputOutline}
              />
            </View>

            {/* Screenshot Upload */}
            <View style={styles.field}>
              <Text variant="labelLarge" style={styles.label}>
                Attach Screenshot (Optional)
              </Text>
              <Card style={styles.uploadCard} onPress={handleScreenshotUpload}>
                <Card.Content style={styles.uploadContent}>
                  <MaterialIcons name="camera-alt" size={24} color="#666" />
                  <Text style={styles.uploadText}>
                    {screenshot ? screenshot.name : "Upload screenshot"}
                  </Text>
                </Card.Content>
              </Card>
            </View>

            {/* Contact Info */}
            <View style={styles.field}>
              <Text variant="labelLarge" style={styles.label}>
                Contact Email or Phone (Optional)
              </Text>
              <TextInput
                mode="outlined"
                placeholder="So we can follow up if needed"
                value={contact}
                onChangeText={setContact}
                keyboardType="email-address"
                style={styles.input}
                outlineStyle={styles.inputOutline}
              />
            </View>

            {/* Submit Button */}
            <Button
              mode="contained"
              onPress={handleSubmit}
              loading={loading}
              disabled={!isFormValid || loading}
              style={styles.submitButton}
              labelStyle={styles.submitButtonText}
            >
              Submit Report
            </Button>
          </View>

          <Divider style={styles.divider} />

          {/* Response Time */}
          <View style={styles.responseInfo}>
            <MaterialIcons name="schedule" size={20} color="#666" />
            <Text variant="bodyMedium" style={styles.responseText}>
              We aim to respond within 24 hours
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  flex: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  subtitle: {
    color: "#374151",
    marginTop: 24,
    marginBottom: 32,
    lineHeight: 24,
  },
  form: {
    gap: 24,
  },
  field: {
    gap: 8,
  },
  label: {
    color: "#374151",
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#FFFFFF",
  },
  inputOutline: {
    borderColor: "#E5E7EB",
    borderWidth: 1,
  },
  textArea: {
    minHeight: 120,
  },
  dropdownCard: {
    backgroundColor: "#FFFFFF",
    elevation: 0,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  dropdownContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  dropdownText: {
    fontSize: 16,
    color: "#9CA3AF",
  },
  uploadCard: {
    backgroundColor: "#FFFFFF",
    elevation: 0,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
  },
  uploadContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingVertical: 20,
  },
  uploadText: {
    fontSize: 16,
    color: "#666",
  },
  submitButton: {
    backgroundColor: "#8B7355",
    marginTop: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  divider: {
    marginVertical: 32,
    backgroundColor: "#E5E7EB",
  },
  responseInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 32,
  },
  responseText: {
    color: "#6B7280",
    fontSize: 14,
  },
});
