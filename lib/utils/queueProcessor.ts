import { useEffect, useRef } from "react";
import { useNetworkStatus } from "@/lib/hooks/useNetworkStatus";
import { offlineQueue } from "@/lib/utils/offlineQueue";
import Toast from "react-native-toast-message";
import { debounce } from "lodash";

export const useQueueProcessor = () => {
  const { isOnline } = useNetworkStatus();
  const wasOnline = useRef<boolean | null>(null);

  const processQueueDebounced = debounce(
    async () => {
      try {
        const queueSize = await offlineQueue.getQueueSize();
        if (queueSize === 0) return;

        Toast.show({
          type: "info",
          text1: "Syncing",
          text2: `Processing ${queueSize} pending action${queueSize > 1 ? "s" : ""}...`,
        });

        const result = await offlineQueue.processQueue();
        if (result.success) {
          const failed = result.results?.filter((r) => !r.success) || [];
          if (failed.length === 0) {
            Toast.show({
              type: "success",
              text1: "Sync Complete",
              text2: "All actions processed successfully.",
            });
          } else {
            Toast.show({
              type: "error",
              text1: "Partial Sync Failure",
              text2: `${failed.length} action${failed.length > 1 ? "s" : ""} failed to sync.`,
            });
          }
        } else {
          Toast.show({
            type: "error",
            text1: "Sync Failed",
            text2: result.error || "Unable to process queued actions.",
          });
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Sync Error",
          text2: "An unexpected error occurred during sync.",
        });
        console.error("Failed to process queue:", error);
      }
    },
    1000,
    { leading: true, trailing: false }
  );

  useEffect(() => {
    if (isOnline && wasOnline.current === false) {
      processQueueDebounced();
    }
    wasOnline.current = isOnline;
  }, [isOnline, processQueueDebounced]);

  return { processQueue: processQueueDebounced };
};
