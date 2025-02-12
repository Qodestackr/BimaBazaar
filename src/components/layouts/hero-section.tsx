'use client';

import { ToonMatatu } from '@/components/common/toon-matatu';
import { WarpBackground } from '@/components/magicui/warp-background';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, Shield } from 'lucide-react';
import { useState } from 'react';

export function HeroSection() {
	const [hoveredRoute, setHoveredRoute] = useState<string | null>(null);

	const popularRoutes = ['Rongai ⚡️', 'Thika 🚄', 'Kikuyu', 'Kitengela']; // custom icons

	return (
		<WarpBackground
			className="min-h-[90vh] p-0 border-none bg-black"
			perspective={150}
			beamsPerSide={4}
			beamSize={1}
			beamDuration={5}
			beamDelayMax={2}
			gridColor="rgba(255,255,255,0.1)"
		>
			<div className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-center space-y-6"
				>
					<div className="space-y-1">
						<motion.p
							className="text-gray-400 text-sm"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.3 }}
						>
							Ride Hard, Stay Covered.
						</motion.p>
					</div>
					<motion.div
						className="flex flex-wrap justify-center gap-2"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.4 }}
					>
						{popularRoutes.map((route, index) => (
							<motion.div
								key={route}
								onHoverStart={() => setHoveredRoute(route)}
								onHoverEnd={() => setHoveredRoute(null)}
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 0.2 + index * 0.1 }}
							>
								<Card
									className={`
                  px-4 py-1 h-8 cursor-pointer transition-all duration-300
                  ${hoveredRoute === route ? 'bg-primary text-primary-foreground' : 'bg-black/50 text-white'}
                `}
								>
									{route}
								</Card>
							</motion.div>
						))}
					</motion.div>
					<p className="text-center text-white">Some Popular Routes</p>

					<motion.div
						className="space-y-4"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.6 }}
					>
						<Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
							Grab Your Quote Now <ChevronRight className="ml-2 h-4 w-4" />
						</Button>

						<div className="flex justify-center gap-4 text-xs text-gray-400">
							<div className="flex items-center gap-1">
								<Shield className="h-3 w-3" />
								<span>Instant Bima</span>
							</div>
							<div className="flex items-center gap-1">
								<Clock className="h-3 w-3" />
								<span>Fast M-Pesa</span>
							</div>
						</div>
					</motion.div>
				</motion.div>

				{/* Floating Stats */}
				<motion.div
					className="absolute bottom-8 left-4 right-4 flex justify-between"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.8 }}
				>
					<Card className="bg-black/50 text-white border-none p-3">
						<p className="text-xs">Matatu Covered</p>
						<p className="text-2xl font-bold">1,200+</p>
					</Card>
					<Card className="bg-black/50 text-white border-none p-3">
						<p className="text-xs">Claims Processed</p>
						<p className="text-2xl font-bold">500+</p>
					</Card>
				</motion.div>
			</div>

			<div className="flex mx-auto mt-20 justify-center items-center">
				<ToonMatatu />
			</div>
		</WarpBackground>
	);
}
