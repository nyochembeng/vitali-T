import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import {
  Text,
  TextInput,
  Button,
  Avatar,
  Menu,
  Divider,
  IconButton,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import CustomAppBar from "@/components/utils/CustomAppBar";

interface ProfileData {
  fullName: string;
  email: string;
  dateOfBirth: Date | null;
  height: string;
  heightUnit: "cm" | "ft";
  weight: string;
  weightUnit: "kg" | "lbs";
  phoneNumber: string;
  conceivedDate: Date | null;
  dueDate: Date | null;
  profileImage?: string;
}

// Draft data for initial profile state
const initialData: ProfileData = {
  fullName: "John Doe",
  email: "john.doe@example.com",
  dateOfBirth: new Date("1990-01-01"),
  height: "175",
  heightUnit: "cm",
  weight: "75",
  weightUnit: "kg",
  phoneNumber: "1234567890",
  conceivedDate: null,
  dueDate: null,
  profileImage: undefined,
};

export default function ProfileSettingsScreen() {
  const router = useRouter();

  // State to hold profile data
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: initialData?.fullName || "",
    email: initialData?.email || "",
    dateOfBirth: initialData?.dateOfBirth || null,
    height: initialData?.height || "",
    heightUnit: initialData?.heightUnit || "cm",
    weight: initialData?.weight || "",
    weightUnit: initialData?.weightUnit || "kg",
    phoneNumber: initialData?.phoneNumber || "",
    conceivedDate: initialData?.conceivedDate || null,
    dueDate: initialData?.dueDate || null,
    profileImage: initialData?.profileImage,
  });

  const [showDatePicker, setShowDatePicker] = useState<{
    field: "dateOfBirth" | "conceivedDate" | "dueDate" | null;
    show: boolean;
  }>({ field: null, show: false });

  const [heightMenuVisible, setHeightMenuVisible] = useState(false);
  const [weightMenuVisible, setWeightMenuVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "Camera roll permission is required to change profile photo"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setProfileData((prev) => ({
        ...prev,
        profileImage: result.assets[0].uri,
      }));
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate && showDatePicker.field) {
      setProfileData((prev) => ({
        ...prev,
        [showDatePicker.field!]: selectedDate,
      }));
    }
    setShowDatePicker({ field: null, show: false });
  };

  const showDatePickerFor = (
    field: "dateOfBirth" | "conceivedDate" | "dueDate"
  ) => {
    setShowDatePicker({ field, show: true });
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "Select date";
    return date.toLocaleDateString();
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Make API call to save profile changes
      // example: await api.saveProfile(profileData);
      console.log("Profile data saved:", profileData);
    } catch (error) {
      Alert.alert("Error", "Failed to save profile changes" + error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            router.push("/profile/delete-account");
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomAppBar
        title="Profile Settings"
        rightAction="more"
        moreMenuItems={[
          { title: "Export Data", icon: "download", onPress: () => {} },
          {
            title: "Notifications",
            icon: "bell",
            onPress: () => {
              router.push("/notifications");
            },
          },
          {
            title: "Settings",
            icon: "shield",
            onPress: () => {
              router.push("/settings");
            },
          },
          {
            title: "Help",
            icon: "help-circle",
            onPress: () => {
              router.push("/help");
            },
          },
          {
            title: "Logout",
            icon: "logout",
            onPress: () => {
              // Handle logout logic here
              console.log("User logged out");
              router.push("/auth/login");
            },
          },
          {
            title: "Delete Account",
            icon: "delete",
            onPress: handleDeleteAccount,
          },
        ]}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Profile Photo */}
          <View style={styles.photoSection}>
            {/* <Avatar.Image
              size={80}
              source={
                profileData.profileImage
                  ? { uri: profileData.profileImage }
                  : require("./default-avatar.png")
              }
              style={styles.avatar}
            /> */}
            <IconButton
              icon="camera"
              mode="contained"
              size={20}
              style={styles.cameraButton}
              onPress={handleImagePicker}
            />
            <Text variant="bodyMedium" style={styles.changePhotoText}>
              Change Photo
            </Text>
          </View>

          <View style={styles.form}>
            {/* Full Name */}
            <View style={styles.field}>
              <Text variant="labelLarge" style={styles.label}>
                Full Name
              </Text>
              <TextInput
                mode="outlined"
                placeholder="Enter your full name"
                value={profileData.fullName}
                onChangeText={(text) =>
                  setProfileData((prev) => ({ ...prev, fullName: text }))
                }
                style={styles.input}
                outlineStyle={styles.inputOutline}
              />
            </View>

            {/* Email */}
            <View style={styles.field}>
              <Text variant="labelLarge" style={styles.label}>
                Email Address
              </Text>
              <TextInput
                mode="outlined"
                placeholder="Enter your email"
                value={profileData.email}
                onChangeText={(text) =>
                  setProfileData((prev) => ({ ...prev, email: text }))
                }
                keyboardType="email-address"
                style={styles.input}
                outlineStyle={styles.inputOutline}
              />
            </View>

            {/* Date of Birth */}
            <View style={styles.field}>
              <Text variant="labelLarge" style={styles.label}>
                Date of Birth
              </Text>
              <TextInput
                mode="outlined"
                placeholder="Select date"
                value={formatDate(profileData.dateOfBirth)}
                onPressIn={() => showDatePickerFor("dateOfBirth")}
                showSoftInputOnFocus={false}
                right={<TextInput.Icon icon="calendar" />}
                style={styles.input}
                outlineStyle={styles.inputOutline}
              />
            </View>

            {/* Height */}
            <View style={styles.field}>
              <Text variant="labelLarge" style={styles.label}>
                Height
              </Text>
              <View style={styles.inputGroup}>
                <TextInput
                  mode="outlined"
                  placeholder="Enter height"
                  value={profileData.height}
                  onChangeText={(text) =>
                    setProfileData((prev) => ({ ...prev, height: text }))
                  }
                  keyboardType="numeric"
                  style={[styles.input, styles.inputGroupMain]}
                  outlineStyle={styles.inputOutline}
                />
                <Menu
                  visible={heightMenuVisible}
                  onDismiss={() => setHeightMenuVisible(false)}
                  anchor={
                    <Button
                      mode="outlined"
                      onPress={() => setHeightMenuVisible(true)}
                      style={styles.unitButton}
                      labelStyle={styles.unitButtonText}
                    >
                      {profileData.heightUnit}
                    </Button>
                  }
                >
                  <Menu.Item
                    onPress={() => {
                      setProfileData((prev) => ({ ...prev, heightUnit: "cm" }));
                      setHeightMenuVisible(false);
                    }}
                    title="cm"
                  />
                  <Menu.Item
                    onPress={() => {
                      setProfileData((prev) => ({ ...prev, heightUnit: "ft" }));
                      setHeightMenuVisible(false);
                    }}
                    title="ft"
                  />
                </Menu>
              </View>
            </View>

            {/* Weight */}
            <View style={styles.field}>
              <Text variant="labelLarge" style={styles.label}>
                Weight (optional)
              </Text>
              <View style={styles.inputGroup}>
                <TextInput
                  mode="outlined"
                  placeholder="Enter weight"
                  value={profileData.weight}
                  onChangeText={(text) =>
                    setProfileData((prev) => ({ ...prev, weight: text }))
                  }
                  keyboardType="numeric"
                  style={[styles.input, styles.inputGroupMain]}
                  outlineStyle={styles.inputOutline}
                />
                <Menu
                  visible={weightMenuVisible}
                  onDismiss={() => setWeightMenuVisible(false)}
                  anchor={
                    <Button
                      mode="outlined"
                      onPress={() => setWeightMenuVisible(true)}
                      style={styles.unitButton}
                      labelStyle={styles.unitButtonText}
                    >
                      {profileData.weightUnit}
                    </Button>
                  }
                >
                  <Menu.Item
                    onPress={() => {
                      setProfileData((prev) => ({ ...prev, weightUnit: "kg" }));
                      setWeightMenuVisible(false);
                    }}
                    title="kg"
                  />
                  <Menu.Item
                    onPress={() => {
                      setProfileData((prev) => ({
                        ...prev,
                        weightUnit: "lbs",
                      }));
                      setWeightMenuVisible(false);
                    }}
                    title="lbs"
                  />
                </Menu>
              </View>
            </View>

            {/* Phone Number */}
            <View style={styles.field}>
              <Text variant="labelLarge" style={styles.label}>
                Telephone Number
              </Text>
              <TextInput
                mode="outlined"
                placeholder="Enter phone number"
                value={profileData.phoneNumber}
                onChangeText={(text) =>
                  setProfileData((prev) => ({ ...prev, phoneNumber: text }))
                }
                keyboardType="phone-pad"
                style={styles.input}
                outlineStyle={styles.inputOutline}
              />
            </View>

            {/* Conceived Date */}
            <View style={styles.field}>
              <Text variant="labelLarge" style={styles.label}>
                Conceived Date
              </Text>
              <TextInput
                mode="outlined"
                placeholder="Select date"
                value={formatDate(profileData.conceivedDate)}
                onPressIn={() => showDatePickerFor("conceivedDate")}
                showSoftInputOnFocus={false}
                right={<TextInput.Icon icon="calendar" />}
                style={styles.input}
                outlineStyle={styles.inputOutline}
              />
            </View>

            {/* Due Date */}
            <View style={styles.field}>
              <Text variant="labelLarge" style={styles.label}>
                Due Date (EDD)
              </Text>
              <TextInput
                mode="outlined"
                placeholder="Select date"
                value={formatDate(profileData.dueDate)}
                onPressIn={() => showDatePickerFor("dueDate")}
                showSoftInputOnFocus={false}
                right={<TextInput.Icon icon="calendar" />}
                style={styles.input}
                outlineStyle={styles.inputOutline}
              />
            </View>

            {/* Save Button */}
            <Button
              mode="contained"
              onPress={handleSave}
              loading={loading}
              disabled={loading}
              style={styles.saveButton}
              labelStyle={styles.saveButtonText}
            >
              Save Changes
            </Button>

            <Divider style={styles.divider} />

            {/* Delete Account */}
            <Button
              mode="text"
              icon="delete"
              onPress={handleDeleteAccount}
              textColor="#EF4444"
              style={styles.deleteButton}
            >
              Delete Account
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Date Picker */}
      {showDatePicker.show && (
        <DateTimePicker
          value={profileData[showDatePicker.field!] || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
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
  photoSection: {
    alignItems: "center",
    paddingVertical: 32,
    position: "relative",
  },
  avatar: {
    backgroundColor: "#E5E7EB",
  },
  cameraButton: {
    position: "absolute",
    bottom: 45,
    right: "40%",
    backgroundColor: "#8B7355",
  },
  changePhotoText: {
    marginTop: 12,
    color: "#374151",
  },
  form: {
    gap: 20,
    paddingBottom: 32,
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
  inputGroup: {
    flexDirection: "row",
    gap: 12,
  },
  inputGroupMain: {
    flex: 1,
  },
  unitButton: {
    borderColor: "#E5E7EB",
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    minWidth: 60,
  },
  unitButtonText: {
    color: "#374151",
  },
  saveButton: {
    backgroundColor: "#8B7355",
    marginTop: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  divider: {
    marginVertical: 24,
    backgroundColor: "#E5E7EB",
  },
  deleteButton: {
    alignSelf: "center",
  },
});
