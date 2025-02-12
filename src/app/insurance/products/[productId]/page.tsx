'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { sampleProducts } from '@/data/insurance-product';
import { AnimatePresence, motion } from 'framer-motion';
import {
	Car,
	CheckCircle,
	Clock,
	Cloud,
	Info,
	PackageXIcon,
	Shield,
	ShieldCheck,
	Users,
	Zap,
} from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import type React from 'react';

interface AddOn {
	id: string;
	name: string;
	description: string;
	price: number;
	icon: React.ReactNode;
}

const availableAddOns: AddOn[] = [
	{
		id: 'addon1',
		name: 'Passenger Shield',
		description: 'Extra protection for your valuable cargo',
		price: 500,
		icon: <Users className="w-4 h-4 text-blue-500" />,
	},
	{
		id: 'addon2',
		name: 'Anti-Theft Armor',
		description: 'Keep your matatu safe from sticky fingers',
		price: 750,
		icon: <Shield className="w-4 h-4 text-red-500" />,
	},
	{
		id: 'addon3',
		name: 'Weather Warrior',
		description: "Come rain or shine, you're covered",
		price: 1000,
		icon: <Cloud className="w-4 h-4 text-yellow-500" />,
	},
];

export default function ProductPage() {
	const { productId } = useParams();
	const product = sampleProducts.find((p) => p.id === productId);
	const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
	const [coverageLevel, setCoverageLevel] = useState(3);

	const toggleAddOn = (id: string) => {
		setSelectedAddOns((prev) =>
			prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
		);
	};

	if (!product) {
		return (
			<div className="flex items-center justify-center h-screen bg-gray-100">
				<Card className="w-full max-w-md mx-4 shadow-lg">
					<CardContent className="flex flex-col items-center p-6">
						<PackageXIcon className="w-16 h-16 text-yellow-500 mb-4" />
						<h2 className="text-2xl font-bold mb-2">Oops! Wrong Turn</h2>
						<p className="text-center text-gray-600 mb-4">
							Looks like this matatu took a detour. Let's get you back on track!
						</p>
						<Button asChild className="bg-yellow-500 hover:bg-yellow-600">
							<a href="/">Back to the Depot</a>
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

	const basePremium = product.monthlyPremium * coverageLevel;
	const addOnsCost = selectedAddOns.reduce((sum, id) => {
		const addon = availableAddOns.find((a) => a.id === id);
		return sum + (addon ? addon.price : 0);
	}, 0);
	const totalPrice = basePremium + addOnsCost;

	return (
		<div className="max-w-md mx-auto p-3">
			<div className="relative mb-4">
				<Image
					src="/insurance-product.webp"
					width={400}
					height={200}
					alt="Matatu"
					className="w-full h-48 object-cover rounded-lg shadow-lg"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-lg" />
				<div className="absolute bottom-4 left-4 text-white">
					<h1 className="text-xl font-semibold">{product.name}</h1>
					<p className="text-sm opacity-75 text-green-600">{product.provider}</p>
				</div>
				<ShieldCheck className="absolute top-4 right-4 w-10 h-10 text-yellow-400" />
			</div>

			<Tabs defaultValue="coverage" className="mb-4">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="coverage">Coverage</TabsTrigger>
					<TabsTrigger value="addons">Add-ons</TabsTrigger>
				</TabsList>
				<TabsContent value="coverage">
					<Card>
						<CardContent className="pt-4">
							<h3 className="text-l mb-2">Customize Your Coverage</h3>
							<div className="mb-6">
								<Label className="text-sm font-medium mb-2 block">Coverage Level</Label>
								<Slider
									min={1}
									max={3}
									step={1}
									value={[coverageLevel]}
									onValueChange={(value) => setCoverageLevel(value[0])}
									className="mb-2"
								/>
								<div className="flex justify-between text-sm text-gray-600">
									<span>Basic</span>
									<span>Standard</span>
									<span>Premium</span>
								</div>
							</div>
							<ul className="space-y-2">
								{product.features.map((feature, index) => (
									<motion.li
										key={`${index}-${feature}`}
										className="text-sm flex items-center"
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: index * 0.1 }}
									>
										<CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
										<span>{feature}</span>
									</motion.li>
								))}
							</ul>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="addons">
					<Card>
						<CardContent className="pt-6">
							<h3 className="text-sm mb-1">Enhance Your Protection</h3>
							<ul className="space-y-4">
								{availableAddOns.map((addon) => (
									<motion.li
										key={addon.id}
										className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
									>
										<div className="flex items-center space-x-3">
											<Checkbox
												id={addon.id}
												checked={selectedAddOns.includes(addon.id)}
												onCheckedChange={() => toggleAddOn(addon.id)}
											/>
											<div>
												<label
													htmlFor={addon.id}
													className="text-sm font-medium cursor-pointer flex items-center"
												>
													{addon.icon}
													<span className="ml-2">{addon.name}</span>
												</label>
												<p className="text-xs text-gray-500">{addon.description}</p>
											</div>
										</div>
										<span className="text-sm font-semibold">+KSh {addon.price}</span>
									</motion.li>
								))}
							</ul>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>

			<Card className="mb-2 overflow-hidden">
				<CardContent className="p-0">
					<div className="p-4">
						<ul className="space-y-2 mb-4">
							<li className="flex justify-between text-sm">
								<span>Base Premium:</span>
								<span>KSh {basePremium}</span>
							</li>
							<li className="flex justify-between text-sm">
								<span>Add-ons:</span>
								<span>KSh {addOnsCost}</span>
							</li>
						</ul>
						<Button
							className="w-full h-8 bg-green-600 hover:bg-green-600 text-white text-xs"
							size="sm"
						>
							Secure Your Cover
							<Car />
						</Button>
					</div>
				</CardContent>
			</Card>

			<div className="space-y-1">
				<div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
					<Clock className="w-4 h-4" />
					<span>Get insured in 5 minutes</span>
				</div>
				<div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
					<Zap className="w-4 h-4" />
					<span>24/7 Roadside Assistance</span>
				</div>
				<div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
					<Info className="w-4 h-4" />
					<span>30-Day Stress-Free Switch</span>
				</div>
			</div>

			<AnimatePresence>
				{selectedAddOns.length > 0 && (
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 50 }}
						className="bg-gray-200 text-gray-800 p-2 rounded-lg shadow-lg"
					>
						<p className="text-center text-xs">
							Great choice! You've added {selectedAddOns.length} extra layer
							{selectedAddOns.length > 1 ? 's' : ''} of protection.
						</p>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
