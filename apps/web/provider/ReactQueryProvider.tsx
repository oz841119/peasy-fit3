"use client";
import { LoadingBar } from "@/components/LoadingBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { PropsWithChildren } from "react";

const queryClient = new QueryClient();

export const ReactQueryProvider = ({ children }: PropsWithChildren) => {
	return (
		<QueryClientProvider client={queryClient}>
			<LoadingBar />
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
			{/*
          By default, React Query Devtools are only included in bundles when process.env.NODE_ENV === 'development',
          so you don't need to worry about excluding them during a production build.
          (https://tanstack.com/query/latest/docs/framework/react/devtools)
        */}
		</QueryClientProvider>
	);
};
