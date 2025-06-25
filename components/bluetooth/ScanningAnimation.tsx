import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";

interface ScanningAnimationProps {
  isActive: boolean;
  children: React.ReactNode;
}

const ScanningAnimation: React.FC<ScanningAnimationProps> = ({
  isActive,
  children,
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isActive) {
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
  }, [isActive, pulseAnim]);

  return (
    <Animated.View
      style={{
        alignItems: "center",
        justifyContent: "center",
        transform: [{ scale: isActive ? pulseAnim : 1 }],
      }}
    >
      {children}
    </Animated.View>
  );
};

export default ScanningAnimation;
