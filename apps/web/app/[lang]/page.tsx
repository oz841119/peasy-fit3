"use client";

import { Link, getLocaleName, routing } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {
	ArrowRight,
	ArrowUpRight,
	Dumbbell,
	Heart,
	Languages,
	Shield,
	User,
	Users,
} from "lucide-react";
import type { ReactNode } from "react";
import { useLangToggler } from "@/hooks/useLangToggler";
import { useLocale } from "next-intl";

export default function Home() {
	const t = useTranslations();
	const landing = useTranslations("landing");
	const currLocale = useLocale();
	const { locales } = routing;
	const { toggleLocale } = useLangToggler();

	return (
		<div className="flex flex-col min-h-screen">
			{/* Language Switcher */}
			<div className="absolute top-4 right-4 z-10">
				<div className="group relative inline-block">
					<button
						type="button"
						className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium bg-gray-900/70 hover:bg-gray-800 border border-gray-700 transition-colors"
					>
						<Languages className="h-4 w-4" />
						<span>{getLocaleName(currLocale as (typeof routing.locales)[number])}</span>
						<ArrowUpRight className="h-3.5 w-3.5 opacity-70 group-hover:rotate-90 transition-transform" />
					</button>
					<div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-gray-900 ring-1 ring-gray-700 overflow-hidden z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
						{locales.map((locale) => (
							<button
								type="button"
								key={locale}
								className={`w-full text-left px-4 py-2 text-sm ${currLocale === locale
									? "bg-gray-800 text-blue-400"
									: "hover:bg-gray-800"
									} hover:bg-gray-800 transition-colors`}
								onClick={() => toggleLocale(locale)}
								disabled={currLocale === locale}
							>
								{getLocaleName(locale)}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Hero Section */}
			<header className="flex flex-col items-center justify-center py-20 px-4 text-center bg-gradient-to-b from-gray-900 to-black">
				<h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
					Peasy Fit
				</h1>
				<p className="text-xl md:text-2xl max-w-3xl mb-8 text-gray-300">
					{landing("heroTagline")}
				</p>
				<div className="flex flex-col sm:flex-row gap-4">
					<Link
						href="/login"
						className="px-8 py-3 rounded-full font-medium bg-blue-600 hover:bg-blue-700 transition-colors text-white"
					>
						{landing("getStarted")}
					</Link>
					<Link
						href="/dashboard"
						className="px-8 py-3 rounded-full font-medium border border-gray-600 hover:border-gray-400 transition-colors flex items-center justify-center gap-2"
					>
						{t("common.dashboard")}
						<ArrowRight className="h-4 w-4" />
					</Link>
				</div>
			</header>

			{/* Features Section */}
			<section className="py-16 px-4 bg-black">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl font-bold text-center mb-12">
						{landing("features")}
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						<FeatureCard
							icon={<Dumbbell className="w-10 h-10 text-blue-500" />}
							title={landing("featureWorkout")}
							description={landing("featureWorkoutDesc")}
						/>
						<FeatureCard
							icon={<Users className="w-10 h-10 text-purple-500" />}
							title={landing("featureHealth")}
							description={landing("featureHealthDesc")}
						/>
						<FeatureCard
							icon={<User className="w-10 h-10 text-green-500" />}
							title={landing("featurePersonalized")}
							description={landing("featurePersonalizedDesc")}
						/>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16 px-4 bg-gradient-to-r from-blue-900 to-purple-900">
				<div className="max-w-4xl mx-auto text-center">
					<h2 className="text-3xl font-bold mb-6">{landing("ctaTitle")}</h2>
					<p className="text-lg mb-8 text-gray-300">{landing("ctaDesc")}</p>
					<Link
						href="/login"
						className="px-8 py-3 rounded-full font-medium bg-white text-black hover:bg-gray-200 transition-colors inline-flex items-center gap-2"
					>
						{landing("startNow")}
						<ArrowUpRight className="w-4 h-4" />
					</Link>
				</div>
			</section>

			{/* Footer */}
			<footer className="py-12 px-4 bg-black border-t border-gray-800">
				<div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
					<div className="mb-4 md:mb-0">
						<p className="text-sm text-gray-500">
							© {new Date().getFullYear()} Peasy Fit.{" "}
							{landing("rightsReserved")}
						</p>
					</div>
					<div className="flex gap-8">
						<Link
							href="/under-construction"
							className="text-sm text-gray-400 hover:text-white transition-colors"
						>
							{landing("privacy")}
						</Link>
						<Link
							href="/under-construction"
							className="text-sm text-gray-400 hover:text-white transition-colors"
						>
							{landing("terms")}
						</Link>
						<Link
							href="/under-construction"
							className="text-sm text-gray-400 hover:text-white transition-colors"
						>
							{landing("contact")}
						</Link>
					</div>
				</div>
			</footer>
		</div>
	);
}

// Feature card component
interface FeatureCardProps {
	icon: ReactNode;
	title: string;
	description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
	return (
		<div className="p-6 rounded-xl border border-gray-800 bg-gray-900/50 hover:bg-gray-900 transition-colors">
			<div className="mb-4">{icon}</div>
			<h3 className="text-xl font-semibold mb-3">{title}</h3>
			<p className="text-gray-400">{description}</p>
		</div>
	);
}
