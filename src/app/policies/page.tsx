import ComparePlansPage from '@/components/compare-plans/ai/PlansPage';
import { InsuranceCategoryList } from '@/components/products/insurance-category-list';
import { insuranceCategories } from '@/data/insurance-categories';

export default function Home() {
	return (
		<>
			<main className="container mx-auto py-8">
				<div className="max-w-4xl mx-auto">
					<h1 className="text-xl font-light mb-2">Insurance Products</h1>
					<p className="text-muted-foreground mb-4 text-sm">
						Find the perfect coverage for your needs
					</p>
					<InsuranceCategoryList categories={insuranceCategories} />
				</div>
				<ComparePlansPage />
			</main>
		</>
	);
}
