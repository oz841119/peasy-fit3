import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

const localeNames = {
	"en-US": "English",
	"zh-TW": "繁體中文",
};

export const routing = defineRouting({
	locales: ["en-US", "zh-TW"],
	defaultLocale: "en-US",
});

export const getLocaleName = (locale: (typeof routing.locales)[number]) => {
	return localeNames[locale];
};

export const { Link, redirect, usePathname, useRouter } =
	createSharedPathnamesNavigation(routing);
