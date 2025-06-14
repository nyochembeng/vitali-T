import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    // Initial network check
    NetInfo.fetch().then((state) => {
      setIsOnline(!!state.isConnected && state.isInternetReachable !== false);
    });

    // Subscribe to network changes
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(!!state.isConnected && state.isInternetReachable !== false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  return { isOnline };
};
