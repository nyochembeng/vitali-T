import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  Divider,
  IconButton,
  Menu,
  Text,
  TextInput,
} from "react-native-paper";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { z } from "zod";

import { useTheme } from "@/lib/hooks/useTheme";
import { useAuth } from "@/lib/hooks/useAuth";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { profileSchema } from "@/lib/schemas/profileSchema";
import { userSchema } from "@/lib/schemas/userSchema";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadProfileImageMutation,
} from "@/lib/features/profile/profileService";
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "@/lib/features/user/userService";
import { Typo } from "@/lib/constants/Typo";

// Combine schemas, excluding password
const combinedProfileSchema = z.object({
  userId: userSchema.shape.userId,
  fullname: userSchema.shape.fullname,
  email: userSchema.shape.email,
  dateOfBirth: profileSchema.shape.dateOfBirth,
  height: profileSchema.shape.height,
  heightUnit: profileSchema.shape.heightUnit,
  weight: profileSchema.shape.weight,
  weightUnit: profileSchema.shape.weightUnit,
  phoneNumber: profileSchema.shape.phoneNumber,
  countryCode: profileSchema.shape.countryCode,
  conceivedDate: profileSchema.shape.conceivedDate,
  dueDate: profileSchema.shape.dueDate,
  profileImage: profileSchema.shape.profileImage,
});

type CombinedProfile = z.infer<typeof combinedProfileSchema>;

