import { ROICalculator } from '@/components/calculator/roi-calculator';

export default function ROICalculatorPage() {
	return (
		<div className="container mx-auto p-2">
			<h1 className="text-2xl font-light text-center">Bazaar ROI Calculator</h1>
			<ROICalculator />
		</div>
	);
}
