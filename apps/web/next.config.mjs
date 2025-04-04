import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config, { isServer }) => {
		if (isServer) {
			config.plugins = [...config.plugins, new PrismaPlugin()];
		}
		return config;
	},
	serverExternalPackages: ["@prisma/client"],
};

export default withNextIntl(nextConfig);