export default function ProfileSettingsScreen() {
  const router = useRouter();
  const { colors, typo, layout } = useTheme();
  const { user, isActionQueued } = useAuth();
  const { data: userData } = useGetUserProfileQuery(user?.userId as string);
  const { data: profileData } = useGetProfileQuery();
  const [updateUser, { isLoading: isUpdatingUser }] =
    useUpdateUserProfileMutation();
  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateProfileMutation();
  const [uploadProfileImage, { isLoading: isUploadingImage }] =
    useUploadProfileImageMutation();

  const [pickerState, setPickerState] = useState({
    datePicker: {
      field: null as "dateOfBirth" | "conceivedDate" | "dueDate" | null,
      show: false,
    },
    heightMenuVisible: false,
    weightMenuVisible: false,
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CombinedProfile>({
    resolver: zodResolver(combinedProfileSchema),
    defaultValues: {
      userId: user?.userId as string,
      fullname: userData?.fullname || "",
      email: userData?.email || "",
      dateOfBirth: profileData?.dateOfBirth
        ? new Date(profileData.dateOfBirth)
        : undefined,
      height: profileData?.height || "",
      heightUnit: profileData?.heightUnit || "cm",
      weight: profileData?.weight || "",
      weightUnit: profileData?.weightUnit || "kg",
      phoneNumber: profileData?.phoneNumber || "",
      countryCode: profileData?.countryCode || "+237",
      conceivedDate: profileData?.conceivedDate
        ? new Date(profileData.conceivedDate)
        : undefined,
      dueDate: profileData?.dueDate ? new Date(profileData.dueDate) : undefined,
      profileImage: profileData?.profileImage || undefined,
    },
  });

  const inputStyle = {
    backgroundColor: colors.card,
    fontSize: typo.body1.fontSize,
    ...typo.body1,
  };

  const outlineStyle = {
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: layout.borderRadius.medium,
  };

  const labelStyle = {
    ...typo.label,
    color: colors.text,
    fontWeight: Typo.label.fontWeight,
  };

  const errorStyle = {
    color: colors.error,
    ...typo.caption,
  };

  const handleImagePicker = async (type: "camera" | "library") => {
    if (isActionQueued) return;

    const permissionFn =
      type === "camera"
        ? ImagePicker.requestCameraPermissionsAsync
        : ImagePicker.requestMediaLibraryPermissionsAsync;
    const { status } = await permissionFn();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        `Please allow ${type} access in settings.`
      );
      return;
    }

    const pickerFn =
      type === "camera"
        ? ImagePicker.launchCameraAsync
        : ImagePicker.launchImageLibraryAsync;
    const result = await pickerFn({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      setValue("profileImage", result.assets[0].base64);
    }
  };

  const showDatePickerFor = (
    field: "dateOfBirth" | "conceivedDate" | "dueDate"
  ) => {
    if (!isActionQueued) {
      setPickerState((prev) => ({
        ...prev,
        datePicker: { field, show: true },
      }));
    }
  };

  const handleDateChange =
    (field: "dateOfBirth" | "conceivedDate" | "dueDate") =>
    (event: any, selectedDate?: Date) => {
      if (selectedDate) setValue(field, selectedDate);
      setPickerState((prev) => ({
        ...prev,
        datePicker: { field: null, show: false },
      }));
    };

  const formatDate = (date: Date | undefined) =>
    date?.toLocaleDateString() || "Select date";

  const onSubmit = async (data: CombinedProfile) => {
    Alert.alert("Confirm Changes", "Save changes to your profile?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Save",
        onPress: async () => {
          try {
            // Update user data
            const userResult = await updateUser({
              userId: user?.userId as string,
              data: {
                fullname: data.fullname as string,
                email: data.email,
              },
            }).unwrap();

            if ("queued" in userResult && userResult.queued) {
              return; // Queued actions handled by Toast and SyncStatus
            }

            // Update profile data
            const profileUpdates = {
              dateOfBirth: data.dateOfBirth,
              height: data.height,
              heightUnit: data.heightUnit,
              weight: data.weight,
              weightUnit: data.weightUnit,
              phoneNumber: data.phoneNumber,
              countryCode: data.countryCode,
              conceivedDate: data.conceivedDate,
              dueDate: data.dueDate,
            };
            const profileResult = await updateProfile({
              data: profileUpdates,
            }).unwrap();

            if ("queued" in profileResult && profileResult.queued) {
              return; // Queued actions handled by Toast and SyncStatus
            }

            // Upload profile image if changed
            if (
              data.profileImage &&
              data.profileImage !== profileData?.profileImage
            ) {
              const imageResult = await uploadProfileImage({
                userId: user?.userId as string,
                image: {
                  uri: `data:image/jpeg;base64,${data.profileImage}`,
                  type: "image/jpeg",
                  name: "profile.jpg",
                },
              }).unwrap();

              if ("queued" in imageResult && imageResult.queued) {
                return; // Queued actions handled by Toast and SyncStatus
              }
            }

            Alert.alert("Success", "Profile updated successfully!", [
              { text: "OK" },
            ]);
          } catch (error: any) {
            if (error.message === "ACTION_QUEUED") {
              return; // Queued actions handled by Toast and SyncStatus
            }
            Alert.alert(
              "Error",
              error?.data?.message || "Failed to update profile.",
              [{ text: "OK" }]
            );
          }
        },
      },
    ]);
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
          onPress: () => router.push("/profile/delete-account"),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomAppBar
        title="Profile Settings"
        rightAction="more"
        moreMenuItems={[
          { title: "Export Data", icon: "download", onPress: () => {} },
          {
            title: "Notifications",
            icon: "bell",
            onPress: () => router.push("/notifications"),
          },
          {
            title: "Settings",
            icon: "shield",
            onPress: () => router.push("/settings"),
          },
          {
            title: "Help",
            icon: "help-circle",
            onPress: () => router.push("/help"),
          },
          {
            title: "Logout",
            icon: "logout",
            onPress: () => router.replace("/auth/login"),
          },
          {
            title: "Delete Account",
            icon: "delete",
            onPress: handleDeleteAccount,
          },
        ]}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: layout.spacing.lg,
            paddingTop: layout.spacing.md,
            paddingBottom: layout.spacing.xl,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              alignItems: "center",
              paddingVertical: layout.spacing.lg,
              position: "relative",
            }}
          >
            {watch("profileImage") ? (
              <Image
                source={{
                  uri: `data:image/jpeg;base64,${watch("profileImage")}`,
                }}
                style={{
                  width: layout.spacing.xl * 2.5,
                  height: layout.spacing.xl * 2.5,
                  borderRadius: layout.spacing.xl * 1.25,
                  backgroundColor: colors.card,
                }}
              />
            ) : (
              <View
                style={{
                  width: layout.spacing.xl * 2.5,
                  height: layout.spacing.xl * 2.5,
                  borderRadius: layout.spacing.xl * 1.25,
                  backgroundColor: colors.card,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: colors.text, ...typo.body2 }}>
                  No Image
                </Text>
              </View>
            )}
            <IconButton
              icon="camera"
              mode="contained"
              size={20}
              style={{
                position: "absolute",
                bottom: 0,
                right: layout.spacing.sm,
                backgroundColor: colors.primary,
              }}
              iconColor="#fff"
              onPress={() => handleImagePicker("library")}
              disabled={isActionQueued}
            />
            <Text
              style={{ color: colors.text, marginTop: 10, ...typo.body2 }}
              onPress={() => !isActionQueued && handleImagePicker("library")}
            >
              Change Photo
            </Text>
          </View>
          <View style={{ gap: layout.spacing.md }}>
            {/* Full Name */}
            <View style={{ gap: layout.spacing.sm }}>
              <Text style={labelStyle}>Full Name</Text>
              <Controller
                control={control}
                name="fullname"
                render={({ field: { onChange, value } }) => (
                  <>
                    <TextInput
                      mode="outlined"
                      placeholder="Enter your full name"
                      value={value}
                      onChangeText={onChange}
                      style={inputStyle}
                      outlineStyle={outlineStyle}
                      disabled={isActionQueued}
                    />
                    {errors.fullname && (
                      <Text style={errorStyle}>{errors.fullname.message}</Text>
                    )}
                  </>
                )}
              />
            </View>

            {/* Email */}
            <View style={{ gap: layout.spacing.sm }}>
              <Text style={labelStyle}>Email</Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <>
                    <TextInput
                      mode="outlined"
                      placeholder="Enter your email"
                      value={value}
                      onChangeText={onChange}
                      keyboardType="email-address"
                      style={inputStyle}
                      outlineStyle={outlineStyle}
                      disabled={isActionQueued}
                    />
                    {errors.email && (
                      <Text style={errorStyle}>{errors.email.message}</Text>
                    )}
                  </>
                )}
              />
            </View>

            {/* Date of Birth */}
            <View style={{ gap: layout.spacing.sm }}>
              <Text style={labelStyle}>Date of Birth</Text>
              <Controller
                control={control}
                name="dateOfBirth"
                render={({ field: { value } }) => (
                  <>
                    <TextInput
                      mode="outlined"
                      placeholder="Select date"
                      value={formatDate(value)}
                      onPressIn={() => showDatePickerFor("dateOfBirth")}
                      showSoftInputOnFocus={false}
                      right={<TextInput.Icon icon="calendar" />}
                      style={inputStyle}
                      outlineStyle={outlineStyle}
                      disabled={isActionQueued}
                    />
                    {errors.dateOfBirth && (
                      <Text style={errorStyle}>
                        {errors.dateOfBirth.message}
                      </Text>
                    )}
                  </>
                )}
              />
            </View>

            {/* Height */}
            <View style={{ gap: layout.spacing.sm }}>
              <Text style={labelStyle}>Height</Text>
              <View style={{ flexDirection: "row", gap: layout.spacing.sm }}>
                <Controller
                  control={control}
                  name="height"
                  render={({ field: { onChange, value } }) => (
                    <View style={{ flex: 1 }}>
                      <TextInput
                        mode="outlined"
                        placeholder="Enter height"
                        value={value}
                        onChangeText={onChange}
                        keyboardType="numeric"
                        style={[inputStyle, { flex: 1 }]}
                        outlineStyle={outlineStyle}
                        disabled={isActionQueued}
                      />
                      {errors.height && (
                        <Text style={errorStyle}>{errors.height.message}</Text>
                      )}
                    </View>
                  )}
                />
                <Controller
                  control={control}
                  name="heightUnit"
                  render={({ field: { onChange, value } }) => (
                    <Menu
                      visible={pickerState.heightMenuVisible}
                      onDismiss={() =>
                        setPickerState((prev) => ({
                          ...prev,
                          heightMenuVisible: false,
                        }))
                      }
                      anchor={
                        <Button
                          mode="outlined"
                          onPress={() =>
                            !isActionQueued &&
                            setPickerState((prev) => ({
                              ...prev,
                              heightMenuVisible: true,
                            }))
                          }
                          style={{
                            borderColor: colors.border,
                            backgroundColor: colors.card,
                            minWidth: 100,
                          }}
                          labelStyle={{ ...typo.body2, color: colors.text }}
                          disabled={isActionQueued}
                        >
                          {value}
                        </Button>
                      }
                    >
                      <Menu.Item
                        onPress={() => {
                          onChange("cm");
                          setPickerState((prev) => ({
                            ...prev,
                            heightMenuVisible: false,
                          }));
                        }}
                        title="cm"
                      />
                      <Menu.Item
                        onPress={() => {
                          onChange("ft");
                          setPickerState((prev) => ({
                            ...prev,
                            heightMenuVisible: false,
                          }));
                        }}
                        title="ft"
                      />
                    </Menu>
                  )}
                />
              </View>
            </View>

            {/* Weight */}
            <View style={{ gap: layout.spacing.sm }}>
              <Text style={labelStyle}>Weight (optional)</Text>
              <View style={{ flexDirection: "row", gap: layout.spacing.sm }}>
                <Controller
                  control={control}
                  name="weight"
                  render={({ field: { onChange, value } }) => (
                    <View style={{ flex: 1 }}>
                      <TextInput
                        mode="outlined"
                        placeholder="Enter weight"
                        value={value}
                        onChangeText={onChange}
                        keyboardType="numeric"
                        style={[inputStyle, { flex: 1 }]}
                        outlineStyle={outlineStyle}
                        disabled={isActionQueued}
                      />
                      {errors.weight && (
                        <Text style={errorStyle}>{errors.weight.message}</Text>
                      )}
                    </View>
                  )}
                />
                <Controller
                  control={control}
                  name="weightUnit"
                  render={({ field: { onChange, value } }) => (
                    <Menu
                      visible={pickerState.weightMenuVisible}
                      onDismiss={() =>
                        setPickerState((prev) => ({
                          ...prev,
                          weightMenuVisible: false,
                        }))
                      }
                      anchor={
                        <Button
                          mode="outlined"
                          onPress={() =>
                            !isActionQueued &&
                            setPickerState((prev) => ({
                              ...prev,
                              weightMenuVisible: true,
                            }))
                          }
                          style={{
                            borderColor: colors.border,
                            backgroundColor: colors.card,
                            minWidth: 100,
                          }}
                          labelStyle={{ ...typo.body2, color: colors.text }}
                          disabled={isActionQueued}
                        >
                          {value}
                        </Button>
                      }
                    >
                      <Menu.Item
                        onPress={() => {
                          onChange("kg");
                          setPickerState((prev) => ({
                            ...prev,
                            weightMenuVisible: false,
                          }));
                        }}
                        title="kg"
                      />
                      <Menu.Item
                        onPress={() => {
                          onChange("lbs");
                          setPickerState((prev) => ({
                            ...prev,
                            weightMenuVisible: false,
                          }));
                        }}
                        title="lbs"
                      />
                    </Menu>
                  )}
                />
              </View>
            </View>

            {/* Phone Number */}
            <View style={{ gap: layout.spacing.sm }}>
              <Text style={labelStyle}>Phone Number</Text>
              <View style={{ flexDirection: "row", gap: layout.spacing.sm }}>
                <Controller
                  control={control}
                  name="countryCode"
                  render={({ field: { onChange, value } }) => (
                    <View>
                      <TextInput
                        mode="outlined"
                        placeholder="+1"
                        value={value}
                        onChangeText={onChange}
                        style={[inputStyle, { width: layout.spacing.xl * 2 }]}
                        outlineStyle={outlineStyle}
                        disabled={isActionQueued}
                      />
                      {errors.countryCode && (
                        <Text style={errorStyle}>
                          {errors.countryCode.message}
                        </Text>
                      )}
                    </View>
                  )}
                />
                <Controller
                  control={control}
                  name="phoneNumber"
                  render={({ field: { onChange, value } }) => (
                    <View style={{ flex: 1 }}>
                      <TextInput
                        mode="outlined"
                        placeholder="Enter phone number"
                        value={value}
                        onChangeText={onChange}
                        keyboardType="phone-pad"
                        style={[inputStyle, { flex: 1 }]}
                        outlineStyle={outlineStyle}
                        disabled={isActionQueued}
                      />
                      {errors.phoneNumber && (
                        <Text style={errorStyle}>
                          {errors.phoneNumber.message}
                        </Text>
                      )}
                    </View>
                  )}
                />
              </View>
            </View>

            {/* Conceived Date */}
            <View style={{ gap: layout.spacing.sm }}>
              <Text style={labelStyle}>Conceived Date</Text>
              <Controller
                control={control}
                name="conceivedDate"
                render={({ field: { value } }) => (
                  <>
                    <TextInput
                      mode="outlined"
                      placeholder="Select date"
                      value={formatDate(value)}
                      onPressIn={() => showDatePickerFor("conceivedDate")}
                      showSoftInputOnFocus={false}
                      right={<TextInput.Icon icon="calendar" />}
                      style={inputStyle}
                      outlineStyle={outlineStyle}
                      disabled={isActionQueued}
                    />
                    {errors.conceivedDate && (
                      <Text style={errorStyle}>
                        {errors.conceivedDate.message}
                      </Text>
                    )}
                  </>
                )}
              />
            </View>

            {/* Due Date */}
            <View style={{ gap: layout.spacing.sm }}>
              <Text style={labelStyle}>Due Date (EDD)</Text>
              <Controller
                control={control}
                name="dueDate"
                render={({ field: { value } }) => (
                  <>
                    <TextInput
                      mode="outlined"
                      placeholder="Select date"
                      value={formatDate(value)}
                      onPressIn={() => showDatePickerFor("dueDate")}
                      showSoftInputOnFocus={false}
                      right={<TextInput.Icon icon="calendar" />}
                      style={inputStyle}
                      outlineStyle={outlineStyle}
                      disabled={isActionQueued}
                    />
                    {errors.dueDate && (
                      <Text style={errorStyle}>{errors.dueDate.message}</Text>
                    )}
                  </>
                )}
              />
            </View>

            {/* Save Button */}
            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              loading={isUpdatingUser || isUpdatingProfile || isUploadingImage}
              disabled={
                isUpdatingUser ||
                isUpdatingProfile ||
                isUploadingImage ||
                isActionQueued
              }
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
              style={{ alignSelf: "center" }}
              disabled={isActionQueued}
            >
              Delete Account
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Date Picker */}
      {pickerState.datePicker.show && (
        <Controller
          control={control}
          name={pickerState.datePicker.field!}
          render={({ field: { value } }) => (
            <DateTimePicker
              value={value || new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange(pickerState.datePicker.field!)}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}
