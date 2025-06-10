import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Text, Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import CustomAppBar from "@/components/utils/CustomAppBar";

interface HistoryOption {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  link: string;
}

export default function HistoryScreen() {
  const router = useRouter();

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
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <CustomAppBar title="History" rightAction="notifications" />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {historyOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            onPress={() => handleOptionPress(option)}
            activeOpacity={0.7}
          >
            <Card style={styles.optionCard}>
              <Card.Content style={styles.cardContent}>
                <View style={styles.iconContainer}>
                  <MaterialIcons name={option.icon} size={28} color="#8B4513" />
                </View>

                <View style={styles.textContainer}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
                </View>

                <MaterialIcons name="chevron-right" size={24} color="#ccc" />
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  headerRight: {
    width: 40, // Same width as IconButton to center title
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  optionCard: {
    marginBottom: 12,
    backgroundColor: "#f8f8f8",
    elevation: 0,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});
