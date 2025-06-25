import { userSlice } from "@/lib/features/user/userSlice";
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SignUpResponse,
  UpdateUserRequest,
  ResetPasswordRequest,
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
        service: "aas",
      }),
      onQueryStarted: async (credentials, { queryFulfilled }) => {
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
              service: "aas",
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
          await queryFulfilled;
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

      transformResponse: (response: {
        token: string;
        user: { id: string; email: string; fullname: string };
      }) => ({
        token: response.token,
        user: {
          userId: response.user.id,
          fullname: response.user.fullname,
          email: response.user.email,
          password: "",
        },
      }),
    }),
    signUp: builder.mutation<SignUpResponse, SignUpRequest>({
      query: (userData) => ({
        url: "/auth/signup",
        method: "POST",
        data: userData,
        service: "aas",
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
              service: "aas",
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
          await AsyncStorage.setItem("authToken", data.token);
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

      transformResponse: (response: {
        token: string;
        user: { id: string; email: string; fullname: string };
      }) => ({
        token: response.token,
        user: {
          userId: response.user.id,
          fullname: response.user.fullname,
          email: response.user.email,
          password: "",
        },
      }),
    }),
    getUserProfile: builder.query<User, string>({
      query: () => ({
        url: "/auth/profile",
        method: "POST",
        service: "aas",
      }),
      providesTags: (result, error, userId) => [{ type: "User", id: userId }],
      transformResponse: (response: { user: User }) => response.user,
    }),
    updateUserProfile: builder.mutation<
      User,
      { userId: string; data: UpdateUserRequest }
    >({
      query: ({ userId, data }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        data,
        service: "aas",
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
        service: "aas",
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
              service: "aas",
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
    resetPassword: builder.mutation<void, ResetPasswordRequest>({
      query: (data) => ({
        url: "/auth/reset-password",
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
              url: "/auth/reset-password",
              headers: { "Content-Type": "application/json" },
              data,
              service: "aas",
            });
            if (queueResult.success) {
              Toast.show({
                type: "info",
                text1: "Action Queued",
                text2: "Password reset will be processed when online.",
              });
              throw new Error("ACTION_QUEUED");
            }
          } catch (error) {
            console.error("Failed to queue reset password:", error);
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to queue password reset.",
            });
            throw error;
          }
        }

        try {
          await queryFulfilled;
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Password reset successful.",
          });
        } catch (error) {
          console.error("Reset password failed:", error);
          Toast.show({
            type: "error",
            text1: "Reset Failed",
            text2: "Unable to reset password.",
          });
          throw error;
        }
      },
    }),
    deleteUser: builder.mutation<void, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
        service: "aas",
      }),
      async onQueryStarted(userId, { queryFulfilled }) {
        const state = await NetInfo.fetch();
        const isOnline =
          !!state.isConnected && state.isInternetReachable !== false;
        if (!isOnline) {
          try {
            const queueResult = await offlineQueue.enqueueRequest({
              method: "DELETE",
              url: `/users/${userId}`,
              headers: { "Content-Type": "application/json" },
              data: {},
              service: "aas",
            });
            if (queueResult.success) {
              Toast.show({
                type: "info",
                text1: "Action Queued",
                text2: "Account deletion will be processed when online.",
              });
              throw new Error("ACTION_QUEUED");
            }
          } catch (error) {
            console.error("Failed to queue account deletion:", error);
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to queue account deletion.",
            });
            throw error;
          }
        }

        try {
          await queryFulfilled;
          await AsyncStorage.removeItem("authToken");
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Account deleted successfully.",
          });
        } catch (error) {
          console.error("Account deletion failed:", error);
          Toast.show({
            type: "error",
            text1: "Deletion Failed",
            text2: "Unable to delete account.",
          });
          throw error;
        }
      },
      invalidatesTags: (result, error, userId) => [
        { type: "User", id: userId },
      ],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useDeleteUserMutation,
} = userApi;

export default userApi;
