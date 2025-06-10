import React, { useState } from "react";
import { View, StyleSheet, ScrollView, FlatList } from "react-native";
import { Text, Surface, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { VideoCard } from "@/components/education/VideoCard";
import { ArticleCard } from "@/components/education/ArticleCard";
import { TopicCard } from "@/components/education/TopicCard";
import FilterTabs from "@/components/utils/FilterTabs";
import CustomAppBar from "@/components/utils/CustomAppBar";

interface Video {
  id: string;
  title: string;
  duration: string;
  trimester?: string;
  thumbnail: string;
}

interface Article {
  id: string;
  title: string;
  description: string;
  readTime: string;
  image: string;
}

interface Topic {
  id: string;
  title: string;
  icon: string;
  color: string;
}

const mockVideos: Video[] = [
  {
    id: "1",
    title: "Prenatal Nutrition Basics",
    duration: "5 min",
    trimester: "Trimester 1",
    thumbnail:
      "https://images.unsplash.com/photo-1559662780-33af019fd6bc?w=300&h=200&fit=crop",
  },
  {
    id: "2",
    title: "Exercise During Pregnancy",
    duration: "8 min",
    thumbnail:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
  },
];

const mockArticles: Article[] = [
  {
    id: "1",
    title: "Understanding Fetal Development",
    description: "Learn how your baby grows each week during pregnancy...",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65379?w=100&h=100&fit=crop",
  },
  {
    id: "2",
    title: "Nutrition Guide for Expectant Mothers",
    description: "Essential nutrients and foods to support your pregnancy...",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=100&h=100&fit=crop",
  },
  {
    id: "3",
    title: "Mental Health During Pregnancy",
    description:
      "Tips for maintaining emotional well-being throughout your journey...",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
  },
];

const mockTopics: Topic[] = [
  { id: "1", title: "Nutrition", icon: "restaurant", color: "#8B5CF6" },
  { id: "2", title: "Exercise", icon: "fitness-center", color: "#10B981" },
  { id: "3", title: "Mental Health", icon: "psychology", color: "#F59E0B" },
  { id: "4", title: "Warning Signs", icon: "warning", color: "#EF4444" },
];

const tabs = ["All", "Videos", "Articles", "Topics"];

export default function HealthEducationScreen() {
  const [activeTab, setActiveTab] = useState("All");

  const handleVideoPress = (video: Video) => {
    // Navigate to video player
    console.log("Play video:", video.id);
  };

  const handleArticlePress = (article: Article) => {
    // Navigate to article detail
    console.log("Open article:", article.id);
  };

  const handleTopicPress = (topic: Topic) => {
    // Navigate to topic content
    console.log("Open topic:", topic.id);
  };

  const handleSendSuggestion = () => {
    // Handle suggestion submission
    console.log("Send suggestion");
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomAppBar title="Health Education" rightAction="notifications" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.subtitle}>
          <Text variant="bodyLarge" style={styles.subtitleText}>
            Learn about pregnancy and maternal health
          </Text>
        </View>

        <FilterTabs
          options={tabs}
          selectedFilter={activeTab}
          onFilterChange={setActiveTab}
        />

        {(activeTab === "All" || activeTab === "Videos") && (
          <View style={styles.section}>
            <Text variant="headlineSmall" style={styles.sectionTitle}>
              Featured Videos
            </Text>
            <FlatList
              horizontal
              data={mockVideos}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <VideoCard
                  video={item}
                  onPress={() => handleVideoPress(item)}
                />
              )}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />
          </View>
        )}

        {(activeTab === "All" || activeTab === "Articles") && (
          <View style={styles.section}>
            <Text variant="headlineSmall" style={styles.sectionTitle}>
              Popular Articles
            </Text>
            {mockArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onPress={() => handleArticlePress(article)}
              />
            ))}
          </View>
        )}

        {(activeTab === "All" || activeTab === "Topics") && (
          <View style={styles.section}>
            <Text variant="headlineSmall" style={styles.sectionTitle}>
              Browse by Topic
            </Text>
            <View style={styles.topicsGrid}>
              {mockTopics.map((topic) => (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  onPress={() => handleTopicPress(topic)}
                />
              ))}
            </View>
          </View>
        )}

        <Surface style={styles.suggestionCard} elevation={1}>
          <MaterialIcons name="lightbulb-outline" size={24} color="#8B5CF6" />
          <View style={styles.suggestionContent}>
            <Text variant="titleMedium" style={styles.suggestionTitle}>
              {`Got a topic you'd like us to cover?`}
            </Text>
          </View>
          <Button
            mode="contained"
            onPress={handleSendSuggestion}
            style={styles.suggestionButton}
            labelStyle={styles.suggestionButtonText}
          >
            Send Suggestion
          </Button>
        </Surface>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    backgroundColor: "#FFFFFF",
    elevation: 0,
  },
  headerTitle: {
    fontWeight: "600",
    fontSize: 18,
  },
  content: {
    flex: 1,
  },
  subtitle: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  subtitleText: {
    color: "#6B7280",
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontWeight: "600",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  horizontalList: {
    paddingLeft: 16,
  },
  topicsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  suggestionCard: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },
  suggestionContent: {
    flex: 1,
    marginLeft: 12,
  },
  suggestionTitle: {
    fontWeight: "500",
  },
  suggestionButton: {
    backgroundColor: "#8B5CF6",
    borderRadius: 8,
  },
  suggestionButtonText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
