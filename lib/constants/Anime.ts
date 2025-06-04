import {
  withTiming,
  withSpring,
  withRepeat,
  withSequence,
  Easing,
  runOnJS,
} from 'react-native-reanimated';

export const Anime = {
  // ─── Timing Configs ────────────────────────────────────────────────────────
  durations: {
    short: 150,
    medium: 300,
    long: 500,
    xlong: 800,
  },

  easings: {
    easeIn: Easing.in(Easing.ease),
    easeOut: Easing.out(Easing.ease),
    easeInOut: Easing.inOut(Easing.ease),
    linear: Easing.linear,
    bounce: Easing.bounce,
  },

  // ─── Common Animated Styles ───────────────────────────────────────────────
  fadeIn: (duration = 300, callback?: () => void) =>
    withTiming(
      1,
      {
        duration,
        easing: Easing.out(Easing.ease),
      },
      callback ? runOnJS(callback) : undefined
    ),

  fadeOut: (duration = 300, callback?: () => void) =>
    withTiming(
      0,
      {
        duration,
        easing: Easing.in(Easing.ease),
      },
      callback ? runOnJS(callback) : undefined
    ),

  scaleIn: (duration = 300, callback?: () => void) =>
    withTiming(
      1,
      {
        duration,
        easing: Easing.out(Easing.ease),
      },
      callback ? runOnJS(callback) : undefined
    ),

  scaleOut: (duration = 300, callback?: () => void) =>
    withTiming(
      0,
      {
        duration,
        easing: Easing.in(Easing.ease),
      },
      callback ? runOnJS(callback) : undefined
    ),

  slideInY: (from = 50, duration = 300, callback?: () => void) =>
    withTiming(
      0,
      {
        duration,
        easing: Easing.out(Easing.ease),
      },
      callback ? runOnJS(callback) : undefined
    ),

  slideOutY: (to = 50, duration = 300, callback?: () => void) =>
    withTiming(
      to,
      {
        duration,
        easing: Easing.in(Easing.ease),
      },
      callback ? runOnJS(callback) : undefined
    ),

  slideInX: (from = 50, duration = 300, callback?: () => void) =>
    withTiming(
      0,
      {
        duration,
        easing: Easing.out(Easing.ease),
      },
      callback ? runOnJS(callback) : undefined
    ),

  slideOutX: (to = 50, duration = 300, callback?: () => void) =>
    withTiming(
      to,
      {
        duration,
        easing: Easing.in(Easing.ease),
      },
      callback ? runOnJS(callback) : undefined
    ),

  // ─── Spring Animations ────────────────────────────────────────────────────
  springIn: (damping = 15, stiffness = 150, callback?: () => void) =>
    withSpring(
      1,
      {
        damping,
        stiffness,
      },
      callback ? runOnJS(callback) : undefined
    ),

  springOut: (damping = 15, stiffness = 150, callback?: () => void) =>
    withSpring(
      0,
      {
        damping,
        stiffness,
      },
      callback ? runOnJS(callback) : undefined
    ),

  // ─── Loop Animations ──────────────────────────────────────────────────────
  pulse: (scale = 1.1, duration = 300) =>
    withRepeat(
      withSequence(
        withTiming(scale, { duration }),
        withTiming(1, { duration })
      ),
      -1, // infinite
      false
    ),

  shake: (intensity = 10, duration = 100) =>
    withRepeat(
      withSequence(
        withTiming(intensity, { duration }),
        withTiming(-intensity, { duration }),
        withTiming(intensity, { duration }),
        withTiming(0, { duration })
      ),
      1,
      false
    ),

  rotate: (duration = 1000) =>
    withRepeat(
      withTiming(360, {
        duration,
        easing: Easing.linear,
      }),
      -1,
      false
    ),

  // ─── Combined Animations ──────────────────────────────────────────────────
  bounceIn: (callback?: () => void) =>
    withSequence(
      withTiming(1.2, { duration: 200, easing: Easing.out(Easing.ease) }),
      withTiming(0.9, { duration: 100 }),
      withTiming(1, { duration: 100 }, callback ? runOnJS(callback) : undefined)
    ),

  slideAndFade: (translateY = 50, duration = 300, callback?: () => void) =>
    withTiming(
      0,
      {
        duration,
        easing: Easing.out(Easing.ease),
      },
      callback ? runOnJS(callback) : undefined
    ),
};
