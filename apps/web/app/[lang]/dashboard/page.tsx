"use client";
import { FullCalendar } from "@/components/FullCalendar/FullCalendar";

export default function DashboardPage() {
	const events = [
		{
			id: 1,
			title: "Event 1",
			date: new Date(),
		},
		{
			id: 2,
			title: "Event 2",
			date: new Date(),
		},
		{
			id: 3,
			title: "Event 3",
			date: new Date(),
		},
		{
			id: 4,
			title: "Event 4",
			date: new Date(Date.now() - 24 * 60 * 60 * 1000),
		},
		{
			id: 5,
			title: "Event 5",
			date: new Date(Date.now() - 24 * 60 * 60 * 1000),
		},
		{
			id: 6,
			title: "Event 6",
			date: new Date(Date.now() - 24 * 60 * 60 * 1000),
		},
	];
	const handleEventClick = (event: typeof events[number]) => {
		console.log(event);
	};
	return (
		<div>
			<FullCalendar events={events} onEventClick={handleEventClick} />
		</div>
	);
}
