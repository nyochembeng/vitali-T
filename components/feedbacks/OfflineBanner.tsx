import { Banner } from "react-native-paper";
import { useNetworkStatus } from "@/lib/hooks/useNetworkStatus";
import { useTheme } from "@/lib/hooks/useTheme";

export const OfflineBanner = () => {
  const { isOnline } = useNetworkStatus();
  const { colors, layout } = useTheme();

  return (
    <Banner
      visible={!isOnline}
      style={{
        backgroundColor: colors.error,
        paddingVertical: layout.spacing.sm,
      }}
      contentStyle={{
        paddingHorizontal: layout.spacing.md,
      }}
      icon={"wifi-off"}
    >
      {`You're offline. Actions will be queued and synced when you're back online.`}
    </Banner>
  );
};
