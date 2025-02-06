"use client";

import type { ComparisonStep } from "@/types/compare-plans";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface ProgressIndicatorProps {
	steps: ComparisonStep[];
	currentStep: number;
}

export function ProgressIndicator({ steps, currentStep }: ProgressIndicatorProps) {
	return (
		<div className="relative mb-8">
			<div className="absolute top-5 left-0 right-0 h-0.5 bg-muted" />
			<motion.div
				className="absolute top-5 left-0 h-0.5 bg-primary"
				initial={{ width: "0%" }}
				animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
				transition={{ duration: 0.5, ease: "easeInOut" }}
			/>
			<div className="relative z-10 flex justify-between">
				{steps.map((step, index) => (
					<motion.div
						key={step.id}
						className="flex flex-col items-center"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.1 }}
					>
						<motion.div
							className={`w-10 h-10 rounded-full flex items-center justify-center ${
								index <= currentStep
									? "bg-primary text-primary-foreground"
									: "bg-muted text-muted-foreground"
							}`}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
						>
							{step.isComplete ? (
								<Check className="w-5 h-5" />
							) : (
								<span className="text-sm font-medium">{step.id}</span>
							)}
						</motion.div>
						<p className="mt-2 text-sm font-medium">{step.title}</p>
					</motion.div>
				))}
			</div>
		</div>
	);
}
