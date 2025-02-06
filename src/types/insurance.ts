export interface InsuranceProduct {
	id: string;
	name: string;
	provider: string;
	coverAmount: string;
	monthlyPremium: number;
	rating: number;
	features: string[];
}

export interface InsuranceProductCardProps {
	product: InsuranceProduct;
}
