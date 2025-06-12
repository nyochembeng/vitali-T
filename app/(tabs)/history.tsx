import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Text, Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useTheme } from "@/lib/hooks/useTheme";

interface HistoryOption {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  link: string;
}

export default function HistoryScreen() {
  const router = useRouter();
  const { colors, typo, layout } = useTheme();

  const historyOptions: HistoryOption[] = [
    {
      id: "vitals",
      title: "Vitals History",
      subtitle: "Blood pressure, heart rate, weight",
      icon: "favorite",
      link: "/vitals-history",
    },
    {
      id: "fetal",
      title: "Fetal Movements",
      subtitle: "Baby kicks and movement tracking",
      icon: "child-friendly",
      link: "/fetal-movements-history",
    },
    {
      id: "activity",
      title: "Activity History",
      subtitle: "Exercise and physical activities",
      icon: "directions-walk",
      link: "/activity-history",
    },
    {
      id: "sleep",
      title: "Sleep History",
      subtitle: "Sleep patterns and quality",
      icon: "bedtime",
      link: "/sleep-history",
    },
    {
      id: "contractions",
      title: "Contractions",
      subtitle: "Labor contraction timing and intensity",
      icon: "timer",
      link: "/contractions-history",
    },
    {
      id: "symptoms",
      title: "Symptoms History",
      subtitle: "Health symptoms and concerns",
      icon: "sick",
      link: "/symptom-history",
    },
  ];

  const handleOptionPress = (option: HistoryOption) => {
    // Navigate to the selected history option
    router.push(option.link as any);
    console.log(`Navigate to ${option.link}`);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      {/* Header */}
      <CustomAppBar title="History" rightAction="notifications" />

      <ScrollView
        style={{
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: layout.spacing.sm,
          paddingBottom: layout.spacing.lg,
        }}
      >
        {historyOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            onPress={() => handleOptionPress(option)}
            activeOpacity={0.7}
          >
            <Card
              style={{
                marginBottom: layout.spacing.sm,
                backgroundColor: colors.card,
                elevation: 0,
              }}
            >
              <Card.Content
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: layout.spacing.sm,
                }}
              >
                <View
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: colors.background,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: layout.spacing.sm,
                  }}
                >
                  <MaterialIcons
                    name={option.icon}
                    size={28}
                    color={colors.primary}
                  />
                </View>

                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      fontSize: typo.body2.fontSize,
                      fontWeight: "600",
                      color: colors.text,
                      marginBottom: layout.spacing.xs,
                      ...typo.body2,
                    }}
                  >
                    {option.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: typo.body3.fontSize,
                      color: "rgba(17, 12, 9, 0.6)",
                      lineHeight: typo.body1.lineHeight,
                      ...typo.body3,
                    }}
                  >
                    {option.subtitle}
                  </Text>
                </View>

                <MaterialIcons
                  name="chevron-right"
                  size={24}
                  color="rgba(17, 12, 9, 0.6)"
                />
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
