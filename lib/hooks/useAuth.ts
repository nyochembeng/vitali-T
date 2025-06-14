import {
  useLoginMutation,
  useSignUpMutation,
} from "@/lib/features/user/userService";
import {
  getCurrentUser,
  isAuthenticated,
  removeToken,
  saveToken,
} from "@/lib/utils/authHelpers";
import { useCallback, useEffect, useState } from "react";
import { User } from "@/lib/schemas/userSchema";
import { LoginResponse, SignUpResponse } from "@/lib/features/user/userTypes";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isActionQueued, setIsActionQueued] = useState(false);

  const [loginMutation, { isLoading: isLoggingIn }] = useLoginMutation();
  const [signUpMutation, { isLoading: isSigningUp }] = useSignUpMutation();

  useEffect(() => {
    async function loadUser() {
      setLoading(true);
      const authenticated = await isAuthenticated();
      setLoggedIn(authenticated);
      if (authenticated) {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  const login = useCallback(
    async (credentials: {
      email: string;
      password: string;
    }): Promise<LoginResponse | { queued: boolean }> => {
      try {
        setIsActionQueued(false);
        const result = await loginMutation(credentials).unwrap();
        await saveToken(result.token);
        setUser(result.user);
        setLoggedIn(true);
        return result;
      } catch (error: any) {
        if (error.message === "ACTION_QUEUED") {
          setIsActionQueued(true);
          return { queued: true };
        }
        throw error;
      }
    },
    [loginMutation]
  );

  const signUp = useCallback(
    async (userData: {
      fullname: string;
      email: string;
      password: string;
      confirmPassword: string;
    }): Promise<SignUpResponse | { queued: boolean }> => {
      try {
        setIsActionQueued(false);
        const result = await signUpMutation(userData).unwrap();
        await saveToken(result.token);
        setUser(result.user);
        setLoggedIn(true);
        return result;
      } catch (error: any) {
        if (error.message === "ACTION_QUEUED") {
          setIsActionQueued(true);
          return { queued: true };
        }
        throw error;
      }
    },
    [signUpMutation]
  );

  const logout = useCallback(async () => {
    await removeToken();
    setUser(null);
    setLoggedIn(false);
    setIsActionQueued(false);
  }, []);

  return {
    user,
    loggedIn,
    loading,
    isLoggingIn,
    isSigningUp,
    isActionQueued,
    login,
    signUp,
    logout,
  };
}
