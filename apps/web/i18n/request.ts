import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { importLocaleFile } from '@peasy-fit/locales';
export default getRequestConfig(async ({ locale }) => {
  if (!routing.locales.includes(locale as any)) return notFound();
  const _locale = locale as (typeof routing.locales)[number];
  return {
    messages: {
      common: { ...(await importLocaleFile(_locale, 'common')).default },
      msg: { ...(await importLocaleFile(_locale, 'msg')).default },
      table: { ...(await importLocaleFile(_locale, 'table')).default },
    },
  };
});