import React from 'react'
import { sampleProducts } from "@/data/insurance-product";
import EmptyState from "@/components/ui/empty-state";
import { InsuranceProductCard } from "@/components/products/insurance-product-card";

export default function page() {
    return (
        <div className='max-w-5xl mx-auto mt-10'>
            {sampleProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
    )
}
