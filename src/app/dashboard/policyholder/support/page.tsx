'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
	AlertTriangle,
	ArrowRight,
	Calendar,
	Car,
	CheckCircle,
	CreditCard,
	FileText,
	Send,
	Shield,
	PenToolIcon as Tool,
} from 'lucide-react';
import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

const QUICK_ACTIONS = [
	{
		icon: <Shield className="w-5 h-5" />,
		label: 'Coverage Details',
		value: "I'd like to know more about my matatu insurance coverage",
	},
	{
		icon: <FileText className="w-5 h-5" />,
		label: 'File Claim',
		value: 'I need to file an insurance claim',
	},
	{
		icon: <Car className="w-5 h-5" />,
		label: 'Vehicle Issues',
		value: "I'm having issues with my matatu",
	},
	{
		icon: <Tool className="w-5 h-5" />,
		label: 'Roadside Help',
		value: 'I need roadside assistance',
	},
];

type ChatMessage = {
	id: string;
	sender: 'user' | 'ai' | 'human';
	content: string;
	timestamp: string;
	type?:
		| 'text'
		| 'action'
		| 'payment'
		| 'rating'
		| 'welcome'
		| 'urgent'
		| 'handover'
		| 'premium-reminder';
	actionType?: 'file_claim' | 'update_details' | 'roadside_assistance';
	paymentInfo?: {
		amount: string;
		method: 'mpesa' | 'card';
		transactionId: string;
	};
	urgentInfo?: {
		severity: 'high' | 'medium' | 'low';
		handoverTo?: string;
		estimatedResponse?: string;
	};
	premiumInfo?: {
		dueDate: string;
		amount: string;
	};
};

const WELCOME_MESSAGE: ChatMessage = {
	id: '0',
	sender: 'ai',
	content:
		"Yo! I'm your BimaBizaar support assistant—ready to keep it lit with your matatu insurance. What's good?",
	timestamp: new Date().toLocaleTimeString(),
	type: 'welcome',
};

const motionVariants = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -20 },
};

const UrgentCaseAlert: React.FC<{
	severity: 'high' | 'medium' | 'low';
	handoverTo?: string;
	estimatedResponse?: string;
}> = ({ severity, handoverTo, estimatedResponse }) => {
	const severityStyles = {
		high: 'border-red-500 bg-red-50 dark:bg-red-900/10',
		medium: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10',
		low: 'border-blue-500 bg-blue-50 dark:bg-blue-900/10',
	};

	const severityIconColor =
		severity === 'high'
			? 'text-red-500'
			: severity === 'medium'
				? 'text-yellow-500'
				: 'text-blue-500';

	const severityTitle =
		severity === 'high'
			? 'Urgent Case'
			: severity === 'medium'
				? 'Priority Case'
				: 'Special Attention';

	return (
		<Alert className={`${severityStyles[severity]} mb-4`}>
			<AlertTriangle className={`h-5 w-5 ${severityIconColor}`} />
			<AlertTitle className="ml-2">{severityTitle}</AlertTitle>
			<AlertDescription className="ml-2 mt-1">
				{handoverTo && (
					<p>
						Handled by: <strong>{handoverTo}</strong>
					</p>
				)}
				{estimatedResponse && (
					<p>
						ETA: <strong>{estimatedResponse}</strong>
					</p>
				)}
			</AlertDescription>
		</Alert>
	);
};

