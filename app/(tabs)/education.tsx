import React, { useState } from "react";
import { View, ScrollView, FlatList } from "react-native";
import { Text, Surface, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { VideoCard } from "@/components/education/VideoCard";
import { ArticleCard } from "@/components/education/ArticleCard";
import { TopicCard } from "@/components/education/TopicCard";
import FilterTabs from "@/components/utils/FilterTabs";
import CustomAppBar from "@/components/utils/CustomAppBar";
import { useTheme } from "@/lib/hooks/useTheme";
import { Colors } from "@/lib/constants/Colors";

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
  {
    id: "1",
    title: "Nutrition",
    icon: "restaurant",
    color: Colors.light.accent,
  },
  {
    id: "2",
    title: "Exercise",
    icon: "fitness-center",
    color: Colors.light.accent,
  },
  {
    id: "3",
    title: "Mental Health",
    icon: "psychology",
    color: Colors.light.accent,
  },
  {
    id: "4",
    title: "Warning Signs",
    icon: "warning",
    color: Colors.light.accent,
  },
];

const tabs = ["All", "Videos", "Articles", "Topics"];

export default function HealthEducationScreen() {
  const [activeTab, setActiveTab] = useState("All");
  const { colors, typo, layout } = useTheme();

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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <CustomAppBar title="Health Education" rightAction="notifications" />

      <ScrollView
        style={{
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            paddingHorizontal: layout.spacing.sm,
            paddingVertical: layout.spacing.sm,
          }}
        >
          <Text
            variant="bodyLarge"
            style={{
              color: "rgba(17, 12, 9, 0.6)",
              textAlign: "center",
              ...typo.body1,
            }}
          >
            Learn about pregnancy and maternal health
          </Text>
        </View>

        <FilterTabs
          options={tabs}
          selectedFilter={activeTab}
          onFilterChange={setActiveTab}
        />

        {(activeTab === "All" || activeTab === "Videos") && (
          <View
            style={{
              marginBottom: layout.spacing.lg,
            }}
          >
            <Text
              variant="headlineSmall"
              style={{
                fontWeight: "600",
                marginBottom: layout.spacing.sm,
                paddingHorizontal: layout.spacing.sm,
                color: colors.text,
                ...typo.h6,
              }}
            >
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
              contentContainerStyle={{
                paddingLeft: layout.spacing.sm,
              }}
            />
          </View>
        )}

        {(activeTab === "All" || activeTab === "Articles") && (
          <View
            style={{
              marginBottom: layout.spacing.lg,
            }}
          >
            <Text
              variant="headlineSmall"
              style={{
                fontWeight: "600",
                marginBottom: layout.spacing.sm,
                paddingHorizontal: layout.spacing.sm,
                color: colors.text,
                ...typo.h6,
              }}
            >
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
          <View
            style={{
              marginBottom: layout.spacing.lg,
            }}
          >
            <Text
              variant="headlineSmall"
              style={{
                fontWeight: "600",
                marginBottom: layout.spacing.sm,
                paddingHorizontal: layout.spacing.sm,
                color: colors.text,
                ...typo.h6,
              }}
            >
              Browse by Topic
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                paddingHorizontal: layout.spacing.sm,
              }}
            >
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

        <Surface
          style={{
            margin: layout.spacing.sm,
            padding: layout.spacing.sm,
            borderRadius: layout.borderRadius.medium,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.card,
            elevation: 1,
          }}
        >
          <MaterialIcons
            name="lightbulb-outline"
            size={24}
            color={colors.primary}
          />
          <View
            style={{
              flex: 1,
              marginLeft: layout.spacing.sm,
            }}
          >
            <Text
              variant="titleMedium"
              style={{
                fontWeight: "500",
                color: colors.text,
                ...typo.body2,
              }}
            >
              {`Got a topic you'd like us to cover?`}
            </Text>
          </View>
          <Button
            mode="contained"
            onPress={handleSendSuggestion}
            style={{
              backgroundColor: colors.primary,
              borderRadius: layout.borderRadius.small,
            }}
            labelStyle={{
              fontSize: typo.body3.fontSize,
              fontWeight: "600",
              ...typo.body3,
            }}
          >
            Send Suggestion
          </Button>
        </Surface>
      </ScrollView>
    </SafeAreaView>
  );
}
