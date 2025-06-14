import { VitalSignCard } from "@/components/education/VitalSignCard";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { SearchBar } from "@/components/utils/SearchBar";
import { useTheme } from "@/lib/hooks/useTheme";
import { useAuth } from "@/lib/hooks/useAuth";
import { VitalSignEducation } from "@/lib/schemas/vitalSignEducationSchema";
import React, { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetVitalSignEducationsQuery } from "@/lib/features/vitals-education/vitalSignEducationService";

export default function VitalSignsEducationScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const { colors, typo, layout } = useTheme();
  const { user } = useAuth();

  const {
    data: vitalSignsEducation = [],
    isLoading,
    isFetching,
  } = useGetVitalSignEducationsQuery(
    {
      category: undefined,
      type: undefined,
      keywords: searchQuery ? [searchQuery] : undefined,
    },
    { skip: !user?.userId }
  );

  const filteredVitalSigns = useMemo(() => {
    if (!searchQuery.trim()) return vitalSignsEducation;

    const searchLower = searchQuery.toLowerCase();
    return vitalSignsEducation.filter(
      (vital) =>
        vital.title.toLowerCase().includes(searchLower) ||
        vital.subtitle.toLowerCase().includes(searchLower) ||
        vital.body.toLowerCase().includes(searchLower) ||
        (vital.keywords &&
          vital.keywords.some((keyword) =>
            keyword.toLowerCase().includes(searchLower)
          ))
    );
  }, [searchQuery, vitalSignsEducation]);

  const handleVitalSignPress = (vitalSign: VitalSignEducation) => {};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomAppBar title="Vital Signs" rightAction="help" />
      <ScrollView
        style={{ flex: 1, paddingHorizontal: layout.spacing.lg }}
        contentContainerStyle={{ paddingBottom: layout.spacing.xxl }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            paddingHorizontal: layout.spacing.sm,
            paddingTop: layout.spacing.sm,
            paddingBottom: layout.spacing.xs,
          }}
        >
          <Text
            style={{
              fontWeight: "700",
              color: colors.text,
              textAlign: "center",
              marginBottom: layout.spacing.sm,
              fontSize: typo.h4.fontSize,
              ...typo.h4,
            }}
          >
            Understand Your Vitals
          </Text>
          <Text
            style={{
              color: colors.text,
              textAlign: "center",
              lineHeight: typo.body1.lineHeight,
              fontSize: typo.body1.fontSize,
              ...typo.body1,
            }}
          >
            Tap on a card to learn what each vital sign means for you.
          </Text>
        </View>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search a vital sign..."
        />
        <View
          style={{
            paddingHorizontal: layout.spacing.sm,
            paddingBottom: layout.spacing.lg,
          }}
        >
          {isLoading || isFetching ? (
            <View
              style={{
                alignItems: "center",
                paddingVertical: layout.spacing.xl,
              }}
            >
              <Text
                style={{
                  fontSize: typo.body2.fontSize,
                  color: colors.text,
                  ...typo.body2,
                }}
              >
                Loading vital sign education...
              </Text>
            </View>
          ) : filteredVitalSigns.length === 0 ? (
            <View
              style={{
                alignItems: "center",
                paddingVertical: layout.spacing.xl,
                paddingHorizontal: layout.spacing.sm,
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  textAlign: "center",
                  fontSize: typo.body1.fontSize,
                  ...typo.body1,
                }}
              >
                {searchQuery
                  ? `No vital signs found matching "${searchQuery}"`
                  : "No vital sign education available"}
              </Text>
            </View>
          ) : (
            filteredVitalSigns.map((vitalSign) => (
              <VitalSignCard
                key={vitalSign.educationId}
                vitalSign={vitalSign}
                onPress={() => handleVitalSignPress(vitalSign)}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
