import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeState {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}
function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}
const systemTheme = getSystemTheme();
export const useThemeStore = create<ThemeState>((set) => ({
    theme: (localStorage.getItem("theme") as Theme) || systemTheme,

    toggleTheme: () =>
        set((state) => {
            const newTheme = state.theme === "light" ? "dark" : "light";

            document.documentElement.classList.remove(state.theme);
            document.documentElement.classList.add(newTheme);

            localStorage.setItem("theme", newTheme);

            return { theme: newTheme };
        }),

    setTheme: (theme) => {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme);

        localStorage.setItem("theme", theme);
        set({ theme });
    },
}));
