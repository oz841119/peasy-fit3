import {
	BicepsFlexed,
	ChartSpline,
	Dumbbell,
	House,
	Play,
	SquarePlus,
} from "lucide-react";

export const menu = [
	{
		name: "dashboard",
		label: "common.menu.label.index",
		route: "/dashboard",
		icon: House,
	},
	{
		name: "trainingRecord",
		label: "common.menu.label.trainingRecord",
		route: "/dashboard/training-record",
		icon: ChartSpline,
	},
	{
		name: "addRecord",
		label: "common.menu.label.addRecord",
		route: "/dashboard/add-record",
		icon: SquarePlus,
	},
	{
		name: "exercise",
		label: "common.menu.label.exercise",
		route: "/dashboard/exercise",
		icon: BicepsFlexed,
	},
	{
		name: "session",
		label: "common.menu.label.session",
		route: "/dashboard/session",
		icon: Dumbbell,
	},
] as const;
