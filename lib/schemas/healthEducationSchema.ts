import { z } from "zod";

export const videoSchema = z.object({
  videoId: z.string().min(1, { message: "Video ID is required" }),
  title: z.string().min(1, { message: "Title is required" }),
  duration: z.string().min(1, { message: "Duration is required" }),
  mediaUrl: z.string().url({ message: "Valid media URL is required" }),
  category: z.enum(
    [
      "Nutrition",
      "Exercise",
      "Mental Health",
      "Development",
      "Warning Signs",
      "Other",
    ],
    {
      message: "Invalid category",
    }
  ),
  trimester: z
    .enum(["First", "Second", "Third", "All"], { message: "Invalid trimester" })
    .optional(),
  keywords: z.array(z.string()).optional(),
  references: z.array(z.string()).optional(),
});

export const articleSchema = z.object({
  articleId: z.string().min(1, { message: "Article ID is required" }),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  readTime: z.string().min(1, { message: "Read time is required" }),
  mediaUrl: z.string().url({ message: "Valid media URL is required" }),
  category: z.enum(
    [
      "Nutrition",
      "Exercise",
      "Mental Health",
      "Development",
      "Warning Signs",
      "Other",
    ],
    {
      message: "Invalid category",
    }
  ),
  trimester: z
    .enum(["First", "Second", "Third", "All"], { message: "Invalid trimester" })
    .optional(),
  keywords: z.array(z.string()).optional(),
  references: z.array(z.string()).optional(),
});

export const topicSchema = z.object({
  topicId: z.string().min(1, { message: "Topic ID is required" }),
  title: z.string().min(1, { message: "Title is required" }),
  category: z.enum(
    [
      "Nutrition",
      "Exercise",
      "Mental Health",
      "Development",
      "Warning Signs",
      "Other",
    ],
    {
      message: "Invalid category",
    }
  ),
  keywords: z.array(z.string()).optional(),
});

export type Video = z.infer<typeof videoSchema>;
export type Article = z.infer<typeof articleSchema>;
export type Topic = z.infer<typeof topicSchema>;
