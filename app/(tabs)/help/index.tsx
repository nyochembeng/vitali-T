import CustomAppBar from "@/components/utils/CustomAppBar";
import { useTheme } from "@/lib/hooks/useTheme";
import { SupportRequest, supportSchema } from "@/lib/schemas/supportSchema";
import { MaterialIcons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import * as DocumentPicker from "expo-document-picker";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { Button, Card, Divider, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

// Mock auth hook for userId; replace with actual auth context
const useAuth = () => ({ userId: "user_1234567890" }); // TODO: Implement actual auth context

export default function ContactSupportScreen() {
  const { colors, typo, layout } = useTheme();
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();

  const categories = [
    "Technical Issue",
    "Account Problem",
    "Feature Request",
    "Data Sync",
    "Billing",
    "Other",
  ];

  const generateSupportId = (userId: string, timestamp: string) => {
    return `${userId}-${timestamp.replace(/[:.Z]/g, "-")}`; // Simple ID based on userId and timestamp
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SupportRequest>({
    resolver: zodResolver(supportSchema),
    defaultValues: {
      supportId: "",
      userId: userId,
      category: "",
      subject: "",
      description: "",
      contact: "",
      status: "Open",
      timestamp: new Date().toISOString(),
      priority: "Medium",
      screenshot: undefined,
    },
  });

  const handleScreenshotUpload = async (
    onChange: (value: SupportRequest["screenshot"]) => void
  ) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        onChange(result.assets[0]);
      }
    } catch (error) {
      console.error("Error picking screenshot:", error);
    }
  };

  const onSubmit = async (data: SupportRequest) => {
    setLoading(true);
    try {
      const timestamp = new Date().toISOString();
      const supportId = generateSupportId(data.userId, timestamp);
      const submissionData: SupportRequest = {
        ...data,
        supportId,
        timestamp,
      };
      console.log("Submitting support request:", submissionData);
      reset({
        supportId: "",
        userId: userId,
        category: undefined,
        subject: "",
        description: "",
        contact: "",
        status: "Open",
        timestamp: new Date().toISOString(),
        priority: "Medium",
        screenshot: undefined,
      });
    } catch (error) {
      console.error("Error submitting support request:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
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
            <View style={{ gap: layout.spacing.sm }}>
              <Text
                style={{ ...typo.label, color: colors.text, fontWeight: "600" }}
              >
                Issue Category
              </Text>
              <Controller
                control={control}
                name="category"
                render={({ field: { onChange, value } }) => (
                  <>
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
                            color: value ? colors.text : colors.text + "99",
                          }}
                        >
                          {value || "Select category"}
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
                                style={{ ...typo.body1, color: colors.text }}
                                onPress={() => {
                                  onChange(cat);
                                  setShowCategoryPicker(false);
                                }}
                              >
                                {cat}
                              </Text>
                            </Card.Content>
                            {index < categories.length - 1 && (
                              <Divider
                                style={{ backgroundColor: colors.border }}
                              />
                            )}
                          </View>
                        ))}
                      </Card>
                    )}
                    {errors.category && (
                      <Text style={{ color: colors.error, ...typo.caption }}>
                        {errors.category.message}
                      </Text>
                    )}
                  </>
                )}
              />
            </View>
            <View style={{ gap: layout.spacing.sm }}>
              <Text
                style={{ ...typo.label, color: colors.text, fontWeight: "600" }}
              >
                Subject
              </Text>
              <Controller
                control={control}
                name="subject"
                render={({ field: { onChange, value } }) => (
                  <>
                    <TextInput
                      mode="outlined"
                      placeholder="Briefly describe your issue"
                      value={value}
                      onChangeText={onChange}
                      style={{ backgroundColor: colors.card }}
                      outlineStyle={{
                        borderColor: colors.border,
                        borderWidth: 1,
                      }}
                    />
                    {errors.subject && (
                      <Text style={{ color: colors.error, ...typo.caption }}>
                        {errors.subject.message}
                      </Text>
                    )}
                  </>
                )}
              />
            </View>
            <View style={{ gap: layout.spacing.sm }}>
              <Text
                style={{ ...typo.label, color: colors.text, fontWeight: "600" }}
              >
                Describe the Issue
              </Text>
              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) => (
                  <>
                    <TextInput
                      mode="outlined"
                      placeholder="Please include any relevant details, steps to reproduce, or screenshots."
                      value={value}
                      onChangeText={onChange}
                      multiline
                      numberOfLines={6}
                      style={{ backgroundColor: colors.card, minHeight: 120 }}
                      outlineStyle={{
                        borderColor: colors.border,
                        borderWidth: 1,
                      }}
                    />
                    {errors.description && (
                      <Text style={{ color: colors.error, ...typo.caption }}>
                        {errors.description.message}
                      </Text>
                    )}
                  </>
                )}
              />
            </View>
            <View style={{ gap: layout.spacing.sm }}>
              <Text
                style={{ ...typo.label, color: colors.text, fontWeight: "600" }}
              >
                Attach Screenshot (Optional)
              </Text>
              <Controller
                control={control}
                name="screenshot"
                render={({ field: { onChange, value } }) => (
                  <Card
                    style={{
                      backgroundColor: colors.card,
                      elevation: 0,
                      borderWidth: 1,
                      borderColor: colors.border,
                      borderStyle: "dashed",
                    }}
                    onPress={() => handleScreenshotUpload(onChange)}
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
                      <Text style={{ ...typo.body1, color: colors.primary }}>
                        {value?.name || "Upload screenshot"}
                      </Text>
                    </Card.Content>
                  </Card>
                )}
              />
            </View>
            <View style={{ gap: layout.spacing.sm }}>
              <Text
                style={{ ...typo.label, color: colors.text, fontWeight: "600" }}
              >
                Contact Email (Optional)
              </Text>
              <Controller
                control={control}
                name="contact"
                render={({ field: { onChange, value } }) => (
                  <>
                    <TextInput
                      mode="outlined"
                      placeholder="So we can follow up if needed"
                      value={value}
                      onChangeText={onChange}
                      keyboardType="email-address"
                      style={{ backgroundColor: colors.card }}
                      outlineStyle={{
                        borderColor: colors.border,
                        borderWidth: 1,
                      }}
                    />
                    {errors.contact && (
                      <Text style={{ color: colors.error, ...typo.caption }}>
                        {errors.contact.message}
                      </Text>
                    )}
                  </>
                )}
              />
            </View>
            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              loading={loading}
              disabled={loading}
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
            <Text style={{ ...typo.caption, color: colors.text }}>
              We aim to respond within 24 hours
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
