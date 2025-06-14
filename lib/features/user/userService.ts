import { userSlice } from "@/lib/features/user/userSlice";
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SignUpResponse,
  UpdateUserRequest,
} from "@/lib/features/user/userTypes";
import { User } from "@/lib/schemas/userSchema";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { offlineQueue } from "@/lib/utils/offlineQueue";
import Toast from "react-native-toast-message";
import NetInfo from "@react-native-community/netinfo";

const userApi = userSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        data: credentials,
      }),
      async onQueryStarted(credentials, { queryFulfilled }) {
        const state = await NetInfo.fetch();
        const isOnline =
          !!state.isConnected && state.isInternetReachable !== false;
        if (!isOnline) {
          try {
            const queueResult = await offlineQueue.enqueueRequest({
              method: "POST",
              url: "/auth/login",
              headers: { "Content-Type": "application/json" },
              data: credentials,
            });
            if (queueResult.success) {
              Toast.show({
                type: "info",
                text1: "Action Queued",
                text2: "Login will be processed when online.",
              });
              throw new Error("ACTION_QUEUED");
            }
          } catch (error) {
            console.error("Failed to queue login:", error);
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to queue login request.",
            });
            throw error;
          }
        }

        try {
          const { data } = await queryFulfilled;
          await AsyncStorage.setItem("authToken", data.token);
        } catch (error) {
          console.error("Login failed:", error);
          Toast.show({
            type: "error",
            text1: "Login Failed",
            text2: "Please check your credentials.",
          });
          throw error;
        }
      },
    }),
    signUp: builder.mutation<SignUpResponse, SignUpRequest>({
      query: (userData) => ({
        url: "/auth/signup",
        method: "POST",
        data: userData,
      }),
      async onQueryStarted(userData, { queryFulfilled }) {
        const state = await NetInfo.fetch();
        const isOnline =
          !!state.isConnected && state.isInternetReachable !== false;
        if (!isOnline) {
          try {
            const queueResult = await offlineQueue.enqueueRequest({
              method: "POST",
              url: "/auth/signup",
              headers: { "Content-Type": "application/json" },
              data: userData,
            });
            if (queueResult.success) {
              Toast.show({
                type: "info",
                text1: "Action Queued",
                text2: "Signup will be processed when online.",
              });
              throw new Error("ACTION_QUEUED");
            }
          } catch (error) {
            console.error("Failed to queue signup:", error);
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to queue signup request.",
            });
            throw error;
          }
        }

        try {
          const { data } = await queryFulfilled;
          if ("token" in data) {
            await AsyncStorage.setItem("authToken", data.token);
          }
        } catch (error) {
          console.error("Signup failed:", error);
          Toast.show({
            type: "error",
            text1: "Signup Failed",
            text2: "Please try again.",
          });
          throw error;
        }
      },
    }),
    getUserProfile: builder.query<User, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "GET",
      }),
      providesTags: (result, error, userId) => [{ type: "User", id: userId }],
    }),
    updateUserProfile: builder.mutation<
      User,
      { userId: string; data: UpdateUserRequest }
    >({
      query: ({ userId, data }) => ({
        url: `/users/${userId}`,
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
              url: `/users/${userId}`,
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
        { type: "User", id: userId },
      ],
    }),
    forgotPassword: builder.mutation<
      ForgotPasswordResponse,
      ForgotPasswordRequest
    >({
      query: (email) => ({
        url: "/auth/forgot-password",
        method: "POST",
        data: email,
      }),
      async onQueryStarted(email, { queryFulfilled }) {
        const state = await NetInfo.fetch();
        const isOnline =
          !!state.isConnected && state.isInternetReachable !== false;
        if (!isOnline) {
          try {
            const queueResult = await offlineQueue.enqueueRequest({
              method: "POST",
              url: "/auth/forgot-password",
              headers: { "Content-Type": "application/json" },
              data: email,
            });
            if (queueResult.success) {
              Toast.show({
                type: "info",
                text1: "Action Queued",
                text2: "Password reset request will be processed when online.",
              });
              throw new Error("ACTION_QUEUED");
            }
          } catch (error) {
            console.error("Failed to queue forgot password:", error);
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to queue password reset request.",
            });
            throw error;
          }
        }

        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Forgot password failed:", error);
          Toast.show({
            type: "error",
            text1: "Request Failed",
            text2: "Unable to process password reset.",
          });
          throw error;
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useForgotPasswordMutation,
} = userApi;

export default userApi;
