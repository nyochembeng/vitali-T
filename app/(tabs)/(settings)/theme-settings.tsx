import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Button, RadioButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useTheme } from "@/lib/hooks/useTheme";

export default function ThemeSettingsScreen() {
  const { colors, typo, layout } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState<"light" | "dark">("light");

  const handleSave = () => {
    console.log(`Selected theme: ${selectedTheme}`);
    // Logic to save the selected theme (e.g., to global state or AsyncStorage)
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <CustomAppBar title="Theme Settings" rightAction="notifications" />

      <View
        style={{
          flex: 1,
          paddingHorizontal: layout.spacing.sm,
        }}
      >
        {/* Theme Selection */}
        <View
          style={{
            marginTop: layout.spacing.lg,
            gap: layout.spacing.sm,
          }}
        >
          <Text
            style={{
              ...typo.subtitle2,
              color: colors.text,
              marginBottom: layout.spacing.xs,
            }}
          >
            Choose App Theme
          </Text>

          {/* Light Mode Option */}
          <TouchableOpacity
            style={[
              {
                flexDirection: "row",
                alignItems: "center",
                padding: layout.spacing.sm,
                borderRadius: layout.borderRadius.medium,
                borderWidth: 2,
                borderColor: "transparent",
              },
              selectedTheme === "light" && {
                borderColor: colors.primary,
              },
            ]}
            onPress={() => setSelectedTheme("light")}
          >
            <View
              style={{
                width: layout.spacing.xl,
                height: layout.spacing.xl,
                borderRadius: layout.borderRadius.small,
                alignItems: "center",
                justifyContent: "center",
                marginRight: layout.spacing.sm,
              }}
            >
              <MaterialIcons name="wb-sunny" size={24} color={colors.primary} />
            </View>
            <Text
              style={{
                ...typo.body1,
                flex: 1,
                color: colors.text,
              }}
            >
              Light Mode
            </Text>
            <RadioButton
              value="light"
              status={selectedTheme === "light" ? "checked" : "unchecked"}
              onPress={() => setSelectedTheme("light")}
              color={colors.primary}
            />
          </TouchableOpacity>

          {/* Dark Mode Option */}
          <TouchableOpacity
            style={[
              {
                flexDirection: "row",
                alignItems: "center",
                padding: layout.spacing.sm,
                borderRadius: layout.borderRadius.medium,
                borderWidth: 2,
                borderColor: "transparent",
              },
              selectedTheme === "dark" && {
                borderColor: colors.primary,
              },
            ]}
            onPress={() => setSelectedTheme("dark")}
          >
            <View
              style={{
                width: layout.spacing.xl,
                height: layout.spacing.xl,
                borderRadius: layout.borderRadius.small,
                alignItems: "center",
                justifyContent: "center",
                marginRight: layout.spacing.sm,
              }}
            >
              <MaterialIcons
                name="nights-stay"
                size={24}
                color={colors.accent}
              />
            </View>
            <Text
              style={{
                ...typo.body1,
                flex: 1,
                color: colors.text,
              }}
            >
              Dark Mode
            </Text>
            <RadioButton
              value="dark"
              status={selectedTheme === "dark" ? "checked" : "unchecked"}
              onPress={() => setSelectedTheme("dark")}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <View
          style={{
            marginTop: layout.spacing.xl,
          }}
        >
          <Button
            mode="contained"
            onPress={handleSave}
            style={{
              borderRadius: layout.borderRadius.large,
              elevation: layout.elevation,
            }}
            contentStyle={{
              paddingVertical: layout.spacing.xs,
            }}
            labelStyle={{
              ...typo.button,
              fontWeight: "600",
              color: colors.textInverse,
            }}
            buttonColor={colors.primary}
          >
            Save Settings
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
