'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { samplePlans } from '@/data/insurance-plans';
import type { InsurancePlan } from '@/types/compare-plans';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, MessageCircle, Send, ThumbsUp, Users, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import Rating from '@/components/common/rating';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PulsatingButton } from '@/components/ui/pulsating-button';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function MatutuInsuranceComparison() {
	const [selectedPlans, setSelectedPlans] = useState<InsurancePlan[]>([]);
	const [chatMessage, setChatMessage] = useState('');

	useEffect(() => {
		const bestPlan = samplePlans.reduce((prev, current) =>
			current.suitability > prev.suitability ? current : prev,
		);
		setSelectedPlans([bestPlan]);
	}, []);

	const togglePlanSelection = (plan: InsurancePlan) => {
		setSelectedPlans((prev) =>
			prev.some((p) => p.id === plan.id)
				? prev.filter((p) => p.id !== plan.id)
				: [...prev, plan].slice(-2),
		);
	};

	const handleChatSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Sending message:', chatMessage);
		setChatMessage('');
	};

	return (
		<TooltipProvider>
			<div className="max-w-md mx-auto px-4 py-6 bg-gray-50">
				<h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
					Compare Matatu Insurance
				</h1>

				<div className="space-y-4 mb-6">
					{samplePlans.map((plan) => (
						<Card
							key={plan.id}
							className={`cursor-pointer transition-all duration-300 ${
								selectedPlans.some((p) => p.id === plan.id) ? 'border-blue-500 shadow-md' : ''
							}`}
							onClick={() => togglePlanSelection(plan)}
						>
							<CardContent className="p-3 flex justify-between items-center">
								<div>
									<h3 className="font-semibold text-gray-800">{plan.name}</h3>
									<p className="text-xs text-gray-600">{plan.provider}</p>
									<Rating rating={plan.popularity} />
								</div>
								<div className="text-right">
									<p className="font-bold text-gray-800">KES {plan.monthlyPremium}/mo</p>
									<Badge
										variant={plan.suitability > 0.8 ? 'default' : 'secondary'}
										className={`mt-1 ${
											plan.suitability > 0.8
												? 'bg-green-100 text-green-800'
												: 'bg-blue-100 text-blue-800'
										}`}
									>
										{plan.suitability > 0.8
											? 'Best Fit'
											: `${(plan.suitability * 100).toFixed(0)}% Match`}
									</Badge>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{selectedPlans.length > 0 && (
					<Card className="mb-6 overflow-hidden bg-white">
						<CardContent className="p-4">
							<AnimatePresence mode="wait">
								<motion.div
									key={selectedPlans.map((p) => p.id).join('-')}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									transition={{ duration: 0.3 }}
								>
									<div className="grid grid-cols-2 gap-4">
										{selectedPlans.map((plan) => (
											<div key={plan.id} className="space-y-2">
												<h2 className="text-lg font-bold text-gray-800">{plan.name}</h2>
												<p className="text-sm text-gray-600">{plan.provider}</p>
												<p className="text-lg font-bold text-green-600">
													KES {plan.monthlyPremium}/mo
												</p>
												<div className="space-y-1">
													{Object.entries(plan.benefits).map(([benefit, included]) => (
														<div key={benefit} className="flex items-center text-sm">
															{included ? (
																<Check className="h-4 w-4 text-green-500 mr-2" />
															) : (
																<X className="h-4 w-4 text-red-500 mr-2" />
															)}
															<span className={included ? 'text-gray-800' : 'text-gray-400'}>
																{benefit}
															</span>
														</div>
													))}
												</div>
											</div>
										))}
									</div>
								</motion.div>
							</AnimatePresence>
						</CardContent>
					</Card>
				)}

				{selectedPlans.length === 0 && (
					<p className="text-center text-gray-600">Select an insurance plan above to compare</p>
				)}

				<div className="mt-4 flex flex-col items-center justify-between gap-1">
					<PulsatingButton className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 h-8 px-4 shadow-lg transform transition duration-300 hover:scale-105">
						Get Quote Now <ThumbsUp className="inline-block ml-2 h-5 w-5" />
					</PulsatingButton>
					<p className="text-xs text-gray-600 mt-2">Limited Time Offer</p>
					<div className="flex items-center justify-center">
						<Users className="h-5 w-5 text-blue-500 mr-2" />
						<p className="text-sm text-gray-600">Helped over 1000 drivers this week</p>
					</div>
				</div>

				<div className="mt-4 flex justify-center items-center">
					<Dialog>
						<DialogTrigger asChild>
							<Button className="w-full bg-green-200 text-gray-800 hover:bg-green-400">
								<MessageCircle className="mr-2 h-4 w-4" />
								Ask a Question
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Ask a Question</DialogTitle>
								<DialogDescription>
									Ask a Question an instant question from select products
								</DialogDescription>
							</DialogHeader>
							<Card className="mt-4">
								<CardContent className="p-4">
									<div className="h-16 overflow-y-auto mb-3 text-xs bg-gray-50 p-2 rounded">
										<p className="text-sm text-gray-600">
											Welcome! Ask instant question about select insurance products.
										</p>
									</div>
									<form onSubmit={handleChatSubmit} className="flex">
										<Input
											type="text"
											placeholder="Type your question here..."
											value={chatMessage}
											onChange={(e) => setChatMessage(e.target.value)}
											className="flex-grow mr-2 h-9"
										/>
										<Button type="submit" className="h-8" size="sm">
											<Send className="h-4 w-4" />
										</Button>
									</form>
								</CardContent>
							</Card>
						</DialogContent>
					</Dialog>
				</div>
			</div>
		</TooltipProvider>
	);
}
