import type { ValueOf } from "next/dist/shared/lib/constants";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { COLOR_THEME } from "../constants/index";
type Theme = ValueOf<typeof COLOR_THEME>;
interface ColorThemeState {
	theme: Theme;
	setTheme: (theme: Theme) => void;
}
export const useColorThemeStore = create<ColorThemeState>()(
	devtools(
		persist(
			(set) => ({
				theme: COLOR_THEME.DARK,
				setTheme: (theme: Theme) => set({ theme: theme }),
			}),
			{
				name: "ColorThemeState",
			},
		),
	),
);
