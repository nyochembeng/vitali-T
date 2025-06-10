import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <Text style={styles.title}>Set Up Your Profile</Text>
          <Text style={styles.subtitle}>
            Tell us about you to personalize your experience.
          </Text>

          {/* Form */}
          <View style={styles.formContainer}>
            {/* Date of Birth */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Date of Birth</Text>
              <TextInput
                mode="outlined"
                placeholder="Select date"
                value={formatDate(dateOfBirth)}
                onPressIn={() => setShowDatePicker(true)}
                showSoftInputOnFocus={false}
                right={<TextInput.Icon icon="calendar" />}
                style={styles.textInput}
                outlineStyle={styles.inputOutline}
                theme={{
                  colors: {
                    outline: "#E5E5E5",
                    outlineVariant: "#E5E5E5",
                  },
                }}
              />
            </View>

            {/* Height */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                Height <Text style={styles.optional}>(Optional)</Text>
              </Text>
              <View style={styles.inputRow}>
                <TextInput
                  mode="outlined"
                  placeholder="Enter height"
                  value={height}
                  onChangeText={setHeight}
                  keyboardType="numeric"
                  style={[styles.textInput, styles.flexInput]}
                  outlineStyle={styles.inputOutline}
                  theme={{
                    colors: {
                      outline: "#E5E5E5",
                      outlineVariant: "#E5E5E5",
                    },
                  }}
                />
                <View style={styles.unitPicker}>
                  <Picker
                    selectedValue={heightUnit}
                    onValueChange={setHeightUnit}
                    style={styles.picker}
                  >
                    <Picker.Item label="cm" value="cm" />
                    <Picker.Item label="ft" value="ft" />
                  </Picker>
                </View>
              </View>
            </View>

            {/* Weight */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                Weight <Text style={styles.optional}>(Optional)</Text>
              </Text>
              <View style={styles.inputRow}>
                <TextInput
                  mode="outlined"
                  placeholder="Enter weight"
                  value={weight}
                  onChangeText={setWeight}
                  keyboardType="numeric"
                  style={[styles.textInput, styles.flexInput]}
                  outlineStyle={styles.inputOutline}
                  theme={{
                    colors: {
                      outline: "#E5E5E5",
                      outlineVariant: "#E5E5E5",
                    },
                  }}
                />
                <View style={styles.unitPicker}>
                  <Picker
                    selectedValue={weightUnit}
                    onValueChange={setWeightUnit}
                    style={styles.picker}
                  >
                    <Picker.Item label="kg" value="kg" />
                    <Picker.Item label="lbs" value="lbs" />
                  </Picker>
                </View>
              </View>
            </View>

            {/* Telephone Number */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Telephone Number</Text>
              <View style={styles.inputRow}>
                <TouchableOpacity
                  style={styles.countryCodeButton}
                  onPress={() => setShowCountryPicker(true)}
                >
                  <Text style={styles.countryFlag}>{countryFlag}</Text>
                  <Text style={styles.countryCodeText}>{countryCode}</Text>
                  <Text style={styles.dropdownIcon}>▼</Text>
                </TouchableOpacity>
                <TextInput
                  mode="outlined"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                  left={<TextInput.Icon icon="phone" />}
                  style={[styles.textInput, styles.flexInput]}
                  outlineStyle={styles.inputOutline}
                  theme={{
                    colors: {
                      outline: "#E5E5E5",
                      outlineVariant: "#E5E5E5",
                    },
                  }}
                />
              </View>
            </View>

            {/* Conceived Date */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Conceived Date</Text>
              <TextInput
                mode="outlined"
                placeholder="Select date"
                value={formatDate(conceivedDate)}
                onPressIn={() => setShowConceivedDatePicker(true)}
                showSoftInputOnFocus={false}
                right={<TextInput.Icon icon="calendar" />}
                style={styles.textInput}
                outlineStyle={styles.inputOutline}
                theme={{
                  colors: {
                    outline: "#E5E5E5",
                    outlineVariant: "#E5E5E5",
                  },
                }}
              />
            </View>

            {/* Continue Button */}
            <Button
              mode="contained"
              onPress={handleContinue}
              style={styles.continueButton}
              labelStyle={styles.continueButtonText}
              buttonColor="#A67C5A"
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
                backgroundColor: "#FFFFFF",
              },
              backdrop: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              textInput: {
                height: 50,
                borderRadius: 12,
                backgroundColor: "#F5F5F5",
                paddingHorizontal: 16,
                fontSize: 16,
                borderWidth: 1,
                borderColor: "#E5E5E5",
              },
              countryButtonStyles: {
                height: 50,
                backgroundColor: "#FFFFFF",
                borderBottomWidth: 1,
                borderBottomColor: "#F0F0F0",
              },
              searchMessageText: {
                color: "#666666",
                fontSize: 16,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#A67C5A",
    marginBottom: 32,
    lineHeight: 24,
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: "#1A1A1A",
    marginBottom: 8,
    fontWeight: "500",
  },
  optional: {
    color: "#A67C5A",
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    fontSize: 16,
  },
  inputOutline: {
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderRadius: 12,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  flexInput: {
    flex: 1,
  },
  unitPicker: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    minWidth: 80,
    height: 56,
    justifyContent: "center",
  },
  countryCodeButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    height: 56,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
    gap: 4,
  },
  countryFlag: {
    fontSize: 18,
  },
  countryCodeText: {
    fontSize: 16,
    color: "#1A1A1A",
    fontWeight: "500",
  },
  dropdownIcon: {
    fontSize: 10,
    color: "#666666",
  },
  picker: {
    height: 56,
  },
  continueButton: {
    borderRadius: 12,
    paddingVertical: 8,
    marginTop: 32,
    marginBottom: 24,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
