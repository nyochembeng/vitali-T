import { Profile } from "@/lib/schemas/profileSchema";

// API response types
export interface CreateProfileResponse {
  profile: Profile;
}

export interface ProfileResponse {
  profile: Profile;
}

export interface UpdateProfileResponse {
  profile: Profile;
}

export interface DeleteProfileResponse {
  message: string;
}

export interface UploadProfileImageResponse {
  imageUrl: string;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

// Request types
export type CreateProfileRequest = Omit<Profile, "userId">;
export type UpdateProfileRequest = Partial<Omit<Profile, "userId">>;
export type UploadProfileImageRequest = {
  userId: string;
  image: string; // Base64 string or FormData
};
