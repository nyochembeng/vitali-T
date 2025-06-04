import { Platform } from "react-native";

export const Layout = {
  // ─── Border Radius ─────────────────────────────────────────────────────────
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
    xl: 16,
    full: 9999, // for circular shapes (e.g., avatars)
  },

  // ─── Shadows & Elevation ──────────────────────────────────────────────────
  // Note: iOS uses shadow properties; Android uses elevation
  shadow: {
    /**
     * Light shadow for subtle card elevation
     * iOS: small offset + blur; Android: elevation
     */
    light: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 2,
      elevation: 1,
    },
    /**
     * Default shadow for raised elements
     * iOS: moderate offset + blur; Android: elevation 3
     */
    default: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    /**
     * Stronger shadow for modals or overlays
     * iOS: larger offset + blur; Android: elevation 6
     */
    heavy: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 6,
    },
  },

  // ─── Spacing ───────────────────────────────────────────────────────────────
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
  },

  // ─── Z-Index (for layering) ────────────────────────────────────────────────
  zIndex: {
    background: 0,
    card: 1,
    modal: 10,
    tooltip: 20,
  },

  // ─── Opacity Levels ─────────────────────────────────────────────────────────
  opacity: {
    low: 0.2,
    medium: 0.5,
    high: 0.8,
  },

  // ─── Platform-Specific Helpers ─────────────────────────────────────────────
  // Example: if you need a default elevation on Android only
  elevation: Platform.select({
    ios: 0, // iOS uses shadow props
    android: 3, // default Android elevation
  }),
};
