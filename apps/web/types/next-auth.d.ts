import "next-auth";

declare module "next-auth" {
	interface User {
		userId: string;
	}
	interface Session {
		user: {
			userId: string;
			name: string;
		};
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		userId: string;
	}
}
