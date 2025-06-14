import { ArticleCard } from "@/components/education/ArticleCard";
import { TopicCard } from "@/components/education/TopicCard";
import { VideoCard } from "@/components/education/VideoCard";
import CustomAppBar from "@/components/utils/CustomAppBar";
import FilterTabs from "@/components/utils/FilterTabs";
import { useTheme } from "@/lib/hooks/useTheme";
import { useAuth } from "@/lib/hooks/useAuth";
import { Article, Topic, Video } from "@/lib/schemas/healthEducationSchema";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, ScrollView, View } from "react-native";
import {
  Button,
  Surface,
  Text,
  Portal,
  Dialog,
  TextInput,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useGetVideosQuery,
  useGetArticlesQuery,
  useGetTopicsQuery,
} from "@/lib/features/education/educationService";
import Toast from "react-native-toast-message";

const tabs = ["All", "Videos", "Articles", "Topics"];

export default function HealthEducationScreen() {
  const [activeTab, setActiveTab] = useState("All");
  const [showSuggestionDialog, setShowSuggestionDialog] = useState(false);
  const [suggestionText, setSuggestionText] = useState("");
  const { colors, typo, layout } = useTheme();
  const { user, isActionQueued } = useAuth();

  const {
    data: videos = [],
    isLoading: isVideosLoading,
    isFetching: isVideosFetching,
  } = useGetVideosQuery(
    { category: undefined, trimester: undefined, keywords: undefined },
    { skip: !user?.userId }
  );
  const {
    data: articles = [],
    isLoading: isArticlesLoading,
    isFetching: isArticlesFetching,
  } = useGetArticlesQuery(
    { category: undefined, trimester: undefined, keywords: undefined },
    { skip: !user?.userId }
  );
  const {
    data: topics = [],
    isLoading: isTopicsLoading,
    isFetching: isTopicsFetching,
  } = useGetTopicsQuery(
    { category: undefined, keywords: undefined },
    { skip: !user?.userId }
  );

  const handleVideoPress = (video: Video) => {};

  const handleArticlePress = (article: Article) => {};

  const handleTopicPress = (topic: Topic) => {};

  const handleSendSuggestion = () => {
    if (isActionQueued) return;
    setShowSuggestionDialog(true);
  };

  const submitSuggestion = () => {
    if (isActionQueued || !suggestionText.trim()) return;
    // Simulate sending suggestion (no backend endpoint provided)
    Toast.show({
      type: "success",
      text1: "Suggestion Submitted",
      text2: "Thank you for your suggestion!",
    });
    setSuggestionText("");
    setShowSuggestionDialog(false);
  };

  const cancelSuggestion = () => {
    if (isActionQueued) return;
    setSuggestionText("");
    setShowSuggestionDialog(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomAppBar title="Health Education" rightAction="notifications" />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: layout.spacing.sm,
            paddingVertical: layout.spacing.sm,
          }}
        >
          <Text
            style={{
              color: "rgba(17, 12, 9, 0.6)",
              textAlign: "center",
              fontSize: typo.body1.fontSize,
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
          <View style={{ marginBottom: layout.spacing.lg }}>
            <Text
              style={{
                fontWeight: "600",
                marginBottom: layout.spacing.sm,
                paddingHorizontal: layout.spacing.sm,
                color: colors.text,
                fontSize: typo.h6.fontSize,
                ...typo.h6,
              }}
            >
              Featured Videos
            </Text>
            {isVideosLoading || isVideosFetching ? (
              <View
                style={{
                  alignItems: "center",
                  marginVertical: layout.spacing.sm,
                }}
              >
                <Text
                  style={{
                    fontSize: typo.body2.fontSize,
                    color: colors.text,
                    ...typo.body2,
                  }}
                >
                  Loading videos...
                </Text>
              </View>
            ) : videos.length === 0 ? (
              <View
                style={{
                  alignItems: "center",
                  marginVertical: layout.spacing.sm,
                }}
              >
                <Text
                  style={{
                    fontSize: typo.body2.fontSize,
                    color: colors.text,
                    ...typo.body2,
                  }}
                >
                  No videos available
                </Text>
              </View>
            ) : (
              <FlatList
                horizontal
                data={videos}
                keyExtractor={(item) => item.videoId}
                renderItem={({ item }) => (
                  <VideoCard
                    video={item}
                    onPress={() => handleVideoPress(item)}
                  />
                )}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: layout.spacing.sm }}
              />
            )}
          </View>
        )}
        {(activeTab === "All" || activeTab === "Articles") && (
          <View style={{ marginBottom: layout.spacing.lg }}>
            <Text
              style={{
                fontWeight: "600",
                marginBottom: layout.spacing.sm,
                paddingHorizontal: layout.spacing.sm,
                color: colors.text,
                fontSize: typo.h6.fontSize,
                ...typo.h6,
              }}
            >
              Popular Articles
            </Text>
            {isArticlesLoading || isArticlesFetching ? (
              <View
                style={{
                  alignItems: "center",
                  marginVertical: layout.spacing.sm,
                }}
              >
                <Text
                  style={{
                    fontSize: typo.body2.fontSize,
                    color: colors.text,
                    ...typo.body2,
                  }}
                >
                  Loading articles...
                </Text>
              </View>
            ) : articles.length === 0 ? (
              <View
                style={{
                  alignItems: "center",
                  marginVertical: layout.spacing.sm,
                }}
              >
                <Text
                  style={{
                    fontSize: typo.body2.fontSize,
                    color: colors.text,
                    ...typo.body2,
                  }}
                >
                  No articles available
                </Text>
              </View>
            ) : (
              articles.map((article) => (
                <ArticleCard
                  key={article.articleId}
                  article={article}
                  onPress={() => handleArticlePress(article)}
                />
              ))
            )}
          </View>
        )}
        {(activeTab === "All" || activeTab === "Topics") && (
          <View style={{ marginBottom: layout.spacing.lg }}>
            <Text
              style={{
                fontWeight: "600",
                marginBottom: layout.spacing.sm,
                paddingHorizontal: layout.spacing.sm,
                color: colors.text,
                fontSize: typo.h6.fontSize,
                ...typo.h6,
              }}
            >
              Browse by Topic
            </Text>
            {isTopicsLoading || isTopicsFetching ? (
              <View
                style={{
                  alignItems: "center",
                  marginVertical: layout.spacing.sm,
                }}
              >
                <Text
                  style={{
                    fontSize: typo.body2.fontSize,
                    color: colors.text,
                    ...typo.body2,
                  }}
                >
                  Loading topics...
                </Text>
              </View>
            ) : topics.length === 0 ? (
              <View
                style={{
                  alignItems: "center",
                  marginVertical: layout.spacing.sm,
                }}
              >
                <Text
                  style={{
                    fontSize: typo.body2.fontSize,
                    color: colors.text,
                    ...typo.body2,
                  }}
                >
                  No topics available
                </Text>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  paddingHorizontal: layout.spacing.sm,
                }}
              >
                {topics.map((topic) => (
                  <TopicCard
                    key={topic.topicId}
                    topic={topic}
                    onPress={() => handleTopicPress(topic)}
                  />
                ))}
              </View>
            )}
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
          <View style={{ flex: 1, marginLeft: layout.spacing.sm }}>
            <Text
              style={{
                fontWeight: "500",
                color: colors.text,
                fontSize: typo.body2.fontSize,
                ...typo.body2,
              }}
            >
              Got a topic you’d like us to cover?
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
              color: colors.textInverse,
              ...typo.body3,
            }}
            disabled={isActionQueued}
          >
            Send Suggestion
          </Button>
        </Surface>
      </ScrollView>

      <Portal>
        <Dialog
          visible={showSuggestionDialog}
          onDismiss={cancelSuggestion}
          style={{ backgroundColor: colors.card }}
        >
          <Dialog.Title
            style={{
              fontSize: typo.h5.fontSize,
              fontWeight: "600",
              color: colors.text,
              ...typo.h5,
            }}
          >
            Send a Suggestion
          </Dialog.Title>
          <Dialog.Content>
            <Text
              style={{
                fontSize: typo.body1.fontSize,
                color: colors.text,
                marginBottom: layout.spacing.sm,
                ...typo.body1,
              }}
            >
              Let us know what topics or content you’d like to see!
            </Text>
            <TextInput
              value={suggestionText}
              onChangeText={setSuggestionText}
              placeholder="Enter your suggestion here..."
              multiline
              numberOfLines={4}
              style={{
                backgroundColor: colors.surface,
                minHeight: layout.spacing.xl * 2,
                borderRadius: layout.borderRadius.medium,
                padding: layout.spacing.sm,
                fontSize: typo.input.fontSize,
                ...typo.input,
              }}
              placeholderTextColor="rgba(17, 12, 9, 0.6)"
              disabled={isActionQueued}
            />
          </Dialog.Content>
          <Dialog.Actions style={{ paddingTop: layout.spacing.sm }}>
            <Button
              onPress={cancelSuggestion}
              textColor={colors.text}
              disabled={isActionQueued}
            >
              Cancel
            </Button>
            <Button
              onPress={submitSuggestion}
              buttonColor={colors.primary}
              mode="contained"
              style={{ borderRadius: layout.borderRadius.small }}
              disabled={isActionQueued || !suggestionText.trim()}
            >
              Submit
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
}