const PaymentConfirmation: React.FC<{
	amount: string;
	method: 'mpesa' | 'card';
	transactionId: string;
}> = ({ amount, method, transactionId }) => {
	return (
		<div className="bg-white dark:bg-gray-800 border border-green-200 dark:border-green-800 rounded-xl shadow-md p-3 mb-4">
			<div className="flex justify-between items-center mb-2">
				<div className="flex items-center space-x-2">
					<CheckCircle className="h-5 w-5 text-green-500" />
					<h3 className="text-sm font-medium text-green-700 dark:text-green-300">
						Payment Confirmed
					</h3>
				</div>
				<div
					className={`flex items-center ${
						method === 'mpesa' ? 'bg-green-100' : 'bg-blue-100'
					} dark:bg-opacity-20 rounded-full px-2 py-1 text-xs`}
				>
					{method === 'mpesa' ? (
						<span className="font-semibold text-green-700">M-PESA</span>
					) : (
						<div className="flex items-center">
							<CreditCard className="h-4 w-4 mr-1 text-blue-700" />
							<span className="font-semibold text-blue-700">Card</span>
						</div>
					)}
				</div>
			</div>
			<div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-2 space-y-2">
				<div className="flex justify-between items-center">
					<span className="text-xs text-gray-600 dark:text-gray-300">Amount Paid</span>
					<span className="font-semibold text-xs bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 px-2 py-1 rounded">
						KES {Number.parseFloat(amount).toLocaleString()}
					</span>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-xs text-gray-600 dark:text-gray-300">Transaction ID</span>
					<span className="text-xs text-gray-700 dark:text-gray-300">{transactionId}</span>
				</div>
			</div>
		</div>
	);
};

const PremiumReminder: React.FC<{
	dueDate: string;
	amount: string;
	onPayNow: () => void;
}> = ({ dueDate, amount, onPayNow }) => {
	return (
		<div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl shadow-md p-3 mb-4">
			<div className="flex items-center space-x-2 mb-2">
				<Calendar className="h-5 w-5 text-blue-500" />
				<h3 className="text-sm font-medium text-blue-700 dark:text-blue-300">Payment Reminder</h3>
			</div>
			<div className="space-y-2">
				<p className="text-sm text-gray-600 dark:text-gray-300">
					Your next premium of <strong>KES {amount}</strong> is due on{' '}
					<strong>{new Date(dueDate).toLocaleDateString()}</strong>.
				</p>
				<Button onClick={onPayNow} className="w-full mt-2">
					Pay Now <ArrowRight className="ml-2 h-4 w-4" />
				</Button>
			</div>
		</div>
	);
};

