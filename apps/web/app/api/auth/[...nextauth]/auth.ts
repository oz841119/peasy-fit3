import { prisma } from "@/packages/Prisma";
import type { NextAuthOptions } from "next-auth";
import { getToken } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import type { Provider } from "next-auth/providers/index";
import { type NextRequest, NextResponse } from "next/server";
const getProviders = () => {
	const _CredentialsProvider = CredentialsProvider({
		name: "credentials",
		credentials: { email: {}, password: {} },
		async authorize(credentials) {
			if (!credentials?.email || !credentials?.password) {
				return null;
			}
			try {
				const user = await prisma.user.findUnique({
					where: {
						email: credentials?.email,
						password: credentials?.password,
					},
					select: {
						id: true,
						email: true,
					},
				});
				if (!user) {
					return null;
				}
					return { ...user, userId: user?.id };
			} catch (err) {
				console.log(err);
				return null;
			}
		},
	});
	const providers: Provider[] = [_CredentialsProvider];
	if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
		providers.push(
			GoogleProvider({
				clientId: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				authorization: {
					params: {
						prompt: "consent",
						access_type: "offline",
						response_type: "code",
					},
				},
			}),
		);
	}
	return providers;
};
export const authOptions: NextAuthOptions = {
	pages: {
		error: "/login",
		signIn: "/",
	},
	secret: "test",
	session: {
		strategy: "jwt",
	},
	providers: getProviders(),
	callbacks: {
		async signIn(params) {
			if (
				params.account?.provider === "google" &&
				params.account?.type === "oauth"
			) {
				const userGoogleId = params.account?.providerAccountId;
				const userName = params.profile?.name;
				try {
					const user = await prisma.user.findUnique({
						where: {
							googleId: userGoogleId,
						},
						select: {
							id: true,
							email: true,
						},
					});
					if (!user) {
						await prisma.user.create({
							data: {
								googleId: userGoogleId,
								name: userName,
							},
						});
					}
				} catch (err) {
					return false;
				}
			}
			return true;
		},
		async jwt(params) {
				if (params.account?.provider === "google") {
					const user = await prisma.user.findUnique({
						where: {
							googleId: params.account.providerAccountId,
						},
						select: {
							id: true,
							email: true,
						},
					});
					if (user) {
						if (params.user) {
							params.token.userId = user.id;
						}
					} else {
						throw "userId not exist";
					}
				} else {
					if (params.user) {
						params.token.userId = params.user.userId;
					}
				}
				if (params.user) {
					params.token.name = params.user.name;
				}
				return params.token;
		},
		async session(params) {
			if (params.session.user) {
				params.session.user.userId = params.token.userId;
				params.session.user.name = params.token.name || "";
			}
			return params.session;
		},
	},
};

export const handleAuth = async (req: NextRequest) => {
	const user = await getToken({ req: req, secret: "test" });
	if (user === null) {
		throw NextResponse.json("Unauthorized", { status: 401 });
	}
		return user;
};
