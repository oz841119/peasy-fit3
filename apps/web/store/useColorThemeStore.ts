import { create } from "zustand";
import { COLOR_THEME } from "../constants/index";
import { devtools, persist } from "zustand/middleware";
type Theme = ValueOf<typeof COLOR_THEME>
interface ColorThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
}
export const useColorThemeStore = create<ColorThemeState>()(
  devtools(
    persist(
      (set) => ({
        theme: COLOR_THEME.DARK,
        setTheme: (theme: Theme) => set({ theme: theme })
      }),
      {
        name: 'ColorThemeState'
      }
    )
  )
);
