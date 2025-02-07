import type { InsuranceProductCardProps } from '@/types/insurance';
import { Star } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export function InsuranceProductCard({ product }: InsuranceProductCardProps) {
	return (
		<Card className="w-full max-w-sm hover:shadow-lg transition-shadow duration-300">
			<CardHeader className="pb-4">
				<div className="flex justify-between items-start">
					<div>
						<CardTitle className="text-lg font-bold">{product.name}</CardTitle>
						<p className="text-sm text-muted-foreground">{product.provider}</p>
					</div>
					<Badge variant="secondary" className="text-xs">
						{product.coverAmount}
					</Badge>
				</div>
			</CardHeader>
			<CardContent className="pb-4">
				<div className="flex justify-between items-center mb-4">
					<div>
						<p className="text-xl font-bold">KSh {product.monthlyPremium}</p>
						<p className="text-xs text-muted-foreground">per month</p>
					</div>
					<div className="flex items-center">
						<Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
						<span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
					</div>
				</div>
				<ul className="space-y-2">
					{product.features.map((feature, index) => (
						<li key={`${product.id}-${index}`} className="text-sm flex items-start">
							<span className="mr-2 text-green-500">✓</span>
							{feature}
						</li>
					))}
				</ul>
			</CardContent>
			<CardFooter>
				<Button className="w-full">Get Covered</Button>
			</CardFooter>
		</Card>
	);
}
