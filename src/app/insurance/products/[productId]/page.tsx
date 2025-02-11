'use client';

import { AddOns } from '@/components/add-ons/add-ons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import EmptyState from '@/components/ui/empty-state';
import { sampleProducts } from '@/data/insurance-product';
import { CheckCircle, PackageXIcon, Star } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function ProductPage() {
	const { productId } = useParams();
	const product = sampleProducts.find((p) => p.id === productId);
	const [step, setStep] = useState('details');

	if (!product) {
		return (
			<div className="max-w-md mx-auto mt-4">
				<EmptyState
					title="No Backend Yet.."
					description="Product not found"
					actionText="Go Home"
					actionHref="/"
					icon={<PackageXIcon className="text-blue-500" />}
				/>
			</div>
		);
	}

	return (
		<div className="max-w-3xl mx-auto mt-10 p-4">
			{step === 'details' && (
				<Card className="shadow-md">
					<CardHeader>
						<CardTitle className="text-xl font-bold">{product.name}</CardTitle>
						<p className="text-sm text-muted-foreground">{product.provider}</p>
					</CardHeader>

					<CardContent className="space-y-4">
						<div className="flex justify-between items-center">
							<div>
								<p className="text-2xl font-bold text-green-600">KSh {product.monthlyPremium}</p>
								<p className="text-xs text-muted-foreground">per month</p>
							</div>
							<Badge variant="secondary" className="text-xs">
								{product.coverAmount}
							</Badge>
						</div>

						<div className="flex items-center text-yellow-500">
							<Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
							<span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
						</div>

						<ul className="space-y-2">
							{product.features.map((feature, index) => (
								// uuid for biome
								<li key={`${crypto.randomUUID()}`} className="text-sm flex items-center">
									<CheckCircle className="w-4 h-4 text-green-500 mr-2" />
									{feature}
								</li>
							))}
						</ul>
					</CardContent>

					<CardFooter>
						<Button
							className="w-full bg-primary hover:bg-primary/90 transition-all"
							onClick={() => setStep('checkout')}
						>
							Proceed to Checkout
						</Button>
					</CardFooter>
				</Card>
			)}

			{step === 'checkout' && (
				<div className="p-4">
					<h2 className="text-xl font-bold mb-4 text-center">Checkout & Add-ons</h2>
					<AddOns />
					<div className="text-center mt-4">
						<Button onClick={() => setStep('details')}>Back</Button>
					</div>
				</div>
			)}
		</div>
	);
}
