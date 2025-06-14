import { useEffect, useState } from "react";
import { Button, Card, Paragraph, Title } from "react-native-paper";
import { offlineQueue } from "@/lib/utils/offlineQueue";
import { useQueueProcessor } from "@/lib/utils/queueProcessor";
import { useTheme } from "@/lib/hooks/useTheme";

export const SyncStatus = () => {
  const [queueSize, setQueueSize] = useState(0);
  const [storageSize, setStorageSize] = useState(0);
  const { processQueue } = useQueueProcessor();
  const { layout, colors, typo } = useTheme();

  useEffect(() => {
    const updateQueueInfo = async () => {
      const size = await offlineQueue.getQueueSize();
      const storage = await offlineQueue.getQueueStorageSize();
      setQueueSize(size);
      setStorageSize(storage);
    };

    updateQueueInfo();
    const interval = setInterval(updateQueueInfo, 5000); // Update every 5s
    return () => clearInterval(interval);
  }, []);

  if (queueSize === 0) return null;

  return (
    <Card
      style={{
        margin: layout.spacing.md,
        padding: layout.spacing.md,
        backgroundColor: colors.surface,
      }}
    >
      <Card.Content>
        <Title style={{ fontSize: typo.h3.fontSize }}>
          Pending Sync ({queueSize})
        </Title>
        <Paragraph style={{ fontSize: typo.body1.fontSize }}>
          {queueSize} action{queueSize > 1 ? "s" : ""} queued, using{" "}
          {(storageSize / 1024).toFixed(2)} KB of storage.
        </Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="contained"
          onPress={processQueue}
          style={{ margin: layout.spacing.sm }}
        >
          Retry Sync
        </Button>
      </Card.Actions>
    </Card>
  );
};
