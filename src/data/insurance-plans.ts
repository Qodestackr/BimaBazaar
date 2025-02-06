import type { InsuranceOption } from "@/types/compare-plans";

export const samplePlans: InsuranceOption[] = [
	{
		id: "1",
		provider: "SafariSure",
		planName: "Premium Coverage",
		monthlyPremium: 2500,
		coverageAmount: "KSh 5M",
		benefits: [
			"Comprehensive coverage",
			"24/7 roadside assistance",
			"No-claims bonus",
			"Flexible payment options",
		],
		rating: 4.8,
		aiScore: 95,
		recommended: true,
	},
];
