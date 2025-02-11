import { InsuranceProductCard } from '@/components/products/insurance-product-card';
import EmptyState from '@/components/ui/empty-state';
import { sampleProducts } from '@/data/insurance-product';
import React from 'react';

export default function page() {
	return (
		<div className="max-w-5xl mx-auto mt-10">
			{sampleProducts.length ? (
				<div className="mx-3 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
					{sampleProducts.map((product) => (
						<InsuranceProductCard key={product.id} product={product} />
					))}
				</div>
			) : (
				<EmptyState
					title="No Products Available"
					description="We couldn't find any insurance products. Check back later!"
					actionText="Explore More"
					actionHref="/explore"
					icon={null}
				/>
			)}
		</div>
	);
}
