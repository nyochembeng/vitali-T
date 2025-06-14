import { Notification } from "@/lib/schemas/notificationSchema";

export interface NotificationResponse {
  notification: Notification;
}

export interface NotificationsResponse {
  notifications: Notification[];
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

export interface NotificationFilterParams {
  type?: string;
  priority?: string;
  category?: string;
  read?: boolean;
}
