import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

const AUTH_TOKEN_KEY = "authToken";

// Decode the JWT token to get the user data
export async function getCurrentUser(): Promise<any | null> {
  try {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) return null;

    // Decode token payload (you can type this accordingly)
    const user = jwtDecode(token);
    return user;
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
}

// Check if the user is authenticated based on token presence and validity
export async function isAuthenticated(): Promise<boolean> {
  try {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) return false;

    // Optionally decode to verify expiration
    const { exp } = jwtDecode<{ exp: number }>(token);
    if (!exp) return false;

    const currentTime = Math.floor(Date.now() / 1000);
    return exp > currentTime;
  } catch (error) {
    console.error("Failed to check authentication:", error);
    return false;
  }
}

export async function saveToken(token: string) {
  await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
}

export async function removeToken() {
  await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
}
