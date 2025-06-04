import { TextStyle } from "react-native";

export const Typo: Record<string, TextStyle> = {
  // ─── Headings ──────────────────────────────────────────────────────────────
  h1: {
    fontFamily: "Quicksand-Bold",
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  h2: {
    fontFamily: "Quicksand-SemiBold",
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: -0.25,
  },
  h3: {
    fontFamily: "Quicksand-SemiBold",
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0,
  },
  h4: {
    fontFamily: "Quicksand-Medium",
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.15,
  },
  h5: {
    fontFamily: "Quicksand-Medium",
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  h6: {
    fontFamily: "Quicksand-Regular",
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.15,
  },

  // ─── Subtitles / Section Labels ────────────────────────────────────────────
  subtitle1: {
    fontFamily: "Quicksand-Medium",
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.15,
  },
  subtitle2: {
    fontFamily: "Inter-Medium",
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.1,
  },
  subtitle3: {
    fontFamily: "Inter-Medium",
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.1,
  },

  // ─── Body Text ─────────────────────────────────────────────────────────────
  body1: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.1,
  },
  body2: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  body3: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0.4,
  },
  paragraph: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.1,
  },

  // ─── Buttons & Interactive Text ────────────────────────────────────────────
  button: {
    fontFamily: "Inter-Medium",
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 1.25,
    textTransform: "uppercase",
  },
  buttonSmall: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 1.25,
    textTransform: "uppercase",
  },
  link: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.1,
    textDecorationLine: "underline",
  },

  // ─── Captions & Labels ─────────────────────────────────────────────────────
  caption: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  label: {
    fontFamily: "Inter-SemiBold",
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  overline: {
    fontFamily: "Inter-Bold",
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },

  // ─── Form & Input Text ─────────────────────────────────────────────────────
  input: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.1,
  },
  placeholder: {
    fontFamily: "Inter-Italic",
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.1,
  },
  helper: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
  },

  // ─── Miscellaneous ─────────────────────────────────────────────────────────
  quote: {
    fontFamily: "Quicksand-Italic",
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.1,
  },
  smallText: {
    fontFamily: "Inter-Regular",
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.5,
  },
};
