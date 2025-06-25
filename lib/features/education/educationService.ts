import { educationSlice } from "@/lib/features/education/educationSlice";
import {
  VideoResponse,
  VideosResponse,
  ArticleResponse,
  ArticlesResponse,
  TopicResponse,
  TopicsResponse,
  EducationFilterParams,
} from "@/lib/features/education/educationTypes";
import { Video, Article, Topic } from "@/lib/schemas/healthEducationSchema";
import Toast from "react-native-toast-message";

const educationApi = educationSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideo: builder.query<Video, string>({
      query: (videoId) => ({
        url: `/education/videos/${videoId}`,
        method: "GET",
        service: "hes",
      }),
      providesTags: (result, error, videoId) => [
        { type: "Videos", id: videoId },
      ],
      transformResponse: (response: VideoResponse) => response.video,
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Failed to load video details.",
          });
          throw error;
        }
      },
    }),
    getVideos: builder.query<Video[], EducationFilterParams>({
      query: (params) => ({
        url: "/education/videos",
        method: "GET",
        params: {
          category: params.category,
          trimester: params.trimester,
          keywords: params.keywords?.join(","),
        },
        service: "hes",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Videos", id: "LIST" },
              ...result.map((video) => ({
                type: "Videos" as const,
                id: video.videoId,
              })),
            ]
          : [{ type: "Videos", id: "LIST" }],
      transformResponse: (response: VideosResponse) => response.videos,
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Failed to load videos.",
          });
          throw error;
        }
      },
    }),
    getArticle: builder.query<Article, string>({
      query: (articleId) => ({
        url: `/education/articles/${articleId}`,
        method: "GET",
        service: "hes",
      }),
      providesTags: (result, error, articleId) => [
        { type: "Articles", id: articleId },
      ],
      transformResponse: (response: ArticleResponse) => response.article,
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Failed to load article details.",
          });
          throw error;
        }
      },
    }),
    getArticles: builder.query<Article[], EducationFilterParams>({
      query: (params) => ({
        url: "/education/articles",
        method: "GET",
        params: {
          category: params.category,
          trimester: params.trimester,
          keywords: params.keywords?.join(","),
        },
        service: "hes",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Articles", id: "LIST" },
              ...result.map((article) => ({
                type: "Articles" as const,
                id: article.articleId,
              })),
            ]
          : [{ type: "Articles", id: "LIST" }],
      transformResponse: (response: ArticlesResponse) => response.articles,
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Failed to load articles.",
          });
          throw error;
        }
      },
    }),
    getTopic: builder.query<Topic, string>({
      query: (topicId) => ({
        url: `/education/topics/${topicId}`,
        method: "GET",
        service: "hes",
      }),
      providesTags: (result, error, topicId) => [
        { type: "Topics", id: topicId },
      ],
      transformResponse: (response: TopicResponse) => response.topic,
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Failed to load topic details.",
          });
          throw error;
        }
      },
    }),
    getTopics: builder.query<Topic[], EducationFilterParams>({
      query: (params) => ({
        url: "/education/topics",
        method: "GET",
        params: {
          category: params.category,
          keywords: params.keywords?.join(","),
        },
        service: "hes",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Topics", id: "LIST" },
              ...result.map((topic) => ({
                type: "Topics" as const,
                id: topic.topicId,
              })),
            ]
          : [{ type: "Topics", id: "LIST" }],
      transformResponse: (response: TopicsResponse) => response.topics,
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Failed to load topics.",
          });
          throw error;
        }
      },
    }),
  }),
});

export const {
  useGetVideoQuery,
  useGetVideosQuery,
  useGetArticleQuery,
  useGetArticlesQuery,
  useGetTopicQuery,
  useGetTopicsQuery,
} = educationApi;

export default educationApi;
