import React, { useState } from "react";
import {
  View,
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
import { useTheme } from "@/lib/hooks/useTheme";

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
  const { colors, typo, layout } = useTheme();
  const router = useRouter();

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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
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
          {/* Profile Photo */}
          <View
            style={{
              alignItems: "center",
              paddingVertical: layout.spacing.lg,
              position: "relative",
            }}
          >
            {/* <Avatar.Image
              size={layout.spacing.xl * 2.5} // 80px approximation
              source={
                profileData.profileImage
                  ? { uri: profileData.profileImage }
                  : require("./default-avatar.png")
              }
              style={{ backgroundColor: colors.card }}
            /> */}
            <IconButton
              icon="camera"
              mode="contained"
              size={20}
              style={{
                position: "absolute",
                // bottom: layout.spacing.md,
                // right: layout.spacing.xl * 1.25, // Approx 40% of screen
                backgroundColor: colors.primary,
              }}
              onPress={handleImagePicker}
            />
            <Text
              style={{
                ...typo.body2,
                color: colors.text,
                marginTop: layout.spacing.sm,
              }}
            >
              Change Photo
            </Text>
          </View>

          <View
            style={{
              gap: layout.spacing.md,
              paddingBottom: layout.spacing.lg,
            }}
          >
            {/* Full Name */}
            <View
              style={{
                gap: layout.spacing.sm,
              }}
            >
              <Text
                style={{
                  ...typo.label,
                  color: colors.text,
                  fontWeight: "600",
                }}
              >
                Full Name
              </Text>
              <TextInput
                mode="outlined"
                placeholder="Enter your full name"
                value={profileData.fullName}
                onChangeText={(text) =>
                  setProfileData((prev) => ({ ...prev, fullName: text }))
                }
                style={{ backgroundColor: colors.card }}
                outlineStyle={{
                  borderColor: colors.border,
                  borderWidth: 1,
                }}
              />
            </View>

            {/* Email */}
            <View
              style={{
                gap: layout.spacing.sm,
              }}
            >
              <Text
                style={{
                  ...typo.label,
                  color: colors.text,
                  fontWeight: "600",
                }}
              >
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
                style={{ backgroundColor: colors.card }}
                outlineStyle={{
                  borderColor: colors.border,
                  borderWidth: 1,
                }}
              />
            </View>

            {/* Date of Birth */}
            <View
              style={{
                gap: layout.spacing.sm,
              }}
            >
              <Text
                style={{
                  ...typo.label,
                  color: colors.text,
                  fontWeight: "600",
                }}
              >
                Date of Birth
              </Text>
              <TextInput
                mode="outlined"
                placeholder="Select date"
                value={formatDate(profileData.dateOfBirth)}
                onPressIn={() => showDatePickerFor("dateOfBirth")}
                showSoftInputOnFocus={false}
                right={<TextInput.Icon icon="calendar" />}
                style={{ backgroundColor: colors.card }}
                outlineStyle={{
                  borderColor: colors.border,
                  borderWidth: 1,
                }}
              />
            </View>

            {/* Height */}
            <View
              style={{
                gap: layout.spacing.sm,
              }}
            >
              <Text
                style={{
                  ...typo.label,
                  color: colors.text,
                  fontWeight: "600",
                }}
              >
                Height
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: layout.spacing.sm,
                }}
              >
                <TextInput
                  mode="outlined"
                  placeholder="Enter height"
                  value={profileData.height}
                  onChangeText={(text) =>
                    setProfileData((prev) => ({ ...prev, height: text }))
                  }
                  keyboardType="numeric"
                  style={{ flex: 1, backgroundColor: colors.card }}
                  outlineStyle={{
                    borderColor: colors.border,
                    borderWidth: 1,
                  }}
                />
                <Menu
                  visible={heightMenuVisible}
                  onDismiss={() => setHeightMenuVisible(false)}
                  anchor={
                    <Button
                      mode="outlined"
                      onPress={() => setHeightMenuVisible(true)}
                      style={{
                        borderColor: colors.border,
                        backgroundColor: colors.card,
                        minWidth: layout.spacing.md * 1.875, // 60px approximation
                      }}
                      labelStyle={{
                        ...typo.body2,
                        color: colors.text,
                      }}
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
            <View
              style={{
                gap: layout.spacing.sm,
              }}
            >
              <Text
                style={{
                  ...typo.label,
                  color: colors.text,
                  fontWeight: "600",
                }}
              >
                Weight (optional)
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: layout.spacing.sm,
                }}
              >
                <TextInput
                  mode="outlined"
                  placeholder="Enter weight"
                  value={profileData.weight}
                  onChangeText={(text) =>
                    setProfileData((prev) => ({ ...prev, weight: text }))
                  }
                  keyboardType="numeric"
                  style={{ flex: 1, backgroundColor: colors.card }}
                  outlineStyle={{
                    borderColor: colors.border,
                    borderWidth: 1,
                  }}
                />
                <Menu
                  visible={weightMenuVisible}
                  onDismiss={() => setWeightMenuVisible(false)}
                  anchor={
                    <Button
                      mode="outlined"
                      onPress={() => setWeightMenuVisible(true)}
                      style={{
                        borderColor: colors.border,
                        backgroundColor: colors.card,
                        minWidth: layout.spacing.md * 1.875, // 60px approximation
                      }}
                      labelStyle={{
                        ...typo.body2,
                        color: colors.text,
                      }}
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
            <View
              style={{
                gap: layout.spacing.sm,
              }}
            >
              <Text
                style={{
                  ...typo.label,
                  color: colors.text,
                  fontWeight: "600",
                }}
              >
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
                style={{ backgroundColor: colors.card }}
                outlineStyle={{
                  borderColor: colors.border,
                  borderWidth: 1,
                }}
              />
            </View>

            {/* Conceived Date */}
            <View
              style={{
                gap: layout.spacing.sm,
              }}
            >
              <Text
                style={{
                  ...typo.label,
                  color: colors.text,
                  fontWeight: "600",
                }}
              >
                Conceived Date
              </Text>
              <TextInput
                mode="outlined"
                placeholder="Select date"
                value={formatDate(profileData.conceivedDate)}
                onPressIn={() => showDatePickerFor("conceivedDate")}
                showSoftInputOnFocus={false}
                right={<TextInput.Icon icon="calendar" />}
                style={{ backgroundColor: colors.card }}
                outlineStyle={{
                  borderColor: colors.border,
                  borderWidth: 1,
                }}
              />
            </View>

            {/* Due Date */}
            <View
              style={{
                gap: layout.spacing.sm,
              }}
            >
              <Text
                style={{
                  ...typo.label,
                  color: colors.text,
                  fontWeight: "600",
                }}
              >
                Due Date (EDD)
              </Text>
              <TextInput
                mode="outlined"
                placeholder="Select date"
                value={formatDate(profileData.dueDate)}
                onPressIn={() => showDatePickerFor("dueDate")}
                showSoftInputOnFocus={false}
                right={<TextInput.Icon icon="calendar" />}
                style={{ backgroundColor: colors.card }}
                outlineStyle={{
                  borderColor: colors.border,
                  borderWidth: 1,
                }}
              />
            </View>

            {/* Save Button */}
            <Button
              mode="contained"
              onPress={handleSave}
              loading={loading}
              disabled={loading}
              style={{
                backgroundColor: colors.primary,
                marginTop: layout.spacing.sm,
                paddingVertical: layout.spacing.xs,
                borderRadius: layout.borderRadius.large,
              }}
              labelStyle={{
                ...typo.button,
                fontWeight: "600",
                color: colors.textInverse,
              }}
            >
              Save Changes
            </Button>

            <Divider
              style={{
                marginVertical: layout.spacing.md,
                backgroundColor: colors.border,
              }}
            />

            {/* Delete Account */}
            <Button
              mode="text"
              icon="delete"
              onPress={handleDeleteAccount}
              textColor={colors.error}
              style={{
                alignSelf: "center",
              }}
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
