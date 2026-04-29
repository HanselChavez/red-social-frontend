import { useThemeStore } from "@/store/theme.store";

export default function ThemeButton() {
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const theme = useThemeStore((s) => s.theme);
  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 bg-indigo-800 text-white font-semibold rounded-xl"
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
