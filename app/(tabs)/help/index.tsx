import React, { useState } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Text, TextInput, Button, Card, Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";
import { MaterialIcons } from "@expo/vector-icons";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useTheme } from "@/lib/hooks/useTheme";

interface SupportFormData {
  category: string;
  subject: string;
  description: string;
  screenshot?: DocumentPicker.DocumentPickerAsset;
  contact?: string;
}

export default function ContactSupportScreen() {
  const { colors, typo, layout } = useTheme();
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [screenshot, setScreenshot] =
    useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [loading, setLoading] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

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
      console.log("Submitting support request:", formData);
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <CustomAppBar title="Contact Support" rightAction="notifications" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: layout.spacing.lg,
            paddingTop: layout.spacing.md,
            paddingBottom: layout.spacing.xl,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Text
            style={{
              ...typo.subtitle2,
              color: colors.text,
              textAlign: "left",
              marginTop: layout.spacing.md,
              marginBottom: layout.spacing.lg,
              lineHeight: typo.body1.lineHeight,
            }}
          >
            Need help? Let us know how we can assist you.
          </Text>

          <View style={{ gap: layout.spacing.lg }}>
            {/* Issue Category Dropdown */}
            <View style={{ gap: layout.spacing.sm }}>
              <Text
                style={{
                  ...typo.label,
                  color: colors.text,
                  fontWeight: "600",
                }}
              >
                Issue Category
              </Text>
              <Card
                style={{
                  backgroundColor: colors.card,
                  elevation: 0,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
                onPress={() => setShowCategoryPicker(!showCategoryPicker)}
              >
                <Card.Content
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingVertical: layout.spacing.sm,
                  }}
                >
                  <Text
                    style={{
                      ...typo.body1,
                      color: category ? colors.text : colors.text + "99",
                    }}
                  >
                    {category || "Select category"}
                  </Text>
                  <MaterialIcons
                    name={
                      showCategoryPicker
                        ? "keyboard-arrow-up"
                        : "keyboard-arrow-down"
                    }
                    size={24}
                    color={colors.text}
                  />
                </Card.Content>
              </Card>

              {/* Category Selection Options */}
              {showCategoryPicker && (
                <Card
                  style={{
                    backgroundColor: colors.card,
                    elevation: 2,
                    borderWidth: 1,
                    borderColor: colors.border,
                    marginTop: -layout.spacing.xs,
                  }}
                >
                  {categories.map((cat, index) => (
                    <View key={cat}>
                      <Card.Content
                        style={{
                          paddingVertical: layout.spacing.sm,
                          paddingHorizontal: layout.spacing.md,
                        }}
                      >
                        <Text
                          style={{
                            ...typo.body1,
                            color: colors.text,
                          }}
                          onPress={() => {
                            setCategory(cat);
                            setShowCategoryPicker(false);
                          }}
                        >
                          {cat}
                        </Text>
                      </Card.Content>
                      {index < categories.length - 1 && (
                        <Divider style={{ backgroundColor: colors.border }} />
                      )}
                    </View>
                  ))}
                </Card>
              )}
            </View>

            {/* Subject */}
            <View style={{ gap: layout.spacing.sm }}>
              <Text
                style={{
                  ...typo.label,
                  color: colors.text,
                  fontWeight: "600",
                }}
              >
                Subject
              </Text>
              <TextInput
                mode="outlined"
                placeholder="Briefly describe your issue"
                value={subject}
                onChangeText={setSubject}
                style={{ backgroundColor: colors.card }}
                outlineStyle={{
                  borderColor: colors.border,
                  borderWidth: 1,
                }}
              />
            </View>

            {/* Description */}
            <View style={{ gap: layout.spacing.sm }}>
              <Text
                style={{
                  ...typo.label,
                  color: colors.text,
                  fontWeight: "600",
                }}
              >
                Describe the Issue
              </Text>
              <TextInput
                mode="outlined"
                placeholder="Please include any relevant details, steps to reproduce, or screenshots."
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={6}
                style={{ backgroundColor: colors.card, minHeight: 120 }}
                outlineStyle={{
                  borderColor: colors.border,
                  borderWidth: 1,
                }}
              />
            </View>

            {/* Screenshot Upload */}
            <View style={{ gap: layout.spacing.sm }}>
              <Text
                style={{
                  ...typo.label,
                  color: colors.text,
                  fontWeight: "600",
                }}
              >
                Attach Screenshot (Optional)
              </Text>
              <Card
                style={{
                  backgroundColor: colors.card,
                  elevation: 0,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderStyle: "dashed",
                }}
                onPress={handleScreenshotUpload}
              >
                <Card.Content
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: layout.spacing.sm,
                    paddingVertical: layout.spacing.md,
                  }}
                >
                  <MaterialIcons
                    name="camera-alt"
                    size={24}
                    color={colors.primary}
                  />
                  <Text
                    style={{
                      ...typo.body1,
                      color: colors.primary,
                    }}
                  >
                    {screenshot ? screenshot.name : "Upload screenshot"}
                  </Text>
                </Card.Content>
              </Card>
            </View>

            {/* Contact Info */}
            <View style={{ gap: layout.spacing.sm }}>
              <Text
                style={{
                  ...typo.label,
                  color: colors.text,
                  fontWeight: "600",
                }}
              >
                Contact Email or Phone (Optional)
              </Text>
              <TextInput
                mode="outlined"
                placeholder="So we can follow up if needed"
                value={contact}
                onChangeText={setContact}
                keyboardType="email-address"
                style={{ backgroundColor: colors.card }}
                outlineStyle={{
                  borderColor: colors.border,
                  borderWidth: 1,
                }}
              />
            </View>

            {/* Submit Button */}
            <Button
              mode="contained"
              onPress={handleSubmit}
              loading={loading}
              disabled={!isFormValid || loading}
              style={{
                marginTop: layout.spacing.md,
                paddingVertical: layout.spacing.xs,
                borderRadius: layout.borderRadius.large,
              }}
              labelStyle={{
                ...typo.button,
                fontWeight: "600",
                color: colors.textInverse,
              }}
              buttonColor={colors.primary}
            >
              Submit Report
            </Button>
          </View>

          <Divider
            style={{
              marginVertical: layout.spacing.lg,
              backgroundColor: colors.border,
            }}
          />

          {/* Response Time */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: layout.spacing.sm,
              marginBottom: layout.spacing.lg,
            }}
          >
            <MaterialIcons name="schedule" size={16} color={colors.text} />
            <Text
              style={{
                ...typo.caption,
                color: colors.text,
              }}
            >
              We aim to respond within 24 hours
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