export default function ChatSupport() {
	const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
	const [input, setInput] = useState('');
	const [isAiTyping, setIsAiTyping] = useState(false);
	const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');
	const scrollAreaRef = useRef<HTMLDivElement>(null);

	// Helper: add a new message
	const addMessage = useCallback((msg: ChatMessage) => {
		setMessages((prev) => [...prev, msg]);
	}, []);

	// Simulate dynamic AI responses with custom key phrases
	const simulateAIResponse = useCallback(
		(userInput: string) => {
			setIsAiTyping(true);
			setTimeout(() => {
				let aiResponse: ChatMessage;

				if (userInput.toLowerCase().includes('abc')) {
					aiResponse = {
						id: crypto.randomUUID(),
						sender: 'ai',
						content: "Nah bro, we don't do ABC here. Try something real!",
						timestamp: new Date().toLocaleTimeString(),
						type: 'text',
					};
				} else if (userInput.toLowerCase().includes('payout')) {
					aiResponse = {
						id: crypto.randomUUID(),
						sender: 'ai',
						content: 'Heads up! Your next payout drops tomorrow. Stay ready!',
						timestamp: new Date().toLocaleTimeString(),
						type: 'text',
					};
				} else if (
					userInput.toLowerCase().includes('accident') ||
					userInput.toLowerCase().includes('crash')
				) {
					aiResponse = {
						id: crypto.randomUUID(),
						sender: 'ai',
						content: 'Yo, that sounds rough. Our emergency squad is on its way!',
						timestamp: new Date().toLocaleTimeString(),
						type: 'urgent',
						urgentInfo: {
							severity: 'high',
							handoverTo: 'Emergency Response Team',
							estimatedResponse: 'Within 5 minutes',
						},
					};
				} else if (userInput.toLowerCase().includes('claim')) {
					aiResponse = {
						id: crypto.randomUUID(),
						sender: 'ai',
						content: "Alright, let's get that claim rolling. Drop the deets about the incident.",
						timestamp: new Date().toLocaleTimeString(),
						type: 'handover',
						urgentInfo: {
							severity: 'medium',
							handoverTo: 'Claims Specialist',
							estimatedResponse: 'Within 15 minutes',
						},
					};
				} else if (userInput.toLowerCase().includes('coverage')) {
					aiResponse = {
						id: crypto.randomUUID(),
						sender: 'ai',
						content:
							"Your matatu's secured with our Comprehensive Insurance:\n• Third-party liability\n• Passenger protection\n• Vehicle damage\n• Natural disasters\n• Theft\nWanna know more?",
						timestamp: new Date().toLocaleTimeString(),
						type: 'text',
					};
					const premiumReminder: ChatMessage = {
						id: crypto.randomUUID(),
						sender: 'ai',
						content: 'Reminder: Your premium payment is due soon!',
						timestamp: new Date().toLocaleTimeString(),
						type: 'premium-reminder',
						premiumInfo: {
							dueDate: '2023-12-31',
							amount: '10,000',
						},
					};
					addMessage(aiResponse);
					addMessage(premiumReminder);
					setIsAiTyping(false);
					return;
				} else {
					aiResponse = {
						id: crypto.randomUUID(),
						sender: 'ai',
						content: "Can you tell me more? I'm here to sort your insurance needs.",
						timestamp: new Date().toLocaleTimeString(),
						type: 'text',
					};
				}

				addMessage(aiResponse);
				setIsAiTyping(false);
			}, 1000);
		},
		[addMessage],
	);

	const handleQuickAction = useCallback(
		(action: (typeof QUICK_ACTIONS)[number]) => {
			const userMsg: ChatMessage = {
				id: crypto.randomUUID(),
				sender: 'user',
				content: action.value,
				timestamp: new Date().toLocaleTimeString(),
				type: 'text',
			};
			addMessage(userMsg);
			simulateAIResponse(action.value);
		},
		[addMessage, simulateAIResponse],
	);

	const handleSendMessage = useCallback(() => {
		if (input.trim()) {
			const userMsg: ChatMessage = {
				id: crypto.randomUUID(),
				sender: 'user',
				content: input.trim(),
				timestamp: new Date().toLocaleTimeString(),
				type: 'text',
			};
			addMessage(userMsg);
			setInput('');
			simulateAIResponse(input);
		}
	}, [input, addMessage, simulateAIResponse]);

	const handlePayNow = useCallback(() => {
		setPaymentStatus('processing');
		setTimeout(() => {
			setPaymentStatus('success');
			const paymentMsg: ChatMessage = {
				id: crypto.randomUUID(),
				sender: 'ai',
				content: 'Payment confirmed! Thank you.',
				timestamp: new Date().toLocaleTimeString(),
				type: 'payment',
				paymentInfo: {
					amount: '10,000',
					method: 'mpesa',
					transactionId: `TRX${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
				},
			};
			addMessage(paymentMsg);
		}, 3000);
	}, [addMessage]);

	useEffect(() => {
		if (scrollAreaRef.current) {
			scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
		}
	}, []);

	return (
		<Card className="w-full sm:max-w-md mx-auto h-[80vh] shadow-lg flex flex-col">
			<CardHeader className="border-b p-4 flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Avatar>
						<AvatarImage src="/placeholder.svg?height=40&width=40" alt="BimaBizaar Logo" />
						<AvatarFallback>BB</AvatarFallback>
					</Avatar>
					<div>
						<CardTitle className="text-md font-light">Chat with Bizaar</CardTitle>
					</div>
				</div>
			</CardHeader>
			<div className="flex flex-col flex-grow">
				{/* Fixed-height scroll area */}
				<ScrollArea className="flex-grow p-4 h-[calc(80vh-7rem)]" ref={scrollAreaRef}>
					<AnimatePresence initial={false}>
						{messages.map((msg) => (
							<motion.div
								key={msg.id}
								variants={motionVariants}
								initial="initial"
								animate="animate"
								exit="exit"
								className={`flex items-start gap-2 mb-4 ${
									msg.sender === 'user' ? 'justify-end' : ''
								}`}
							>
								{msg.sender !== 'user' && (
									<Avatar>
										<AvatarImage src="/placeholder.svg?height=40&width=40" alt="AI Assistant" />
										<AvatarFallback>{msg.sender === 'ai' ? 'AI' : 'Agent'}</AvatarFallback>
									</Avatar>
								)}
								<div className={`max-w-[75%] ${msg.sender === 'user' ? 'text-right' : ''}`}>
									{msg.type === 'text' && (
										<div
											className={`inline-block rounded-lg px-4 py-2 ${
												msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
											}`}
										>
											<p className="text-sm whitespace-pre-line">{msg.content}</p>
										</div>
									)}
									{msg.type === 'welcome' && (
										<>
											<div className="inline-block rounded-lg px-4 py-2 bg-muted mb-3">
												<p className="text-sm">{msg.content}</p>
											</div>
											<div className="grid grid-cols-2 gap-2">
												{QUICK_ACTIONS.map((action) => (
													<Button
														key={action.label}
														variant="outline"
														className="flex items-center gap-2 text-sm"
														onClick={() => handleQuickAction(action)}
													>
														{action.icon}
														{action.label}
													</Button>
												))}
											</div>
										</>
									)}
									{(msg.type === 'urgent' || msg.type === 'handover') && msg.urgentInfo && (
										<>
											<div className="inline-block rounded-lg px-4 py-2 bg-muted mb-3">
												<p className="text-sm">{msg.content}</p>
											</div>
											<UrgentCaseAlert {...msg.urgentInfo} />
										</>
									)}
									{msg.type === 'payment' && msg.paymentInfo && (
										<PaymentConfirmation {...msg.paymentInfo} />
									)}
									{msg.type === 'premium-reminder' && msg.premiumInfo && (
										<PremiumReminder {...msg.premiumInfo} onPayNow={handlePayNow} />
									)}
									<p className="text-xs text-muted-foreground mt-1">{msg.timestamp}</p>
								</div>
								{msg.sender === 'user' && (
									<Avatar>
										<AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
										<AvatarFallback>You</AvatarFallback>
									</Avatar>
								)}
							</motion.div>
						))}
					</AnimatePresence>
					{isAiTyping && (
						<div className="flex items-center gap-2 text-muted-foreground">
							<Avatar>
								<AvatarImage src="/placeholder.svg?height=40&width=40" alt="AI Assistant" />
								<AvatarFallback>AI</AvatarFallback>
							</Avatar>
							<p className="text-sm">AI is typing...</p>
						</div>
					)}
				</ScrollArea>
				{/* Input & status area */}
				<div className="p-4 border-t">
					{paymentStatus === 'processing' && (
						<Alert className="mb-2">
							<AlertTitle className="text-sm text-yellow-600 flex items-center gap-1">
								<span>Processing Payment</span>
								<CreditCard className="h-5 w-5 text-yellow-600 animate-spin" />
							</AlertTitle>
							<AlertDescription className="text-gray-700 text-xs">
								Payment in progress, please wait...
							</AlertDescription>
						</Alert>
					)}
					{paymentStatus === 'success' && (
						<Alert className="mb-2">
							<AlertTitle className="text-xs text-green-600 flex items-center gap-1">
								<span>Payment Successful</span>
								<CheckCircle className="h-5 w-5 text-green-600" />
							</AlertTitle>
							<AlertDescription className="text-gray-700 text-xs">
								Payment processed successfully.
							</AlertDescription>
						</Alert>
					)}
					<div className="flex gap-2">
						<Input
							value={input}
							onChange={(e) => setInput(e.target.value)}
							placeholder="Type your message..."
							onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
							className="flex-grow"
						/>
						<Button onClick={handleSendMessage} className="p-2">
							<Send className="w-5 h-5" />
						</Button>
					</div>
				</div>
			</div>
		</Card>
	);
}
