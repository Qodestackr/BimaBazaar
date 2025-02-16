'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
	ArrowDownLeft,
	ArrowUpRight,
	Clock,
	FileText,
	Loader2,
	Plus,
	Receipt,
	RefreshCcw,
	Search,
	TrendingUp,
} from 'lucide-react';
import { useState } from 'react';
import {
	Cell,
	Legend,
	Line,
	LineChart,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Transaction {
	id: string;
	name: string;
	type: string;
	amount: number;
	currency: string;
	status: 'pending' | 'completed' | 'failed';
	date: string;
}

const initialTransactions: Transaction[] = [
	{
		id: '1',
		name: 'Route 23 Collection',
		type: 'income',
		amount: 15000,
		currency: 'KSh',
		status: 'completed',
		date: '2024-02-16',
	},
	{
		id: '2',
		name: 'Fuel Payment',
		type: 'expense',
		amount: 8000,
		currency: 'KSh',
		status: 'completed',
		date: '2024-02-15',
	},
	{
		id: '3',
		name: 'Insurance Premium',
		type: 'expense',
		amount: 5000,
		currency: 'KSh',
		status: 'pending',
		date: '2024-02-14',
	},
	{
		id: '4',
		name: 'Route 15 Collection',
		type: 'income',
		amount: 12000,
		currency: 'KSh',
		status: 'completed',
		date: '2024-02-13',
	},
	{
		id: '5',
		name: 'Vehicle Maintenance',
		type: 'expense',
		amount: 3000,
		currency: 'KSh',
		status: 'completed',
		date: '2024-02-12',
	},
];

export function FinanceDashboard() {
	const [activeTab, setActiveTab] = useState('overview');
	const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
	const [isLoading, setIsLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [showNewTransactionDialog, setShowNewTransactionDialog] = useState(false);
	const [newTransaction, setNewTransaction] = useState<Partial<Transaction>>({
		type: 'income',
		currency: 'KSh',
		status: 'completed',
	});

	const totalCollections = transactions.reduce(
		(sum, transaction) => (transaction.type === 'income' ? sum + transaction.amount : sum),
		0,
	);

	const pendingReconciliation = transactions.reduce(
		(sum, transaction) => (transaction.status === 'pending' ? sum + transaction.amount : sum),
		0,
	);

	const refreshData = () => {
		setIsLoading(true);
		// Simulate API call
		setTimeout(() => {
			setTransactions((prevTransactions) => {
				const newTransaction: Transaction = {
					id: (prevTransactions.length + 1).toString(),
					name: `Route ${Math.floor(Math.random() * 30) + 1} Collection`,
					type: 'income',
					amount: Math.floor(Math.random() * 10000) + 5000,
					currency: 'KSh',
					status: 'completed',
					date: new Date().toISOString().split('T')[0],
				};
				return [newTransaction, ...prevTransactions];
			});
			setIsLoading(false);
		}, 1000);
	};

	const filteredTransactions = transactions.filter(
		(transaction) =>
			transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			transaction.amount.toString().includes(searchTerm),
	);

	const handleNewTransaction = () => {
		if (newTransaction.name && newTransaction.amount) {
			setTransactions((prev) => [
				{
					...newTransaction,
					id: (prev.length + 1).toString(),
					date: new Date().toISOString().split('T')[0],
				} as Transaction,
				...prev,
			]);
			setShowNewTransactionDialog(false);
			setNewTransaction({ type: 'income', currency: 'KSh', status: 'completed' });
		}
	};

	const lineChartData = [
		{ month: 'Jan', collections: 12000, expenses: 8000 },
		{ month: 'Feb', collections: 19000, expenses: 15000 },
		{ month: 'Mar', collections: 15000, expenses: 10000 },
		{ month: 'Apr', collections: 25000, expenses: 18000 },
		{ month: 'May', collections: 22000, expenses: 17000 },
		{ month: 'Jun', collections: 30000, expenses: 22000 },
	];

	const pieChartData = [
		{ name: 'M-Pesa', value: 300 },
		{ name: 'Cash', value: 50 },
		{ name: 'Card', value: 100 },
	];

	const COLORS = ['#36A2EB', '#FFCE56', '#FF6384'];

	return (
		<div className="w-full max-w-7xl mx-auto space-y-8">
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Collections</CardTitle>
						<Receipt className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">KSh {totalCollections.toLocaleString()}</div>
						<p className="text-xs text-muted-foreground">
							<TrendingUp className="h-4 w-4 text-green-500 inline mr-1" />
							+20.1% from last month
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Pending Reconciliation</CardTitle>
						<Clock className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">KSh {pendingReconciliation.toLocaleString()}</div>
						<p className="text-xs text-muted-foreground">
							{transactions.filter((t) => t.status === 'pending').length} transactions pending
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Daily Average</CardTitle>
						<TrendingUp className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">KSh 24,500</div>
						<p className="text-xs text-muted-foreground">
							<TrendingUp className="h-4 w-4 text-green-500 inline mr-1" />
							+5.2% from last week
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">AI Insights</CardTitle>
						<Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground">
							Collection rate is 15% higher on weekends. Consider optimizing your collection
							schedule.
						</p>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle>Financial Overview</CardTitle>
						<Select defaultValue="month">
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Select period" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="week">This Week</SelectItem>
								<SelectItem value="month">This Month</SelectItem>
								<SelectItem value="quarter">This Quarter</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</CardHeader>
				<CardContent>
					<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
						<TabsList className="grid w-full grid-cols-3">
							<TabsTrigger value="overview">Overview</TabsTrigger>
							<TabsTrigger value="transactions">Transactions</TabsTrigger>
							<TabsTrigger value="reports">Reports</TabsTrigger>
						</TabsList>
						<TabsContent value="overview" className="space-y-4">
							<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
								<Card className="md:col-span-4">
									<CardHeader>
										<CardTitle>Collections vs Expenses</CardTitle>
									</CardHeader>
									<CardContent>
										<ResponsiveContainer width="100%" height={300}>
											<LineChart data={lineChartData}>
												<XAxis dataKey="month" />
												<YAxis />
												<Tooltip />
												<Legend />
												<Line type="monotone" dataKey="collections" stroke="#36A2EB" />
												<Line type="monotone" dataKey="expenses" stroke="#FF6384" />
											</LineChart>
										</ResponsiveContainer>
									</CardContent>
								</Card>
								<Card className="md:col-span-3">
									<CardHeader>
										<CardTitle>Payment Methods</CardTitle>
									</CardHeader>
									<CardContent>
										<ResponsiveContainer width="100%" height={300}>
											<PieChart>
												<Pie
													data={pieChartData}
													cx="50%"
													cy="50%"
													labelLine={false}
													outerRadius={80}
													fill="#8884d8"
													dataKey="value"
												>
													{pieChartData.map((entry, index) => (
														<Cell
															key={`cell-${index}-${entry.name}`}
															fill={COLORS[index % COLORS.length]}
														/>
													))}
												</Pie>
												<Tooltip />
												<Legend />
											</PieChart>
										</ResponsiveContainer>
									</CardContent>
								</Card>
							</div>
						</TabsContent>
						<TabsContent value="transactions" className="space-y-4">
							<div className="flex justify-between items-center">
								<div className="relative">
									<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
									<Input
										placeholder="Search transactions"
										className="pl-8"
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
									/>
								</div>
								<div className="space-x-2">
									<Button onClick={refreshData} disabled={isLoading}>
										<RefreshCcw className="mr-2 h-4 w-4" />
										Refresh
									</Button>
									<Button onClick={() => setShowNewTransactionDialog(true)}>
										<Plus className="mr-2 h-4 w-4" />
										New Transaction
									</Button>
								</div>
							</div>
							<div className="rounded-md border">
								<div className="p-4">
									<div className="space-y-4">
										<AnimatePresence>
											{filteredTransactions.map((transaction, index) => (
												<motion.div
													key={transaction.id}
													initial={{ opacity: 0, y: 20 }}
													animate={{ opacity: 1, y: 0 }}
													exit={{ opacity: 0, y: -20 }}
													transition={{ duration: 0.2, delay: index * 0.05 }}
													className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
												>
													<div className="flex items-center space-x-4">
														<div
															className={`w-10 h-10 rounded-full flex items-center justify-center ${
																transaction.type === 'income'
																	? 'bg-green-100 text-green-600'
																	: 'bg-red-100 text-red-600'
															}`}
														>
															{transaction.type === 'income' ? (
																<ArrowUpRight className="h-5 w-5" />
															) : (
																<ArrowDownLeft className="h-5 w-5" />
															)}
														</div>
														<div>
															<p className="text-sm font-medium">{transaction.name}</p>
															<p className="text-xs text-muted-foreground">{transaction.date}</p>
														</div>
													</div>
													<div className="flex items-center space-x-4">
														<span
															className={`text-sm font-medium ${
																transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
															}`}
														>
															{transaction.type === 'income' ? '+' : '-'} {transaction.currency}{' '}
															{transaction.amount.toLocaleString()}
														</span>
														<span
															className={`text-xs px-2 py-1 rounded-full ${
																transaction.status === 'completed'
																	? 'bg-green-100 text-green-600'
																	: transaction.status === 'pending'
																		? 'bg-yellow-100 text-yellow-600'
																		: 'bg-red-100 text-red-600'
															}`}
														>
															{transaction.status}
														</span>
													</div>
												</motion.div>
											))}
										</AnimatePresence>
									</div>
								</div>
							</div>
						</TabsContent>
						<TabsContent value="reports" className="space-y-4">
							<Card>
								<CardHeader>
									<CardTitle>Financial Reports</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-2">
										<Button variant="outline" className="w-full justify-start">
											<FileText className="mr-2 h-4 w-4" />
											Daily Collection Report
										</Button>
										<Button variant="outline" className="w-full justify-start">
											<FileText className="mr-2 h-4 w-4" />
											Monthly Expense Summary
										</Button>
										<Button variant="outline" className="w-full justify-start">
											<FileText className="mr-2 h-4 w-4" />
											Quarterly Financial Statement
										</Button>
										<Button variant="outline" className="w-full justify-start">
											<FileText className="mr-2 h-4 w-4" />
											Annual Tax Report
										</Button>
									</div>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>

			<Dialog open={showNewTransactionDialog} onOpenChange={setShowNewTransactionDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add New Transaction</DialogTitle>
						<DialogDescription>Enter the details of the new transaction below.</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right">
								Name
							</Label>
							<Input
								id="name"
								value={newTransaction.name || ''}
								onChange={(e) => setNewTransaction({ ...newTransaction, name: e.target.value })}
								className="col-span-3"
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="amount" className="text-right">
								Amount
							</Label>
							<Input
								id="amount"
								type="number"
								value={newTransaction.amount || ''}
								onChange={(e) =>
									setNewTransaction({ ...newTransaction, amount: Number(e.target.value) })
								}
								className="col-span-3"
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="type" className="text-right">
								Type
							</Label>
							<Select
								value={newTransaction.type}
								onValueChange={(value) =>
									setNewTransaction({ ...newTransaction, type: value as 'income' | 'expense' })
								}
							>
								<SelectTrigger className="col-span-3">
									<SelectValue placeholder="Select type" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="income">Income</SelectItem>
									<SelectItem value="expense">Expense</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="status" className="text-right">
								Status
							</Label>
							<Select
								value={newTransaction.status}
								onValueChange={(value) =>
									setNewTransaction({
										...newTransaction,
										status: value as 'pending' | 'completed' | 'failed',
									})
								}
							>
								<SelectTrigger className="col-span-3">
									<SelectValue placeholder="Select status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="pending">Pending</SelectItem>
									<SelectItem value="completed">Completed</SelectItem>
									<SelectItem value="failed">Failed</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
					<DialogFooter>
						<Button onClick={handleNewTransaction}>Add Transaction</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
