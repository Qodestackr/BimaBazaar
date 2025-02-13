'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import type { InsurancePlan } from '@/types/compare-plans';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Send, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Message {
	id: number;
	text: string;
	sender: 'user' | 'ai';
}

interface AIProductChatProps {
	selectedPlans: InsurancePlan[];
}

export function AIProductChat({ selectedPlans }: AIProductChatProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState('');
	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setMessages([
			{
				id: 1,
				text: "Hello! I'm here to help you compare matatu insurance plans. What would you like to know?",
				sender: 'ai',
			},
		]);
	}, []);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, []);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (input.trim()) {
			const userMessage = { id: messages.length + 1, text: input, sender: 'user' as const };
			setMessages((prev) => [...prev, userMessage]);
			setInput('');
			setTimeout(() => simulateResponse(input), 1000);
		}
	};

	const simulateResponse = (userInput: string) => {
		let response =
			"I'm sorry, I don't have specific information about that. Is there anything else I can help you with regarding the insurance plans?";

		if (userInput.toLowerCase().includes('difference')) {
			response = `The main differences between ${selectedPlans[0]?.name} and ${selectedPlans[1]?.name} are their monthly premiums and covered benefits. ${selectedPlans[0]?.name} costs KES ${selectedPlans[0]?.monthlyPremium}/mo, while ${selectedPlans[1]?.name} costs KES ${selectedPlans[1]?.monthlyPremium}/mo. Would you like me to compare specific benefits?`;
		} else if (userInput.toLowerCase().includes('recommend')) {
			const bestPlan = selectedPlans.reduce((prev, current) =>
				current.suitability > prev.suitability ? current : prev,
			);
			response = `Based on general suitability, I would recommend ${bestPlan.name}. It has a ${(bestPlan.suitability * 100).toFixed(0)}% match to typical matatu insurance needs. However, your specific needs may vary. Can I help you compare any specific aspects of the plans?`;
		}

		const aiMessage = { id: messages.length + 2, text: response, sender: 'ai' as const };
		setMessages((prev) => [...prev, aiMessage]);
	};

	return (
		<div className="z-50 flex flex-col justify-end items-end">
			<Dialog>
				<DialogTrigger asChild>
					<Button className="rounded-full w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white shadow-lg">
						<MessageCircle className="h-6 w-6" />
					</Button>
				</DialogTrigger>
				<DialogContent>
					<AnimatePresence>
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 50 }}
							transition={{ duration: 0.3 }}
						>
							<div className="flex flex-col">
								<div className="flex flex-col h-full p-2">
									<div className="flex-grow overflow-y-auto mb-4 space-y-4">
										{messages.map((message) => (
											<div
												key={message.id}
												className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
											>
												<div
													className={`max-w-[75%] rounded-lg p-2 ${message.sender === 'user'
														? 'bg-blue-500 text-white'
														: 'bg-gray-200 text-gray-800'
														}`}
												>
													{message.text}
												</div>
											</div>
										))}
										<div ref={messagesEndRef} />
									</div>
									<form onSubmit={handleSubmit} className="flex">
										<Input
											type="text"
											placeholder="Type your question here..."
											value={input}
											onChange={(e) => setInput(e.target.value)}
											className="flex-grow mr-2"
										/>
										<Button type="submit" size="icon">
											<Send className="h-4 w-4" />
										</Button>
									</form>
								</div>
							</div>
						</motion.div>
					</AnimatePresence>
				</DialogContent>
			</Dialog>
		</div>
	);
}
