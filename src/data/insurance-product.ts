import type { InsuranceProduct } from "@/types/insurance";

export const sampleProducts: InsuranceProduct[] = [
	{
		id: "1",
		name: "Comprehensive Auto",
		provider: "SafariSure Insurance",
		coverAmount: "KSh 5M",
		monthlyPremium: 2500,
		rating: 4.7,
		features: [
			"24/7 roadside assistance",
			"No-claims bonus protection",
			"Personal accident cover",
			"Third-party liability",
		],
	},
	{
		id: "2",
		name: "Family Health Shield",
		provider: "AfyaMax Health",
		coverAmount: "KSh 2M",
		monthlyPremium: 3500,
		rating: 4.5,
		features: [
			"Inpatient & outpatient coverage",
			"Maternity benefits",
			"Dental & optical cover",
			"Chronic illness management",
		],
	},
];
