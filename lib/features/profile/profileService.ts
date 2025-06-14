import { profileSlice } from "@/lib/features/profile/profileSlice";
import {
  CreateProfileRequest,
  CreateProfileResponse,
  ProfileResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  DeleteProfileResponse,
  UploadProfileImageRequest,
  UploadProfileImageResponse,
} from "@/lib/features/profile/profileTypes";
import { Profile } from "@/lib/schemas/profileSchema";
import NetInfo from "@react-native-community/netinfo";
import { offlineQueue } from "@/lib/utils/offlineQueue";
import Toast from "react-native-toast-message";

const profileApi = profileSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProfile: builder.mutation<Profile, CreateProfileRequest>({
      query: (data) => ({
        url: "/profiles",
        method: "POST",
        data,
      }),
      async onQueryStarted(data, { queryFulfilled }) {
        const state = await NetInfo.fetch();
        const isOnline =
          !!state.isConnected && state.isInternetReachable !== false;
        if (!isOnline) {
          try {
            const queueResult = await offlineQueue.enqueueRequest({
              method: "POST",
              url: "/profiles",
              headers: { "Content-Type": "application/json" },
              data,
            });
            if (queueResult.success) {
              Toast.show({
                type: "info",
                text1: "Action Queued",
                text2: "Profile creation will be processed when online.",
              });
              throw new Error("ACTION_QUEUED");
            }
          } catch (error) {
            console.error("Failed to queue profile creation:", error);
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to queue profile creation.",
            });
            throw error;
          }
        }

        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Profile creation failed:", error);
          Toast.show({
            type: "error",
            text1: "Creation Failed",
            text2: "Unable to create profile.",
          });
          throw error;
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Profile", id: result?.userId },
      ],
      transformResponse: (response: CreateProfileResponse) => response.profile,
    }),
    getProfile: builder.query<Profile, string>({
      query: (userId) => ({
        url: `/profiles/${userId}`,
        method: "GET",
      }),
      providesTags: (result, error, userId) => [
        { type: "Profile", id: userId },
      ],
      transformResponse: (response: ProfileResponse) => response.profile,
    }),
    updateProfile: builder.mutation<
      Profile,
      { userId: string; data: UpdateProfileRequest }
    >({
      query: ({ userId, data }) => ({
        url: `/profiles/${userId}`,
        method: "PATCH",
        data,
      }),
      async onQueryStarted({ userId, data }, { queryFulfilled }) {
        const state = await NetInfo.fetch();
        const isOnline =
          !!state.isConnected && state.isInternetReachable !== false;
        if (!isOnline) {
          try {
            const queueResult = await offlineQueue.enqueueRequest({
              method: "PATCH",
              url: `/profiles/${userId}`,
              headers: { "Content-Type": "application/json" },
              data,
            });
            if (queueResult.success) {
              Toast.show({
                type: "info",
                text1: "Action Queued",
                text2: "Profile update will be processed when online.",
              });
              throw new Error("ACTION_QUEUED");
            }
          } catch (error) {
            console.error("Failed to queue profile update:", error);
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to queue profile update.",
            });
            throw error;
          }
        }

        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Profile update failed:", error);
          Toast.show({
            type: "error",
            text1: "Update Failed",
            text2: "Unable to update profile.",
          });
          throw error;
        }
      },
      invalidatesTags: (result, error, { userId }) => [
        { type: "Profile", id: userId },
      ],
      transformResponse: (response: UpdateProfileResponse) => response.profile,
    }),
    deleteProfile: builder.mutation<DeleteProfileResponse, string>({
      query: (userId) => ({
        url: `/profiles/${userId}`,
        method: "DELETE",
      }),
      async onQueryStarted(userId, { queryFulfilled }) {
        const state = await NetInfo.fetch();
        const isOnline =
          !!state.isConnected && state.isInternetReachable !== false;
        if (!isOnline) {
          try {
            const queueResult = await offlineQueue.enqueueRequest({
              method: "DELETE",
              url: `/profiles/${userId}`,
              headers: { "Content-Type": "application/json" },
              data: {},
            });
            if (queueResult.success) {
              Toast.show({
                type: "info",
                text1: "Action Queued",
                text2: "Profile deletion will be processed when online.",
              });
              throw new Error("ACTION_QUEUED");
            }
          } catch (error) {
            console.error("Failed to queue profile deletion:", error);
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to queue profile deletion.",
            });
            throw error;
          }
        }

        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Profile deletion failed:", error);
          Toast.show({
            type: "error",
            text1: "Deletion Failed",
            text2: "Unable to delete profile.",
          });
          throw error;
        }
      },
      invalidatesTags: (result, error, userId) => [
        { type: "Profile", id: userId },
      ],
    }),
    uploadProfileImage: builder.mutation<
      UploadProfileImageResponse,
      UploadProfileImageRequest
    >({
      query: ({ userId, image }) => ({
        url: `/profiles/${userId}/image`,
        method: "POST",
        data: { image },
      }),
      async onQueryStarted({ userId, image }, { queryFulfilled }) {
        const state = await NetInfo.fetch();
        const isOnline =
          !!state.isConnected && state.isInternetReachable !== false;
        if (!isOnline) {
          try {
            const queueResult = await offlineQueue.enqueueRequest({
              method: "POST",
              url: `/profiles/${userId}/image`,
              headers: { "Content-Type": "application/json" },
              data: { image },
            });
            if (queueResult.success) {
              Toast.show({
                type: "info",
                text1: "Action Queued",
                text2: "Profile image upload will be processed when online.",
              });
              throw new Error("ACTION_QUEUED");
            }
          } catch (error) {
            console.error("Failed to queue profile image upload:", error);
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to queue profile image upload.",
            });
            throw error;
          }
        }

        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Profile image upload failed:", error);
          Toast.show({
            type: "error",
            text1: "Upload Failed",
            text2: "Unable to upload profile image.",
          });
          throw error;
        }
      },
      invalidatesTags: (result, error, { userId }) => [
        { type: "Profile", id: userId },
      ],
    }),
  }),
});

export const {
  useCreateProfileMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
  useUploadProfileImageMutation,
} = profileApi;

export default profileApi;
