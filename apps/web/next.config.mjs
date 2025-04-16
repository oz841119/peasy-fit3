import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";
import createNextIntlPlugin from "next-intl/plugin";
import dotenv from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, "../../.env.dev") });
const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config, { isServer }) => {
		console.log(process.env.NEST_SERVER_URL);
		if (isServer) {
			config.plugins = [...config.plugins, new PrismaPlugin()];
		}
		return config;
	},
	serverExternalPackages: ["@prisma/client"],
	env: {
		NEST_SERVER_URL: process.env.BACKEND_SERVER_URL,
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
	},
};

export default withNextIntl(nextConfig);
