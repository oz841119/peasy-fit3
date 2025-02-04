import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { importLocaleFile } from '@peasy-fit/locales';
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }
  const _locale = locale as (typeof routing.locales)[number];
  return {
    locale: _locale,
    messages: {
      common: { ...(await importLocaleFile(_locale, 'common')).default },
      msg: { ...(await importLocaleFile(_locale, 'msg')).default },
      table: { ...(await importLocaleFile(_locale, 'table')).default },
      card: { ...(await importLocaleFile(_locale, 'card')).default },
    },
  };
});