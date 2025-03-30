"use client";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";

export const LoadingBar = () => {
	const isFetching = useIsFetching();
	const isMutating = useIsMutating();
	const isLoading = isFetching > 0 || isMutating > 0;
	return (
		<div
			className={`fixed top-0 left-0 w-full h-1 bg-primary transition-transform duration-200 ease-in-out ${
				isLoading ? "translate-x-0" : "-translate-x-full"
			}`}
			style={{
				background: "linear-gradient(to right, #00b4db, #0083b0)",
			}}
		/>
	);
};
