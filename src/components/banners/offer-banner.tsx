"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface OfferBannerProps {
	text: string;
	type: "discount" | "feature" | "new" | "premium";
}

export function OfferBanner({ text, type }: OfferBannerProps) {
	const colors = {
		discount: "bg-blue-100 text-blue-700",
		feature: "bg-green-100 text-green-700",
		new: "bg-purple-100 text-purple-700",
		premium: "bg-amber-100 text-amber-700",
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			className={cn(
				"absolute -top-3 left-0 right-0 mx-auto w-fit px-3 py-[3px] rounded-full text-xs",
				colors[type],
			)}
		>
			{text}
		</motion.div>
	);
}
