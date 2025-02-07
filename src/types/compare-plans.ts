export interface InsurancePlan {
	id: string;
	name: string;
	provider: string;
	monthlyPremium: number;
	benefits: { [key: string]: boolean };
	suitability: number;
	popularity: number;
}
