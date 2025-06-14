import * as BackgroundFetch from "expo-background-task";
import * as TaskManager from "expo-task-manager";
import { OFFLINE_QUEUE_SYNC } from "@/lib/utils/syncTask";

export const registerBackgroundTask = async () => {
  try {
    // Check if the task is already registered
    const isRegistered =
      await TaskManager.isTaskRegisteredAsync(OFFLINE_QUEUE_SYNC);
    if (isRegistered) return true;

    // Register the background fetch task
    await BackgroundFetch.registerTaskAsync(OFFLINE_QUEUE_SYNC, {
      minimumInterval: 15 * 60, // 15 minutes
    });

    console.log("Background task registered:", OFFLINE_QUEUE_SYNC);
    return true;
  } catch (error) {
    console.error("Failed to register background task:", error);
    return false;
  }
};

export const unregisterBackgroundTask = async () => {
  try {
    await BackgroundFetch.unregisterTaskAsync(OFFLINE_QUEUE_SYNC);
    console.log("Background task unregistered:", OFFLINE_QUEUE_SYNC);
  } catch (error) {
    console.error("Failed to unregister background task:", error);
  }
};
