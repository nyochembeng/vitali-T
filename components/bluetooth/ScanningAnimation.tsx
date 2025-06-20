import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";

interface ScanningAnimationProps {
  isScanning: boolean;
  children: React.ReactNode;
}

const ScanningAnimation: React.FC<ScanningAnimationProps> = ({
  isScanning,
  children,
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isScanning) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [isScanning, pulseAnim]);

  return (
    <Animated.View
      style={{
        alignItems: "center",
        justifyContent: "center",
        transform: [{ scale: isScanning ? pulseAnim : 1 }],
      }}
    >
      {children}
    </Animated.View>
  );
};

export default ScanningAnimation;
