'use client';

import { OfferBanner } from '@/components/banners/offer-banner';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { InsuranceCategoryListProps } from '@/types/insurance-categories';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export function InsuranceCategoryList({ categories, layout = 'grid' }: InsuranceCategoryListProps) {
	return (
		<div
			className={cn(
				'grid gap-2 w-full mx-2',
				layout === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1',
			)}
		>
			{categories.map((category, index) => (
				<motion.div
					key={category.id}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: index * 0.1 }}
				>
					<Link href={category.href} className="block">
						<Card className="relative group hover:shadow-lg transition-all duration-300">
							{category.offer && (
								<OfferBanner text={category.offer.text} type={category.offer.type} />
							)}
							<CardContent className="p-6">
								<motion.div
									whileHover={{ scale: 1.05 }}
									className="flex flex-col items-center text-center space-y-3"
								>
									<div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
										<Image
											width={100}
											height={100}
											src={category.icon ?? ''}
											alt=""
											className="w-8 h-8"
											aria-hidden="true"
										/>
									</div>
									<div>
										<h3 className="text-lg mb-1">{category.title}</h3>
										<p className="text-xs text-muted-foreground line-clamp-2">
											{category.description}
										</p>
									</div>
								</motion.div>
							</CardContent>
						</Card>
					</Link>
				</motion.div>
			))}
		</div>
	);
}
