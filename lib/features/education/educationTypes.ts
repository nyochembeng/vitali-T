import { Video, Article, Topic } from "@/lib/schemas/healthEducationSchema";

export interface VideoResponse {
  video: Video;
}

export interface VideosResponse {
  videos: Video[];
}

export interface ArticleResponse {
  article: Article;
}

export interface ArticlesResponse {
  articles: Article[];
}

export interface TopicResponse {
  topic: Topic;
}

export interface TopicsResponse {
  topics: Topic[];
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

export interface EducationFilterParams {
  category?: string;
  trimester?: string;
  keywords?: string[];
}
