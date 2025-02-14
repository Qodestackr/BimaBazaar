'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnimatePresence, motion } from 'framer-motion';
import {
	ArrowDownLeft,
	ArrowUpRight,
	Calendar,
	CreditCard,
	FileText,
	Plus,
	TrendingUp,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface TransactionItem {
	id: string;
	type: 'payment' | 'premium';
	amount: number;
	description: string;
	date: string;
}

const TRANSACTIONS: TransactionItem[] = [
	{
		id: '1',
		type: 'payment',
		amount: 5000,
		description: 'Monthly premium payment',
		date: '2024-05-20',
	},
	{
		id: '2',
		type: 'premium',
		amount: 2000,
		description: 'Insurance premium deduction',
		date: '2024-05-18',
	},
	{
		id: '3',
		type: 'payment',
		amount: 3000,
		description: 'Additional coverage payment',
		date: '2024-05-15',
	},
	{
		id: '4',
		type: 'premium',
		amount: 1500,
		description: 'Policy renewal fee',
		date: '2024-05-10',
	},
	{
		id: '5',
		type: 'payment',
		amount: 4000,
		description: 'Claim reimbursement',
		date: '2024-05-05',
	},
];

export function PaymentHistory() {
	const [transactions, setTransactions] = useState<TransactionItem[]>(TRANSACTIONS);
	const [filteredTransactions, setFilteredTransactions] = useState<TransactionItem[]>(TRANSACTIONS);
	const [searchTerm, setSearchTerm] = useState('');
	const [activeTab, setActiveTab] = useState('all');
	const [selectedTransaction, setSelectedTransaction] = useState<TransactionItem | null>(null);

	const balance = transactions.reduce(
		(acc, transaction) =>
			transaction.type === 'payment' ? acc + transaction.amount : acc - transaction.amount,
		0,
	);

	useEffect(() => {
		const filtered = transactions.filter((transaction) => {
			const matchesSearch = transaction.description
				.toLowerCase()
				.includes(searchTerm.toLowerCase());
			const matchesTab = activeTab === 'all' || transaction.type === activeTab;
			return matchesSearch && matchesTab;
		});
		setFilteredTransactions(filtered);
	}, [searchTerm, activeTab, transactions]);

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const aiSpendingInsights = () => {
		const totalPayments = transactions
			.filter((t) => t.type === 'payment')
			.reduce((sum, t) => sum + t.amount, 0);
		const totalPremiums = transactions
			.filter((t) => t.type === 'premium')
			.reduce((sum, t) => sum + t.amount, 0);
		const averagePayment = totalPayments / transactions.filter((t) => t.type === 'payment').length;

		return (
			<div className="space-y-2">
				<p className="text-sm font-medium">AI-Powered Spending Insights:</p>
				<ul className="text-sm space-y-1">
					<li>Total payments: KSh {totalPayments.toLocaleString()}</li>
					<li>Total premiums: KSh {totalPremiums.toLocaleString()}</li>
					<li>Average payment: KSh {averagePayment.toFixed(2)}</li>
					<li>
						Recommendation:{' '}
						{totalPayments > totalPremiums
							? 'Consider increasing your coverage.'
							: 'Your payments are well-balanced with your premiums.'}
					</li>
				</ul>
			</div>
		);
	};

	return (
		<Card className="w-full">
			<CardHeader className="pb-2">
				<CardTitle className="text-lg font-semibold flex items-center justify-between">
					<span className="flex items-center">
						<CreditCard className="w-5 h-5 mr-2" />
						Payment History
					</span>
					<span className="text-sm font-normal">Balance: KSh {balance.toLocaleString()}</span>
				</CardTitle>
			</CardHeader>
			<CardContent className="p-0">
				<div className="px-4 py-3 bg-muted/50">
					<div className="flex gap-2 mb-2">
						<Input
							type="text"
							placeholder="Search transactions..."
							value={searchTerm}
							onChange={handleSearch}
							className="flex-grow"
						/>
						<Dialog>
							<DialogTrigger asChild>
								<Button variant="outline" size="icon">
									<TrendingUp className="h-4 w-4" />
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Spending Insights</DialogTitle>
									<DialogDescription>
										AI-powered analysis of your transaction history
									</DialogDescription>
								</DialogHeader>
								{aiSpendingInsights()}
							</DialogContent>
						</Dialog>
					</div>
					<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
						<TabsList className="grid w-full grid-cols-3">
							<TabsTrigger value="all">All</TabsTrigger>
							<TabsTrigger value="payment">Payments</TabsTrigger>
							<TabsTrigger value="premium">Premiums</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>
				<ScrollArea className="h-[300px]">
					<AnimatePresence>
						{filteredTransactions.map((transaction) => (
							<motion.div
								key={transaction.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.2 }}
								className="flex items-center justify-between p-2 mx-4 my-1 rounded-lg hover:bg-muted/50 transition-all duration-200 cursor-pointer"
								onClick={() => setSelectedTransaction(transaction)}
							>
								<div className="flex items-center gap-3">
									<div
										className={`p-1.5 rounded-full ${
											transaction.type === 'payment'
												? 'bg-emerald-100 text-emerald-600'
												: 'bg-rose-100 text-rose-600'
										}`}
									>
										{transaction.type === 'payment' ? (
											<ArrowUpRight className="w-3.5 h-3.5" />
										) : (
											<ArrowDownLeft className="w-3.5 h-3.5" />
										)}
									</div>
									<div>
										<p className="text-xs font-medium">{transaction.description}</p>
										<p className="text-[10px] text-muted-foreground">{transaction.date}</p>
									</div>
								</div>
								<span
									className={`text-xs font-medium ${
										transaction.type === 'payment' ? 'text-emerald-600' : 'text-rose-600'
									}`}
								>
									{transaction.type === 'payment' ? '+' : '-'} KSh{' '}
									{transaction.amount.toLocaleString()}
								</span>
							</motion.div>
						))}
					</AnimatePresence>
				</ScrollArea>
				<div className="p-4 border-t space-y-2">
					<Button variant="outline" size="sm" className="w-full">
						<Calendar className="w-4 h-4 mr-2" />
						View All Transactions
					</Button>
					<Button variant="outline" size="sm" className="w-full">
						<Plus className="w-4 h-4 mr-2" />
						Add Payment Method
					</Button>
				</div>
			</CardContent>
			<Dialog open={!!selectedTransaction} onOpenChange={() => setSelectedTransaction(null)}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Transaction Details</DialogTitle>
					</DialogHeader>
					{selectedTransaction && (
						<div className="space-y-4">
							<div className="flex justify-between items-center">
								<span className="text-sm font-medium">Type</span>
								<span className="text-sm capitalize">{selectedTransaction.type}</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-sm font-medium">Amount</span>
								<span className="text-sm font-bold">
									KSh {selectedTransaction.amount.toLocaleString()}
								</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-sm font-medium">Date</span>
								<span className="text-sm">{selectedTransaction.date}</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-sm font-medium">Description</span>
								<span className="text-sm">{selectedTransaction.description}</span>
							</div>
							<Button variant="outline" className="w-full">
								<FileText className="w-4 h-4 mr-2" />
								Download Receipt
							</Button>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</Card>
	);
}
