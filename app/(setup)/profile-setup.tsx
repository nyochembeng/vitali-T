import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { CountryPicker } from "react-native-country-codes-picker";
import { useTheme } from "@/lib/hooks/useTheme";

interface ProfileData {
  dateOfBirth: Date | null;
  height: string;
  heightUnit: "cm" | "ft";
  weight: string;
  weightUnit: "kg" | "lbs";
  phoneNumber: string;
  countryCode: string;
  conceivedDate: Date | null;
}

export default function ProfileSetupScreen() {
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState<"cm" | "ft">("cm");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [countryFlag, setCountryFlag] = useState("🇺🇸");
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [conceivedDate, setConceivedDate] = useState<Date | null>(null);
  const [showConceivedDatePicker, setShowConceivedDatePicker] = useState(false);
  const router = useRouter();
  const { colors, typo, layout } = useTheme();

  const handleContinue = () => {
    const profileData: ProfileData = {
      dateOfBirth,
      height,
      heightUnit,
      weight,
      weightUnit,
      phoneNumber,
      countryCode,
      conceivedDate,
    };
    // Here you would typically save the profile data to your backend
    console.log("Saved Profile Data:", profileData);
    router.push("/monitoring-preferences");
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "Select date";
    return date.toLocaleDateString();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: layout.spacing.lg,
            paddingTop: layout.spacing.md,
            paddingBottom: layout.spacing.md,
          }}
        >
          {/* Header */}
          <Text
            style={{
              fontSize: typo.h6.fontSize,
              fontWeight: "700",
              color: colors.text,
              textAlign: "center",
              marginBottom: layout.spacing.sm,
              ...typo.h3,
            }}
          >
            Set Up Your Profile
          </Text>
          <Text
            style={{
              fontSize: typo.body2.fontSize,
              color: colors.text,
              textAlign: "center",
              marginBottom: layout.spacing.xl,
              lineHeight: typo.body1.lineHeight,
              ...typo.body2,
            }}
          >
            Tell us about you to personalize your experience.
          </Text>

          {/* Form */}
          <View
            style={{
              flex: 1,
            }}
          >
            {/* Date of Birth */}
            <View
              style={{
                marginBottom: layout.spacing.md,
              }}
            >
              <Text
                style={{
                  fontSize: typo.body3.fontSize,
                  color: colors.text,
                  marginBottom: layout.spacing.sm,
                  fontWeight: "500",
                  ...typo.body3,
                }}
              >
                Date of Birth
              </Text>
              <TextInput
                mode="outlined"
                placeholder="Select date"
                value={formatDate(dateOfBirth)}
                onPressIn={() => setShowDatePicker(true)}
                showSoftInputOnFocus={false}
                right={<TextInput.Icon icon="calendar" />}
                style={{
                  backgroundColor: colors.card,
                  fontSize: typo.body1.fontSize,
                  ...typo.body1,
                }}
                outlineStyle={{
                  borderColor: colors.border,
                  borderWidth: 1,
                  borderRadius: layout.borderRadius.medium,
                }}
                theme={{
                  colors: {
                    outline: colors.border,
                    outlineVariant: colors.border,
                  },
                }}
              />
            </View>

            {/* Height */}
            <View
              style={{
                marginBottom: layout.spacing.md,
              }}
            >
              <Text
                style={{
                  fontSize: typo.body3.fontSize,
                  color: colors.text,
                  marginBottom: layout.spacing.sm,
                  fontWeight: "500",
                  ...typo.body3,
                }}
              >
                Height{" "}
                <Text
                  style={{
                    color: colors.primary,
                    ...typo.body3,
                  }}
                >
                  (Optional)
                </Text>
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: layout.spacing.sm,
                }}
              >
                <TextInput
                  mode="outlined"
                  placeholder="Enter height"
                  value={height}
                  onChangeText={setHeight}
                  keyboardType="numeric"
                  style={{
                    backgroundColor: colors.card,
                    fontSize: typo.body1.fontSize,
                    flex: 1,
                    ...typo.body1,
                  }}
                  outlineStyle={{
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderRadius: layout.borderRadius.medium,
                  }}
                  theme={{
                    colors: {
                      outline: colors.border,
                      outlineVariant: colors.border,
                    },
                  }}
                />
                <View
                  style={{
                    backgroundColor: colors.card,
                    borderRadius: layout.borderRadius.medium,
                    borderWidth: 1,
                    borderColor: colors.border,
                    minWidth: 80,
                    height: 56,
                    justifyContent: "center",
                  }}
                >
                  <Picker
                    selectedValue={heightUnit}
                    onValueChange={setHeightUnit}
                    style={{
                      height: 56,
                    }}
                  >
                    <Picker.Item label="cm" value="cm" />
                    <Picker.Item label="ft" value="ft" />
                  </Picker>
                </View>
              </View>
            </View>

            {/* Weight */}
            <View
              style={{
                marginBottom: layout.spacing.md,
              }}
            >
              <Text
                style={{
                  fontSize: typo.body3.fontSize,
                  color: colors.text,
                  marginBottom: layout.spacing.sm,
                  fontWeight: "500",
                  ...typo.body3,
                }}
              >
                Weight{" "}
                <Text
                  style={{
                    color: colors.primary,
                    ...typo.body3,
                  }}
                >
                  (Optional)
                </Text>
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: layout.spacing.sm,
                }}
              >
                <TextInput
                  mode="outlined"
                  placeholder="Enter weight"
                  value={weight}
                  onChangeText={setWeight}
                  keyboardType="numeric"
                  style={{
                    backgroundColor: colors.card,
                    fontSize: typo.body1.fontSize,
                    flex: 1,
                    ...typo.body1,
                  }}
                  outlineStyle={{
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderRadius: layout.borderRadius.medium,
                  }}
                  theme={{
                    colors: {
                      outline: colors.border,
                      outlineVariant: colors.border,
                    },
                  }}
                />
                <View
                  style={{
                    backgroundColor: colors.card,
                    borderRadius: layout.borderRadius.medium,
                    borderWidth: 1,
                    borderColor: colors.border,
                    minWidth: 80,
                    height: 56,
                    justifyContent: "center",
                  }}
                >
                  <Picker
                    selectedValue={weightUnit}
                    onValueChange={setWeightUnit}
                    style={{
                      height: 56,
                    }}
                  >
                    <Picker.Item label="kg" value="kg" />
                    <Picker.Item label="lbs" value="lbs" />
                  </Picker>
                </View>
              </View>
            </View>

            {/* Telephone Number */}
            <View
              style={{
                marginBottom: layout.spacing.md,
              }}
            >
              <Text
                style={{
                  fontSize: typo.body3.fontSize,
                  color: colors.text,
                  marginBottom: layout.spacing.sm,
                  fontWeight: "500",
                  ...typo.body3,
                }}
              >
                Telephone Number
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: layout.spacing.sm,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.card,
                    borderRadius: layout.borderRadius.medium,
                    borderWidth: 1,
                    borderColor: colors.border,
                    height: 56,
                    paddingHorizontal: layout.spacing.sm,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: 100,
                    gap: layout.spacing.xs,
                  }}
                  onPress={() => setShowCountryPicker(true)}
                >
                  <Text
                    style={{
                      fontSize: typo.body1.fontSize,
                      ...typo.body1,
                    }}
                  >
                    {countryFlag}
                  </Text>
                  <Text
                    style={{
                      fontSize: typo.body1.fontSize,
                      color: colors.text,
                      fontWeight: "500",
                      ...typo.body1,
                    }}
                  >
                    {countryCode}
                  </Text>
                  <Text
                    style={{
                      fontSize: typo.body3.fontSize,
                      color: "rgba(17, 12, 9, 0.6)",
                      ...typo.body3,
                    }}
                  >
                    ▼
                  </Text>
                </TouchableOpacity>
                <TextInput
                  mode="outlined"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                  left={<TextInput.Icon icon="phone" />}
                  style={{
                    backgroundColor: colors.card,
                    fontSize: typo.body1.fontSize,
                    flex: 1,
                    ...typo.body1,
                  }}
                  outlineStyle={{
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderRadius: layout.borderRadius.medium,
                  }}
                  theme={{
                    colors: {
                      outline: colors.border,
                      outlineVariant: colors.border,
                    },
                  }}
                />
              </View>
            </View>

            {/* Conceived Date */}
            <View
              style={{
                marginBottom: layout.spacing.md,
              }}
            >
              <Text
                style={{
                  fontSize: typo.body3.fontSize,
                  color: colors.text,
                  marginBottom: layout.spacing.sm,
                  fontWeight: "500",
                  ...typo.body3,
                }}
              >
                Conceived Date
              </Text>
              <TextInput
                mode="outlined"
                placeholder="Select date"
                value={formatDate(conceivedDate)}
                onPressIn={() => setShowConceivedDatePicker(true)}
                showSoftInputOnFocus={false}
                right={<TextInput.Icon icon="calendar" />}
                style={{
                  backgroundColor: colors.card,
                  fontSize: typo.body1.fontSize,
                  ...typo.body1,
                }}
                outlineStyle={{
                  borderColor: colors.border,
                  borderWidth: 1,
                  borderRadius: layout.borderRadius.medium,
                }}
                theme={{
                  colors: {
                    outline: colors.border,
                    outlineVariant: colors.border,
                  },
                }}
              />
            </View>

            {/* Continue Button */}
            <Button
              mode="contained"
              onPress={handleContinue}
              style={{
                borderRadius: layout.borderRadius.medium,
                paddingVertical: layout.spacing.sm,
                marginTop: layout.spacing.xl,
                marginBottom: layout.spacing.lg,
              }}
              labelStyle={{
                fontSize: typo.button.fontSize,
                fontWeight: "600",
                color: colors.textInverse,
                ...typo.button,
              }}
              buttonColor={colors.primary}
            >
              Continue
            </Button>
          </View>

          {/* Date Pickers */}
          {showDatePicker && (
            <DateTimePicker
              value={dateOfBirth || new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setDateOfBirth(selectedDate);
                }
              }}
            />
          )}

          {showConceivedDatePicker && (
            <DateTimePicker
              value={conceivedDate || new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowConceivedDatePicker(false);
                if (selectedDate) {
                  setConceivedDate(selectedDate);
                }
              }}
            />
          )}

          {/* Country Picker Modal */}
          <CountryPicker
            show={showCountryPicker}
            pickerButtonOnPress={(item) => {
              setCountryCode(item.dial_code);
              setCountryFlag(item.flag);
              setShowCountryPicker(false);
            }}
            onBackdropPress={() => setShowCountryPicker(false)}
            style={{
              modal: {
                height: 500,
                backgroundColor: colors.card,
              },
              backdrop: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              textInput: {
                height: 50,
                borderRadius: layout.borderRadius.medium,
                backgroundColor: colors.card,
                paddingHorizontal: layout.spacing.sm,
                fontSize: typo.body1.fontSize,
                borderWidth: 1,
                borderColor: colors.border,
                ...typo.body1,
              },
              countryButtonStyles: {
                height: 50,
                backgroundColor: colors.card,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
              },
              searchMessageText: {
                color: "rgba(17, 12, 9, 0.6)",
                fontSize: typo.body1.fontSize,
                ...typo.body1,
              },
            }}
            searchMessage="Search for your country"
            lang="en"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
