import { profileSlice } from "@/lib/features/profile/profileSlice";
import {
  CreateProfileRequest,
  UpdateProfileRequest,
  UploadProfileImageRequest,
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
        service: "aas",
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
              service: "aas",
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
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Profile created successfully.",
          });
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
      invalidatesTags: (result) => [{ type: "Profile", id: result?.userId }],
      transformResponse: (response: Profile) => response,
    }),
    getProfile: builder.query<Profile, void>({
      query: () => ({
        url: "/profiles",
        method: "GET",
        service: "aas",
      }),
      providesTags: (result) => [{ type: "Profile", id: result?.userId }],
      transformResponse: (response: Profile) => response,
    }),
    updateProfile: builder.mutation<Profile, { data: UpdateProfileRequest }>({
      query: ({ data }) => ({
        url: "/profiles",
        method: "PATCH",
        data,
        service: "aas",
      }),
      async onQueryStarted({ data }, { queryFulfilled }) {
        const state = await NetInfo.fetch();
        const isOnline =
          !!state.isConnected && state.isInternetReachable !== false;
        if (!isOnline) {
          try {
            const queueResult = await offlineQueue.enqueueRequest({
              method: "PATCH",
              url: "/profiles",
              headers: { "Content-Type": "application/json" },
              data,
              service: "aas",
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
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Profile updated successfully.",
          });
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
      invalidatesTags: (result) => [{ type: "Profile", id: result?.userId }],
      transformResponse: (response: Profile) => response,
    }),
    deleteProfile: builder.mutation<Profile, void>({
      query: () => ({
        url: "/profiles",
        method: "DELETE",
        service: "aas",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        const state = await NetInfo.fetch();
        const isOnline =
          !!state.isConnected && state.isInternetReachable !== false;
        if (!isOnline) {
          try {
            const queueResult = await offlineQueue.enqueueRequest({
              method: "DELETE",
              url: "/profiles",
              headers: { "Content-Type": "application/json" },
              data: {},
              service: "aas",
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
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Profile deleted successfully.",
          });
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
      invalidatesTags: (result, error, _) => [
        { type: "Profile", id: result?.userId },
      ],
    }),
    uploadProfileImage: builder.mutation<Profile, UploadProfileImageRequest>({
      query: ({ image }) => {
        const formData = new FormData();
        formData.append("image", {
          uri: image.uri,
          type: image.type || "image/jpeg",
          name: image.name || "profile.jpg",
        } as any);
        return {
          url: "/profiles/upload-image",
          method: "POST",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
          service: "aas",
        };
      },
      async onQueryStarted({ image }, { queryFulfilled }) {
        const state = await NetInfo.fetch();
        const isOnline =
          !!state.isConnected && state.isInternetReachable !== false;
        if (!isOnline) {
          try {
            const formData = new FormData();
            formData.append("image", {
              uri: image.uri,
              type: image.type || "image/jpeg",
              name: image.name || "profile.jpg",
            } as any);
            const queueResult = await offlineQueue.enqueueRequest({
              method: "POST",
              url: "/profiles/upload-image",
              headers: { "Content-Type": "multipart/form-data" },
              data: formData,
              service: "aas",
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
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Profile image uploaded successfully.",
          });
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
      invalidatesTags: (result) => [{ type: "Profile", id: result?.userId }],
      transformResponse: (response: Profile) => response,
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
