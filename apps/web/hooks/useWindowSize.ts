import { useEffect, useState } from "react";

type Size = {
	width: number;
	height: number;
};

const subscribers = new Set<(size: Size) => void>();
const globalWindowSize: Size = {
	width: 0,
	height: 0,
};

const handleResize = () => {
	globalWindowSize.width = window.innerWidth;
	globalWindowSize.height = window.innerHeight;
	subscribers.forEach((callback) => callback(globalWindowSize));
};

if (typeof window !== "undefined") {
	window.addEventListener("resize", handleResize);
}

export const useWindowSize = () => {
	const [size, setSize] = useState<Size>({
		width: globalWindowSize.width,
		height: globalWindowSize.height,
	});
	useEffect(() => {
		setSize(() => {
			return {
				width: window.innerWidth,
				height: window.innerHeight,
			};
		});
		const updateSize = (size: Size) => {
			setSize({ ...size });
		};
		subscribers.add(updateSize);
		return () => {
			subscribers.delete(updateSize);
		};
	}, []);
	return { ...size };
};
