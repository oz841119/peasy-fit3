type Locale = "en-US" | "zh-TW";
type Type = "common" | "msg" | "table" | "card";
async function importLocaleFile(locale: Locale, type: Type) {
	return import(`./${locale}/${type}.json`);
}
export { importLocaleFile };
