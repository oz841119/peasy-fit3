import createNextIntlPlugin from 'next-intl/plugin';
import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin'

const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }

    return config
  },
};

export default withNextIntl(nextConfig);
