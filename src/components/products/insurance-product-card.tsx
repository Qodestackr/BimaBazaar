'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import type { InsuranceProductCardProps } from '@/types/insurance';
import { motion } from 'framer-motion';
import { CheckCircle, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function InsuranceProductCard({ product }: InsuranceProductCardProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.2 }}
			whileHover={{ scale: 1.02 }}
			className="w-full max-w-xs border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all"
		>
			<Card className="p-4 flex flex-col space-y-2">
				{/* Header */}
				<CardHeader className="p-0 flex justify-between items-center">
					<div>
						<h3 className="text-sm font-semibold text-gray-800">{product.name}</h3>
						<p className="text-xs text-gray-500">{product.provider}</p>
					</div>
					<Badge variant="secondary" className="text-xs">
						{product.coverAmount}
					</Badge>
				</CardHeader>

				{/* Pricing & Rating */}
				<CardContent className="p-0 flex justify-between items-center">
					<div>
						<p className="text-lg font-bold text-green-600">KSh {product.monthlyPremium}</p>
						<p className="text-xs text-gray-500">per month</p>
					</div>
					<div className="flex items-center text-yellow-500">
						<Star className="w-4 h-4 fill-yellow-400 mr-1" />
						<span className="text-xs font-medium">{product.rating.toFixed(1)}</span>
					</div>
				</CardContent>

				{/* Features */}
				<ul className="text-xs text-gray-700 space-y-1">
					{product.features.slice(0, 3).map((feature, index) => (
						<li key={`${product.id}-${index}`} className="flex items-center">
							<CheckCircle className="w-3 h-3 text-green-500 mr-2" />
							{feature}
						</li>
					))}
				</ul>

				{/* CTA */}
				<CardFooter className="p-0 mt-2">
					<Link href={`/insurance/products/${product.id}`} className="w-full">
						<Button className="w-full bg-primary text-white text-sm py-2">Get Covered Now</Button>
					</Link>
				</CardFooter>
			</Card>
		</motion.div>
	);
}
