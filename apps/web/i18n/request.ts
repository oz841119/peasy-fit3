import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ locale }) => {
  if (!routing.locales.includes(locale as any)) notFound();
  return {
    messages: {
      common: { ...(await import(`../../../dictionaries/${locale}/common.json`)).default },
      msg: { ...(await import(`../../../dictionaries/${locale}/msg.json`)).default },
      table: { ...(await import(`../../../dictionaries/${locale}/table.json`)).default },
    },
  };
});