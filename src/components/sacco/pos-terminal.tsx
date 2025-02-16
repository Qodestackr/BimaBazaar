'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import {
	ArrowLeft,
	ArrowRight,
	Banknote,
	Check,
	CreditCard,
	History,
	Loader2,
	RefreshCcw,
	Smartphone,
	X,
} from 'lucide-react';
import { useState } from 'react';

interface Transaction {
	id: string;
	amount: number;
	method: string;
	status: 'pending' | 'completed' | 'failed';
	timestamp: Date;
}

export function POSTerminal() {
	const [step, setStep] = useState<'amount' | 'method' | 'processing' | 'complete'>('amount');
	const [amount, setAmount] = useState('');
	const [selectedMethod, setSelectedMethod] = useState<string>('');
	const [dailyTotal, setDailyTotal] = useState(15750); // Example daily total
	const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([
		{
			id: '1',
			amount: 2500,
			method: 'mpesa',
			status: 'completed',
			timestamp: new Date(),
		},
		{
			id: '2',
			amount: 1000,
			method: 'cash',
			status: 'completed',
			timestamp: new Date(Date.now() - 1000 * 60 * 5),
		},
	]);

	const handleAmountSubmit = () => {
		if (!amount) return;
		setStep('method');
	};

	const handleMethodSelect = async (method: string) => {
		setSelectedMethod(method);
		setStep('processing');

		// Simulate payment processing
		await new Promise((resolve) => setTimeout(resolve, 2000));

		const newTransaction: Transaction = {
			id: Math.random().toString(36).substr(2, 9),
			amount: Number(amount),
			method: method,
			status: 'completed',
			timestamp: new Date(),
		};

		setRecentTransactions((prev) => [newTransaction, ...prev]);
		setDailyTotal((prev) => prev + Number(amount));
		setStep('complete');
	};

	const resetForm = () => {
		setAmount('');
		setSelectedMethod('');
		setStep('amount');
	};

	const paymentMethods = [
		{
			id: 'mpesa',
			name: 'M-Pesa',
			icon: Smartphone,
			description: 'Mobile Money Transfer',
		},
		{
			id: 'cash',
			name: 'Cash',
			icon: Banknote,
			description: 'Physical Cash Payment',
		},
		{
			id: 'card',
			name: 'Card',
			icon: CreditCard,
			description: 'Debit/Credit Card',
		},
	];

	return (
		<div className="grid md:grid-cols-[1fr,300px] gap-4">
			<Card className="w-full">
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle>Quick Collection</CardTitle>
					<div className="flex items-center space-x-2">
						<span className="text-sm text-muted-foreground">Daily Total:</span>
						<span className="font-bold">KSh {dailyTotal.toLocaleString()}</span>
					</div>
				</CardHeader>
				<CardContent>
					<AnimatePresence mode="wait">
						{step === 'amount' && (
							<motion.div
								key="amount"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								className="space-y-4"
							>
								<div className="space-y-2">
									<Label htmlFor="amount">Amount (KSh)</Label>
									<div className="flex space-x-2">
										<Input
											id="amount"
											type="number"
											value={amount}
											onChange={(e) => setAmount(e.target.value)}
											placeholder="Enter amount"
											className="text-lg"
										/>
										<Button onClick={handleAmountSubmit} disabled={!amount}>
											Next
											<ArrowRight className="ml-2 h-4 w-4" />
										</Button>
									</div>
								</div>

								<div className="grid grid-cols-3 gap-2">
									{[1000, 2000, 5000].map((quickAmount) => (
										<Button
											key={quickAmount}
											variant="outline"
											onClick={() => setAmount(quickAmount.toString())}
										>
											KSh {quickAmount.toLocaleString()}
										</Button>
									))}
								</div>
							</motion.div>
						)}

						{step === 'method' && (
							<motion.div
								key="method"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								className="space-y-4"
							>
								<div className="flex items-center justify-between mb-4">
									<Button variant="ghost" onClick={() => setStep('amount')}>
										<ArrowLeft className="mr-2 h-4 w-4" />
										Back
									</Button>
									<span className="font-bold">KSh {Number(amount).toLocaleString()}</span>
								</div>

								<div className="grid gap-4">
									{paymentMethods.map((method) => (
										<motion.button
											key={method.id}
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											onClick={() => handleMethodSelect(method.id)}
											className={cn(
												'flex items-center space-x-4 p-4 rounded-lg border-2',
												'hover:border-primary transition-colors',
												'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
											)}
										>
											<div className="flex-shrink-0">
												<method.icon className="h-6 w-6" />
											</div>
											<div className="flex-grow text-left">
												<h3 className="font-medium">{method.name}</h3>
												<p className="text-sm text-muted-foreground">{method.description}</p>
											</div>
											<ArrowRight className="h-4 w-4 text-muted-foreground" />
										</motion.button>
									))}
								</div>
							</motion.div>
						)}

						{step === 'processing' && (
							<motion.div
								key="processing"
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								className="flex flex-col items-center justify-center py-12 space-y-4"
							>
								<Loader2 className="h-8 w-8 animate-spin text-primary" />
								<p className="text-lg font-medium">Processing Payment...</p>
								<p className="text-sm text-muted-foreground">Please wait</p>
							</motion.div>
						)}

						{step === 'complete' && (
							<motion.div
								key="complete"
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								className="flex flex-col items-center justify-center py-12 space-y-4"
							>
								<div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
									<Check className="h-6 w-6 text-green-600 dark:text-green-400" />
								</div>
								<div className="text-center">
									<p className="text-lg font-medium">Payment Complete!</p>
									<p className="text-sm text-muted-foreground">
										KSh {Number(amount).toLocaleString()} via {selectedMethod}
									</p>
								</div>
								<Button onClick={resetForm}>
									<RefreshCcw className="mr-2 h-4 w-4" />
									New Payment
								</Button>
							</motion.div>
						)}
					</AnimatePresence>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
						<History className="h-4 w-4 text-muted-foreground" />
					</div>
				</CardHeader>
				<CardContent>
					<ScrollArea className="h-[400px] pr-4">
						<div className="space-y-4">
							{recentTransactions.map((transaction) => (
								<motion.div
									key={transaction.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
								>
									<div>
										<p className="font-medium">KSh {transaction.amount.toLocaleString()}</p>
										<p className="text-xs text-muted-foreground">via {transaction.method}</p>
									</div>
									<div className="text-right">
										<p className="text-xs text-muted-foreground">
											{new Date(transaction.timestamp).toLocaleTimeString()}
										</p>
										<span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
											{transaction.status}
										</span>
									</div>
								</motion.div>
							))}
						</div>
					</ScrollArea>
				</CardContent>
			</Card>
		</div>
	);
}
