import { useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";
import { Typo } from "../constants/Typo";
import { Layout } from "../constants/Layout";

type Theme = {
  colors: typeof Colors.light;
  typo: typeof Typo;
  layout: typeof Layout;
  mode: "light" | "dark";
};

export function useTheme(): Theme {
  // useColorScheme() returns 'light' | 'dark' | null
  const scheme = useColorScheme();

  // Fallback to 'light' if null
  const isDark = scheme === "dark";
  const mode = isDark ? "dark" : "light";

  const colors = isDark ? Colors.dark : Colors.light;
  const typo = Typo;
  const layout = Layout;

  return { colors, typo, layout, mode };
}
