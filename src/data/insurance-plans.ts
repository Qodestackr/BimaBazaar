import type { InsurancePlan } from '@/types/compare-plans';

export const samplePlans: InsurancePlan[] = [
	{
		id: '1',
		name: 'Basic Cover',
		provider: 'SafeGuard',
		monthlyPremium: 1500,
		benefits: {
			'Third Party Liability': true,
			'Driver Personal Accident': true,
			'Passenger Liability': false,
			'Comprehensive Cover': false,
			'Breakdown Assistance': false,
		},
		suitability: 0.7,
		popularity: 0.6,
	},
	{
		id: '2',
		name: 'Standard Cover',
		provider: 'SecureLife',
		monthlyPremium: 3000,
		benefits: {
			'Third Party Liability': true,
			'Driver Personal Accident': true,
			'Passenger Liability': true,
			'Comprehensive Cover': true,
			'Breakdown Assistance': true,
		},
		suitability: 0.9,
		popularity: 0.8,
	},
	{
		id: '3',
		name: 'Premium Cover',
		provider: 'WellCare',
		monthlyPremium: 5000,
		benefits: {
			'Third Party Liability': true,
			'Driver Personal Accident': true,
			'Passenger Liability': true,
			'Comprehensive Cover': true,
			'Breakdown Assistance': true,
		},
		suitability: 0.8,
		popularity: 0.5,
	},
];
