import { type routing, usePathname, useRouter } from "@/i18n/routing";
export const useLangToggler = () => {
	const router = useRouter();
	const pathname = usePathname();
	const toggleLocale = (locale: (typeof routing.locales)[number]) => {
		router.push(pathname, { locale });
	};
	return {
		toggleLocale,
	};
};
