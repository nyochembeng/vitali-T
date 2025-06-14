import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, TextInput } from "react-native-paper";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { CountryPicker } from "react-native-country-codes-picker";
import * as ImagePicker from "expo-image-picker";

import { useTheme } from "@/lib/hooks/useTheme";
import { useAuth } from "@/lib/hooks/useAuth";
import { Profile, profileSchema } from "@/lib/schemas/profileSchema";
import {
  useCreateProfileMutation,
  useUploadProfileImageMutation,
} from "@/lib/features/profile/profileService";
import { Typo } from "@/lib/constants/Typo";

export default function ProfileSetupScreen() {
  const router = useRouter();
  const { colors, typo, layout } = useTheme();
  const { user, isActionQueued } = useAuth();
  const [createProfile, { isLoading: isCreatingProfile }] =
    useCreateProfileMutation();
  const [uploadProfileImage, { isLoading: isUploadingImage }] =
    useUploadProfileImageMutation();

  const [pickerState, setPickerState] = useState({
    showDatePicker: false,
    showConceivedDatePicker: false,
    showCountryPicker: false,
    countryFlag: "cm",
    profileImage: null as string | null,
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Profile>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      userId: user?.userId,
      dateOfBirth: undefined,
      height: "",
      heightUnit: "cm",
      weight: "",
      weightUnit: "kg",
      phoneNumber: "",
      countryCode: "+237",
      conceivedDate: undefined,
      dueDate: undefined,
      profileImage: undefined,
      metadata: undefined,
    },
  });

  const inputStyle = {
    backgroundColor: colors.card,
    fontSize: typo.body1.fontSize,
    ...typo.body1,
  };

  const outlineStyle = (hasError: boolean) => ({
    borderColor: hasError ? colors.error : colors.border,
    borderWidth: 1,
    borderRadius: layout.borderRadius.medium,
  });

  const labelStyle = {
    fontSize: typo.body3.fontSize,
    color: colors.text,
    marginBottom: layout.spacing.sm,
    fontWeight: Typo.body1.fontWeight,
    ...typo.body3,
  };

  const errorStyle = {
    color: colors.error,
    fontSize: typo.body4.fontSize,
    marginTop: layout.spacing.xs,
    ...typo.body4,
  };

  const handleImageSelection = async (type: "camera" | "library") => {
    const permissionFn =
      type === "camera"
        ? ImagePicker.requestCameraPermissionsAsync
        : ImagePicker.requestMediaLibraryPermissionsAsync;
    const { granted } = await permissionFn();
    if (!granted) {
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
      const imageUri = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setPickerState((prev) => ({ ...prev, profileImage: imageUri }));
      setValue("profileImage", result.assets[0].base64);
    }
  };

  const onSubmit = async (data: Profile) => {
    try {
      const profileData = { ...data, userId: undefined };
      const createProfileResult = await createProfile(profileData).unwrap();

      if ("queued" in createProfileResult && createProfileResult.queued) {
        return; // Queued actions handled by Toast and SyncStatus
      }

      if (data.profileImage && user?.userId) {
        const uploadImageResult = await uploadProfileImage({
          userId: user?.userId,
          image: data.profileImage,
        }).unwrap();

        if ("queued" in uploadImageResult && uploadImageResult.queued) {
          return; // Queued actions handled by Toast and SyncStatus
        }
      }

      Alert.alert("Success", "Profile created successfully!", [
        {
          text: "OK",
          onPress: () => router.replace("/monitoring-preferences"),
        },
      ]);
    } catch (error: any) {
      if (error.message === "ACTION_QUEUED") {
        return; // Queued actions handled by Toast and SyncStatus
      }
      Alert.alert(
        "Error",
        error?.data?.message || "Failed to create profile.",
        [{ text: "OK" }]
      );
    }
  };

  const formatDate = (date: Date | undefined) =>
    date?.toLocaleDateString() || "Select date";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: layout.spacing.lg,
            paddingVertical: layout.spacing.md,
          }}
        >
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
              ...typo.body2,
            }}
          >
            Tell us about you to personalize your experience.
          </Text>

          <View style={{ flex: 1 }}>
            {/* Profile Photo Upload */}
            <View style={{ marginBottom: layout.spacing.md }}>
              <Text style={labelStyle}>
                Profile Photo{" "}
                <Text style={{ color: colors.primary }}>(Optional)</Text>
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: layout.spacing.sm,
                }}
              >
                {pickerState.profileImage ? (
                  <Image
                    source={{ uri: pickerState.profileImage }}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 40,
                      borderWidth: 1,
                      borderColor: colors.border,
                    }}
                  />
                ) : (
                  <View
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 40,
                      backgroundColor: colors.card,
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth: 1,
                      borderColor: colors.border,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: typo.body1.fontSize,
                        color: colors.text,
                      }}
                    >
                      No Image
                    </Text>
                  </View>
                )}
                <View style={{ flex: 1, gap: layout.spacing.xs }}>
                  <Button
                    mode="outlined"
                    onPress={() => handleImageSelection("library")}
                    disabled={isActionQueued}
                    style={{
                      borderRadius: layout.borderRadius.medium,
                      borderColor: colors.border,
                    }}
                    labelStyle={{
                      fontSize: typo.body3.fontSize,
                      color: colors.text,
                      ...typo.body3,
                    }}
                  >
                    Select Photo
                  </Button>
                  <Button
                    mode="outlined"
                    onPress={() => handleImageSelection("camera")}
                    disabled={isActionQueued}
                    style={{
                      borderRadius: layout.borderRadius.medium,
                      borderColor: colors.border,
                    }}
                    labelStyle={{
                      fontSize: typo.body3.fontSize,
                      color: colors.text,
                      ...typo.body3,
                    }}
                  >
                    Take Photo
                  </Button>
                </View>
              </View>
              {errors.profileImage && (
                <Text style={errorStyle}>{errors.profileImage.message}</Text>
              )}
            </View>

            {/* Hidden User ID */}
            <Controller
              control={control}
              name="userId"
              render={() => <View />}
            />

            {/* Date of Birth */}
            <View style={{ marginBottom: layout.spacing.md }}>
              <Text style={labelStyle}>Date of Birth</Text>
              <Controller
                control={control}
                name="dateOfBirth"
                render={({ field: { value } }) => (
                  <TextInput
                    mode="outlined"
                    placeholder="Select date"
                    value={formatDate(value)}
                    onPressIn={() =>
                      setPickerState((prev) => ({
                        ...prev,
                        showDatePicker: true,
                      }))
                    }
                    showSoftInputOnFocus={false}
                    right={<TextInput.Icon icon="calendar" />}
                    style={inputStyle}
                    outlineStyle={outlineStyle(!!errors.dateOfBirth)}
                    theme={{
                      colors: {
                        outline: colors.border,
                        outlineVariant: colors.border,
                      },
                    }}
                    disabled={isActionQueued}
                  />
                )}
              />
              {errors.dateOfBirth && (
                <Text style={errorStyle}>{errors.dateOfBirth.message}</Text>
              )}
            </View>

            {/* Height */}
            <View style={{ marginBottom: layout.spacing.md }}>
              <Text style={labelStyle}>
                Height <Text style={{ color: colors.primary }}>(Optional)</Text>
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: layout.spacing.sm,
                }}
              >
                <Controller
                  control={control}
                  name="height"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      mode="outlined"
                      placeholder="Enter height"
                      value={value}
                      onChangeText={onChange}
                      keyboardType="numeric"
                      style={[inputStyle, { flex: 1 }]}
                      outlineStyle={outlineStyle(!!errors.height)}
                      theme={{
                        colors: {
                          outline: colors.border,
                          outlineVariant: colors.border,
                        },
                      }}
                      disabled={isActionQueued}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="heightUnit"
                  render={({ field: { onChange, value } }) => (
                    <View
                      style={{
                        backgroundColor: colors.card,
                        borderRadius: layout.borderRadius.medium,
                        borderWidth: 1,
                        borderColor: errors.heightUnit
                          ? colors.error
                          : colors.border,
                        minWidth: 80,
                        height: 56,
                        justifyContent: "center",
                      }}
                    >
                      <Picker
                        selectedValue={value}
                        onValueChange={onChange}
                        style={{ height: 56 }}
                        enabled={!isActionQueued}
                      >
                        <Picker.Item label="cm" value="cm" />
                        <Picker.Item label="ft" value="ft" />
                      </Picker>
                    </View>
                  )}
                />
              </View>
              {errors.height && (
                <Text style={errorStyle}>{errors.height.message}</Text>
              )}
            </View>

            {/* Weight */}
            <View style={{ marginBottom: layout.spacing.md }}>
              <Text style={labelStyle}>
                Weight <Text style={{ color: colors.primary }}>(Optional)</Text>
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: layout.spacing.sm,
                }}
              >
                <Controller
                  control={control}
                  name="weight"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      mode="outlined"
                      placeholder="Enter weight"
                      value={value}
                      onChangeText={onChange}
                      keyboardType="numeric"
                      style={[inputStyle, { flex: 1 }]}
                      outlineStyle={outlineStyle(!!errors.weight)}
                      theme={{
                        colors: {
                          outline: colors.border,
                          outlineVariant: colors.border,
                        },
                      }}
                      disabled={isActionQueued}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="weightUnit"
                  render={({ field: { onChange, value } }) => (
                    <View
                      style={{
                        backgroundColor: colors.card,
                        borderRadius: layout.borderRadius.medium,
                        borderWidth: 1,
                        borderColor: errors.weightUnit
                          ? colors.error
                          : colors.border,
                        minWidth: 80,
                        height: 56,
                        justifyContent: "center",
                      }}
                    >
                      <Picker
                        selectedValue={value}
                        onValueChange={onChange}
                        style={{ height: 56 }}
                        enabled={!isActionQueued}
                      >
                        <Picker.Item label="kg" value="kg" />
                        <Picker.Item label="lbs" value="lbs" />
                      </Picker>
                    </View>
                  )}
                />
              </View>
              {errors.weight && (
                <Text style={errorStyle}>{errors.weight.message}</Text>
              )}
            </View>

            {/* Phone Number */}
            <View style={{ marginBottom: layout.spacing.md }}>
              <Text style={labelStyle}>Phone Number</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: layout.spacing.sm,
                }}
              >
                <Controller
                  control={control}
                  name="countryCode"
                  render={({ field: { onChange, value } }) => (
                    <TouchableOpacity
                      style={{
                        backgroundColor: colors.card,
                        borderRadius: layout.borderRadius.medium,
                        borderWidth: 1,
                        borderColor: errors.countryCode
                          ? colors.error
                          : colors.border,
                        padding: layout.spacing.sm,
                        flexDirection: "row",
                        alignItems: "center",
                        minWidth: 100,
                        gap: layout.spacing.xs,
                      }}
                      onPress={() =>
                        !isActionQueued &&
                        setPickerState((prev) => ({
                          ...prev,
                          showCountryPicker: true,
                        }))
                      }
                    >
                      <Text
                        style={{ fontSize: typo.body1.fontSize, ...typo.body1 }}
                      >
                        {pickerState.countryFlag}
                      </Text>
                      <Text
                        style={{
                          fontSize: typo.body1.fontSize,
                          color: colors.text,
                          fontWeight: "500",
                          ...typo.body1,
                        }}
                      >
                        {value}
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
                  )}
                />
                <Controller
                  control={control}
                  name="phoneNumber"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      mode="outlined"
                      placeholder="Phone Number"
                      value={value}
                      onChangeText={onChange}
                      keyboardType="numeric"
                      left={<TextInput.Icon icon="phone" />}
                      style={[inputStyle, { flex: 1 }]}
                      outlineStyle={outlineStyle(!!errors.phoneNumber)}
                      theme={{
                        colors: {
                          outline: colors.border,
                          outlineVariant: colors.border,
                        },
                      }}
                      disabled={isActionQueued}
                    />
                  )}
                />
              </View>
              {errors.countryCode && (
                <Text style={errorStyle}>{errors.countryCode.message}</Text>
              )}
              {errors.phoneNumber && (
                <Text style={errorStyle}>{errors.phoneNumber.message}</Text>
              )}
            </View>

            {/* Conceived Date */}
            <View style={{ marginBottom: layout.spacing.md }}>
              <Text style={labelStyle}>Conceived Date</Text>
              <Controller
                control={control}
                name="conceivedDate"
                render={({ field: { value } }) => (
                  <TextInput
                    mode="outlined"
                    placeholder="Select date"
                    value={formatDate(value)}
                    onPressIn={() =>
                      !isActionQueued &&
                      setPickerState((prev) => ({
                        ...prev,
                        showConceivedDatePicker: true,
                      }))
                    }
                    showSoftInputOnFocus={false}
                    right={<TextInput.Icon icon="calendar" />}
                    style={inputStyle}
                    outlineStyle={outlineStyle(!!errors.conceivedDate)}
                    theme={{
                      colors: {
                        outline: colors.border,
                        outlineVariant: colors.border,
                      },
                    }}
                    disabled={isActionQueued}
                  />
                )}
              />
              {errors.conceivedDate && (
                <Text style={errorStyle}>{errors.conceivedDate.message}</Text>
              )}
            </View>

            {/* Continue Button */}
            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              disabled={isCreatingProfile || isUploadingImage || isActionQueued}
              loading={isCreatingProfile || isUploadingImage}
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
          {pickerState.showDatePicker && (
            <Controller
              control={control}
              name="dateOfBirth"
              render={({ field: { onChange, value } }) => (
                <DateTimePicker
                  value={
                    value ||
                    new Date(
                      new Date().setFullYear(new Date().getFullYear() - 30)
                    )
                  }
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setPickerState((prev) => ({
                      ...prev,
                      showDatePicker: false,
                    }));
                    if (selectedDate) onChange(selectedDate);
                  }}
                />
              )}
            />
          )}

          {pickerState.showConceivedDatePicker && (
            <Controller
              control={control}
              name="conceivedDate"
              render={({ field: { onChange, value } }) => (
                <DateTimePicker
                  value={value || new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setPickerState((prev) => ({
                      ...prev,
                      showConceivedDatePicker: false,
                    }));
                    if (selectedDate) onChange(selectedDate);
                  }}
                />
              )}
            />
          )}

          {/* Country Picker */}
          <Controller
            control={control}
            name="countryCode"
            render={({ field: { onChange } }) => (
              <CountryPicker
                show={pickerState.showCountryPicker}
                pickerButtonOnPress={(item) => {
                  onChange(item.dial_code);
                  setPickerState((prev) => ({
                    ...prev,
                    countryFlag: item.flag,
                    showCountryPicker: false,
                  }));
                }}
                onBackdropPress={() =>
                  setPickerState((prev) => ({
                    ...prev,
                    showCountryPicker: false,
                  }))
                }
                style={{
                  modal: { height: 500, backgroundColor: colors.card },
                  backdrop: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
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
            )}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
