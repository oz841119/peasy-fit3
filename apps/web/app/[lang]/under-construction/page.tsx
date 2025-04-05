"use client";

import { Link } from "@/i18n/routing";
import { ArrowLeft, Construction } from "lucide-react";
import { useTranslations } from "next-intl";

export default function UnderConstruction() {
  const landing = useTranslations("landing");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-900">
      <Construction className="w-16 h-16 text-yellow-500 mb-6 animate-pulse" />
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        {landing("underConstruction")}
      </h1>
      <p className="text-lg text-gray-400 max-w-md text-center mb-8">
        {landing("workingHard")}
      </p>
      <Link
        href="/"
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        {landing("backToHome")}
      </Link>
    </div>
  );
} 