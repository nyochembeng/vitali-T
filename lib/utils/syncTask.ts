import * as TaskManager from "expo-task-manager";
import NetInfo from "@react-native-community/netinfo";
import { offlineQueue } from "@/lib/utils/offlineQueue";
import { BackgroundTaskResult } from "expo-background-task";

export const OFFLINE_QUEUE_SYNC = "offline-queue-sync";

TaskManager.defineTask(OFFLINE_QUEUE_SYNC, async () => {
  let queueSize = 0;
  try {
    const state = await NetInfo.fetch();
    const isOnline = !!state.isConnected && state.isInternetReachable !== false;

    if (isOnline) {
      queueSize = await offlineQueue.getQueueSize();
      if (queueSize > 0) {
        await offlineQueue.processQueue();
      }
    }

    return queueSize > 0
      ? BackgroundTaskResult.Success
      : BackgroundTaskResult.Failed;
  } catch (error) {
    console.error("Background sync failed:", error);
    return BackgroundTaskResult.Failed;
  }
});
